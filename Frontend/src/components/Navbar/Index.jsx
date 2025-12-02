import "./Navbar.css"; 
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth(); // <-- pega usuário logado

  return (
    <>
      <nav className="fixed left-0 top-[76px] h-[calc(100vh-76px)] md:w-64 shadow-2xl flex flex-col z-40 bg-[#FFE2AC] dark:bg-[#1f1f1f] mt-10 md:mt-0">
        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="font-medium text-lg space-y-2 px-4 pt-4">

            {/* INÍCIO */}
            <li>
              <Link
                to="/"
                className="navbar-item flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 text-[#B15B3C] dark:text-white"
              >
                <ion-icon name="home-sharp"></ion-icon>
                <span className="hidden md:flex">Início</span>
              </Link>
            </li>

            {/* BIBLIOTECA */}
            <li>
              <Link
                to="/Library"
                className="navbar-item flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 text-[#B15B3C] dark:text-white"
              >
                <ion-icon name="library-sharp"></ion-icon>
                <span className="hidden md:flex">Biblioteca</span>
              </Link>
            </li>

            {/* COMUNIDADES */}
            <li>
              <Link
                to="/Comunidade"
                className="navbar-item flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 text-[#B15B3C] dark:text-white"
              >
                <ion-icon name="people-sharp"></ion-icon>
                <span className="hidden md:flex">Comunidades</span>
              </Link>
            </li>

            {/* PERFIL */}
            <li>
              <Link
                to="/Profile"
                className="navbar-item flex md:hidden items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 text-[#B15B3C] dark:text-white"
              >
                <ion-icon name="person-sharp"></ion-icon>
              </Link>
            </li>

            {/* MENSAGENS */}
            <li>
              <Link
                to="/Msg"
                className="navbar-item flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 text-[#B15B3C] dark:text-white"
              >
                <ion-icon name="chatbubbles-sharp"></ion-icon>
                <span className="hidden md:flex">Mensagens</span>
              </Link>
            </li>

            {/* CONFIGURAÇÕES */}
            <li>
              <Link
                to="#"
                className="navbar-item flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 text-[#B15B3C] dark:text-white"
              >
                <ion-icon name="settings-sharp"></ion-icon>
                <span className="hidden md:flex">Configurações</span>
              </Link>
            </li>

            {/* ----------------------------- */}
            {/*   ÁREA EXCLUSIVA PARA ARTISTAS  */}
            {/* ----------------------------- */}
            {user?.artist && (
              <li>
                <Link
                  to="/Dashboard"
                  className="navbar-item flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#ffd49c] dark:bg-[#1f1f1f] hover:bg-[#ffca86] transition-all duration-300 hover:translate-x-1 text-[#B15B3C] dark:text-white"
                >
                  <ion-icon name="musical-notes-sharp"></ion-icon>
                  <span className="hidden md:flex">Gerenciar Músicas</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
