import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  try {
    const { date, time } = await req.json();

    await pool.query(
      `
INSERT INTO blocked_times (date, time)
VALUES (?, ?);
`,
      [date, time],
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query(
      `SELECT
    id,
    DATE_FORMAT(date, '%Y-%m-%d') AS date,
    DATE_FORMAT(time, '%H:%i') AS time
    FROM blocked_times
    WHERE date >= CURDATE()
    ORDER BY date ASC, time ASC;
`,
    );

    return NextResponse.json({ status: 200, data: rows });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  try {
    const { timeId } = await req.json();

    await pool.query(
      `
DELETE FROM blocked_times
WHERE id = ?;
`,
      [timeId],
    );

    return NextResponse.json({
      status: 200,
      message: "Date deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Failed to delete the date",
    });
  }
}
