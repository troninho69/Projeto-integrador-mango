import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Song extends Model {}

Song.init(
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

    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
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
    releaseDate: {
      type: DataTypes.DATEONLY, // apenas data (AAAA-MM-DD)
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
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
    modelName: "Song",
    tableName: "songs",
    timestamps: true,
  }
);

export default Song;
