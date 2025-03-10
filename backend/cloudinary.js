import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECERT,
});
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Carsystem",
    allowedforamt: ["png", "jpeg", "jpg"],
  },
});
export const upload = multer({ storage });
