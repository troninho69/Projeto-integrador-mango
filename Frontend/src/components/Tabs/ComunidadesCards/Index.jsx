import "./ComunidadesCards.css";
import Comunidades from "./Comunidades/Index";
import sla from "../../../assets/img/OIP.webp";

export default function ComunidadeCards(props) {
  return (
    <div className="bg-white dark:bg-inherit rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 dark:border-2 dark:border-white">
      <div className="flex items-center gap-6 mb-10">
        <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md">
          <img src={props.img} alt="imagem"></img>
        </div>
        <div>
          <h3 className="font-bold text-[#b15b3c] dark:text-white text-xl">Eurodance</h3>
          <p className="text-base text-[#d2a284] dark:text-gray-200">5.271 membros</p>
        </div>
      </div>

      <div className="space-y-5">
        <Comunidades img={sla}/>
        <Comunidades img={sla}/>
        <Comunidades img={sla}/>
      </div>
    </div>
  );
}
