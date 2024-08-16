// src/app/api/appointments/route.ts

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
    } = await req.json();
    const formattedDate = `${date.year}-${date.month}-${date.day} ${selectedTime}`;
    console.log(selectedTime);
    const connection = await pool.getConnection();
    console.log(
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
    );

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

      // Insert a new appointment using the contact and property IDs
      await connection.execute(
        "INSERT INTO appointments (scheduled_time, role, contact_id, property_id) VALUES (?, ?, ?, ?)",
        [formattedDate, person, contactId, propertyId],
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
  const date = req.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  try {
    const [rows] = await pool.query(
      "SELECT DATE_FORMAT(appointment_time, '%H:%i') as time FROM appointments WHERE DATE(appointment_time) = ?",
      [date],
    );
    console.log("Query results:", rows);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error during GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 },
    );
  }
}
