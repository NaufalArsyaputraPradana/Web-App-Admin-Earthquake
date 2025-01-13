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
        dispatch(logout());
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
      // Token tidak ditemukan atau kadaluarsa
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

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-5">Aplikasi Awas Gempa Bumi!</h1>
          <hr />
          <nav className="mt-6">
            <ul>
              <li className="hover:bg-indigo-800 mt-2 rounded-md">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive
                      ? "block p-2 bg-indigo-700 rounded-md"
                      : "block p-2"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="hover:bg-indigo-800 mt-2 rounded-md">
                <NavLink
                  to="/admin/latestearthquake"
                  className={({ isActive }) =>
                    isActive
                      ? "block p-2 bg-indigo-700 rounded-md"
                      : "block p-2"
                  }
                >
                  Gempa Bumi Terbaru
                </NavLink>
              </li>
              <li className="hover:bg-indigo-800 mt-2 rounded-md">
                <NavLink
                  to="/admin/earthquake"
                  className={({ isActive }) =>
                    isActive
                      ? "block p-2 bg-indigo-700 rounded-md"
                      : "block p-2"
                  }
                >
                  Gempa Bumi Terkini
                </NavLink>
              </li>
              <li className="hover:bg-indigo-800 mt-2 rounded-md">
                <NavLink
                  to="/admin/feltearthquake"
                  className={({ isActive }) =>
                    isActive
                      ? "block p-2 bg-indigo-700 rounded-md"
                      : "block p-2"
                  }
                >
                  Daftar Gempa Bumi
                </NavLink>
              </li>
              
              <li className="hover:bg-indigo-800 mt-2 rounded-md">
                <NavLink
                  to="/admin/blogs"
                  className={({ isActive }) =>
                    isActive
                      ? "block p-2 bg-indigo-700 rounded-md"
                      : "block p-2"
                  }
                >
                  List Berita
                </NavLink>
              </li>
              <li className="hover:bg-indigo-800 mt-2 rounded-md">
                <NavLink
                  to="/admin/add"
                  className={({ isActive }) =>
                    isActive
                      ? "block p-2 bg-indigo-700 rounded-md"
                      : "block p-2"
                  }
                >
                  Buat Berita
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col bg-blue-50">
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <p>
              Welcome, <strong>{user?.name}</strong> ({user?.email})
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
        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2025 Aplikasi Awas Gempa! All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
