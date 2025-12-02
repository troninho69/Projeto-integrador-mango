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
    {
      title: "Let Down",
      artist: "Radiohead",
      duration: "4:59",

      cover: "covers/letdown.jpg",
      path: "musics/letdown.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "I'm Not In Love",
      artist: "10cc",
      duration: "3:59",

      cover: "covers/imnotinlove.jpg",
      path: "musics/imnotinlove.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      duration: "6:23",

      cover: "covers/nighto.jpg",
      path: "musics/bohemian.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "All Eyez On Me",
      artist: "2Pac",
      duration: "5:40",

      cover: "covers/alleyez.jpg",
      path: "musics/alleyez.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "I Wonder",
      artist: "Kanye West",
      duration: "4:29",

      cover: "covers/iwonder.jpg",
      path: "musics/iwonder.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Money Trees",
      artist: "Kendrick Lamar",
      duration: "7:11",

      cover: "covers/goodkid.jpg",
      path: "musics/moneytrees.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Californication",
      artist: "Red Hot Chili Peppers",
      duration: "5:22",

      cover: "covers/californication.jpg",
      path: "musics/californi.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "From the Start",
      artist: "Laufey",
      duration: "2:50",

      cover: "covers/fromthestart.jpg",
      path: "fromthestart.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Beat It",
      artist: "Michael Jackson",
      duration: "4:19",

      cover: "covers/beatit.jpg",
      path: "beatit.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✔ Seed de músicas executado!");
}
