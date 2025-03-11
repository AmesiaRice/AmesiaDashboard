import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function UploadedImage({ imageUrl }) {
  const [data, setData] = useState([]); // ✅ Correct state
  const [searchPerAdmin, setSearchperAdmin] = useState("");

  const SearchPersonRef = useRef(null);

  useEffect(() => {
    SearchPersonRef.current.focus();
    getData();
  }, []);

  // ✅ Fetch data from API
  const getData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/location/data"
      );
      setData(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // ✅ Delete function with UI update
  const DeleteLocationData = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/auth/location/data/${id}`
      );

      // ✅ Update UI after delete
      setData((prevData) => prevData.filter((item) => item._id !== id));

      console.log("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // ✅ Search filter
  const filterLocationData =
    data.length > 0
      ? data.filter((row) =>
          typeof row == "object" && row !== null
            ? Object.values(row).some(
                (cell) =>
                  typeof cell === "string" &&
                  cell.toLowerCase().includes(searchPerAdmin)
              )
            : false
        )
      : [];

  return (
    <div>
      <div className="text-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 px-5 border mb-4 w-1/2 mt-8 outline-none"
          value={searchPerAdmin}
          onChange={(e) => setSearchperAdmin(e.target.value.toLowerCase())}
          ref={SearchPersonRef}
        />
      </div>
      <h3 className="text-2xl font-medium mt-4 text-center">
        Marketing members Data
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filterLocationData?.map((val) => (
          <div key={val._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={val.imageUrl}
              alt={val.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-3">
              <h2 className="text-lg font-semibold">{val.name}</h2>
              <p className="text-gray-600">{val.location}</p>
              <p className="text-gray-600">{val.pincode}</p>
              <p className="text-sm text-gray-500">
                Lat: {val.latitude}, Lng: {val.longitude}
              </p>
              <p>{val.date}</p>
              <a
                href={`https://www.google.com/maps?q=${val.latitude},${val.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Location
              </a>
              <button
                onClick={() =>
                  shareOnWhatsApp(val.name, val.latitude, val.longitude)
                }
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-2"
              >
                WhatsApp
              </button>
              <button
                onClick={() => DeleteLocationData(val._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadedImage;
