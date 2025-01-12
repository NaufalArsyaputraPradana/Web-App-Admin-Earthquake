import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); // Changed to null
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogById();
  }, []);

  const getBlogById = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/blogs/${id}`);
      setTitle(response.data.name);
      setDescription(response.data.description);
      setPreview(response.data.url);
    } catch (error) {
      console.log("Error fetching blog:", error);
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image)); // Update preview image
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in both fields.");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("file", file); // Only append file if it exists
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.patch(`http://localhost:5173/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Edit Blog</h2>
      <form onSubmit={updateBlog} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Blog Name
          </label>
          <input
            type="text"
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Name"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Description
          </label>
          <input
            type="text"
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Blog Description"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Image</label>
          <input
            type="file"
            className="file-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={loadImage}
          />
        </div>
        {preview && (
          <div className="mt-4">
            <h3 className="text-gray-600 mb-2">Image Preview:</h3>
            <img
              src={preview}
              alt="Preview Image"
              className="max-w-[200px] rounded-lg"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
