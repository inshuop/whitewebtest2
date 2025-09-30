import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name } = req.body;

      // Validate the input
      if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Name is required and must be a string." });
      }

      // Insert the data into the database
      const newPartnerGroup = await prisma.partnerGroup.create({
        data: { name },
      });

      return res.status(200).json({
        message: "Partner group created successfully.",
        partnerGroup: newPartnerGroup,
      });
    } catch (error) {
      console.error("Error creating partner group:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else if (req.method === "DELETE") {
    try {
      const { projectId } = req.query;

      // Validate and parse project ID
      if (!projectId || isNaN(Number(projectId))) {
        return res.status(400).json({ error: "Valid project ID is required." });
      }

      // Delete the partner group
      const deletedPartnerGroup = await prisma.partnerGroup.delete({
        where: { id: Number(projectId) },
      });

      return res.status(200).json({
        message: "Partner group deleted successfully.",
        partnerGroup: deletedPartnerGroup,
      });
    } catch (error) {
      console.error("Error deleting partner group:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed.`);
  }
}
