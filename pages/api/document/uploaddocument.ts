import { PrismaClient } from "@prisma/client";
import multer, {  } from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// Directory for uploads
const uploadDir = path.join(process.cwd(), "/public/uploads/pdf");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Middleware for file upload
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const uploadMiddleware = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  upload.single("pdf")(req, res, (err: unknown) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err instanceof Error ? err.message : "File upload failed" });
    }
    next();
  });
};

// API handler
export default async function handler(
  req: NextApiRequest & { file?: multer.File },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Handle PDF upload and Document creation
    return uploadMiddleware(req, res, async () => {
      try {
        const { name, divisionId }: { name: string; divisionId: string } = req.body;
        const uploadedFile = req.file;

        if (!name || !uploadedFile || !divisionId) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const pdfPath = `/uploads/pdf/${uploadedFile.filename}`;
        const divisionIdNumber = parseInt(divisionId, 10);

        if (isNaN(divisionIdNumber)) {
          return res.status(400).json({ error: "Invalid divisionId" });
        }

        const document = await prisma.document.create({
          data: {
            name,
            pdfPath,
            divisionId: divisionIdNumber,
          },
        });

        return res.status(200).json(document);
      } catch (error) {
        console.error("Error creating document:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else if (req.method === "DELETE") {
    // Handle Document deletion
    try {
      const { documentId } = req.query;

      if (!documentId || isNaN(Number(documentId))) {
        return res.status(400).json({ error: "Document ID is required" });
      }

      const deletedDocument = await prisma.document.delete({
        where: { id: Number(documentId) },
      });

      // Optionally delete the uploaded PDF file from the server
      const filePath = path.join(uploadDir, path.basename(deletedDocument.pdfPath));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(200).json({ message: "Document deleted successfully", document: deletedDocument });
    } catch (error) {
      console.error("Error deleting document:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
