import "./Login.css";
import Logo from "../../../public/mangoLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    // Exemplo simples — aqui você pode chamar seu backend futuramente
    if (email && senha) {
      login({ email });
      navigate("/"); // redireciona para a home
    } else {
      alert("Preencha o email e a senha!");
    }
  }

  return (
    <>
      <Link to={"/"}>
        <button className="text-white text-6xl cursor-pointer absolute left-5 top-5">
          <ion-icon name="arrow-back-circle-outline"></ion-icon>
        </button>
      </Link>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#ffe1ae] dark:bg-inherit border-2 border-black dark:border-white rounded-lg shadow-lg p-6 px-15 max-w-md w-full">
          <div className="flex justify-center mb-4 flex-col gap-5">
            <img src={Logo} alt="logo" className="flex self-center" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Insira seu email..."
              className="bg-[#ffcd78] dark:bg-[#616161] dark:border-white border-2 rounded-2xl pl-5"
            />
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Insira sua senha..."
              className="bg-[#ffcd78] dark:bg-[#616161] dark:border-white border-2 rounded-2xl pl-5"
            />
            <div>
              <span className="text-white">Ou se ainda não tem uma conta</span>
              <Link to={"/Register"}>
                <span className="text-blue-600 underline">/Registre-se</span>
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-[#ffa201] hover:bg-[#ffbd4b] dark:bg-purple-800 dark:hover:bg-purple-400 text-black font-semibold py-2 px-4 rounded transition duration-200 cursor-pointer"
          >
            Logar
          </button>
        </div>
      </div>
    </>
  );
}
