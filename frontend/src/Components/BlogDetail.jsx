import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null); // Changed initial state to null
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching Blog detail:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p className="text-center text-red-500">Blog Not Found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-16">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Blog Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          {/* Fallback for missing image */}
          <img
            src={blog.url || "default-image-url.jpg"} // Placeholder image
            alt="Blog"
            className="w-full h-auto rounded-lg mb-4"
          />
        </div>
        <div className="space-y-4">
          <div className="text-lg font-medium text-gray-600">
            <p>
              <strong>ID:</strong> {blog.id}
            </p>
            <p>
              <strong>Name:</strong> {blog.name}
            </p>
            <p>
              <strong>Description:</strong> {blog.description}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Back To Blog List
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
