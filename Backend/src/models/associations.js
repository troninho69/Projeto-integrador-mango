import User from "./user.js";
import Music from "./music.js";
import Post from "./post.js";
import Like from "./like.js";

// Auto-relacionamento: usuários seguindo outros usuários
User.belongsToMany(User, {
  as: "seguindo", // usuários que ESTE usuário segue
  through: "user_follows", // tabela intermediária
  foreignKey: "followerId", // coluna que representa quem segue
});

User.belongsToMany(User, {
  as: "seguidores", // usuários que seguem ESTE usuário
  through: "user_follows",
  foreignKey: "followedId", // coluna que representa quem é seguido
});

// Relacionamento entre: usuários curtindo musicas
User.belongsToMany(Music, {
  through: Like,
  as: "likedSongs",
  foreignKey: "userId",
  otherKey: "musicId",
});

Music.belongsToMany(User, {
  through: Like,
  as: "likedBy",
  foreignKey: "musicId",
  otherKey: "userId",
});

Like.belongsTo(User, { foreignKey: "userId" });
Like.belongsTo(Music, { foreignKey: "musicId" });

User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId" });

export { User, Music, Post, Like };
