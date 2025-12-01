import { useRef, useEffect } from "react";

export default function Player({ song }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && song.file) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => console.log("Autoplay bloqueado"));
      }
    }
  }, [song]);

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] text-white p-4 shadow-lg flex items-center gap-4 z-50">
      <img src={song.cover} alt={song.title} className="w-14 h-14 rounded-md object-cover" />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{song.title}</h3>
        <p className="text-sm text-gray-300">{song.artist}</p>
      </div>
      <audio ref={audioRef} controls src={song.file} className="w-64" />
    </div>
  );
}
