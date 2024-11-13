import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { verifyAdmin } from "@/lib/authMiddleware";

export async function PUT(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);

  console.log("is running");
  console.log("Admin check result:", isAdmin);

  if (isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { serviceDetailsId, quoteAmount } = await req.json();

    console.log(serviceDetailsId, quoteAmount);

    try {
      const [result]: any = await pool.query(
        "UPDATE service_details SET quote_amount = ? WHERE service_details_id = ? ",
        [quoteAmount, serviceDetailsId],
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
  } finally {
  }
}
