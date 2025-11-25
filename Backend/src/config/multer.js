// config/multer.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "file") {
      cb(null, "uploads/musics/");
    } else if (file.fieldname === "cover") {
      cb(null, "uploads/covers/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });
