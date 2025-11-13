import "./Footer.css";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="rodape bg-[#fff0d5] text-[#b15b3c] dark:bg-[#464646] dark:text-white">
        <div className="ml-[-150px]">
          <div className="flex flex-col items-center text-center gap-5 pb-10">
            <div className="flex items-center space-x-5 text-3xl">
              <Link to="#" className="hover:opacity-70 transition-opacity">
                <ion-icon name="logo-twitter"></ion-icon>
              </Link>
              <Link to="#" className="hover:opacity-70 transition-opacity">
                <ion-icon name="logo-instagram"></ion-icon>
              </Link>
              <Link to="#" className="hover:opacity-70 transition-opacity">
                <ion-icon name="logo-facebook"></ion-icon>
              </Link>
            </div>
            <p className="font-medium">
              Instituto Federal de Educação de Caraguatatuba - SP
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm">
              <span className="flex items-center gap-2">
                <ion-icon name="call-sharp"></ion-icon>12 12345-6789
              </span>
              <span className="flex items-center gap-2">
                <ion-icon name="mail-sharp"></ion-icon>mangomusic@gmail.com
              </span>
            </div>
            <Link to="#" id="mango-link">
              <img
                src="../../public/mangoLogo.png"
                className="w-12 mt-3 cursor-pointer hover:scale-110 transition-transform"
              ></img>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
