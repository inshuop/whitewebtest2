import { NextApiRequest, NextApiResponse } from "next";
import { File } from "multer";
import { PrismaClient } from "@prisma/client";
import multer, {  } from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), "/public/uploads/product");

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

// Middleware for file uploads
import { NextHandler } from "next-connect";

const uploadMiddleware = (req: NextApiRequest & { files?: File[] }, res: NextApiResponse, next: NextHandler) => {
  upload.array("pictures", 10)(req, res, (err: unknown) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err instanceof Error ? err.message : "File upload failed" });
    }
    next();
  });
};

export default async function handler(
  req: NextApiRequest & { files?: File[] },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return uploadMiddleware(req, res, async () => {
      try {
        const { title, divisionId, phone, email,description }: { title: string; divisionId: string; phone: string; email: string , description: string, } = req.body;

        const uploadedFiles = req.files;
        if (!title || !divisionId || !phone || !email || !uploadedFiles || uploadedFiles.length === 0) {
          return res.status(400).json({ error: "Missing required fields or no files uploaded" });
        }

        const picturePaths = uploadedFiles.map((file: File) => `/uploads/product/${file.filename}`);
        const divisionIdNumber = parseInt(divisionId, 10);

        if (isNaN(divisionIdNumber)) {
          return res.status(400).json({ error: "Invalid divisionId" });
        }

        // Create product entries
        await prisma.product.createMany({
          data: picturePaths.map((picturePath) => ({
            title,
            divisionId: divisionIdNumber,
            phone,
            email,
            pictures: picturePath,
            description,
          })),
        });

        const createdProducts = await prisma.product.findMany({
          where: { divisionId: divisionIdNumber },
        });

        return res.status(200).json(createdProducts);
      } catch (error) {
        console.error("Error creating products:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const { productId } = req.query;

      if (!productId || isNaN(Number(productId))) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const deletedProduct = await prisma.product.delete({
        where: { id: Number(productId) },
      });

      const filePath = path.join(uploadDir, path.basename(deletedProduct.pictures));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
