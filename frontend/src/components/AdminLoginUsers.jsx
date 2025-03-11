import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AdminLoginUsers = () => {
  const [loginData, setLoginData] = useState([]);
  const [searchLoginData,setSearchLoginData]= useState("");
  const searchRef = useRef();
  useEffect(() => {
    getUserInAdmin();
    searchRef.current.focus();
  }, []);

  const filterUsersData = 
  loginData.length > 0 ?
  loginData.filter((val)=>(
    val.name.toLowerCase().includes(searchLoginData)
  ))
  :[];

  const token = localStorage.getItem("token")
  const getUserInAdmin = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });

      setLoginData(data.data); // ✅ Now we get ALL users from API
    } catch (error) {
      console.log(`Failed to fetch data`, error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`, {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });

      // ✅ Immediately Remove Deleted User from State (Auto Refresh)
      setLoginData(loginData.filter((user) => user._id !== id));
      console.log("User Deleted Successfully");
    } catch (error) {
      console.log("Failed to delete user", error);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 px-5 border mb-4 w-1/2 mt-8 outline-none"
          value={searchLoginData}
          onChange={(e) => setSearchLoginData(e.target.value.toLowerCase())}
          ref={searchRef}
        />
      </div>
      <h3 className="text-2xl font-medium mt-4 text-center mb-10">
        Marketing Members Data
      </h3>
      <div className="overflow-x-auto flex justify-center">
        <table className="table-auto border-collapse border border-gray-300 w-[80vw]">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">
                <button>Action</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterUsersData.length > 0 ? (
              filterUsersData.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 cursor-pointer">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLoginUsers;
