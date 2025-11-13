import "./Main.css";

import Header from "../../components/Header/Index.jsx";
import Navbar from "../../components/Navbar/Index.jsx";
import Footer from "../../components/Footer/Index.jsx";

import Music from "../../components/Music";
import Discoteca from "../../components/Discoteca/Index.jsx";
import Clipes from "../../components/Clipes/Index.jsx";

import Music1 from "../../assets/img/bodycompany.jpg";
import Music2 from "../../assets/img/idontlikeyourtone.jpg";
import Music3 from "../../assets/img/IMpossible.jpg";
import Music4 from "../../assets/img/nude.jpg";

export default function Secao() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="ml-32 md:ml-64 mt-[76px] p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Escute novamente</h2>
            <p className="mb-6">Músicas que em algum momento você escutou</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Music
              titulo="IMpossible"
              tempo="03:39"
              autor="And One"
              img={Music3}
            />
            <Music
              titulo="body company"
              tempo="03:39"
              autor="And One"
              img={Music1}
            />
            <Music
              titulo="i dont like your tone"
              tempo="03:39"
              autor="And One"
              img={Music2}
            />
            <Music titulo="Nude" tempo="03:39" autor="And One" img={Music4} />
            <Music
              titulo="IMpossible"
              tempo="03:39"
              autor="And One"
              img={Music3}
            />
            <Music
              titulo="IMpossible"
              tempo="03:39"
              autor="And One"
              img={Music3}
            />
          </div>

          <div className="py-8">
            <div className="text-[#B15B3C] dark:text-white">
              <h2 className="text-3xl font-bold mb-1">
                Descubra Novas Músicas
              </h2>
              <p className="mb-6">
                Músicas recomendadas de acordo com seu gosto musical
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Music
                titulo="IMpossible"
                tempo="03:39"
                autor="And One"
                img={Music3}
              />
              <Music
                titulo="body company"
                tempo="03:39"
                autor="And One"
                img={Music1}
              />
              <Music
                titulo="i dont like your tone"
                tempo="03:39"
                autor="And One"
                img={Music2}
              />
              <Music titulo="Nude" tempo="03:39" autor="And One" img={Music4} />
              <Music
                titulo="IMpossible"
                tempo="03:39"
                autor="And One"
                img={Music3}
              />
              <Music
                titulo="IMpossible"
                tempo="03:39"
                autor="And One"
                img={Music3}
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-[#B15B3C] dark:text-white">
            Discoteca Digital
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
              <Discoteca
                img={Music1}
                titulo="拷問の時間"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                img={Music2}
                titulo="Eurodiscoteque"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                img={Music1}
                titulo="Pa-Pa-Pa-Pa Love Romance"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                img={Music1}
                titulo="I Never Want to See You Again"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                img={Music1}
                titulo="Two-Headed Boy"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                img={Music1}
                titulo="Once in a Lifetime"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                img={Music1}
                titulo="QKThr"
                tempo="03:39"
                autor="And One"
              />

              <Discoteca
                img={Music1}
                titulo="Da da Is Tape To And U U U"
                tempo="03:39"
                autor="And One"
              />
            </div>
          </div>

          <div className="text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Favoritos Antigos</h2>
            <p className="mb-6">Musicas que você escutava antigamente</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
              <Discoteca
                titulo="Two-Headed Boy"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                titulo="Two-Headed Boy"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                titulo="Two-Headed Boy"
                tempo="03:39"
                autor="And One"
              />
              <Discoteca
                titulo="Two-Headed Boy"
                tempo="03:39"
                autor="And One"
              />
            </div>
          </div>

          <div className="text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Videoclipes</h2>
            <p className="mb-6">
              Vídeoclipes de músicas relacionadas ao seu gosto musical
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Clipes titulo="Two-Headed Boy" tempo="03:39" autor="And One" />
            <Clipes titulo="Two-Headed Boy" tempo="03:39" autor="And One" />
            <Clipes titulo="Two-Headed Boy" tempo="03:39" autor="And One" />
            <Clipes titulo="Two-Headed Boy" tempo="03:39" autor="And One" />
            <Clipes titulo="Two-Headed Boy" tempo="03:39" autor="And One" />
            <Clipes titulo="Two-Headed Boy" tempo="03:39" autor="And One" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
