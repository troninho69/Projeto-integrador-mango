import "./Comunidades.css";

export default function Comunidades(props) {
  return (
    <div className="flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#464646] transition-colors">
      <div className="w-16 h-16 rounded-lg overflow-hidden">
        <img src={props.img}></img>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-[#b15b3c] dark:text-gray-200 truncate">Max Don't Have Sex With Your Ex</p>
        <p className="text-sm text-[#d2a284] dark:text-gray-200 truncate">E-Rotic - 03:38</p>
      </div>
    </div>
  );
}
