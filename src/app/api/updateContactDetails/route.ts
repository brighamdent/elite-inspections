import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();
  try {
    const {
      role,
      appointment_id,
      contact_id,
      first_name,
      last_name,
      phone_number,
      email,
      property_id,
      address,
      total_finished_square_feet,
      year_built,
      foundation_type,
      beds,
      baths,
      notes,
    } = await req.json();

    try {
      // Start a transaction
      await connection.beginTransaction();

      // Insert a new contact
      const [contactResult]: any = await connection.execute(
        "UPDATE contacts SET first_name = ?, last_name = ?, phone_number = ?, email = ? WHERE contact_id = ?",
        [first_name, last_name, phone_number, email, contact_id],
      );
      const contactId = contactResult.insertId;

      // Insert a new property
      const [propertyResult]: any = await connection.execute(
        "UPDATE properties SET address = ? , total_finished_square_feet = ?, year_built = ?, foundation_type = ?, beds = ?, baths = ?, notes = ? WHERE property_id = ? ",
        [
          address,
          total_finished_square_feet,
          year_built,
          foundation_type,
          beds,
          baths,
          notes,
          property_id,
        ],
      );
      const propertyId = propertyResult.insertId;

      // Insert a new appointment using the contact and property IDs
      await connection.execute(
        "UPDATE appointments SET role = ? WHERE appointment_id = ?",
        [role, appointment_id],
      );

      // Commit the transaction
      await connection.commit();
      connection.release();
      return NextResponse.json(
        { message: "Appointment scheduled successfully!" },
        { status: 200 },
      );
    } catch (error) {
      connection.release();
      console.error("Database Error:", error);
      return NextResponse.json(
        { message: "Failed to schedule appointment." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Request Error:", error);
    return NextResponse.json(
      { message: "Failed to process request." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}
