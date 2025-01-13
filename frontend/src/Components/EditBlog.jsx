import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogById();
  }, []);

  const getBlogById = async () => {
    const response = await axios.get(`http://localhost:5000/admin/blogs/${id}`);
    setTitle(response.data.title);
    setContent(response.data.content);
    setAuthor(response.data.author);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    try {
      await axios.patch(`http://localhost:5000/admin/blogs/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Blog berhasil diperbarui.",
      });
      navigate("/admin/blogs");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui blog.",
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Edit Berita
      </h2>
      <form onSubmit={updateBlog} className="space-y-8">
        <div>
          <label className="block text-gray-700 mb-3 font-semibold text-lg">
            Judul Berita
          </label>
          <input
            type="text"
            className="border-2 border-gray-200 p-4 w-full rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-3 font-semibold text-lg">
            Content
          </label>
          <textarea
            className="border-2 border-gray-200 p-4 w-full rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Blog Content"
            rows="6"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-3 font-semibold text-lg">
            Author
          </label>
          <input
            type="text"
            className="border-2 border-gray-200 p-4 w-full rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author Name"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-3 font-semibold text-lg">
            Image
          </label>
          <input
            type="file"
            className="file-input w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
            onChange={loadImage}
          />
        </div>
        {preview && (
          <div className="mt-6">
            <h3 className="text-gray-600 mb-3 font-semibold text-lg">
              Image Preview:
            </h3>
            <img
              src={preview}
              alt="Preview Image"
              className="max-w-[250px] rounded-xl shadow-md"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl w-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
        >
          Update Berita
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
