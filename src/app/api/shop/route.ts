import { NextRequest, NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";

// Public endpoint - no authentication required
export async function GET(req: NextRequest) {
  try {
    await initDB();
    const [rows] = await pool.execute(
      "SELECT * FROM shop_items ORDER BY sortOrder ASC, createdAt DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching shop items:", error);
    return NextResponse.json({ error: "Failed to fetch shop items" }, { status: 500 });
  }
}
