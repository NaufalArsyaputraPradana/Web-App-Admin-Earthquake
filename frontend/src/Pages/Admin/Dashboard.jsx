import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/");
    } else {
      getBlogs();
    }
  }, [navigate]);

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/blogs");
      setBlogs(response.data);
      setTotalBlogs(response.data.length);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 shadow-2xl rounded-2xl mt-20">
      <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center">
        Dashboard
      </h2>
      <p className="text-xl text-gray-700 mb-6 text-center">
        Total Berita:{" "}
        <span className="font-bold text-blue-600">{totalBlogs}</span>
      </p>
      <p className="mb-8 text-gray-600 text-center">
        Selamat Datang di Manajemen Data Gempa Bumi, silahkan kelola data Gempa
        Bumi di menu samping.
      </p>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              key={blog.id}
            >
              <Link to={`/admin/blogs/${blog.id}`}>
                <div
                  className="h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${blog.url})` }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <p className="text-gray-900 font-bold">{blog.author}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Tidak ada data blog.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
