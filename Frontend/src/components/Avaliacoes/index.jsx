import "./Avaliacoes.css";

export default function Avaliacoes(props) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden shadow-md flex-shrink-0">
            <img src={props.img} className="w-full h-full object-cover"></img>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-800 text-sm">
                Usuario123
              </span>
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">
              What Is Love - 04:10
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nossa que musica boa melhor musica que ja ouvi na minha vida
              escutem escutem
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
            <div className="text-white w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <ion-icon name="thumbs-up-sharp"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
