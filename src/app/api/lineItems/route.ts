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
    const { lineItemId, serviceDetailsId, description, amount } =
      await req.json();

    console.log(lineItemId, serviceDetailsId, description, amount);

    try {
      const connection = await pool.getConnection();

      const [result]: any = await connection.execute(
        `INSERT INTO line_items (line_item_id, service_details_id, description, amount) VALUES (?, ?, ?, ?)`,
        [lineItemId, serviceDetailsId, description, amount],
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

export async function DELETE(req: NextRequest) {
  const connection = await pool.getConnection();

  const isAdmin = await verifyAdmin(req);

  console.log("Admin check result:", isAdmin);

  if (isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { id } = await req.json();

    console.log(id);

    try {
      const connection = await pool.getConnection();

      const [serviceResult]: any = await connection.execute(
        "DELETE FROM line_items WHERE line_item_id = ?",
        [id],
      );

      return NextResponse.json(
        { message: "Line item deleted successfully!" },
        { status: 200 },
      );
    } catch (error) {
      connection.release();
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
  } finally {
    connection.release();
  }
}
