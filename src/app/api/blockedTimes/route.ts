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
    const { date, time } = await req.json();

    await connection.execute(
      `
INSERT INTO blocked_times (date, time)
VALUES (?, ?);
`,
      [date, time],
    );
    connection.release();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    connection.release();
    console.log(error);
  }
}

export async function GET(req: NextRequest) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        DATE_FORMAT(time, '%H:%i') AS time
       FROM blocked_times
`,
    );

    connection.release();

    return NextResponse.json({ status: 200, data: rows });
  } catch (error) {
    connection.release();
    console.log(error);
  }
}
