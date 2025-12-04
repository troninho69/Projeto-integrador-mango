import "./Library.css";
import { useAuth } from "../../context/AuthContext.jsx";




import { useEffect, useState } from "react";

import Header from "../../components/Header/Index";
import Navbar from "../../components/Navbar/Index";
import Footer from "../../components/Footer/Index";

import Music from "../../components/Music/Index.jsx";
import Discoteca from "../../components/Discoteca/Index";
import Artists from "../../components/Artists/Index";
import Comunitycards from "../../components/Comunitycards/Index";
import Avaliacoes from "../../components/Avaliacoes";

export default function Library() {
  const { user } = useAuth();
  const [recentSongs, setRecentSongs] = useState([]);
  const [lastPlayed, setLastPlayed] = useState(null);
  useEffect(() => {
    const savedLast = localStorage.getItem(`lastPlayedSong_${user.id}`);
    if (savedLast) {
      setLastPlayed(JSON.parse(savedLast));
    }

    const savedList = JSON.parse(localStorage.getItem(`recentSongs_${user.id}`));

    if (savedList) {
      setRecentSongs(savedList);
    }
  }, []);

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
                    onClick={() => handlePlay(song)}
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
            <h2 className="text-3xl font-bold mb-1">Atividade recente</h2>
            <p className="mb-6">Músicas tocadas recentemente</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Artists />
              <Artists />
              <Artists />
              <Artists />
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
