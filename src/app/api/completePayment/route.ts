import pool from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function POST(req: NextRequest) {
  try {
    const { serviceId, appointmentId } = await req.json();

    const connection = await pool.getConnection();

    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT quote_amount FROM service_details WHERE service_details_id = ?;",
      [serviceId],
    );

    connection.release();

    if (rows.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const price = rows[0].quote_amount;

    console.log(price);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, // Stripe expects the amount to be in cents
      currency: "usd", // Use the appropriate currency
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { appointmentId },
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
