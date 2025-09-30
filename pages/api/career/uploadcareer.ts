import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        department,
        divisionId,
        location,
        jobTitle,
        totalVacancy,
        jobType,
        gender,
        experience,
        detail,
        applyBy,
        status,
      } = req.body;

      // Validate input
      if (
        !department ||
        !divisionId ||
        !location ||
        !jobTitle ||
        !totalVacancy ||
        !jobType ||
        !gender ||
        !experience ||
        !detail ||
        !applyBy ||
        !status
      ) {
        return res.status(400).json({
          error: "All fields are required and must be properly formatted.",
        });
      }

      // Create a new career entry
      const newCareer = await prisma.career.create({
        data: {
          department,
          divisionId: Number(divisionId),
          location,
          jobTitle,
          totalVacancy: Number(totalVacancy),
          jobType,
          gender,
          experience,
          detail,
          applyBy: new Date(applyBy),
          status,
        },
      });

      return res.status(200).json({
        message: "Career entry created successfully.",
        career: newCareer,
      });
    } catch (error) {
      console.error("Error creating career entry:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else if (req.method === "DELETE") {
    try {
      const { careerId } = req.query;

      // Validate and parse career ID
      if (!careerId || isNaN(Number(careerId))) {
        return res.status(400).json({ error: "Valid career ID is required." });
      }

      // Delete the career entry
      const deletedCareer = await prisma.career.delete({
        where: { id: Number(careerId) },
      });

      return res.status(200).json({
        message: "Career entry deleted successfully.",
        career: deletedCareer,
      });
    } catch (error) {
      console.error("Error deleting career entry:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed.`);
  }
}
