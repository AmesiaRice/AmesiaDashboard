import React, { useState } from "react";

const UserForm = ({ headers, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, header) => {
    setFormData({
      ...formData,
      [header]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b bg-gray-100 sticky top-0 z-10">
          <h2 className="text-xl font-bold">Add New User</h2>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {headers.map((header, index) => (
                <div key={index}>
                  <label className="block mb-1 text-gray-700">{header}</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 w-full rounded-md"
                    value={formData[header] || ""}
                    onChange={(e) => handleChange(e, header)}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t bg-gray-100 flex justify-end sticky bottom-0 z-10">
          <button
            type="button"
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
