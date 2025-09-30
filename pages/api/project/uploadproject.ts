import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// Multer configuration for file upload
const uploadDir = path.join(process.cwd(), "/public/uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize Multer with storage
const upload = multer({ storage });

// Disable body parsing for multer to handle the request
export const config = {
  api: {
    bodyParser: false,
  },
};

// Middleware to handle the file upload
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadMiddleware = (req: any, res: any, next: any) => {
  upload.single("image")(req, res, (err: unknown) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ error: "File upload failed" });
    }
    next();
  });
};

// The API handler function
export default async function handler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: NextApiRequest & { file?: any },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Use the uploadMiddleware to handle the file upload before proceeding with the rest of the request
    console.log('test')
  
    return uploadMiddleware(req, res, async () => {
      try {

       
        // Extract fields from form data
        const {
          title,
          description,
          location,
          client,
          contractor,
          consultant,
          scope,
          period,
          isIconicProject,
          isCompleted,
          isOngoing,
          divisionId,
          
        }: {
          title: string;
          description: string;
          location: string;
          client: string;
          contractor: string;
          consultant: string;
          scope: string;
          period: string;
          isIconicProject: string;
          isCompleted: string;
          isOngoing: string;
          divisionId: string;
        } = req.body;

        const uploadedFile = req.file;
   
        // Validate the presence of required fields and uploaded file
        if (!title || !description || !uploadedFile || !location || !client || !contractor || !consultant || !scope || !period) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const picture = `/uploads/${uploadedFile.filename}`;

        

        // Insert the project data into the database
        const project = await prisma.project.create({
          data: {
            title,
            description,
            location,
            client,
            contractor,
            consultant,
            scope,
            period,
            isIconicProject,
            isCompleted,
            isOngoing,
            picture,
            divisionId: Number(divisionId), // Store the URL of the uploaded image
          },
        });

        return res.status(200).json(project); // Respond with the created project object
      } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const { projectId } = req.query;

      if (!projectId) {
        return res.status(400).json({ error: "Project ID is required" });
      }

      const deletedProject = await prisma.project.delete({
        where: {
          id: Number(projectId), // Ensure it's treated as a number
        },
      });

      return res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
    } catch (error) {
      console.error("Error deleting project:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
