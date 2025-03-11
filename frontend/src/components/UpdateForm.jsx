import { useState, useEffect } from "react";

const UpdateForm = ({ headers, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      const initialFormData = headers.reduce((acc, header, index) => {
        acc[header] = initialData[index] || "";
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [initialData, headers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b bg-gray-100 sticky top-0 z-10">
          <h2 className="text-xl font-bold">Update Employee</h2>
        </div>

        {/* Form Content - This part will be scrollable */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit}>
            {headers.map((header, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700">{header}</label>
                <input
                  type="text"
                  name={header}
                  value={formData[header] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
            ))}
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-100 flex justify-end sticky bottom-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
