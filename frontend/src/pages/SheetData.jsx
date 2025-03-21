import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import EmployeeModal from "../components/EmployeeModal"; // Import Modal Component
import UserForm from "../components/UserForm"; // Import UserForm Component
import UpdateForm from "../components/UpdateForm"; // Import UpdateForm Component
import Tabs from "../components/Tabs";

const clientId =
  "434880690733-aq7emrn4cggbdram9pi4rg4u84h1thg0.apps.googleusercontent.com";

const SheetData = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false); // State to manage UserForm visibility
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false); // State to manage UpdateForm visibility
  const [editRowData, setEditRowData] = useState(null); // State to store data of the row being edited
  const searchInputRef = useRef(null); // Create a ref for the search input
  const [activeTab, setActiveTab] = useState("All"); // Track selected tab
  const imgColumnIndex = 2; // Column index for Img
  useEffect(() => {
    fetchData();
    searchInputRef.current.focus(); // Focus the search input when the component mounts
  }, []);

  const handleLoginSuccess = async (response) => {
    console.log("Google Login Success:", response);
    try {
      window.location.href = "http://localhost:5000/auth";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/sheets");
      setData(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        setFlag(true);
      }
    }
  };

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/status");
      return res.data.authenticated;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return false;
    }
  };

  // const handleSubmit = async (selectedValues) => {
  //   console.log("Submitted Employee:", selectedEmployee);
  //   console.log("Selected Values:", selectedValues);
  //   handleCloseModal();

  //   const isAuthenticated = await checkAuthStatus();
  //   if (!isAuthenticated) {
  //     console.error("User is not authenticated");
  //     return;
  //   }

  //   try {
  //     const {data}=await axios.post("http://localhost:5000/submit", {
  //       employee: selectedEmployee,
  //       selections: selectedValues,
  //     });
  //     console.log('data is :',data);
  //     if(data.success){
  //     alert("Data submitted successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  const filteredData =
  data.length > 0
    ? data
        .slice(1)
        .filter((row) => {
          const partyStatusIndex = 3; // Adjust if needed
          const partyStatus = row[partyStatusIndex]?.toLowerCase().trim(); // Ensure clean comparison

          // console.log("Party Status:", partyStatus); // Debugging output

          if (activeTab === "Old") return partyStatus === "old enrolled";
          if (activeTab === "New") return partyStatus === "new enrolled"; // Check actual value
          if (activeTab === "Meeting") return partyStatus === "meeting";
          return true; // "All" tab shows everything
        })
        .filter((row) =>
          row.some(
            (cell) =>
              typeof cell === "string" &&
              cell.toLowerCase().includes(searchTerm)
          )
        )
    : [];


      filteredData.reverse((a,b)=> b-a);

  const handleFormSubmit = () => {
    setIsUserFormOpen(true); // Open the UserForm
  };

  // const handleEditClick = (row) => {
  //   setEditRowData(row);
  //   setIsUpdateFormOpen(true); // Open the UpdateForm for editing
  // };

  const handleUserFormSubmit = async (formData) => {
    setIsUserFormOpen(false); // Close the UserForm
    console.log("form data is :",formData)
    const isAuthenticated = await checkAuthStatus();
    if (!isAuthenticated) {
      console.error("User is not authenticated");
      return;
    }

    try {
      // Add new row
      const {data} =await axios.post("http://localhost:5000/submitSameSheet", {
        employee: formData,
      });
      fetchData(); // Refresh data after submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // const handleUpdateFormSubmit = async (formData) => {
  //   setIsUpdateFormOpen(false); // Close the UpdateForm
  //   const isAuthenticated = await checkAuthStatus();
  //   if (!isAuthenticated) {
  //     console.error("User is not authenticated");
  //     return;
  //   }

  //   try {
  //     // Update existing row
  //     await axios.post("http://localhost:5000/updateRow", {
  //       originalRow: editRowData,
  //       updatedRow: formData,
  //     });
  //     fetchData(); // Refresh data after submission
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //   } finally {
  //     setEditRowData(null);
  //   }
  // };

  const handleUserFormClose = () => {
    setIsUserFormOpen(false); // Close the UserForm
  };

  // const handleUpdateFormClose = () => {
  //   setIsUpdateFormOpen(false); // Close the UpdateForm
  // };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {flag && (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
          />
        )}

        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 px-5 border  mb-4 w-1/2 mt-8 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            ref={searchInputRef} // Attach the ref to the search input
          />

          <button
            className="bg-red-600 py-2 px-5 text-white"
            onClick={handleFormSubmit}
          >
            {" "}
            Add +{" "}
          </button>
        </div>

        {/* Tab for list contain new , old , meeting , and All data */}
        <Tabs setActiveTab={setActiveTab} />

        {/* Table */}
        <div  className=" w-full max-w-full overflow-x-auto">
          {filteredData.length > 0 && (
            <table className="mt-4 border-collapse border border-gray-400 max-w-full overflow-auto">
              <thead>
                <tr className="bg-gray-200">
                  {data[0].slice(0,11).map((header, index) => (
                    <th key={index} className="border border-gray-400 p-2">
                      {header}
                    </th>
                  ))}
                  <th className="border border-gray-400 p-2">Actions</th>{" "}
                  {/* Add Actions column */}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleClick(row)}
                  >
                    {row.slice(0,11).map((cell, cellIndex) => (
                     <td key={cellIndex} className="border border-gray-400 px-12 py-4 min-w-[200px] h-[150px]">
                     {cellIndex === imgColumnIndex && typeof cell === "string" && cell.startsWith("http") ? (
                       <img src={cell} alt="Uploaded" className="w-48 h-32 object-cover rounded-lg" />
                     ) : (
                       cell || "—"
                     )}
                   </td>
                    ))}
                    <td className="border border-gray-400 px-12 py-4">
                      <button
                        className="bg-blue-500 text-white p-2"
                        // onClick={() => handleEditClick(row)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* User Form */}
        {isUserFormOpen && (
          <UserForm
            headers={data[0]}
            onSubmit={handleUserFormSubmit}
            onClose={handleUserFormClose}
          />
        )}

      </div>
    </GoogleOAuthProvider>
  );
};

export default SheetData;
