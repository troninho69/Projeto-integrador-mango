// config/multer.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "file") {
      cb(null, "uploads/musics/");
    } else if (file.fieldname === "cover") {
      cb(null, "uploads/covers/");
    } else if (file.fieldname === "postImage") {
      cb(null, "uploads/posts/");
    } else {
      cb(null, "uploads/others/"); // fallback opcional
    }
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });
