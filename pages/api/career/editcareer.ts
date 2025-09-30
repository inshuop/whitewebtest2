import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { careerId } = req.query;

  if (req.method === "PUT") {
    try {
      const updatedCareer = await prisma.career.update({
        where: { id: Number(careerId) },
        data: req.body,
      });

      res.status(200).json({ career: updatedCareer });
    } catch (error) {
      console.error("Error updating career:", error);
      res.status(500).json({ error: "Failed to update career." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
