export default function Music(props) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300">
        <img
          src={props.img}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        ></img>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-800 truncate">{props.titulo}</p>
          <p className="text-sm text-gray-500 truncate">{props.autor} - {props.tempo}</p>
        </div>
        <div className="flex flex-col items-center justify-center h-full text-gray-400 py-1">
          <button className="hover:text-red-500 transition-colors"><ion-icon name="heart-sharp"></ion-icon></button>
        </div>
      </div>
    </>
  );
}
