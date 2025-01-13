import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data ini akan dihapus dan tidak bisa dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/admin/blogs/${blogId}`);
        Swal.fire("Dihapus!", "Blog telah dihapus.", "success");
        getBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 shadow-2xl rounded-2xl mt-20">
      <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center">
        List Berita
      </h2>
      <Link
        to="/admin/add"
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-600 transition duration-300 transform hover:scale-105 inline-block mb-8"
      >
        Buat Berita
      </Link>
      <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <tr>
            <th className="py-4 px-6 text-left">ID</th>
            <th className="py-4 px-6 text-left">Judul</th>
            <th className="py-4 px-6 text-left">Content</th>
            <th className="py-4 px-6 text-left">Author</th>
            <th className="py-4 px-6 text-left">Image</th>
            <th className="py-4 px-6 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr
                key={blog.id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-200"
              >
                <td className="py-4 px-6">{blog.id}</td>
                <td className="py-4 px-6">{blog.title}</td>
                <td className="py-4 px-6">{blog.content}</td>
                <td className="py-4 px-6">{blog.author}</td>
                <td className="py-4 px-6">
                  <img
                    src={blog.url}
                    alt="Blog"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </td>
                <td className="py-4 px-6 space-x-3">
                  <tr>
                    <td>
                      <Link
                        to={`/admin/blogs/${blog.id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition duration-300"
                      >
                        Lihat
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/admin/edit/${blog.id}`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition duration-300"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-300"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500">
                No Blog Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
