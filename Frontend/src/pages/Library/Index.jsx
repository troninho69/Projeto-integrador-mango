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

export default function Library() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);
  const [lastPlayed, setLastPlayed] = useState(null);

  // Carregar músicas recentes do usuário e última ouvida
  useEffect(() => {
    if (!user?.id) return;

    const savedLast = localStorage.getItem(`lastPlayedSong_${user.id}`);
    if (savedLast) setLastPlayed(JSON.parse(savedLast));

    const savedList = localStorage.getItem(`recentSongs_${user.id}`);
    if (savedList) setRecentSongs(JSON.parse(savedList));
  }, [user]);

  // Buscar músicas curtidas do usuário
  useEffect(() => {
    if (!user?.id) return;

    const fetchLikedSongs = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/liked-songs/${user.id}`);
        setSongs(res.data);
      } catch (err) {
        console.error("Erro ao buscar músicas curtidas:", err);
      }
    };

    fetchLikedSongs();
  }, [user]);

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
                recentSongs.map((song) => (
                  <Music
                    key={song.id}
                    titulo={song.title}
                    tempo={song.duration?.slice(0, 5) || "00:00"}
                    autor={song.artist}
                    img={song.cover}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {songs.length > 0 ? (
                songs.map((music) => <MusicCard key={music.id} music={music} />)
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
