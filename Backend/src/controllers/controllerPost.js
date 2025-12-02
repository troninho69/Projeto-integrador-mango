import Post from "../models/post.js";
import User from "../models/user.js";

export async function createPost(req, res) {
  try {
    const { text } = req.body;

    const newPost = await Post.create({
      text,
      imageUrl: req.file ? `/uploads/posts/${req.file.filename}` : null,
      userId: req.user.id,
    });

    const fullPost = await Post.findByPk(newPost.id, {
      include: { model: User, attributes: ["id", "userName", "name", "photo"] }
    });

    res.status(201).json(fullPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function getAllPosts(req, res) {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "userName", "name", "photo"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
