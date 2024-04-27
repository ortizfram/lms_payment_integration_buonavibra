import multer from "multer"
import path from "path"

const __dirname = path.resolve();

// Multer storage configuration for both images and videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = file.mimetype.startsWith("video") ? "videos" : "imgs";
    cb(null, path.join(__dirname, "uploads", uploadPath));
  },
  filename: function (req, file, cb) {
    const prefix = file.mimetype.startsWith("video") ? "video" : "image";
    cb(null, prefix + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });



export default upload;
