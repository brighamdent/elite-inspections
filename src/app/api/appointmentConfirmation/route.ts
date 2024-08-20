import convertTo12Hour from "@/utils/convertTo12Hour";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const {
      date,
      selectedTime,
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
      subject: `Home Inspection Appointment Confirmation`,
      text: `Dear ${firstName} ${lastName},
We are pleased to confirm your home inspection appointment. Please find the details below:

Scheduled for:
${date.dayOfWeek}, ${date.monthName} ${date.day}, ${date.year} ${convertTo12Hour(selectedTime)}

Personal Details:
Name: ${firstName} ${lastName}
Phone Number: ${phoneNumber}
Email: ${emailAddress}

Property Details:
Address: ${address}
Total Finished Square Footage: ${finishedSqft}
Year Built: ${yearBuilt}
Foundation Type:${foundationType}
Beds: ${bedCount}
Baths: ${bathCount}
Notes: ${notes}

If you need to make any changes to your appointment details, please contact us at 555-555-555 or email us at businessemail@gmail.com.

Thank you for choosing Elite Home Inspection Group!

Best regards,
Elite Home Inspection Group`,
    };

    await transporter.sendMail(mailOptions);

    const mailOptionsCompany = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Home Inspection Appointment - ${firstName} ${lastName}`,
      text: `A new home inspection appointment has been scheduled. Please find the details below:

Scheduled for:
${date.dayOfWeek}, ${date.monthName} ${date.day}, ${date.year} ${convertTo12Hour(selectedTime)}

Personal Details:
Name: ${firstName} ${lastName}
Phone Number: ${phoneNumber}
Email: ${emailAddress}

Property Details:
Address: ${address}
Total Finished Square Footage: ${finishedSqft}
Year Built: ${yearBuilt}
Foundation Type: ${foundationType}
Beds: ${bedCount}
Baths: ${bathCount}
Notes: ${notes}

Please review the appointment details and prepare accordingly.

Best regards,
Elite Home Inspection Group`,
    };

    await transporter.sendMail(mailOptionsCompany);
    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
