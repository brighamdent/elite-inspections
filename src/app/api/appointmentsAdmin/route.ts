import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function GET(req: NextRequest) {
  console.log("hey I'm runnin");
  const isAdmin = await verifyAdmin(req);

  if (isAdmin !== true) {
    return isAdmin;
  }

  const year = req.nextUrl.searchParams.get("year");
  const month = req.nextUrl.searchParams.get("month");

  if (!year || !month) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
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
       WHERE YEAR(scheduled_time) = ? AND MONTH(scheduled_time) = ? 
       ORDER BY scheduled_time ASC;`,
      [year, month],
    );

    if (appointments.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const appointmentData = await Promise.all(
      appointments.map(async (appointment) => {
        console.log(appointment.service_details_id);
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

        return {
          ...appointment,
          contact: contactRows[0] || null,
          property: propertyRows[0] || null,
          service_details: serviceDetailsRows[0] || null,
        };
      }),
    );

    return NextResponse.json(appointmentData, { status: 200 });
  } catch (error) {
    console.error("Error during GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
