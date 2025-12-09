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

const Post = ({ post, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const [editImage, setEditImage] = useState(null);

  const canModify =
    user &&
    (user.id === post.User?.id ||
      user.role === "admin" ||
      user.artist === true);

  async function handleDelete() {
    if (!window.confirm("Deseja realmente excluir este post?")) return;

    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/posts/${post.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    onDelete(post.id);
  }

  async function handleEditSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("text", editText);
    if (editImage) formData.append("postImage", editImage);

    const res = await axios.put(
      `http://localhost:3000/posts/${post.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    onUpdate(res.data);
    setIsEditing(false);
  }

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
            {post.User?.name}
            <span
              className={`text-sm font-normal ${TEXT_SECONDARY} ml-1`}
              onClick={goToProfile}
            >
              @{post.User?.userName}
            </span>
          </p>

          <p className={`mt-1 text-sm ${TEXT_PRIMARY}`}>{post.text}</p>

          {post.imageUrl && (
            <img
              src={`http://localhost:3000${post.imageUrl}`}
              alt="Imagem do Post"
              className="w-full rounded-lg shadow-md mt-3"
              style={{ maxWidth: "500px" }}
            />
          )}
        </div>

        {canModify && (
          <div className="flex flex-col space-y-2 ml-3">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
            >
              Editar
            </button>

            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Excluir
            </button>
          </div>
        )}
      </div>

      {/* MODAL DE EDIÇÃO */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-lg w-[400px]">
            <h2 className="text-white text-xl mb-3">Editar Post</h2>

            <form onSubmit={handleEditSubmit}>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-3 bg-[#2c2c2c] text-white rounded"
                rows="4"
              />

              <input
                type="file"
                onChange={(e) => setEditImage(e.target.files[0])}
                className="mt-3 text-white"
              />

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default function Comunidade() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  function deletePostFromState(id) {
    setPosts(posts.filter((p) => p.id !== id));
  }

  function updatePostInState(updated) {
    setPosts(posts.map((p) => (p.id === updated.id ? updated : p)));
  }

  async function handleCreatePost(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("postImage", image);

    const token = localStorage.getItem("token");

    const res = await axios.post("http://localhost:3000/posts", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

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

          <div className="space-y-6">
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onDelete={deletePostFromState}
                onUpdate={updatePostInState}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

