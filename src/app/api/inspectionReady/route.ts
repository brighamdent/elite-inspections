import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { appointmentId, firstName, lastName, emailAddress } =
      await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: emailAddress,
      subject: `Home Inspection Ready to View`,
      text: `Hello ${firstName},
Your inspection is ready to view and download please complete your payment using the link below. 

http://localhost:3000/payment?user=${appointmentId}

Thank you for choosing Elite Home Inspection Group!

Best regards,
John Howell
Elite Home Inspection Group`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
