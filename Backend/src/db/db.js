import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

const env = process.env.NODE_ENV || "development";
const configPath = path.resolve("./src/config/config.json");
const configJson = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const config = configJson[env];

/**
 * Função para criar o banco caso não exista
 */
async function criarBanco() {
  // Conecta sem selecionar banco
  const sequelizeTemp = new Sequelize("", config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });

  try {
    await sequelizeTemp.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
    console.log(`Banco '${config.database}' criado ou já existia.`);
  } catch (err) {
    console.error("Erro ao criar o banco:", err);
  } finally {
    await sequelizeTemp.close();
  }
}

// Cria o banco e depois conecta nele
await criarBanco();

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

export default sequelize;
