import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { File as MulterFile } from "multer";

const prisma = new PrismaClient();  // Correctly instantiate PrismaClient
const uploadDir = path.join(process.cwd(), "/public/uploads/gallary");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed!"), false);
  },
});

export const config = {
  api: { bodyParser: false },
};

// Middleware to handle file uploads
import { NextHandler } from "next-connect";
const uploadMiddleware = (req: NextApiRequest & { files?: MulterFile[] }, res: NextApiResponse, next: NextHandler) => {
  upload.array("pictures", 10)(req, res, (err: unknown) => { // Allowing up to 10 files
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err instanceof Error ? err.message : "File upload failed" });
    }
    next();
  });
};

export default async function handler(
  req: NextApiRequest & { files?: MulterFile[] },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return uploadMiddleware(req, res, async () => {
      try {
        const { name, divisionId }: { name: string; divisionId: string } = req.body;

        // Ensure files are present
        const uploadedFiles = req.files;
        if (!name || !divisionId || !uploadedFiles || uploadedFiles.length === 0) {
          return res.status(400).json({ error: "Missing required fields or no files uploaded" });
        }

        const picturePaths = uploadedFiles.map((file: MulterFile) => `/uploads/gallary/${file.filename}`);
        const divisionIdNumber = parseInt(divisionId, 10);

        if (isNaN(divisionIdNumber)) {
          return res.status(400).json({ error: "Invalid divisionId" });
        }

        // Create gallery items
        await prisma.gallery.createMany({
          data: picturePaths.map((picturePath) => ({
            name,
            divisionId: divisionIdNumber,
            picture: picturePath,
          })),
        });

        // Fetch the newly created gallery items to return
        const createdGalleryItems = await prisma.gallery.findMany({
          where: { divisionId: divisionIdNumber }, // Optional: filter by divisionId if needed
        });

        return res.status(200).json(createdGalleryItems);
      } catch (error) {
        console.error("Error creating gallery items:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const { galleryId } = req.query;

      if (!galleryId || isNaN(Number(galleryId))) {
        return res.status(400).json({ error: "Gallery ID is required" });
      }

      const deletedGallery = await prisma.gallery.delete({
        where: { id: Number(galleryId) },
      });

      const filePath = path.join(uploadDir, path.basename(deletedGallery.picture));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(200).json({ message: "Gallery deleted successfully", gallery: deletedGallery });
    } catch (error) {
      console.error("Error deleting gallery:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
