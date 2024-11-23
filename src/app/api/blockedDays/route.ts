import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  try {
    const { date } = await req.json();

    await pool.query(
      `
INSERT INTO blocked_dates (date)
VALUES (?);
`,
      [date],
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query(
      `
SELECT DATE_FORMAT(date, '%Y-%m-%d') AS date 
FROM blocked_dates 
WHERE date >= CURDATE()
ORDER BY date ASC;
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
    const { date } = await req.json();

    await pool.query(
      `
DELETE FROM blocked_dates 
WHERE date = ?;
`,
      [date],
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
