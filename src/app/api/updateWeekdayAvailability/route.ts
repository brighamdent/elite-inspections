import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  const connection = await pool.getConnection();
  try {
    const { id } = await req.json();

    await connection.execute(
      `
  UPDATE days
  SET available = CASE 
    WHEN available = 1 THEN 0
    WHEN available = 0 THEN 1
    ELSE available
  END
  WHERE id = ?;
`,
      [id],
    );
    connection.release();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    connection.release();
    console.log(error);
  }
}