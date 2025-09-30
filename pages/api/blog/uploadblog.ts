import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// Multer configuration for file upload
const uploadDir = path.join(process.cwd(), "/public/uploads/blog");

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
export default async function handler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: NextApiRequest & { file?: any },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Use the uploadMiddleware to handle the file upload before proceeding with the rest of the request
    return uploadMiddleware(req, res, async () => {
      try {
        // Extract title, description, and the uploaded file from the form data
        const { title, description }: { title: string; description: string } = req.body;
        const uploadedFile = req.file;

        if (!title || !description || !uploadedFile) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const picture = `/uploads/blog/${uploadedFile.filename}`;

        // Insert the project data into the database
        const post = await prisma.blog.create({
          data: {
            title,
            description,
            picture, // Store the URL of the uploaded image
          },
        });

        return res.status(200).json(post); // Respond with the created post object
      } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const { projectId } = req.query;

      if (!projectId) {
        return res.status(400).json({ error: "Project ID is required" });
      }

      const deletedPost = await prisma.blog.delete({
        where: {
          id: parseInt(projectId as string, 10), // Ensure it's treated as a number
        },
      });

      return res.status(200).json({ message: "Project deleted successfully", post: deletedPost });
    } catch (error) {
      console.error("Error deleting project:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
