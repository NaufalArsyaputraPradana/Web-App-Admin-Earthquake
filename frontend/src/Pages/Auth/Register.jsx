import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Form Tidak Lengkap",
        text: "Harap isi semua field.",
      });
      return false;
    }

    // Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email Tidak Valid",
        text: "Harap masukkan email yang valid (contoh: user@example.com).",
      });
      return false;
    }

    // Validasi password minimal 6 karakter
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

    // Validasi form sebelum submit
    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Mulai loading

    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/register",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.code === 201) {
        Swal.fire({
          icon: "success",
          title: "Daftar Berhasil",
          text: response.data.message,
        });
        setForm({ name: "", email: "", password: "" }); // Reset form
        navigate("/"); // Redirect ke halaman login
      }
    } catch (error) {
      // Penanganan error yang lebih spesifik
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan, silakan coba lagi.";
      Swal.fire({
        icon: "error",
        title: "Daftar Gagal",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false); // Berhenti loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-3xl font-extrabold text-white mb-6">
        Halaman Register
      </h1>
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div>
          <button
            type="submit"
            className={`w-full ${
              isLoading ? "bg-gray-400" : "bg-blue-600"
            } text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200`}
            disabled={isLoading} // Disable button saat loading
          >
            {isLoading ? "Loading..." : "Daftar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
