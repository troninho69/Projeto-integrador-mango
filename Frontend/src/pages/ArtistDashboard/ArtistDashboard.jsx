import { useState } from "react";
import AddMusic from "./addMusic.jsx";
import EditMusic from "./editMusic.jsx";
import RemoveMusic from "./removeMusic.jsx";

export default function ArtistDashboard() {
  const [screen, setScreen] = useState("add");

  return (
    <div className="flex flex-col items-center pt-20 bg-white h-165">

      <h1 className="text-2xl mb-4 font-bold">Painel do Artista</h1>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setScreen("add")} className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">Adicionar Música</button>
        <button onClick={() => setScreen("edit")} className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer">Editar Música</button>
        <button onClick={() => setScreen("remove")} className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">Remover Música</button>
      </div>

      {screen === "add" && <AddMusic />}
      {screen === "edit" && <EditMusic />}
      {screen === "remove" && <RemoveMusic />}
    </div>
  );
}
