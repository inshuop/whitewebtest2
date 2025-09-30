import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { File as MulterFile } from "multer";

const prisma = new PrismaClient();

// Multer configuration for file upload
const uploadDir = path.join(process.cwd(), "/public/uploads/team");

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
  upload.single("image")(req, res, (err: unknown) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err instanceof Error ? err.message : "File upload failed" });
    }
    next();
  });
};

// Main handler for the API endpoint
// Main handler for the API endpoint
export default async function handler(
  req: NextApiRequest & { file?: MulterFile },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Use the uploadMiddleware to handle the file upload before proceeding with the rest of the request
    return uploadMiddleware(req, res, async () => {
      try {
        // Log request body and file data for debugging
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);

        // Extract the team member data, the uploaded file, and the new "divisionId" from the form data
        const { name, designation, experience, divisionId }: { name: string; designation: string; experience: string; divisionId: string } = req.body;
        const uploadedFile = req.file;

        if (!name || !designation || !experience || !uploadedFile || !divisionId) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const picture = `/uploads/team/${uploadedFile.filename}`;

        // Convert divisionId to a number
        const divisionIdNumber = parseInt(divisionId, 10);

        if (isNaN(divisionIdNumber)) {
          return res.status(400).json({ error: "Invalid divisionId" });
        }

        // Insert the team data into the database, including the divisionId to relate to the Division table
        const teamMember = await prisma.team.create({
          data: {
            name,
            designation,
            experience,
            picture, 
            divisionId: divisionIdNumber, // Link to the division
          },
        });

        return res.status(200).json(teamMember); // Respond with the created team member object
      } catch (error) {
        console.error("Error creating team member:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const { teamId } = req.query;

      if (!teamId) {
        return res.status(400).json({ error: "Team ID is required" });
      }

      const deletedTeamMember = await prisma.team.delete({
        where: {
          id: parseInt(teamId as string, 10), // Ensure it's treated as a number
        },
      });

      return res.status(200).json({ message: "Team member deleted successfully", teamMember: deletedTeamMember });
    } catch (error) {
      console.error("Error deleting team member:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

