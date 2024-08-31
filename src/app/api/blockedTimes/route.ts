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
    id,
    DATE_FORMAT(date, '%Y-%m-%d') AS date,
    DATE_FORMAT(time, '%H:%i') AS time
    FROM blocked_times
    WHERE date >= CURDATE()
    ORDER BY date ASC, time ASC;
`,
    );

    connection.release();

    return NextResponse.json({ status: 200, data: rows });
  } catch (error) {
    connection.release();
    console.log(error);
  }
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  const connection = await pool.getConnection();
  try {
    const { timeId } = await req.json();

    await connection.execute(
      `
DELETE FROM blocked_times
WHERE id = ?;
`,
      [timeId],
    );
    connection.release();

    return NextResponse.json({
      status: 200,
      message: "Date deleted successfully",
    });
  } catch (error) {
    connection.release();
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Failed to delete the date",
    });
  } finally {
    connection.release();
  }
}
