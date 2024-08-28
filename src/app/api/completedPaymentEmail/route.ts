import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { Readable } from "stream"; // Import Readable from stream

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

async function sendEmailWithAttachment(
  fileStream: Readable,
  fileName: string,
  recipient: string,
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: recipient,
    subject: "Download Your Inspection",
    text: `Hello

Thank you for choosing Elite Home Inspection Group. We appreciate your business and look forward to serving you again in the future.

Best regards,
John
Elite Home Inspection Group`,
    attachments: [
      {
        filename: fileName,
        content: fileStream,
        encoding: "base64",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { fileId, firstName, lastName, email } = await req.json();

    const response = await drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "stream" },
    );

    const fileStream = response.data as Readable;

    await sendEmailWithAttachment(
      fileStream,
      `${lastName}_inspection.pdf`,
      email,
    );

    return NextResponse.json(
      { message: "File sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
