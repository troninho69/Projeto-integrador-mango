import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    req.user = user; // AGORA req.user está disponível nas rotas

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
