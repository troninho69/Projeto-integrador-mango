import "./Discoteca.css";

export default function Discoteca(props) {
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-3 flex flex-col gap-3 hover:shadow-xl transition-shadow duration-300">
        <img
          src={props.img}
          className="w-full aspect-square object-cover rounded-md"
        ></img>
        <div className="text-center">
          <p className="font-semibold text-sm text-gray-800 truncate">
            {props.titulo}
          </p>
          <p className="text-xs text-gray-500">
            {props.autor} - {props.tempo}
          </p>
        </div>
      </div>
    </>
  );
}
