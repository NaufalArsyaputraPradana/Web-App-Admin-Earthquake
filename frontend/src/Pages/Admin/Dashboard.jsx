import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Cek token dan redirect jika tidak ada
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/"); // Redirect ke halaman login jika tidak ada token
    } else {
      fetchBlogs();
    }
  }, [navigate]);

  // Fungsi untuk mengambil data blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5173/blogs");
      if (Array.isArray(response.data)) {
        setBlogs(response.data);
        setTotalBlogs(response.data.length);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Gagal memuat data blog. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-16">Memuat data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-16">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>
      <p className="text-lg text-gray-600 mb-6">
        Total Blog:{" "}
        <span className="font-bold text-blue-600">{totalBlogs}</span>
      </p>
      <p className="mb-8 text-gray-500">
        Selamat datang di Manajemen Produk, silakan kelola data barang di menu
        samping.
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              key={blog.id}
            >
              <Link to={`/blogs/${blog.id}`}>
                <div
                  className="h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${blog.url})` }}
                ></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {blog.name}
                  </h3>
                  <p className="text-gray-600 mt-2 truncate">
                    {blog.description}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
