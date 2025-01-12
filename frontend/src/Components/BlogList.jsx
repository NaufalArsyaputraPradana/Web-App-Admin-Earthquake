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
      const response = await axios.get("http://localhost:5173/blogs");
      // Ensure that the response data is an array before setting state
      if (Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        console.error("Response data is not an array", response.data);
        setBlogs([]); // Set to empty array in case of an invalid response
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); // Fallback to empty array in case of an error
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5173/blogs/${blogId}`);
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
        getBlogs(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-16">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Blog List</h2>
      <Link
        to="/add"
        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700 mb-4 inline-block"
      >
        Add Blog
      </Link>
      <table className="w-full bg-white rounded-lg overflow-hidden shadow-md border border-gray-300">
        <thead className="bg-gray-100">
          <tr className="bg-blue-200">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2 px-4">{blog.id}</td>
                <td className="py-2 px-4">{blog.name}</td>
                <td className="py-2 px-4">{blog.description}</td>
                <td className="py-2 px-4">
                  {/* Fallback for missing image */}
                  <img
                    src={blog.url || "default-image-url.jpg"}
                    alt="Blog"
                    className="w-20 h-20"
                  />
                </td>
                <td className="p-3 space-x-2">
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${blog.id}`}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
