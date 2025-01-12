import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../Pages/Redux/AuthSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fungsi logout
  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan keluar dari akun ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth_token"); // Hapus token
        dispatch(logout()); // Update state Redux
        Swal.fire("Logout Berhasil", "Anda telah keluar.", "success").then(
          () => {
            navigate("/"); // Redirect ke halaman login
          }
        );
      }
    });
  };

  // Validasi token di localStorage
  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Silakan login kembali untuk mengakses halaman ini.",
      }).then(() => {
        localStorage.removeItem("auth_token");
        navigate("/"); // Redirect ke halaman login
      });
    }
  }, [navigate]);

  // Menu Sidebar
  const menuItems = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/earthquake", label: "Gempa Terbaru" },
    { to: "/admin/latestearthquake", label: "Gempa Terkini" },
    { to: "/admin/feltearthquake", label: "Gempa Dirasakan" },
    { to: "/add", label: "Buat Blog" },
    { to: "/blogs", label: "List Blog" },
  ];

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Website Data Gempa Bumi</h1>
          <nav className="mt-6">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="hover:bg-indigo-800 mt-2 rounded-md">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? "block p-2 bg-indigo-700 rounded-md"
                        : "block p-2"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col bg-blue-50">
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <p>
              Welcome, <strong>{user?.name}</strong>
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
