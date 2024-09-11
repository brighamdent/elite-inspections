export const dynamic = "force-dynamic";
import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
  try {
    const [days] = await pool.query<RowDataPacket[]>(
      `SELECT 
       *
       FROM days;`,
    );
    const response = NextResponse.json(days, { status: 200 });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error during GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
