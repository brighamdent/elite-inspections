import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();

  const isAdmin = await verifyAdmin(req);

  console.log("Admin check result:", isAdmin);

  if (isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { service_details_id, description, amount } = await req.json();

    console.log(service_details_id, description, amount);

    try {
      const connection = await pool.getConnection();

      const [result]: any = await connection.execute(
        `INSERT INTO line_items (service_details_id, description, amount) VALUES (?, ? ?)`,
        [service_details_id, description, amount],
      );

      return NextResponse.json(
        { message: "Line Items Updated successfully" },
        { status: 200 },
      );
    } catch (error) {
      connection.release();
      console.error("Database Error:", error);
      return NextResponse.json(
        { message: "Failed to update line items." },
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

export async function PUT(req: NextRequest) {
  const connection = await pool.getConnection();

  const isAdmin = await verifyAdmin(req);

  console.log("Admin check result:", isAdmin);

  if (isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const {
      inspection_type,
      wind_mitigation,
      pool_inspection,
      four_point_inspection,
      quote_amount,
      service_details_id,
    } = await req.json();

    console.log(
      inspection_type,
      wind_mitigation,
      pool_inspection,
      four_point_inspection,
      quote_amount,
      service_details_id,
    );

    try {
      const connection = await pool.getConnection();

      const [serviceResult]: any = await connection.execute(
        "UPDATE service_details SET inspection_type = ? , wind_mitigation = ?, pool_inspection = ?, four_point_inspection = ?, quote_amount = ? WHERE service_details_id = ? ",
        [
          inspection_type,
          wind_mitigation,
          pool_inspection,
          four_point_inspection,
          quote_amount,
          service_details_id,
        ],
      );

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
