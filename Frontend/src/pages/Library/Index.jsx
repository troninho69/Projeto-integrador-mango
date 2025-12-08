import "./Library.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header/Index";
import Navbar from "../../components/Navbar/Index";
import Footer from "../../components/Footer/Index";

import Music from "../../components/Music/Index.jsx";
import Discoteca from "../../components/Discoteca/Index";
import Comunitycards from "../../components/Comunitycards/Index";
import Avaliacoes from "../../components/Avaliacoes";

function getCoverUrl(cover) {
  if (!cover) return "/default-music.jpg";

  // Se já vier com http, não mexe
  if (cover.startsWith("http")) return cover;

  // Se vier como "covers/xxx"
  if (cover.startsWith("covers/")) return `http://localhost:3000/${cover}`;

  // Se vier só o nome
  return `http://localhost:3000/covers/${cover}`;
}

export default function Library() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [likedIds, setLikedIds] = useState([]);

  // 🔹 Carregar músicas recentes + última ouvida
  useEffect(() => {
    if (!user?.id) return;

    const savedLast = localStorage.getItem(`lastPlayedSong_${user.id}`);
    if (savedLast) setLastPlayed(JSON.parse(savedLast));

    const savedList = localStorage.getItem(`recentSongs_${user.id}`);
    if (savedList) setRecentSongs(JSON.parse(savedList));
  }, [user]);

  // 🔹 Buscar músicas curtidas
  useEffect(() => {
    if (!user?.id) return;

    const fetchLikedSongs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/liked-songs/${user.id}`
        );

        const corrected = res.data.map((song) => ({
          ...song,
          cover: getCoverUrl(song.cover),
        }));

        console.log("LIKED SONGS:", corrected);

        setSongs(corrected);

        setLikedIds(corrected.map((s) => s.id));
      } catch (err) {
        console.error("Erro ao buscar músicas curtidas:", err);
      }
    };

    fetchLikedSongs();
  }, [user]);

  // 🔹 Curtir / Descurtir música
  const handleLike = async (musicId) => {
    if (!user?.id) return;

    try {
      const response = await axios.post("http://localhost:3000/like", {
        userId: user.id,
        musicId,
      });

      const liked = response.data.liked;

      if (liked) {
        setLikedIds((prev) => [...prev, musicId]);

        let addedSong =
          recentSongs.find((s) => s.id === musicId) ||
          songs.find((s) => s.id === musicId);

        if (addedSong) {
          // 🔥 Corrige a capa SEMPRE
          addedSong = {
            ...addedSong,
            cover: getCoverUrl(addedSong.cover),
          };

          setSongs((prev) => {
            if (prev.some((s) => s.id === musicId)) return prev;
            return [...prev, addedSong];
          });
        }
      } else {
        // descurtiu
        setLikedIds((prev) => prev.filter((id) => id !== musicId));
        setSongs((prev) => prev.filter((s) => s.id !== musicId));
      }
    } catch (error) {
      console.error("Erro ao curtir/descurtir:", error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="ml-32 md:ml-64 mt-[76px] p-8">
        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Escute novamente</h2>
            <p className="mb-6">Músicas que você já escutou</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSongs.length > 0 ? (
                recentSongs
                  .slice(0, 6)
                  .map((song) => (
                    <Music
                      key={song.id}
                      id={song.id}
                      titulo={song.title}
                      tempo={song.duration?.slice(0, 5) || "00:00"}
                      autor={song.artist}
                      img={song.cover}
                      liked={likedIds.includes(song.id)}
                      onLike={handleLike}
                    />
                  ))
              ) : (
                <p>Nenhuma música tocada ainda.</p>
              )}
            </div>
          </div>
        </div>

        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Favoritadas</h2>
            <p className="mb-6">Músicas que você curtiu</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {songs.length > 0 ? (
                songs
                  .slice(0, 6)
                  .map((song) => (
                    <Music
                      key={song.id}
                      id={song.id}
                      titulo={song.title}
                      tempo={song.duration?.slice(0, 5) || "00:00"}
                      autor={song.artist}
                      img={song.cover}
                      liked={likedIds.includes(song.id)}
                      onLike={handleLike}
                    />
                  ))
              ) : (
                <p>Você ainda não curtiu nenhuma música 🎵</p>
              )}
            </div>
          </div>
        </div>

        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <p className="mb-6">Veja as atividades recentes das comunidades</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Comunitycards titulo="eita" titulo1="nenem" />
              <Comunitycards titulo="a" titulo1="nenem" />
              <Comunitycards />
            </div>
          </div>
        </div>

        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">
              Comunidades que você participa
            </h2>
            <p className="mb-6">Músicas tocadas recentemente</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Discoteca />
              <Discoteca />
              <Discoteca />
            </div>
          </div>
        </div>

        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">
              Comunidades que você participa
            </h2>
            <p className="mb-6">Músicas tocadas recentemente</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Avaliacoes></Avaliacoes>
              <Avaliacoes></Avaliacoes>
              <Avaliacoes></Avaliacoes>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
