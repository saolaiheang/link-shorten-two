
import { useState, useEffect } from "react";
import { FaCopy, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "../components/Successalert";

function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [linksData, setLinksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLinks, setTotalLinks] = useState(0); // Total number of links
  const itemsPerPage = 10;
  const navigate = useNavigate(); // Use navigate for redirection
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message

  async function trackClick(shortUrl) {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/count/${shortUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to track click.');
      }
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  }

  // Fetch shortened URLs and click counts from the API with token
  const getLinksData = async (page = 1) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/link_all?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.code === 200) {
        setLinksData(result.links);
        setTotalPages(result.pagination.totalPages);
        setTotalLinks(result.pagination.totalLinks);
        setCurrentPage(result.pagination.currentPage);
      }
    } catch (error) {
      console.error("Error fetching links data:", error);
    }
  };

  const handleDelete = async (shortUrl) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/links/${shortUrl}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setLinksData(linksData.filter((link) => link.short_url !== shortUrl));
        setTotalLinks(totalLinks - 1);
      } else {
        console.error("Failed to delete link");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  useEffect(() => {
    getLinksData(currentPage);
  }, [currentPage]);

  // Handle page change
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const copyToClipboard = async (text, shortUrl) => {
    if (navigator && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
        // Track click count when the URL is copied
        await trackClick(shortUrl);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    } else {
      alert("Clipboard functionality not supported.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 p-4 overflow-x-auto">
        {showSuccessMessage && <SuccessMessage message="Your copy is completed!" />}
          <div className="w-full lg:w-10/12 m-auto mt-12 border-2 border-slate-400 max-sm:overflow-scroll rounded-lg overflow-hidden">
            <table className="w-full text-sm lg:text-base">
              <thead>
                <tr className="bg-gray-200 text-center text-base lg:text-xl">
                  <th className="p-4 border font-normal">Action</th>
                  <th className="p-4 border font-normal">Shortens Links</th>
                  <th className="p-4 border font-normal">Click count</th>
                  <th className="p-4 border font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {linksData.length > 0 ? (
                  linksData.map((link, index) => (
                    <tr key={index} className="border-2 text-center">
                      <td className="p-4">
                        <button className="bg-blue-500 text-white py-1 px-3 lg:px-7 rounded-lg hover:bg-blue-600">
                          View
                        </button>
                      </td>
                      <td className="p-4">
                        <a
                          href={`https://link-shorten-two.vercel.app/api/short/${link.short_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://link-shorten-two.vercel.app/api/short/{link.short_url}
                        </a>
                      </td>
                      <td className="p-4">{link.click_count}</td>
                      <td className="p-4 flex items-center justify-center gap-2">
                        <button
                          onClick={() => copyToClipboard(`https://link-shorten-two.vercel.app/api/short/${link.short_url}`, link.short_url)}
                          className="bg-gray-200 text-gray-700 py-1 px-2 lg:px-3 rounded-lg hover:bg-gray-300 flex items-center gap-1"
                        >
                          <FaCopy /> Copy
                        </button>
                        <button className="bg-white border rounded p-2 hover:bg-gray-100 flex items-center">
                          <FaEdit className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(link.short_url)}
                          className="bg-white border rounded p-2 hover:bg-gray-100 flex items-center"
                        >
                          <FaTrash className="text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">
                      Loading....
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex  justify-end items-center mx-2 py-4">
              <button
                className={`px-4 py-2 flex rounded-lg ${currentPage === 1 ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <FaArrowLeft className="m-1" /> Previous
              </button>
              <span className="w-[100px]">{currentPage} of {totalPages}</span>

              <button
                className={`px-4 py-2 flex rounded-lg ${currentPage === totalPages ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next <FaArrowRight className="m-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
