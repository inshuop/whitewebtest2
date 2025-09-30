import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// Multer configuration for file upload
const uploadDir = path.join(process.cwd(), "/public/uploads/division");

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadMiddleware = (req: any, res: any, next: any) => {
  upload.single("picture")(req, res, (err: unknown) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err instanceof Error ? err.message : "File upload failed" });
    }
    next();
  });
};

// Main handler for the API endpoint
export default async function handler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: NextApiRequest & { file?: any },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Use the uploadMiddleware to handle the file upload before proceeding with the rest of the request
    return uploadMiddleware(req, res, async () => {
      try {
        // Extract fields and the uploaded file from the form data
        const { name, description, divisionUrl, email }: 
          { name: string; description: string; divisionUrl: string; email: string } = req.body;

        const uploadedFile = req.file;

        if (!name || !description || !divisionUrl || !email || !uploadedFile) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const picture = `/uploads/division/${uploadedFile.filename}`;

        // Insert the division data into the database
        const division = await prisma.division.create({
          data: {
            name,
            description,
            divisionUrl,
            email,
            picture, // Store the URL of the uploaded image
          },
        });

        return res.status(200).json(division); // Respond with the created division object
      } catch (error) {
        console.error("Error creating division:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const { divisionId } = req.query;

      if (!divisionId) {
        return res.status(400).json({ error: "Division ID is required" });
      }

      const deletedDivision = await prisma.division.delete({
        where: {
          id: parseInt(divisionId as string, 10), // Ensure it's treated as a number
        },
      });

      return res.status(200).json({ message: "Division deleted successfully", division: deletedDivision });
    } catch (error) {
      console.error("Error deleting division:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
