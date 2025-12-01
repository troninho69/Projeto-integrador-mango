import Music from "../models/music.js";

export async function seedMusics() {
  await Music.bulkCreate([
    {
      title: "The Man Who Sold The World",
      artist: "Nirvana",
      duration: "4:18",
      cover: "covers/Theman.jpg",
      path: "musics/Theman.mp3",
    },
  ]);

  console.log("✔ Seed de músicas executado!");
}
