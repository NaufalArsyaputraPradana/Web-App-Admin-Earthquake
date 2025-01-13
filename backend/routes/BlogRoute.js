import express from "express";
import {
  getBlogs,
  getBlogById,
  saveBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/BlogController.js";

const router = express.Router();

// Public routes (accessible to everyone)
router.get("/admin/blogs", getBlogs); // Get all blogs
router.get("/admin/blogs/:id", getBlogById); // Get a specific blog by ID
router.post("/admin/blogs", saveBlog); // Create a new blog
router.patch("/admin/blogs/:id", updateBlog); // Update a blog
router.delete("/admin/blogs/:id", deleteBlog); // Delete a blog

export default router;
