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
    // Handle single file
    if (req.file) {
      try {
        const stream = streamifier.createReadStream(req.file.buffer);

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

        req.file.path = result.secure_url; // ✅ used in your controller
        next();
      } catch (err) {
        console.error("Cloudinary Single Upload Error:", err);
        return res.status(500).json({ message: "Upload error" });
      }
    }

    // Handle multiple files
    else if (req.files && req.files.length) {
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

        req.images = uploadedImages; // ✅ use this in multi-image controller
        next();
      } catch (err) {
        console.error("Cloudinary Multiple Upload Error:", err);
        return res.status(500).json({ message: "Upload error" });
      }
    }

    // No file provided
    else {
      return res.status(400).json({ message: "No file provided" });
    }
  };
};


export default upload;
