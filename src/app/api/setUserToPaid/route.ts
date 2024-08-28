import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(req: NextRequest) {
  try {
    const { appointmentId } = await req.json();

    const [result] = await pool.query(
      `
      UPDATE appointments
      SET status = ?
      WHERE appointment_id = ?;
    `,
      ["Paid", appointmentId],
    );

    const [rows] = await pool.query<RowDataPacket[]>(
      `
       SELECT file_id
       FROM appointments
       WHERE appointment_id = ?;
    `,
      [appointmentId],
    );

    const fileId = rows.length > 0 ? rows[0].file_id : null;

    console.log("Query result:", result);

    return NextResponse.json({ appointmentId, fileId }, { status: 200 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 },
    );
  }
}
