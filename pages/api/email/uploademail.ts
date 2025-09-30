import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, divisionId, emailTo } = req.body;

      // Validate the input
      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Email is required and must be a string." });
      }
      if (!divisionId || typeof divisionId !== "number") {
        return res.status(400).json({ error: "Valid divisionId is required." });
      }

      // Convert emailTo to a string if it is a boolean
      let emailToString: string;
      if (typeof emailTo === "boolean") {
        emailToString = emailTo ? "true" : "false";
      } else if (typeof emailTo === "string") {
        emailToString = emailTo;
      } else {
        return res.status(400).json({ error: "EmailTo must be a string or a boolean." });
      }

      // Insert the data into the database
      const newCcEmail = await prisma.ccEmail.create({
        data: { email, divisionId, emailTo: emailToString },
      });

      return res.status(200).json({
        message: "CC Email created successfully.",
        ccEmail: newCcEmail,
      });
    } catch (error) {
      console.error("Error creating CC Email:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else if (req.method === "DELETE") {
    try {
      const { ccEmailId } = req.query;

      // Validate and parse CC Email ID
      if (!ccEmailId || isNaN(Number(ccEmailId))) {
        return res.status(400).json({ error: "Valid CC Email ID is required." });
      }

      // Delete the CC Email
      const deletedCcEmail = await prisma.ccEmail.delete({
        where: { id: Number(ccEmailId) },
      });

      return res.status(200).json({
        message: "CC Email deleted successfully.",
        ccEmail: deletedCcEmail,
      });
    } catch (error) {
      console.error("Error deleting CC Email:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed.`);
  }
}
