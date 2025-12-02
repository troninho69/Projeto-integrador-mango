import User from "./user.js";
import Music from "./music.js";
import Album from "./album.js";
import Post from "./post.js";

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
  through: "user_song_likes", // tabela intermediária
  as: "likedSongs", // músicas que o usuário curtiu
  foreignKey: "userId",
});

Music.belongsToMany(User, {
  through: "user_song_likes",
  as: "likedBy", // usuários que curtiram essa música
  foreignKey: "songId",
});

// Um Álbum tem várias músicas
Album.hasMany(Music, {
  foreignKey: "albumId",
  as: "songs",
});

// Uma música pertence a um álbum
Music.belongsTo(Album, {
  foreignKey: "albumId",
  as: "album",
});

User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId" });
