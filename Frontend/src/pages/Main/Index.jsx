import "./Main.css";

import { useEffect, useState } from "react";
import { getSongs } from "../../services/songService";

import Header from "../../components/Header/Index.jsx";
import Navbar from "../../components/Navbar/Index.jsx";
import Footer from "../../components/Footer/Index.jsx";

import Music from "../../components/Music/Index.jsx";
import Discoteca from "../../components/Discoteca/Index.jsx";
import Clipes from "../../components/Clipes/Index.jsx";

import Player from "../../components/Player/Index.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function getCoverUrl(cover) {
  if (!cover) return "/default-music.jpg";

  // SEED → já vem com "covers/arquivo.jpg"
  if (cover.startsWith("covers/")) {
    return `http://localhost:3000/${cover}`;
  }

  // UPLOAD → vem apenas "arquivo.jpg"
  return `http://localhost:3000/covers/${cover}`;
}

function getMusicUrl(path) {
  if (!path) return null;

  // SEED → já vem com "musics/arquivo.mp3"
  if (path.startsWith("musics/")) {
    return `http://localhost:3000/${path}`;
  }

  // UPLOAD → vem apenas "arquivo.mp3"
  return `http://localhost:3000/musics/${path}`;
}

export default function Secao() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [recentSongs, setRecentSongs] = useState([]);

  useEffect(() => {
    if (!user) return;
    const saved = JSON.parse(localStorage.getItem(`recentSongs_${user.id}`));
    if (saved) setRecentSongs(saved);
  }, [user]);

  useEffect(() => {
    getSongs().then((data) => setSongs(data));
  }, []);

  const handlePlay = (song) => {
    const playedSong = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      cover: getCoverUrl(song.cover),
      duration: song.duration,
    };

    // Atualiza player
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      cover: getCoverUrl(song.cover),
      file: getMusicUrl(song.path),
    });

    // Histórico local
    const history =
      JSON.parse(localStorage.getItem(`recentSongs_${user.id}`)) || [];

    const filtered = history.filter((s) => s.id !== playedSong.id);

    const updated = [playedSong, ...filtered];

    const limited = updated.slice(0, 20);

    localStorage.setItem(
      `recentSongs_${user.id}`,
      JSON.stringify(limited)
    );

    setRecentSongs(limited);
  };


  return (
    <>
      <Header />
      <Navbar />

      <div className="ml-32 md:ml-64 mt-[76px] p-8">
        <div className="max-w-6xl mx-auto">
          {/* ESCUTE NOVAMENTE */}
          <div className="text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Escute novamente</h2>
            <p className="mb-6">Músicas que em algum momento você escutou</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {songs.map((song) => (
              <Music
                key={song.id}
                titulo={song.title}
                tempo={song.duration?.slice(0, 5) || "00:00"}
                autor={song.artist}
                img={getCoverUrl(song.cover)}
                onClick={() => handlePlay(song)}
              />
            ))}
          </div>

          {/* DESCUBRA NOVAS MÚSICAS */}
          <div className="py-8">
            <div className="text-[#B15B3C] dark:text-white">
              <h2 className="text-3xl font-bold mb-1">
                Descubra Novas Músicas
              </h2>
              <p className="mb-6">
                Músicas recomendadas de acordo com seu gosto musical
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {songs.map((song) => (
                <Music
                  key={song.id + "-discover"}
                  titulo={song.title}
                  tempo={song.duration?.slice(0, 5)}
                  autor={song.artist}
                  img={getCoverUrl(song.cover)}
                  onClick={() => handlePlay(song)}
                />
              ))}
            </div>
          </div>

          {/* DISCOTECA DIGITAL */}
          <h2 className="text-3xl font-bold mb-6 text-[#B15B3C] dark:text-white">
            Discoteca Digital
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
              {songs.map((song) => (
                <Discoteca
                  key={song.id + "-disc"}
                  img={getCoverUrl(song.cover)}
                  titulo={song.title}
                  tempo={song.duration?.slice(0, 5)}
                  autor={song.artist}
                  onClick={() => handlePlay(song)}
                />
              ))}
            </div>
          </div>

          {/* FAVORITOS ANTIGOS */}
          <div className="text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Favoritos Antigos</h2>
            <p className="mb-6">Musicas que você escutava antigamente</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
              {songs.slice(0, 4).map((song) => (
                <Discoteca
                  key={song.id + "-old"}
                  titulo={song.title}
                  tempo={song.duration?.slice(0, 5)}
                  autor={song.artist}
                  img={getCoverUrl(song.cover)}
                  onClick={() => handlePlay(song)}
                />
              ))}
            </div>
          </div>

          {/* VIDEOCLIPES */}
          <div className="text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Videoclipes</h2>
            <p className="mb-6">
              Vídeoclipes de músicas relacionadas ao seu gosto musical
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {songs.map((song) => (
              <Clipes
                key={song.id + "-clip"}
                titulo={song.title}
                tempo={song.duration?.slice(0, 5)}
                autor={song.artist}
                img={getCoverUrl(song.cover)}
                onClick={() => handlePlay(song)}
              />
            ))}
          </div>
        </div>
      </div>
      {currentSong && <Player song={currentSong} />}
      <Footer />
    </>
    
  );
}
