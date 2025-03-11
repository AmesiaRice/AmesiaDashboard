import { useState } from "react";
import UploadedImage from "../components/UploadedImage";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 sticky top-0 left-0 h-screen">
        <h2 className="text-lg font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <NavLink to='/admin/data'>
          <li className="mb-2 hover:text-gray-300 cursor-pointer">Marketing Member</li>
          </NavLink>
          <NavLink to='/admin/users'>
          <li className="mb-2 hover:text-gray-300 cursor-pointer">Login Users</li>
          </NavLink>
        </ul>
      </aside>
      <Outlet/>
    </div>
  );
}
