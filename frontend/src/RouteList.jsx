import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Earthquake from "./Pages/Admin/Earthquake";
import FeltEarthquake from "./Pages/Admin/FeltEarthquake";
import LatestEarthquake from "./Pages/Admin/LatestEarthquake";
import BlogList from "./Components/BlogList";
import AddBlog from "./Components/AddBlog";
import EditBlog from "./Components/EditBlog";
import BlogDetail from "./Components/BlogDetail";
import ProtectedRoute from "./Components/ProtectedRoute";

const RouteList = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "blogs",
        element: <BlogList />,
      },
      {
        path: "add",
        element: <AddBlog />,
      },
      {
        path: "edit/:id",
        element: <EditBlog />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetail />,
      },
      {
        path: "earthquake",
        element: <Earthquake />,
      },
      {
        path: "feltearthquake",
        element: <FeltEarthquake />,
      },
      {
        path: "latestearthquake",
        element: <LatestEarthquake />,
      },
    ],
  },
]);

export default RouteList;
