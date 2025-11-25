import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Music extends Model {}

Music.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true, // música pode ser single
      references: {
        model: "albums",
        key: "id",
      },
    },

    duration: {
      type: DataTypes.TIME, // pode armazenar formato hh:mm:ss
      allowNull: false,
    },

    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // começa com 0 curtidas
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // começa com 0 visualizações
    },
  },
  {
    sequelize,
    modelName: "Music",
    tableName: "musics",
    timestamps: true,
  }
);

export default Music;
