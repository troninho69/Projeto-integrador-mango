// src/config/database.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('mango_db', 'root', 'aluno', {
  host: 'localhost',
  dialect: 'mysql'
});

// Utilizado pela aplicação
export default sequelize;

// Utilizado pelo Sequelize CLI
export const development = {
  username: "root",
  password: "aluno",
  database: "mango_db",
  host: "localhost",
  dialect: "mysql"
};
