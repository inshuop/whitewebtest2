// /types/next.d.ts

import { NextApiRequest } from "next";

// Extend the NextApiRequest to include `file`
declare module "next" {
  interface NextApiRequest {
    file: Express.Multer.File; // Add the file property
  }
}
