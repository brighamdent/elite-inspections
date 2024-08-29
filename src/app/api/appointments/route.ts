import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const {
      date,
      selectedTime,
      person,
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      address,
      finishedSqft,
      yearBuilt,
      foundationType,
      bedCount,
      bathCount,
      notes,
      inspectionType,
      quoteAmount,
      extraSqft,
      poolInspection,
      windMitigation,
    } = await req.json();
    const formattedDate = `${date.year}-${date.month}-${date.day} ${selectedTime}`;
    const connection = await pool.getConnection();

    try {
      // Start a transaction
      await connection.beginTransaction();

      // Insert a new contact
      const [contactResult]: any = await connection.execute(
        "INSERT INTO contacts (first_name, last_name, phone_number, email) VALUES (?, ?, ?, ?)",
        [firstName, lastName, phoneNumber, emailAddress],
      );
      const contactId = contactResult.insertId;

      // Insert a new property
      const [propertyResult]: any = await connection.execute(
        "INSERT INTO properties (address, total_finished_square_feet, year_built, foundation_type, beds, baths, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          address,
          finishedSqft,
          yearBuilt,
          foundationType,
          bedCount,
          bathCount,
          notes,
        ],
      );
      const propertyId = propertyResult.insertId;

      const [serviceDetailsResult]: any = await connection.execute(
        "INSERT INTO service_details (inspection_type, quote_amount, extra_sqft, pool_inspection, wind_mitigation) VALUES (?, ?, ?, ?,?)",
        [
          inspectionType,
          quoteAmount,
          extraSqft,
          poolInspection,
          windMitigation,
        ],
      );
      const serviceDetailsId = serviceDetailsResult.insertId;

      // Insert a new appointment using the contact and property IDs
      await connection.execute(
        "INSERT INTO appointments (scheduled_time, role, contact_id, property_id, status, service_details_id) VALUES (?, ?, ?, ?, ?,?)",
        [
          formattedDate,
          person,
          contactId,
          propertyId,
          "Awaiting Inspection",
          serviceDetailsId,
        ],
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
  }
}

export async function GET(req: NextRequest) {
  const connection = await pool.getConnection();
  const year = req.nextUrl.searchParams.get("year");
  const month = req.nextUrl.searchParams.get("month");

  if (!year || !month) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  try {
    const [rows] = await connection.query(
      "SELECT DATE_FORMAT(scheduled_time, '%Y-%m-%d %H:%i:%s') AS scheduled_time FROM appointments WHERE YEAR(scheduled_time) = ? AND MONTH(scheduled_time) = ?",
      [year, month],
    );

    console.log("Query results:", rows);

    connection.release();
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    connection.release();
    console.error("Error during GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 },
    );
  }
}
