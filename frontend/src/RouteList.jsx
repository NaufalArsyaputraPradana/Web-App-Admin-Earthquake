import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Earthquake from "./Pages/Admin/Earthquake";
import LatestEarthquake from "./Pages/Admin/LatestEarthquake";
import FeltEarthquake from "./Pages/Admin/FeltEarthquake";
import AddBlog from "./Components/AddBlog";
import BlogList from "./Components/BlogList";
import EditBlog from "./Components/EditBlog";
import BlogDetail from "./Components/BlogDetail";

// Definisi daftar rute
const RouteList = createBrowserRouter([
  // Rute halaman login
  {
    path: "/",
    element: <Login />,
  },
  // Rute halaman register
  {
    path: "/register",
    element: <Register />,
  },
  // Rute tambah blog
  {
    path: "add",
    element: <AddBlog />,
  },
  {
    path: "blogs",
    element: <BlogList />,
  },
  {
    path: "edit/:id",
    element: <EditBlog />,
  },
  {
    path: "blogs/:id",
    element: <BlogDetail />,
  },

  // Rute admin (dengan proteksi)
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      // Rute dashboard utama
      {
        index: true, // Rute default untuk /admin
        element: <Dashboard />,
      },

      // Rute informasi gempa
      {
        path: "earthquake",
        element: <Earthquake />,
      },
      // Rute gempa terbaru
      {
        path: "latestearthquake",
        element: <LatestEarthquake />,
      },
      // Rute gempa dirasakan
      {
        path: "feltearthquake",
        element: <FeltEarthquake />,
      },
    ],
  },
]);

export default RouteList;
