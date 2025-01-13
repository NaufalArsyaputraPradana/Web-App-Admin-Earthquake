import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/blogs/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <p className="text-center text-red-500 text-2xl font-semibold">
        Blog Not Found.
      </p>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 shadow-2xl rounded-2xl mt-20">
      <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center">
        Berita Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <img
            src={blog.url}
            alt="Blog"
            className="w-full h-auto rounded-xl mb-6"
          />
        </div>

        <div className="space-y-6">
          <div className="text-xl font-medium text-gray-700">
            <p className="mb-4">
              <strong className="text-blue-600">ID:</strong> {blog.id}
            </p>
            <p className="mb-4">
              <strong className="text-blue-600">Judul:</strong> {blog.title}
            </p>
            <p className="mb-4">
              <strong className="text-blue-600">Content:</strong> {blog.content}
            </p>
            <p className="mb-4">
              <strong className="text-blue-600">Author:</strong> {blog.author}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
          >
            Back To Blog List
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
