import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function PUT(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  try {
    const { formattedDate, appointmentId } = await req.json();
    console.log(formattedDate, appointmentId);

    await pool.query(
      `
UPDATE appointments SET scheduled_time = ? WHERE appointment_id = ?;
`,
      [formattedDate, appointmentId],
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
}
