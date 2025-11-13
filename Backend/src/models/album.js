import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Album extends Model {}

Album.init(
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

    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    coverUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Album",
    tableName: "albums",
    timestamps: true,
  }
);

export default Album;
