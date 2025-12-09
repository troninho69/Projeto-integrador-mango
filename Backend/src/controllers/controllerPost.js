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

export async function deletePost(req, res) {
  try {
    const postId = req.params.id;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    const isOwner = post.userId === req.user.id;
    const isAdmin = req.user.role === "admin";
    const isArtist = req.user.artist === true;

    if (!isOwner && !isAdmin && !isArtist) {
      return res.status(403).json({ error: "Sem permissão para deletar este post" });
    }

    await post.destroy();

    res.json({ message: "Post deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePost(req, res) {
  try {
    const postId = req.params.id;

    const post = await Post.findByPk(postId);

    if (!post) return res.status(404).json({ error: "Post não encontrado" });

    const isOwner = post.userId === req.user.id;
    const isAdmin = req.user.role === "admin";
    const isArtist = req.user.artist === true;

    if (!isOwner && !isAdmin && !isArtist) {
      return res.status(403).json({ error: "Sem permissão para editar" });
    }

    const { text } = req.body;

    if (text) post.text = text;
    if (req.file) post.imageUrl = `/uploads/posts/${req.file.filename}`;

    await post.save();

    const updated = await Post.findByPk(post.id, {
      include: { model: User, attributes: ["id", "userName", "name", "photo"] },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


