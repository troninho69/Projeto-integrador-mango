import app from "./src/app.js";
import sequelize from "./src/config/database.js";

import "./src/models/user.js";
import "./src/models/music.js";
import "./src/models/album.js";
import "./src/models/associations.js";

const PORT = 3000;

async function startServer() {
  try {

    await sequelize.authenticate();
    console.log("Conectado ao banco!");

    app.listen(PORT, () => console.log("Servidor rodando!"));
  } catch (error) {
    console.error("Erro ao iniciar:", error);
  }
}

startServer();
