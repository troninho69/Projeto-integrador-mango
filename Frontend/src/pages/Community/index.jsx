import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Index.jsx";
import Navbar from "../../components/Navbar/Index.jsx";
import Footer from "../../components/Footer/Index.jsx";
import axios from "axios";

// Cores baseadas na imagem
const BG_DARK = "bg-[#1b1b1b]";
const BG_BUTTON_PRIMARY = "bg-[#555555]";
const BG_BUTTON_PRIMARY_HOVER = "hover:bg-[#9c9c9c]";
const TEXT_PRIMARY = "text-[#ffffff]";
const TEXT_SECONDARY = "text-[#6e6e6e]";
const BORDER_COLOR = "border-[#2d3748]";

const Post = ({ post }) => {
  const navigate = useNavigate();
  function goToProfile() {
    if (post.User?.id) {
      navigate(`/profile/${post.User.id}`);
    }
  }
  return (
    <div className={`border-t ${BORDER_COLOR} pt-4 mb-6`}>
      <div className="flex space-x-3">
        <img
          onClick={goToProfile}
          src={`http://localhost:3000${post.User?.photo}`}
          alt="Avatar"
          className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
        />

        <div className="flex-1">
          <p
            className={`font-semibold ${TEXT_PRIMARY} cursor-pointer hover:opacity-80`}
            onClick={goToProfile}
          >
            {post.User?.name || post.user}{" "}
            <span
              className={`text-sm font-normal ${TEXT_SECONDARY} cursor-pointer hover:opacity-80`}
              onClick={goToProfile}
            >
              @{post.User?.userName || post.handle}
            </span>
          </p>

          <p className={`mt-1 text-sm ${TEXT_PRIMARY}`}>
            {post.text || post.content}
          </p>

          {post.imageUrl && (
            <img
              src={`http://localhost:3000${post.imageUrl}`}
              alt="Imagem do Post"
              className="w-full rounded-lg shadow-md mt-3"
              style={{ maxWidth: "500px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function Comunidade() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  // Buscar posts do backend
  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  async function handleCreatePost(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("postImage", image);

    const token = localStorage.getItem("token");

    const res = await axios.post("http://localhost:3000/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    // Adiciona o novo post na lista SEM recarregar
    setPosts([res.data, ...posts]);

    setText("");
    setImage(null);
  }

  return (
    <>
      <Header />
      <Navbar />

      <div className={`ml-64 mt-[76px] p-8 pb-28 ${BG_DARK} min-h-screen`}>
        <div className="max-w-4xl mx-auto">
          {/* FORMULÁRIO DE CRIAR POST */}
          <form
            onSubmit={handleCreatePost}
            className="mb-8 p-4 border rounded-xl border-gray-700"
          >
            <textarea
              className="w-full p-3 rounded bg-[#2c2c2c] text-white"
              rows="3"
              placeholder="O que você está pensando?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <input
              type="file"
              className="mt-3 text-white"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button
              type="submit"
              className={`mt-4 px-4 py-2 rounded ${BG_BUTTON_PRIMARY} ${BG_BUTTON_PRIMARY_HOVER} text-white`}
            >
              Publicar
            </button>
          </form>

          {/* LISTA DE POSTS */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
