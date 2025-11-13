import User from "./user.js";
import Song from "./song.js";
import Album from "./album.js";

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
User.belongsToMany(Song, {
  through: "user_song_likes", // tabela intermediária
  as: "likedSongs", // músicas que o usuário curtiu
  foreignKey: "userId",
});

Song.belongsToMany(User, {
  through: "user_song_likes",
  as: "likedBy", // usuários que curtiram essa música
  foreignKey: "songId",
});

// Um Álbum tem várias músicas
Album.hasMany(Song, {
  foreignKey: "albumId",
  as: "songs",
});

// Uma música pertence a um álbum
Song.belongsTo(Album, {
  foreignKey: "albumId",
  as: "album",
});
