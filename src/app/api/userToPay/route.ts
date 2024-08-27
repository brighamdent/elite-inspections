import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "UserId is required" }, { status: 400 });
  }

  try {
    const [appointments] = await pool.query<RowDataPacket[]>(
      `SELECT 
        appointment_id,
        DATE_FORMAT(scheduled_time, '%Y-%m-%d') AS date,
        DATE_FORMAT(scheduled_time, '%H:%i') AS time,
        role,
        contact_id,
        property_id,
        service_details_id
       FROM appointments 
       WHERE appointment_id = ?
       LIMIT 1;`,
      [userId],
    );

    if (appointments.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Retrieve the single appointment
    const appointment = appointments[0];

    // Fetch related data
    const [contactRows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM contacts WHERE contact_id = ?`,
      [appointment.contact_id],
    );
    const [propertyRows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM properties WHERE property_id = ?`,
      [appointment.property_id],
    );
    const [serviceDetailsRows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM service_details WHERE service_details_id = ?`,
      [appointment.service_details_id],
    );

    // Combine all data
    const appointmentData = {
      ...appointment,
      contact: contactRows[0] || null,
      property: propertyRows[0] || null,
      service_details: serviceDetailsRows[0] || null,
    };

    return NextResponse.json(appointmentData, { status: 200 });
  } catch (error) {
    console.error("Error during GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
