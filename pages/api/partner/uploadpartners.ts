import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// Multer configuration for file upload
const uploadDir = path.join(process.cwd(), "/public/uploads/partner");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer disk storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir); // Upload to public/uploads folder
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename based on timestamp
  },
});

// Create the upload middleware using multer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (_req, file, cb) => {
    // Allow only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Disable the default Next.js body parser for this API
export const config = {
  api: {
    bodyParser: false, // Body parser is disabled to allow for file uploads
  },
};

// Custom middleware to handle the file upload process
import { NextHandler } from "next-connect";

const uploadMiddleware = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  upload.single("image")(req, res, (err: unknown) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err instanceof Error ? err.message : "File upload failed" });
    }
    next();
  });
};

// Main handler for the API endpoint
export default async function handler(
  req: NextApiRequest & { file?: import("multer").File },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Use the uploadMiddleware to handle the file upload before proceeding with the rest of the request
    return uploadMiddleware(req, res, async () => {
      try {
        // Extract the partner data and uploaded file
        const { name, url, divisionId, partnerGroupId }: { name: string; url: string; divisionId: string; partnerGroupId: string } = req.body;
        const uploadedFile = req.file;

        if (!name || !url || !uploadedFile || !divisionId || !partnerGroupId) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const picture = `/uploads/partner/${uploadedFile.filename}`;

        // Convert divisionId and partnerGroupId to numbers
        const divisionIdNumber = parseInt(divisionId, 10);
        const partnerGroupIdNumber = parseInt(partnerGroupId, 10);

        if (isNaN(divisionIdNumber) || isNaN(partnerGroupIdNumber)) {
          return res.status(400).json({ error: "Invalid divisionId or partnerGroupId" });
        }

        // Insert the partner data into the database, including the divisionId and partnerGroupId
        const partner = await prisma.partner.create({
          data: {
            name,
            url,
            picture,
            divisionId: divisionIdNumber, // Link to the division
            partnerGroupId: partnerGroupIdNumber, // Link to the partner group
          },
        });

        return res.status(200).json(partner); // Respond with the created partner object
      } catch (error) {
        console.error("Error creating partner:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const { partnerId } = req.query;

      if (!partnerId || isNaN(Number(partnerId))) {
        return res.status(400).json({ error: "Partner ID is required" });
      }

      const deletedPartner = await prisma.partner.delete({
        where: { id: Number(partnerId) },
      });

      return res.status(200).json({ message: "Partner deleted successfully", partner: deletedPartner });
    } catch (error) {
      console.error("Error deleting partner:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
