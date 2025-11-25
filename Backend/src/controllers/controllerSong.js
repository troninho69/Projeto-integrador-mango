import Music from "../models/music.js";
import fs from "fs";

export const uploadMusic = async (req, res) => {
  try {
    const { title, artist, duration } = req.body;

    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "Arquivo da música é obrigatório!" });
    }

    const fileName = req.files.file[0].filename;
    const coverName = req.files.cover ? req.files.cover[0].filename : null;

    const music = await Music.create({
      title,
      artist,
      duration,
      path: fileName,
      cover: coverName
    });

    res.status(201).json(music);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao fazer upload" });
  }
};

export const deleteMusic = async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) return res.status(404).json({ error: "Música não encontrada" });

    fs.unlinkSync("uploads/musics/" + music.path);
    if (music.cover)
      fs.unlinkSync("uploads/covers/" + music.cover);

    await music.destroy();
    res.json({ message: "Música deletada" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao deletar música" });
  }
};

export const getAllMusics = async (req, res) => {
  try {
    const baseUrl = "http://localhost:3000";

    const musics = await Music.findAll();

    const formatted = musics.map(m => ({
      ...m.dataValues,
      coverUrl: m.cover ? `${baseUrl}/covers/${m.cover}` : null,
      fileUrl: `${baseUrl}/musics/${m.path}`
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar músicas" });
  }
};

