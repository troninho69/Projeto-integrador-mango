import "./Discoteca.css";

export default function Discoteca({ onClick, img, tempo, autor, titulo }) {
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-3 flex flex-col gap-3 hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={onClick}>
        <img
          src={img}
          className="w-full aspect-square object-cover rounded-md"
        ></img>
        <div className="text-center">
          <p className="font-semibold text-sm text-gray-800 truncate">
            {titulo}
          </p>
          <p className="text-xs text-gray-500">
            {autor} - {tempo}
          </p>
        </div>
      </div>
    </>
  );
}
