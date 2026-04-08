import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Mine@buster@2012";
const SHOP_DATA_FILE = path.join(process.cwd(), "data", "shop-items.json");
const ORDERS_DATA_FILE = path.join(process.cwd(), "data", "orders.json");

function checkAuth(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  return auth === ADMIN_PASSWORD;
}

// Ensure data directory and files exist
function ensureDataFiles() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(SHOP_DATA_FILE)) {
    fs.writeFileSync(SHOP_DATA_FILE, JSON.stringify([]), "utf-8");
  }
  if (!fs.existsSync(ORDERS_DATA_FILE)) {
    fs.writeFileSync(ORDERS_DATA_FILE, JSON.stringify([]), "utf-8");
  }
}

// GET - fetch orders or shop items
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  ensureDataFiles();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "orders") {
    const data = fs.readFileSync(ORDERS_DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  }

  if (type === "shop") {
    const data = fs.readFileSync(SHOP_DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

// POST - add shop item or order
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  ensureDataFiles();
  const body = await req.json();
  const { action } = body;

  if (action === "add_shop_item") {
    const data = fs.readFileSync(SHOP_DATA_FILE, "utf-8");
    const items = JSON.parse(data);
    items.unshift(body.item); // Add to beginning
    fs.writeFileSync(SHOP_DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  }

  if (action === "add_order") {
    const data = fs.readFileSync(ORDERS_DATA_FILE, "utf-8");
    const orders = JSON.parse(data);
    orders.unshift(body.order); // Add to beginning
    fs.writeFileSync(ORDERS_DATA_FILE, JSON.stringify(orders, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

// DELETE - remove order or shop item
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  ensureDataFiles();
  const body = await req.json();
  const { type, id } = body;

  if (type === "order") {
    const data = fs.readFileSync(ORDERS_DATA_FILE, "utf-8");
    const orders = JSON.parse(data);
    const filtered = orders.filter((o: any) => o.id !== id);
    fs.writeFileSync(ORDERS_DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  }

  if (type === "shop_item") {
    const data = fs.readFileSync(SHOP_DATA_FILE, "utf-8");
    const items = JSON.parse(data);
    const filtered = items.filter((i: any) => i.id !== id);
    fs.writeFileSync(SHOP_DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

// PATCH - reorder shop items
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  ensureDataFiles();
  const body = await req.json();
  const { items } = body;

  fs.writeFileSync(SHOP_DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
