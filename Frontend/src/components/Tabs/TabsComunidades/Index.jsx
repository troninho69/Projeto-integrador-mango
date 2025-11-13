import "./TabsComunidades.css";
import ComunidadeCards from "../ComunidadesCards/Index";
import teste from "../../../assets/img/OIP.webp";

export default function TabsComunidades() {
  return (
    <div className="flex mb-6 mx-5">
      <ComunidadeCards img={teste} />
    </div>
  );
}
