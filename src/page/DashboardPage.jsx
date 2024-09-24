import { useState, useEffect } from "react";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [linksData, setLinksData] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  const getLinksData = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch("https://link-shorten-two.vercel.app/api/link_all", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        setLinksData(result.links);
      }
    } catch (error) {
      console.error("Error fetching links data:", error);
    }
  };

  useEffect(() => {
    getLinksData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header
        isLoggedIn={isLoggedIn}
        userName="Lai heang"
        profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
        onLogout={() => {
          setIsLoggedIn(false);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('role');
          localStorage.removeItem(`shortenedLinks_${localStorage.getItem('userId')}`);
          navigate('/');
        }}
        showLoginSignup={false}
      />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 p-4 overflow-x-auto">
          <div className="w-full lg:w-10/12 m-auto mt-12 border-2 border-slate-600 max-sm:overflow-scroll rounded-lg overflow-hidden">
            <table className="w-full text-sm lg:text-base">
              <thead>
                <tr className="bg-gray-200 text-center text-base lg:text-xl">
                  <th className="p-4 border font-normal">Action</th>
                  <th className="p-4 border font-normal">Shortened Links</th>
                  <th className="p-4 border font-normal">Click count</th>
                  <th className="p-4 border font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {linksData.map((link, index) => (
                  <tr key={index} className="border-2 text-center">
                    <td className="p-4">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 lg:px-7 rounded-lg hover:bg-blue-600"
                        onClick={() => navigate('/view')} // Navigate to view page
                      >
                        View
                      </button>
                    </td>
                    <td className="p-4">
                      <a href={`https://link-shorten-two.vercel.app/api/short/${link.short_url}`} target="_blank" rel="noopener noreferrer">
                        https://link-shorten-two.vercel.app/api/short/{link.short_url}
                      </a>
                    </td>
                    <td className="p-4">{link.click_count}</td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button className="bg-gray-200 text-gray-700 py-1 px-2 lg:px-3 rounded-lg hover:bg-gray-300 flex items-center gap-1">
                        <FaCopy /> Copy
                      </button>
                      <button className="bg-white border rounded p-2 hover:bg-gray-100 flex items-center">
                        <FaEdit className="text-gray-600" />
                      </button>
                      <button className="bg-white border rounded p-2 hover:bg-gray-100 flex items-center">
                        <FaTrash className="text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
