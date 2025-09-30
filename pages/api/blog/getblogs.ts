// pages/api/blog/getblogs.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const blogs = await prisma.blog.findMany({
        distinct: ["id"],
        orderBy: { createdAt: "desc" },
      });
      console.log(blogs); // Log the blogs to check the fetched data
      return res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
