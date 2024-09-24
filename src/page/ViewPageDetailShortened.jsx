import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { QRCode } from "react-qrcode-logo";

function ViewPageDetail() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { shortUrl } = useParams(); // Get shortUrl from URL params
  const [linkDetails, setLinkDetails] = useState(null); // State to hold link details

  // Function to handle back button click
  const handleBackClick = () => {
    navigate("/dashboard"); // Change '/dashboard' to your actual dashboard route
  };

  // Fetch link details based on shortUrl
  const fetchLinkDetails = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/links/view/${shortUrl}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setLinkDetails(result); // Assuming result contains the link details
      } else {
        console.error("Failed to fetch link details");
      }
    } catch (error) {
      console.error("Error fetching link details:", error);
    }
  };

  useEffect(() => {
    fetchLinkDetails(); // Fetch link details on component mount
  }, [shortUrl]);

  return (
    <div className="min-h-screen ">
      <Header

        isLoggedIn={isLoggedIn}
        userName="Lai heang"
        profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
        onLogout={() => {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("role");
          localStorage.removeItem(`shortenedLinks_${localStorage.getItem("userId")}`);
          navigate("/");
        }}
        showLoginSignup={false}
      />
      <div className="flex-grow bg-gray-100 flex w-full ">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto  ">
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
            {linkDetails ? (
              <div className="space-y-4 text-gray-700 w-[90%] m-8 mx-auto">
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium">ID</span>
                  <span>{linkDetails.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium">User ID</span>
                  <span>{linkDetails.userId}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium">User Name</span>
                  <span>{linkDetails.username}</span> {/* Adjust as necessary */}
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium">Email</span>
                  <span>{linkDetails.email}</span> {/* Adjust as necessary */}
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium">Shortened Url</span>
                  <a href={`https://link-shorten-two.vercel.app/api/short/${linkDetails.shortUrl}`} className="text-blue-500 underline">
                    {`https://link-shorten-two.vercel.app/api/short/${linkDetails.shortUrl}`}
                  </a>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium">Original Url</span>
                  <a href={linkDetails.originalUrl} className="text-blue-500 underline">
                    {linkDetails.originalUrl}
                  </a>
                </div>

                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium">Expiry Date</span>
                  <span>{new Date(linkDetails.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium">Click Count</span>
                  <span>{linkDetails.clickCount}</span>
                </div>

                {/* QR Code */}
                <div className="flex justify-center mt-6">
                  <QRCode size={200} value={linkDetails.originalUrl} />
                </div>
              </div>
            ) : (
              <div className="text-center">Loading...</div> // Loading state
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ViewPageDetail;
