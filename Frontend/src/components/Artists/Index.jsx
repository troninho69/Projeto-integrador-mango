import "./Artists.css";

export default function Artists(props) {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg mb-3 hover:shadow-xl transition-shadow duration-300">
          <img src={props.img} className="w-full h-full object-cover"></img>
        </div>
        <h3 className="font-semibold text-gray-800 text-sm">{props.autor}</h3>
      </div>
    </>
  );
}
