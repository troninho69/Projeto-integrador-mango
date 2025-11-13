import "./Msg.css";

import Header from "../../components/Header/Index";
import Navbar from "../../components/Navbar/Index";
import Ctts from "../../components/Ctts/Index";
import Status from "../../components/status";

export default function Msg() {
  return (
    <>
      <Header />
      <Navbar />

      <div className="ml-64 mt-[76px] h-[calc(100vh-76px)] flex bg-[#FFF7E9] dark:bg-[#1B1B1B]">
        <div className="w-[400px] border-r flex flex-col bg-[#FFFBF0] dark:bg-[#1b1b1b] border-[#FFE2AC] dark:border-white">
          <div className="p-4 border-b border-[#FFE2AC] dark:border-white">
            <div className="flex gap-4 justify-center pb-2">
              <Status />
              <Status />
              <Status />
              <Status />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Ctts />
            <Ctts />
            <Ctts />
            <Ctts />
            <Ctts />
            <Ctts />
            <Ctts />
            <Ctts />
            <Ctts />
            <Ctts />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-[#FFF7E9] dark:bg-[#1b1b1b]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-[#B15B3C] dark:text-white">
              Suas Mensagens
            </h2>
            <p className="text-base text-[#D2A284] dark:text-gray-400">
              Selecione uma conversa para começar a conversar
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
