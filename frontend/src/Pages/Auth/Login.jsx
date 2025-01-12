import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../Redux/AuthSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      Swal.fire({
        icon: "error",
        title: "Form Tidak Lengkap",
        text: "Harap isi email dan password.",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Swal.fire({
        icon: "error",
        title: "Email Tidak Valid",
        text: "Harap masukkan email yang valid.",
      });
      return;
    }

    if (form.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Password Terlalu Pendek",
        text: "Password minimal 6 karakter.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/login", // Ganti dengan URL API konfigurasi
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.code === 200) {
        const { user, token } = response.data.data;

        // Simpan token dan update state Redux
        localStorage.setItem("auth_token", token);
        dispatch(login({ user, token }));

        // Set header otorisasi secara global
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: response.data.message,
        });

        setForm({ email: "", password: "" });
        navigate("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text:
            response.data.message || "Terjadi kesalahan, silakan coba lagi.",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan pada server.";
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-3xl font-extrabold text-white mb-6">Halaman Login</h1>
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
            aria-label="Masukkan email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
              aria-label="Masukkan password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "Sembunyikan" : "Tampilkan"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          } text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-700 transition duration-200"
          >
            Daftar sekarang
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
