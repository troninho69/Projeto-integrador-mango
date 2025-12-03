import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { isLogged, user } = useAuth(); // ✅ pegar o estado correto

  return (
    <header className="fixed top-0 left-0 right-0 shadow-lg z-50 bg-[#FFBE73] dark:bg-[#1f1f1f]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex justify-center items-center w-64">
            <img src="/mangoLogo.png" alt="Logo Mango" className="w-12" />
          </div>

          {/* Barra de pesquisa */}
          <div className="flex-1 max-w-md w-full">
            <div className="relative flex items-center rounded-full overflow-hidden shadow-md">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-white dark:bg-black w-full px-4 py-2 pl-4 pr-16 text-gray-800 dark:text-white focus:outline-none transition-all duration-300 border-none"
              />
              <button className="absolute right-0 h-full px-6 text-white dark:text-black text-2xl transition-all duration-300 hover:opacity-90 flex items-center justify-center bg-[#FF8C6B] dark:bg-gray-50">
                <ion-icon name="search-outline"></ion-icon>
              </button>
            </div>
          </div>

          {/* Perfil ou login/registro */}
          {isLogged ? (
            <div className="user-profile-header hidden md:flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg transition-all duration-300">
              {/* Nome leva ao perfil */}
              <Link to={`/profile/${user?.id}`}>
                <span className="user-name font-medium text-sm md:text-base transition-colors text-[#B15B3C] dark:text-white">
                  {user?.userName}
                </span>
              </Link>

              {/* Foto leva ao perfil */}
              <Link to={`/profile/${user?.id}`}>
                <img
                  src={`http://localhost:3000${user?.photo}`}
                  alt="Foto de Perfil"
                  className="cursor-pointer w-10 h-10 rounded-full border-2 shadow-md border-white"
                />
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/Login"
                className="px-4 py-2 bg-[#FF8C6B] text-white dark:bg-[#9c9c9c] font-medium rounded-full hover:opacity-90 transition-all duration-300 shadow-md"
              >
                Login
              </Link>

              <Link
                to="/Register"
                className="px-4 py-2 bg-white text-[#FF8C6B] dark:text-[#ffffff] dark:bg-[#555] font-medium rounded-full border border-[#FF8C6B] dark:border-black hover:bg-[#FF8C6B] dark:hover:bg-[#727272] transition-all duration-300 shadow-md"
              >
                Registrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
