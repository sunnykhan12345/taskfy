import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import User from "../models/user.js";

// Multer config (store file in memory)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Upload avatar controller
export const UploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    if (!req.file.mimetype.startsWith("image/"))
      return res.status(400).json({ message: "Only image files allowed" });

    if (req.file.size > 2 * 1024 * 1024)
      return res.status(400).json({ message: "File too large" });

    // Wrap Cloudinary upload_stream in a promise
    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "avatars", width: 200, height: 200, crop: "fill" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

    const result = await uploadToCloudinary();

    // Update user's avatar in DB
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: result.secure_url },
      { new: true }
    );

    res.status(200).json({ success: true, avatar: result.secure_url, user });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};
