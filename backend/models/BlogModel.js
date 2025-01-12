import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Blog = db.define(
  "Blog",
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Blog;

(async () => {
  try {
    await db.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Database synchronization failed:", error.message);
  }
})();
