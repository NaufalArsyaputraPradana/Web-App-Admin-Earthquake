import Blog from "../models/BlogModel.js";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

export const getBlogs = async (req, res) => {
  try {
    const response = await Blog.findAll();
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to retrieve blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const response = await Blog.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response) return res.status(404).json({ msg: "Blog not found" });
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to retrieve blog" });
  }
};

export const saveBlog = async (req, res) => {
  if (!req.files || !req.body.title || !req.body.content || !req.body.author)
    return res.status(400).json({ msg: "Incomplete data" });

  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name).toLowerCase();
  const fileName = `${file.md5}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext))
    return res.status(422).json({ msg: "Invalid image format" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  try {
    await file.mv(`./public/images/${fileName}`);
    await Blog.create({ title, content, author, image: fileName, url });
    res.status(201).json({ msg: "Blog created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to save blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    let fileName = blog.image;
    let content = req.body.content || blog.content;
    let author = req.body.author || blog.author;

    if (req.files) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name).toLowerCase();
      fileName = `${file.md5}${ext}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext))
        return res.status(422).json({ msg: "Invalid image format" });
      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });

      const oldFilePath = `./public/images/${blog.image}`;
      if (fs.existsSync(oldFilePath)) await unlinkAsync(oldFilePath);

      await file.mv(`./public/images/${fileName}`);
    }

    const title = req.body.title || blog.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    await Blog.update(
      { title, content, author, image: fileName, url },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ msg: "Blog updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to update blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    const filePath = `./public/images/${blog.image}`;
    if (fs.existsSync(filePath)) await unlinkAsync(filePath);

    await Blog.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to delete blog" });
  }
};
