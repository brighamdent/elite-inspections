import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // Use read-only scope for downloading
});

const drive = google.drive({ version: "v3", auth });

export async function GET(req: NextRequest) {
  try {
    const fileId = req.nextUrl.searchParams.get("fileId");
    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 },
      );
    }

    // Fetch the file from Google Drive
    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" },
    );

    const fileStream = response.data as Readable;

    // Convert the fileStream to a format compatible with NextResponse
    const readableStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Disposition": `attachment; filename="inspection.pdf"`,
        "Content-Type": "application/pdf", // Adjust MIME type based on file type
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 },
    );
  }
}
