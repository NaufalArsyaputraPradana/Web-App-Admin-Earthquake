import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password } = form;

    // Validasi nama (minimal 3 karakter)
    if (!name || name.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Nama Tidak Valid",
        text: "Nama harus terdiri dari minimal 3 karakter.",
      });
      return false;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email Tidak Valid",
        text: "Harap masukkan email yang valid (contoh: user@example.com).",
      });
      return false;
    }

    // Validasi password (minimal 6 karakter)
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Password Terlalu Pendek",
        text: "Password harus terdiri dari minimal 6 karakter.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/register",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.code === 201) {
        Swal.fire({
          icon: "success",
          title: "Pendaftaran Berhasil",
          text: response.data.message,
        });
        setForm({ name: "", email: "", password: "" });
        navigate("/login"); // Redirect ke halaman login setelah registrasi
      } else {
        Swal.fire({
          icon: "error",
          title: "Pendaftaran Gagal",
          text: response.data.message || "Terjadi kesalahan pada server.",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan pada server. Silakan coba lagi.";
      Swal.fire({
        icon: "error",
        title: "Pendaftaran Gagal",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
      <h1 className="text-3xl font-extrabold text-white mb-6">
        Halaman Register
      </h1>
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nama
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
            placeholder="Masukkan nama"
          />
        </div>
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
            placeholder="Masukkan email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
            placeholder="Masukkan password"
          />
        </div>
        <button
          type="submit"
          className={`w-full ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
          } text-white font-semibold py-3 rounded-md hover:bg-green-700 transition duration-200`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Daftar"}
        </button>
      </form>
    </div>
  );
};

export default Register;
