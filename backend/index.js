import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import BlogRoute from "./routes/BlogRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(BlogRoute);

app.listen(5173, () => console.log("Server Up and Running..."));
