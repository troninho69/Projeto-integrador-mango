import { useRef, useEffect, useState } from "react";
import "./Player.css";

export default function Player({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current && song?.file) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Autoplay bloqueado"));
      }
    }
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const val = e.target.value;
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] text-white p-4 shadow-lg flex items-center gap-4 z-50">

      {/* Capa */}
      <img
        src={song.cover}
        alt={song.title}
        className="w-16 h-16 rounded-md object-cover"
      />

      {/* Infos */}
      <div className="flex-1">
        <h3 className="font-bold text-lg truncate">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>

        {/* Barra de progresso */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 accent-[#ffffff]"
          />

          <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Botão Play/Pause */}
      <button
        onClick={togglePlay}
        className="bg-[#ffffff] hover:bg-[#ffffff] transition p-3 rounded-full"
      >
        {isPlaying ? (
          /* Ícone de pause */
          <svg width="22" height="22" fill="#000" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14"></rect>
            <rect x="14" y="5" width="4" height="14"></rect>
          </svg>
        ) : (
          /* Ícone de play */
          <svg width="22" height="22" fill="#000" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* TAG DE ÁUDIO OCULTA */}
      <audio
        ref={audioRef}
        src={song.file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        className="hidden"
      />
    </div>
  );
}
