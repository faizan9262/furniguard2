import multer from "multer";
import streamifier from "streamifier";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only .jpg, .jpeg and .png formats are allowed"));
  },
});

export const uploadToCloudinary = (folder = "Melodify") => {
  return async (req, res, next) => {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ message: "No file provided" });
    }

    try {
      const uploadedImages = [];

      for (const file of req.files) {
        const stream = streamifier.createReadStream(file.buffer);

        const result = await new Promise((resolve, reject) => {
          const cloudinaryStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          stream.pipe(cloudinaryStream);
        });

        uploadedImages.push(result.secure_url);
      }

      req.images = uploadedImages; // 🔥 send URLs to controller
      next();
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      return res.status(500).json({ message: "Upload error" });
    }
  };
};

export default upload;
