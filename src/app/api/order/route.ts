import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) { rateLimitMap.set(ip, { count: 1, timestamp: now }); return false; }
  if (now - record.timestamp > RATE_LIMIT_WINDOW) { rateLimitMap.set(ip, { count: 1, timestamp: now }); return false; }
  if (record.count >= MAX_REQUESTS) return true;
  record.count += 1;
  return false;
}

function sanitizeInput(str: string): string {
  if (!str) return str;
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const formData = await req.formData();

    if (formData.get("websiteUrl_hp")) {
      return NextResponse.json({ success: true, dummy: true });
    }

    const rawPayload = formData.get("payload_json");
    if (!rawPayload || typeof rawPayload !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    let parsedPayload;
    try {
      parsedPayload = JSON.parse(rawPayload);
    } catch {
      return NextResponse.json({ error: "Bad payload format" }, { status: 400 });
    }

    if (parsedPayload.embeds && Array.isArray(parsedPayload.embeds)) {
      parsedPayload.embeds.forEach((embed: any) => {
        if (embed.fields && Array.isArray(embed.fields)) {
          embed.fields.forEach((field: any) => {
            if (field.value) field.value = sanitizeInput(String(field.value));
          });
        }
      });
    }

    const discordFormData = new FormData();
    discordFormData.append("payload_json", JSON.stringify(parsedPayload));
    for (const [key, value] of Array.from(formData.entries())) {
      if (key.startsWith("files[")) discordFormData.append(key, value);
    }

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set.");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const discordRes = await fetch(discordWebhookUrl, { method: "POST", body: discordFormData });
    if (!discordRes.ok) {
      console.error("Discord API Error:", discordRes.status, await discordRes.text());
      return NextResponse.json({ error: "Failed to dispatch order" }, { status: 500 });
    }

    // Save to JSON file
    try {
      const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");
      const dir = path.dirname(ORDERS_FILE);
      
      // Ensure directory exists
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (!fs.existsSync(ORDERS_FILE)) {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify([]), "utf-8");
      }

      const orderData = parsedPayload.embeds?.[0]?.fields || [];
      const getValue = (name: string) => orderData.find((f: any) => f.name === name)?.value || "";

      const newOrder = {
        id: Date.now().toString(36),
        channelName: getValue("Channel Name"),
        channelLink: getValue("Channel Link"),
        projectType: getValue("Project Type"),
        description: getValue("Description"),
        referenceLinks: getValue("Reference Links"),
        attachedFiles: [],
        budget: parseFloat(getValue("Budget").replace("$", "")) || 0,
        deadline: getValue("Deadline"),
        email: getValue("Email"),
        discord: getValue("Discord"),
        submittedAt: new Date().toISOString()
      };

      const data = fs.readFileSync(ORDERS_FILE, "utf-8");
      const orders = JSON.parse(data);
      orders.unshift(newOrder);
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    } catch (e) {
      console.error("File save error:", e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing order webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
