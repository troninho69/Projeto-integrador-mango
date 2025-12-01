import { useEffect, useState } from "react";
import axios from "axios";

export default function EditMusic() {
  const [musics, setMusics] = useState([]);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3000/songs")
      .then((res) => setMusics(res.data));
  }, []);

  const updateMusic = async () => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("artist", selected.artist);
  formData.append("duration", duration);
  formData.append("cover", cover);

  await axios.put(
    `http://localhost:3000/songs/edit/${selected.id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  alert("Música atualizada!");
};
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editar Música</h2>

      <select
        className="border p-2"
        onChange={(e) => {
          const song = musics.find((m) => m.id == e.target.value);
          setSelected(song);
          setTitle(song.title);
          setDuration(song.duration);
        }}
      >
        <option>Selecione uma música</option>
        {musics.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title}
          </option>
        ))}
      </select>

      {selected && (
        <>
          <input
            type="text"
            className="border p-2 mt-4 block"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 mt-2 block"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <input
            type="text"
            className="border p-2 mt-2 block"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />

          <input
            type="file"
            className="border p-2 mt-2 block"
            onChange={(e) => setCover(e.target.files[0])}
          />

          <button
            onClick={updateMusic}
            className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded cursor-pointer"
          >
            Salvar Alterações
          </button>
        </>
      )}
    </div>
  );
}
