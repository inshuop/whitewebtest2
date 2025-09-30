// pages/api/blog/getblogs/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Get the blog ID from the URL query

  if (req.method === "GET") {
    try {
      // Fetch a single blog by ID
      const blog = await prisma.project.findUnique({
        where: {
          id: Number(id), // Ensure the ID is in the correct format (String)
        },
      });

      if (!blog) {
        return res.status(404).json({ error: "project not found" });
      }

      return res.status(200).json(blog); // Return the blog data
    } catch (error) {
      console.error("Error fetching project:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
