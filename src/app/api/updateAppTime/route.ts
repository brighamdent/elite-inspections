import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function PUT(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  const connection = await pool.getConnection();
  try {
    const { formattedDate, appointmentId } = await req.json();
    console.log(formattedDate, appointmentId);

    await connection.execute(
      `
UPDATE appointments SET scheduled_time = ? WHERE appointment_id = ?;
`,
      [formattedDate, appointmentId],
    );
    connection.release();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    connection.release();
    console.log(error);
  }
}
