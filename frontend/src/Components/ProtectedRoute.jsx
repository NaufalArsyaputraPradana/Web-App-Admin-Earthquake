import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Melindungi rute yang hanya dapat diakses oleh pengguna yang sudah login.
 * @param {Object} children - Komponen anak yang akan dirender jika autentikasi berhasil.
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  // Jika pengguna tidak memiliki token, arahkan ke halaman login
  if (!token) {
    console.warn("User not authenticated. Redirecting to login page.");
    <Navigate to="/" replace />;
  }

  // Jika pengguna memiliki token, izinkan akses ke komponen anak
  return children;
};

export default ProtectedRoute;
