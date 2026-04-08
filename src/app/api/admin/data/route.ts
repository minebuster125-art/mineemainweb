import { NextRequest, NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Mine@buster@2012";

function checkAuth(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  return auth === ADMIN_PASSWORD;
}

// GET - fetch orders or shop items
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await initDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "orders") {
    const [rows] = await pool.execute("SELECT * FROM orders ORDER BY submittedAt DESC");
    return NextResponse.json(rows);
  }

  if (type === "shop") {
    const [rows] = await pool.execute("SELECT * FROM shop_items ORDER BY sortOrder ASC, createdAt DESC");
    return NextResponse.json(rows);
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

// POST - add shop item
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await initDB();
  const body = await req.json();
  const { action } = body;

  if (action === "add_shop_item") {
    const { id, title, description, price, type, youtubeLink, buyAction, imageData, createdAt } = body.item;
    await pool.execute(
      "INSERT INTO shop_items (id, title, description, price, type, youtubeLink, buyAction, imageData, createdAt, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)",
      [id, title, description, price, type, youtubeLink || "", buyAction || "", imageData || "", createdAt]
    );
    return NextResponse.json({ success: true });
  }

  if (action === "add_order") {
    const { id, channelName, channelLink, projectType, description, referenceLinks, attachedFiles, budget, deadline, email, discord, submittedAt } = body.order;
    await pool.execute(
      "INSERT INTO orders (id, channelName, channelLink, projectType, description, referenceLinks, attachedFiles, budget, deadline, email, discord, submittedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, channelName, channelLink, projectType, description, referenceLinks || "", JSON.stringify(attachedFiles || []), budget, deadline, email, discord, submittedAt]
    );
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

// DELETE - remove order or shop item
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await initDB();
  const body = await req.json();
  const { type, id } = body;

  if (type === "order") {
    await pool.execute("DELETE FROM orders WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  }

  if (type === "shop_item") {
    await pool.execute("DELETE FROM shop_items WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

// PATCH - reorder shop items
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await initDB();
  const body = await req.json();
  const { items } = body;

  for (let i = 0; i < items.length; i++) {
    await pool.execute("UPDATE shop_items SET sortOrder = ? WHERE id = ?", [i, items[i].id]);
  }

  return NextResponse.json({ success: true });
}
