import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  const now = new Date();
  const startOfTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  const connection = await pool.getConnection();

  try {
    const [appointments] = await connection.query<RowDataPacket[]>(
      `SELECT 
        appointment_id,
        DATE_FORMAT(scheduled_time, '%Y-%m-%d') AS date,
        DATE_FORMAT(scheduled_time, '%H:%i') AS time,
        role,
        contact_id,
        property_id,
        status
       FROM appointments 
       WHERE scheduled_time < ? 
       ORDER BY scheduled_time ASC;`,
      [startOfTomorrow],
    );

    if (appointments.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const appointmentData = await Promise.all(
      appointments.map(async (appointment) => {
        const [contactRows] = await connection.query<RowDataPacket[]>(
          `SELECT * FROM contacts WHERE contact_id = ?`,
          [appointment.contact_id],
        );
        const [propertyRows] = await connection.query<RowDataPacket[]>(
          `SELECT * FROM properties WHERE property_id = ?`,
          [appointment.property_id],
        );

        return {
          ...appointment,
          contact: contactRows[0] || null,
          property: propertyRows[0] || null,
        };
      }),
    );

    connection.release();
    return NextResponse.json(appointmentData, { status: 200 });
  } catch (error) {
    connection.release();
    console.error("Error during GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
