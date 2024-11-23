import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  console.log("Admin check result:", isAdmin);

  if (isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { lineItemId, serviceDetailsId, description, amount } =
      await req.json();

    console.log(lineItemId, serviceDetailsId, description, amount);

    try {
      const [result]: any = await pool.query(
        `INSERT INTO line_items (line_item_id, service_details_id, description, amount) VALUES (?, ?, ?, ?)`,
        [lineItemId, serviceDetailsId, description, amount],
      );

      return NextResponse.json(
        { message: "Line Items Updated successfully" },
        { status: 200 },
      );
    } catch (error) {
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
  }
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  console.log("Admin check result:", isAdmin);

  if (isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { id, newQuote } = await req.json();

    console.log(id);

    try {
      const [serviceResult]: any = await pool.query(
        "DELETE FROM line_items WHERE line_item_id = ?;",
        [id],
      );

      return NextResponse.json(
        { message: "Line item deleted successfully!" },
        { status: 200 },
      );
    } catch (error) {
      console.error("Database Error:", error);
      return NextResponse.json(
        { message: "Failed to delete line item." },
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
  const isAdmin = await verifyAdmin(req);

  console.log("Admin check result:", isAdmin);

  if (isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { service_details_id } = await req.json();

    console.log(service_details_id);

    try {
      const [serviceResult]: any = await pool.query(
        "SELECT * FROM line_items WHERE line_item_id = ?",
        [service_details_id],
      );

      return NextResponse.json(
        {
          data: serviceResult[0],
          message: "Line items fetched successfully!",
        },
        { status: 200 },
      );
    } catch (error) {
      console.error("Database Error:", error);
      return NextResponse.json(
        { message: "Failed to fetch line item." },
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
