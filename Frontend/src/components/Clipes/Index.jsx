import "./Clipes.css";

export default function Clipes({
  onClick,
  img,
  tempo,
  autor,
  titulo
}) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-3 hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={onClick}>
        <div className="relative w-full">
          <img
            src={img}
            className="w-full h-auto aspect-video object-cover rounded-md"
          ></img>
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {tempo}
          </span>
        </div>

        <div className="px-1">
          <p className="font-bold text-gray-800 truncate">{titulo}</p>
          <p className="text-sm text-gray-500 truncate">{autor}</p>
        </div>
      </div>
    </>
  );
}
