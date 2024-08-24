import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { appointmentId, fileId } = await req.json();

    const [result] = await pool.query(
      `
      UPDATE appointments
      SET file_id = ?, status = ?
      WHERE appointment_id = ?;
    `,
      [fileId, "Awaiting Payment", appointmentId],
    );

    console.log("Query result:", result);

    return NextResponse.json({ appointmentId }, { status: 200 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 },
    );
  }
}
