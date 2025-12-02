import Post from "../models/post.js";
import User from "../models/user.js";

export async function seedPosts() {
  // Buscar um usuário existente (por exemplo, o primeiro usuário da tabela)
  const user = await User.findOne();

  if (!user) {
    console.log("❌ Nenhum usuário encontrado! Rode o seedUsers primeiro.");
    return;
  }

  await Post.bulkCreate([
    {
      text: "A melhor cantora! 🎵🔥",
      imageUrl: "/uploads/posts/mita.jpg",
      userId: 3,
    },
    {
      text: "Curtindo umas músicas hoje! 😎🎧",
      imageUrl: null,
      userId: 2,
    },
    {
      text: "Vida de caipira não é facil...",
      imageUrl: null,
      userId: 3,
    }
  ]);

  console.log("✔ Seed de posts executado!");
}
