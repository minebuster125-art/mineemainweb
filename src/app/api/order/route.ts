import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting (Note: in serverless environments like Vercel, this resets frequently)
// but it's enough to stop basic spam loops from the same IP at the exact same moment.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// Basic HTML stripping function to prevent raw HTML/script injection
function sanitizeInput(str: string): string {
  if (!str) return str;
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    
    // Check Honeypot
    if (formData.get("websiteUrl_hp")) {
      // Bots filled out the visually hidden field. We silently drop the request but pretend it succeeded.
      return NextResponse.json({ success: true, dummy: true });
    }

    // Get basic fields to re-build sanitised payload
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

    // Sanitize the embed fields
    if (parsedPayload.embeds && Array.isArray(parsedPayload.embeds)) {
      parsedPayload.embeds.forEach((embed: any) => {
        if (embed.fields && Array.isArray(embed.fields)) {
          embed.fields.forEach((field: any) => {
            if (field.value) {
              field.value = sanitizeInput(String(field.value));
            }
          });
        }
      });
    }

    // Prepare Discord Forwarding FormData
    const discordFormData = new FormData();
    discordFormData.append("payload_json", JSON.stringify(parsedPayload));

    // Append files safely
    for (const [key, value] of Array.from(formData.entries())) {
      if (key.startsWith("files[")) {
        discordFormData.append(key, value);
      }
    }

    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set.");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const discordRes = await fetch(discordWebhookUrl, {
      method: "POST",
      body: discordFormData,
    });

    if (!discordRes.ok) {
      console.error("Discord API Error:", discordRes.status, await discordRes.text());
      return NextResponse.json({ error: "Failed to dispatch order" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing order webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
