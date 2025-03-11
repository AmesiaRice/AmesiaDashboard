import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SheetData from "./pages/SheetData";
import LiveLocation from "./pages/LiveLocation";
import Login from "./components/Login";
import Register from "./components/Register";
// import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import UploadedImage from "./components/UploadedImage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLoginUsers from "./components/AdminLoginUsers";

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {token && !isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/sheet" element={token ? <SheetData /> : <Navigate to="/login" />} />
        <Route path="/location" element={token ? <LiveLocation /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          {/* Redirect /admin to /admin/data */}
          <Route path="/admin" element={<Navigate to="/admin/data" replace />} />
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route path="data" element={<UploadedImage />} />
            <Route path="users" element={<AdminLoginUsers/>} />
          </Route>
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      {/* {token && !isAdminRoute && <Footer />} */}
    </div>
  );
};

export default App;
