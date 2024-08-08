// src/app/api/appointments/route.ts

import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { formattedDate } = await req.json();
    const connection = await pool.getConnection();

    try {
      await connection.execute(
        "INSERT INTO appointments (appointment_time) VALUES (?)",
        [formattedDate],
      );
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
