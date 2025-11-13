import express from "express";
import User from "../models/user.js";

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
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

    const senhaValida = await user.validarSenha(password);
    if (!senhaValida) return res.status(401).json({ error: "Senha incorreta." });

    // Se quiser, aqui pode gerar um token JWT
    return res.json({
      message: "Login bem-sucedido!",
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

export default router;
