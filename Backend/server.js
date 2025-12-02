import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import sequelize from "./src/config/database.js";
import express from "express";



import "./src/models/user.js";
import "./src/models/music.js";
import "./src/models/album.js";
import "./src/models/post.js";
import "./src/models/associations.js";

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco!");

    // Servir imagens (uploads)
    app.use("/uploads", express.static("uploads"));

    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (error) {
    console.error("Erro ao iniciar:", error);
  }
}

startServer();
