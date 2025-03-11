import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });

      // ✅ Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role); // Store role (admin/user)

      toast.success("login successfully")
      console.log("Logged in successfully", response.data);

      // Redirect user after login
      if (response.data.role === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError("Invalid email or password");
      toast.error("Invalid email or password")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen login">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Not registered? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
