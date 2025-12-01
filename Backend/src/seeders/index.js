import sequelize from "../config/database.js";
import "./20251201001853-musicas.js";

async function run() {
  try {
    await sequelize.sync({ force: true });
    console.log("✔ Banco recriado.");

    console.log("✔ Seeders executados com sucesso.");
    process.exit(0);
  } catch (err) {
    console.error("Erro ao executar seeders:", err);
    process.exit(1);
  }
}

run();
