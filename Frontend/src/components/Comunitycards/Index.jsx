import "./Comunitycards.css";
import Comunityactividy from "./Comunityactividy";

export default function Comunitycards(props) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 min-h-[280px]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md">
            <img src={props.img} className="w-full h-full object-cover"></img>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{props.titulo}</h3>
            <p className="text-sm text-gray-500">{props.seguidores} membros</p>
          </div>
        </div>

        <Comunityactividy
          titulo={props.titulo1}
          autor={props.autor1}
          tempo={props.tempo1}
          img={props.img1}
        />
      </div>
    </>
  );
}
