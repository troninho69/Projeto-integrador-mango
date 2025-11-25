import { useState } from "react";
import axios from "axios";

export default function AddMusic() {
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [artist, setArtist] = useState("");

  const uploadSong = async () => {
    const formData = new FormData();
    formData.append("file", file);
    if (cover) formData.append("cover", cover);
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("artist", artist);

    await axios.post("http://localhost:3000/songs/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Música enviada!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Adicionar Música</h2>

      <input
        type="text"
        placeholder="Título"
        className="border p-2 mb-2 block"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Artista"
        className="border p-2 mb-2 block"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        type="text"
        placeholder="Duração (ex: 3:25)"
        className="border p-2 mb-2 block"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />


      <label className="block mt-4">Arquivo de Música (MP3)</label>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <label className="block mt-4">Capa da Música (Imagem)</label>
      <input type="file" onChange={(e) => setCover(e.target.files[0])} />

      <button
        onClick={uploadSong}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded cursor-pointer"
      >
        Enviar
      </button>
    </div>
  );
}
