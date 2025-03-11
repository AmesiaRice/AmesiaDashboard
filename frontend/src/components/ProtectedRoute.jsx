import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token"); // Check if user is logged in
  const userRole = localStorage.getItem("role"); // Get user role ("user" or "admin")

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect non-admins trying to access /admin
  }

  return <Outlet />; // Render the protected route if conditions are met
};

export default ProtectedRoute;
