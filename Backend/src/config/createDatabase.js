import mysql from "mysql2/promise";

export async function createDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "aluno"
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS mango_db;`);
  console.log("Banco criado/verificado!");

  await connection.end();
}
