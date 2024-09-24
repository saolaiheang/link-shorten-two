import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function ViewPageDetail() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle back button click
  const handleBackClick = () => {
    navigate("/dashboard"); // Change '/dashboard' to your actual dashboard route
  };

  return (
    <div className="min-h-screen ">
          {/* Header */}
          <Header />
      <div className="flex-grow bg-gray-100 flex w-full ">
      <Sidebar />
        {/* Content */}
        <main className=" flex-1 p-6 h-[calc(100vh-4rem)] overflow-y-auto ">
          <div className="text-left">
            <h1 className="text-2xl font-bold mb-6">View Information</h1>
            <button
              className="mb-4 px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 mt-5"
              onClick={handleBackClick} // Add the onClick handler
            >
              &lt; Back
            </button>
          </div>

          <div className="mx-auto bg-gray-200 rounded-lg shadow-md p-6 mt-[3%]">
            {/* Information Section */}
            <div className="space-y-4 text-gray-700 w-[90%] m-8 mx-auto">
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium">ID</span>
                <span>1</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium">Shortens Url</span>
                <a href="https://t.ly/g5mZ4" className="text-blue-500 underline">
                  https://t.ly/g5mZ4
                </a>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium">Longer Url</span>
                <a
                  href="https://www.figma.com/design/..."
                  className="text-blue-500 underline"
                >
                  https://www.figma.com/...
                </a>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium">Start Date</span>
                <span>27/09/2024</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium">Expiry Date</span>
                <span>27/09/2024</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium">Click Count</span>
                <span>4</span>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mt-6">
                <img
                  src="/path/to/qrcode.png"
                  alt="QR Code"
                  className="w-40 h-40 object-contain"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ViewPageDetail;
