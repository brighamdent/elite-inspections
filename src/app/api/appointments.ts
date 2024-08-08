import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { formattedDate } = req.body;

    try {
      // Get a connection from the pool
      const connection = await pool.getConnection();
      try {
        // Insert the appointment into the database
        await connection.execute("INSERT INTO appointments (date) VALUES (?)", [
          formattedDate,
        ]);

        res
          .status(200)
          .json({ message: "Appointment scheduled successfully!" });
      } finally {
        // Release the connection back to the pool
        connection.release();
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to schedule appointment." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
