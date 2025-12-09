import express from "express";
import { upload } from "../config/multer.js";
import { createPost, getAllPosts } from "../controllers/controllerPost.js";
import authMiddleware from "../middleware/auth.js";
import { deletePost } from "../controllers/controllerPost.js";
import { updatePost } from "../controllers/controllerPost.js";




const router = express.Router();

router.post("/", authMiddleware, upload.single("postImage"), createPost);
router.get("/", getAllPosts);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, upload.single("postImage"), updatePost);

export default router;
