import User from "./user.js";
import Music from "./music.js";
import Post from "./post.js";
import Like from "./like.js";
import Follow from "./follow.js";

// Auto-relacionamento: usuários seguindo outros usuários
User.belongsToMany(User, {
  as: "seguindo", 
  through: Follow, 
  foreignKey: "followerId",
  otherKey: "followedId",
});

User.belongsToMany(User, {
  as: "seguidores", 
  through: Follow,
  foreignKey: "followedId", 
  otherKey: "followerId",
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
