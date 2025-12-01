import { useEffect, useState } from "react";
import axios from "axios";

export default function RemoveMusic() {
  const [musics, setMusics] = useState([]);

  const load = () => {
    axios
      .get("http://localhost:3000/songs")
      .then((res) => setMusics(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const deleteMusic = async (id) => {
    await axios.delete(`http://localhost:3000/songs/delete/${id}`);
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Remover Música</h2>

      {musics.map((music) => (
        <div
          key={music.id}
          className="flex justify-between items-center border p-3 mb-2"
        >
          <span>{music.title}</span>
          <button
            onClick={() => deleteMusic(music.id)}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}
