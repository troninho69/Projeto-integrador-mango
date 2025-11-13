import "./Comunityactividy.css";

export default function Comunityactividy(props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <img src={props.img} className="w-full h-full object-cover"></img>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {props.titulo}
          </p>
          <p className="text-3xs text-gray-500 truncate">
            {props.autor} - {props.tempo}
          </p>
        </div>
      </div>
    </div>
  );
}
