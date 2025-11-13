import "./Library.css";

import Header from "../../components/Header/Index";
import Navbar from "../../components/Navbar/Index";
import Footer from "../../components/Footer/Index";

import Music from "../../components/Music";
import Discoteca from "../../components/Discoteca/Index";
import Artists from "../../components/Artists/Index";
import Comunitycards from "../../components/Comunitycards/Index";
import Avaliacoes from "../../components/Avaliacoes";

import Music1 from "../../assets/img/bodycompany.jpg";
import Music2 from "../../assets/img/idontlikeyourtone.jpg";
import Music3 from "../../assets/img/IMpossible.jpg";
import Music4 from "../../assets/img/nude.jpg";

export default function Library() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="ml-32 md:ml-64 mt-[76px] p-8">
        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Atividade recente</h2>
            <p className="mb-6">Músicas tocadas recentemente</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>

        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">Atividade recente</h2>
            <p className="mb-6">Músicas tocadas recentemente</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Artists />
              <Artists />
              <Artists />
              <Artists />
            </div>
          </div>
        </div>

        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <p className="mb-6">Veja as atividades recentes das comunidades</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Comunitycards titulo="eita" titulo1="nenem" />
              <Comunitycards titulo="a" titulo1="nenem" />
              <Comunitycards />
            </div>
          </div>
        </div>

        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">
              Comunidades que você participa
            </h2>
            <p className="mb-6">Músicas tocadas recentemente</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Discoteca />
              <Discoteca />
              <Discoteca />
            </div>
          </div>
        </div>

        <div className="pb-20">
          <div className="max-w-6xl mx-auto text-[#B15B3C] dark:text-white">
            <h2 className="text-3xl font-bold mb-1">
              Comunidades que você participa
            </h2>
            <p className="mb-6">Músicas tocadas recentemente</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Avaliacoes></Avaliacoes>
              <Avaliacoes></Avaliacoes>
              <Avaliacoes></Avaliacoes>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
