import express from "express";
import { User, Music, Like } from "../models/associations.js";


const router = express.Router();

// ❤️ CURTIR
router.post("/like", async (req, res) => {
  const { userId, musicId } = req.body;

  try {
    await Like.findOrCreate({ where: { userId, musicId } });
    res.json({ liked: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 💔 DESCURTIR
router.post("/unlike", async (req, res) => {
  const { userId, musicId } = req.body;

  try {
    await Like.destroy({ where: { userId, musicId } });
    res.json({ liked: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❓ VERIFICAR SE JÁ CURTIU
router.get("/liked/:userId/:musicId", async (req, res) => {
  const { userId, musicId } = req.params;

  try {
    const like = await Like.findOne({ where: { userId, musicId } });
    res.json({ liked: !!like });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LISTAR MÚSICAS CURTIDAS PELO USUÁRIO
router.get("/liked-songs/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Music,
          as: "likedSongs",
          through: { attributes: [] }, // não mostrar a tabela intermediária
        },
      ],
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(user.likedSongs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
