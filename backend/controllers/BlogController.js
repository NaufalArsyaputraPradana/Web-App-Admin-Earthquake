import path from "path";
import fs from "fs";
import Blog from "../models/BlogModel.js";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

// Helper function untuk validasi file
const handleFileUpload = (file, req) => {
  const allowedTypes = [".png", ".jpg", ".jpeg"];
  const fileSize = file.data.length;
  const ext = path.extname(file.name).toLowerCase();

  if (!allowedTypes.includes(ext)) throw new Error("Invalid image format.");
  if (fileSize > 5173000) throw new Error("Image size must be less than 5 MB.");

  const fileName = `${file.md5}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // Generate URL
  return { fileName, url };
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    if (!blogs.length) return res.status(404).json({ msg: "No blogs found." });
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to retrieve blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to retrieve the blog" });
  }
};

export const saveBlog = async (req, res) => {
  try {
    if (!req.files || !req.body.title || !req.body.description) {
      return res.status(400).json({ msg: "Incomplete data." });
    }

    const { title, description } = req.body;
    const file = req.files.file;

    const { fileName, url } = handleFileUpload(file, req);

    // Pindahkan file ke folder public/images
    await file.mv(`./public/images/${fileName}`);

    // Simpan data blog ke database
    await Blog.create({ name: title, description, image: fileName, url });

    res.status(201).json({ msg: "Blog created successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message || "Failed to save blog." });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const { title, description } = req.body;
    let fileName = blog.image;

    if (req.files) {
      const file = req.files.file;
      const { fileName: newFileName, url } = handleFileUpload(file);

      // Delete old file
      const oldFilePath = `./public/images/${blog.image}`;
      if (fs.existsSync(oldFilePath)) await unlinkAsync(oldFilePath);

      // Move new file
      await file.mv(`./public/images/${newFileName}`);
      fileName = newFileName;
    }

    await Blog.update(
      {
        name: title || blog.name,
        description: description || blog.description,
        image: fileName,
        url,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ msg: "Blog updated successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message || "Failed to update blog." });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const filePath = `./public/images/${blog.image}`;
    if (fs.existsSync(filePath)) await unlinkAsync(filePath);

    await Blog.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Blog deleted successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to delete blog." });
  }
};
