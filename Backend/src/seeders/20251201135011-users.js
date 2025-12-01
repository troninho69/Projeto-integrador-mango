import bcrypt from "bcrypt";
import User from "../models/user.js";

export async function seedUsers() {
  const hashAdmin = await bcrypt.hash("admin", 10);
  const hashCamila = await bcrypt.hash("camila", 10);
  const hashLuiz = await bcrypt.hash("luiz", 10);
  await User.bulkCreate([
    {
      name: "admin",
      userName: "server",
      email: "admin@admin.com",
      password: hashAdmin,
      artist: true,
      role: "admin",
      dateBirth: "2000-01-01",
    },
    {
      name: "Camila alves",
      userName: "C4mel0",
      email: "camila@gmail.com",
      password: hashCamila,
      artist: false,
      role: "commonUser",
      dateBirth: "2000-01-01",
    },
    {
      name: "Luiz henrique",
      userName: "Troninho",
      email: "luiz@gmail.com",
      password: hashLuiz,
      artist: false,
      role: "commonUser",
      dateBirth: "2000-01-01",
    },
  ]);

  console.log("✔ Seed de usuários executado!");
}
