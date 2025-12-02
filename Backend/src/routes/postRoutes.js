import express from "express";
import { upload } from "../config/multer.js";
import { createPost, getAllPosts } from "../controllers/controllerPost.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("postImage"), createPost);
router.get("/", getAllPosts);

export default router;
