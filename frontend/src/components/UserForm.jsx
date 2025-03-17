import React, { useState, useEffect, useRef } from "react";

const UserForm = ({ headers, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    headers.reduce((acc, header) => ({ ...acc, [header]: "" }), {})
  );
  
  const [imagePreview, setImagePreview] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (headers.includes("Lat") && headers.includes("Lng")) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            Lat: prev.Lat || position.coords.latitude,
            Lng: prev.Lng || position.coords.longitude,
          }));
        },
        (error) => console.error("Geolocation Error:", error)
      );
    }
  }, [headers]);

  const handleChange = (e, header) => {
    setFormData({
      ...formData,
      [header]: e.target.value,
    });
  };

  const openCamera = async () => {
    setCameraOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.7);
    setImagePreview(imageDataUrl);
    uploadToCloudinary(imageDataUrl);
    
    video.srcObject.getTracks().forEach((track) => track.stop());
    setCameraOpen(false);
  };

  const uploadToCloudinary = async (imageDataUrl) => {
    try {
      // Convert Base64 Data URL to Blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ImageUploader"); // 👈 Replace with actual preset name
  
      const res = await fetch("https://api.cloudinary.com/v1_1/dybimchzg/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      console.log("Cloudinary Response:", data);
  
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, Img: data.secure_url }));
      } else {
        console.error("Cloudinary Upload Failed:", data);
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b bg-gray-100 sticky top-0 z-10">
          <h2 className="text-xl font-bold">Add New User</h2>
        </div>
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {headers.map((header, index) => (
                <div key={index}>
                  <label className="block mb-1 text-gray-700">{header}</label>
                  {header === "Img" ? (
                    <>
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Captured"
                          className="mt-2 w-full h-32 object-cover rounded-md"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={openCamera}
                          className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                          Capture Image
                        </button>
                      )}
                    </>
                  ) : (
                    <input
                      type="text"
                      className="p-2 border border-gray-300 w-full rounded-md"
                      value={formData[header] || ""}
                      onChange={(e) => handleChange(e, header)}
                      readOnly={header === "Lat" || header === "Lng"}
                    />
                  )}
                </div>
              ))}
            </div>
          </form>
        </div>
        {cameraOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <video ref={videoRef} autoPlay className="w-full h-64"></video>
              <canvas ref={canvasRef} className="hidden"></canvas>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCameraOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={captureImage}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Capture
                </button>
              </div>
            </div>
          </div>
        )}
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