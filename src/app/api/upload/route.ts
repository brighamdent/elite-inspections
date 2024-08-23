import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { PassThrough } from "stream";

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);

// const SERVICE_ACCOUNT_FILE = path.resolve(
//   process.env.GOOGLE_CREDENTIALS_FILE_PATH || "",
// );

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID!;

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileMetadata = {
      name: file.name,
      parents: [FOLDER_ID],
    };

    // Convert Blob to Node.js Readable Stream
    const readableStream = file.stream();
    const passThrough = new PassThrough();
    readableStream.pipeTo(
      new WritableStream({
        write(chunk) {
          passThrough.write(Buffer.from(chunk));
        },
        close() {
          passThrough.end();
        },
      }),
    );

    const media = {
      body: passThrough,
      mimeType: file.type,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    return NextResponse.json({ fileId: response.data.id }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
