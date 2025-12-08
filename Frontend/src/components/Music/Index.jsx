import { useState, useEffect } from "react";

export default function Music({
  id,
  titulo,
  tempo,
  autor,
  img,
  liked: initialLiked,
  onClick,
  onLike,
}) {

  const [liked, setLiked] = useState(initialLiked);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  function handleLike(e) {
    e.stopPropagation(); 

    const newState = !liked;
    setLiked(newState);

    // Envia o id da música para o pai
    if (onLike) {
      onLike(id);   // <<--- AGORA ENVIA SÓ O ID
    }
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-3 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={img}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 truncate">{titulo}</p>
        <p className="text-sm text-gray-500 truncate">
          {autor} - {tempo}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center h-full text-gray-400 py-1">
        <button
          className={`cursor-pointer transition-colors ${
            liked ? "text-red-500" : "text-gray-400"
          }`}
          onClick={handleLike}
        >
          <ion-icon name="heart-sharp"></ion-icon>
        </button>
      </div>
    </div>
  );
}
