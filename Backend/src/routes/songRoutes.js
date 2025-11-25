// routes/musicRoutes.js
import express from "express";
import { upload } from "../config/multer.js";
import Music from "../models/music.js";
import { getAllMusics } from "../controllers/controllerSong.js";

const router = express.Router();
router.get("/", getAllMusics);

router.post(
  "/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const music = await Music.create({
        title: req.body.title,
        artist: req.body.artist,
        duration: req.body.duration,
        userId: req.body.userId,
        path: req.files.file[0].filename,
        cover: req.files.cover ? req.files.cover[0].filename : null,
      });

      res.json(music);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao enviar música" });
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) return res.status(404).json({ error: "Música não encontrada" });

    fs.unlinkSync("uploads/musics/" + music.path);
    if (music.cover) fs.unlinkSync("uploads/covers/" + music.cover);

    await music.destroy();

    res.json({ message: "Música removida com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao remover música" });
  }
});

router.put(
  "/edit/:id",
  upload.fields([{ name: "cover", maxCount: 1 }]),
  async (req, res) => {
    try {
      const music = await Music.findByPk(req.params.id);

      if (!music)
        return res.status(404).json({ error: "Música não encontrada" });

      if (req.files.cover) {
        if (music.cover) fs.unlinkSync("uploads/covers/" + music.cover);

        music.cover = req.files.cover[0].filename;
      }

      music.title = req.body.title;
      music.artist = req.body.artist;
      music.duration = req.body.duration;

      await music.save();

      res.json(music);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao editar música" });
    }
  }
);

export default router;
