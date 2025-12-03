import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "userName", "bio", "photo"],
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;

