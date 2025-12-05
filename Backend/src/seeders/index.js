import { createDatabase } from "../config/createDatabase.js";
import sequelize from "../config/database.js";


import "../models/user.js";
import "../models/music.js";
import "../models/post.js";
import "../models/like.js";
import "../models/associations.js";

// Importar as funções dos seeders
import { seedMusics } from "./20251201001853-musicas.js";
import { seedUsers } from "./20251201135011-users.js";
import { seedPosts } from "./20251202125332-posts.js";

async function run() {
  try {
    await createDatabase();
    await sequelize.authenticate();
    console.log("Conectado ao banco para rodar seeders!");

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await sequelize.sync({ force: true });
    console.log("✔ Banco recriado.");

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    // Rodar seeders na ordem correta
    await seedUsers();
    await seedMusics();
    await seedPosts();

    console.log("✔ TODOS os seeders foram executados!");
    process.exit(0);
  } catch (err) {
    console.error("Erro ao executar seeders:", err);
    process.exit(1);
  }
}

run();
