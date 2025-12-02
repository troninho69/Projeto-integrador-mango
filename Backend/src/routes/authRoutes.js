import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import uploadProfile from "../config/multerProfille.js";

const router = express.Router();

// Rota de registro
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, userName, dateBirth } = req.body;

    // Validação básica
    if (!email || !password || !name || !userName || !dateBirth) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    // Verifica se já existe
    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: "Email já cadastrado!" });

    const novoUsuario = await User.create({
      email,
      password,
      name,
      userName,
      dateBirth,
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: {
        id: novoUsuario.id,
        email: novoUsuario.email,
        userName: novoUsuario.userName,
        name: novoUsuario.name,
      },
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ error: "Usuário não encontrado." });

    const senhaValida = await user.validarSenha(password);
    if (!senhaValida)
      return res.status(401).json({ error: "Senha incorreta." });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // token dura 7 dias
    );

    return res.json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        bio: user.bio,
        artist: user.artist,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

router.put("/photo/:id", uploadProfile.single("photo"), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    user.photo = `/uploads/profile/${req.file.filename}`;
    await user.save();

    return res.json({ photo: user.photo });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao salvar foto" });
  }
});

// Rota para atualizar a bio
router.put("/bio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { bio } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    user.bio = bio;
    await user.save();

    return res.json({ message: "Bio atualizada com sucesso!", bio: user.bio });
  } catch (error) {
    console.error("Erro ao atualizar bio:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Dar role de artista para um usuário
router.put("/make-artist/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    user.artist = true;
    await user.save();

    return res.json({ message: "Usuário agora é artista!", artist: true });
  } catch (error) {
    console.error("Erro ao atualizar role:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default router;
