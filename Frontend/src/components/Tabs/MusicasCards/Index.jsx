import "./MusicasCards.css";

export default function MusicasCards(props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer w-48 h-56 flex flex-col">
      <div className="w-full h-48 rounded-lg overflow-hidden shadow-md">
        <img src={props.img} className="w-full h-full object-cover"></img>
      </div>
    </div>
  );
}
