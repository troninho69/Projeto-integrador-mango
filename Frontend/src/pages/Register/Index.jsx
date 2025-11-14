import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
const Logo = "../../../public/mangoLogo.png";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // <-- ADICIONADO
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {

    // 🚨 Verificar se senhas coincidem
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, userName, dateBirth }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Usuário registrado com sucesso!");
      navigate("/Login");
    } catch (error) {
      alert("Erro no registro: " + error.message);
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
              placeholder="Insira um email..."
              className="bg-[#ffcd78] dark:bg-[#616161] dark:border-white border-2 rounded-2xl pl-5"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Insira uma senha..."
              className="bg-[#ffcd78] dark:bg-[#616161] dark:border-white border-2 rounded-2xl pl-5"
            />

            {/* CAMPO DE CONFIRMAR SENHA */}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha..."
              className="bg-[#ffcd78] dark:bg-[#616161] dark:border-white border-2 rounded-2xl pl-5"
            />

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Insira seu nome..."
              className="bg-[#ffcd78] dark:bg-[#616161] dark:border-white border-2 rounded-2xl pl-5"
            />

            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Insira um nome para seu usuário..."
              className="bg-[#ffcd78] dark:bg-[#616161] dark:border-white border-2 rounded-2xl pl-5"
            />

            <input
              type="date"
              value={dateBirth}
              onChange={(e) => setDateBirth(e.target.value)}
              className="bg-[#ffcd78] dark:bg-[#616161] dark:border-white border-2 rounded-2xl pl-5"
            />

            <div>
              <span className="text-white">Ou se já tem uma conta</span>
              <Link to={"/Login"}>
                <span className="text-blue-600 underline">/Logue</span>
              </Link>
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full mt-4 bg-[#ffa201] hover:bg-[#ffbd4b] dark:bg-purple-800 dark:hover:bg-purple-400 text-black font-semibold py-2 px-4 rounded transition duration-200 cursor-pointer"
          >
            Registrar
          </button>

        </div>
      </div>
    </>
  );
}
