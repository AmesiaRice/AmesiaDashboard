import { useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "User" },
  ]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li className="mb-2 hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="mb-2 hover:text-gray-300 cursor-pointer">Users</li>
          <li className="mb-2 hover:text-gray-300 cursor-pointer">Settings</li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">All Users</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
