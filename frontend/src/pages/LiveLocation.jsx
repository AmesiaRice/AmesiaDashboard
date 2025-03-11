import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

function LiveLocation() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(""); // Manual location entry
  const [pincode, setPincode] = useState(""); // Manual Pincode entry
  const [coordinates, setCoordinates] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // Store uploaded image URL

  // Start camera
  const startCamera = async () => {
    setIsCameraOn(true);
    toast.success("Camera opened!");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // Capture image + fetch location
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 320, 240);
      setCapturedImage(canvasRef.current.toDataURL("image/png"));
      toast.success("Image captured!");
      stopCamera();

      // Get current location when capturing image
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoordinates({ latitude: lat, longitude: lng });

          console.log("Captured Location:", { latitude: lat, longitude: lng });
          toast.success("Location captured!");
        },
        (error) => {
          console.error("Geolocation Error:", error);
          toast.error("Failed to fetch location.");
        },
        { enableHighAccuracy: true }
      );
    }
  };

  // Stop camera
  const stopCamera = () => {
    setIsCameraOn(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  // Submit form

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!capturedImage) {
    toast.error("Please capture an image before submitting.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("location", location);
  formData.append("pincode", pincode);
  formData.append("latitude", coordinates?.latitude || "");
  formData.append("longitude", coordinates?.longitude || "");

  // Convert base64 to Blob and append to FormData
  const response = await fetch(capturedImage);
  const blob = await response.blob();
  formData.append("image", blob, "captured-image.png");

  try {
    const res = await fetch("http://localhost:5000/api/location/upload", { // Changed port to 5000
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      console.log("Response from Server:", data);

      if (res.ok) {
        toast.success("Data submitted successfully!");
        setUploadedImageUrl(data.imageUrl); // Store image URL to display it

        // Reset form
        setCoordinates(null);
        setCapturedImage(null);
        setLocation("");
        setPincode("");
        setName("");
      } else {
        toast.error("Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Error parsing JSON:", text);
      toast.error("Server returned invalid JSON.");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    toast.error("Server error.");
  }
};

  

  return (
    <div className="w-[100%] h-full location">
    <div className=" max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-bold mb-4">User Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Exact Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your exact location"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Exact Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your exact location"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium pb-2">Capture Live Image</label>
          {isCameraOn ? (
            <div>
              <video ref={videoRef} autoPlay className="w-full h-40 bg-gray-200"></video>
              <button
                type="button"
                onClick={captureImage}
                className="mt-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Capture Image
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={startCamera}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Open Camera
            </button>
          )}
          <canvas ref={canvasRef} className="hidden" width="320" height="240"></canvas>
        </div>

        {/* Captured Image Preview */}
        {capturedImage && (
          <div>
            <label className="block text-sm font-medium">Captured Image</label>
            <img src={capturedImage} alt="Captured" className="mt-2 w-32 h-32 object-cover rounded-lg" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Captured Coordinates</label>
          <p className="text-gray-700">
            {coordinates
              ? `Lat: ${coordinates.latitude}, Lng: ${coordinates.longitude}`
              : "Location will be captured when taking a picture."}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default LiveLocation;
