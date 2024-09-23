import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

function AdminReport() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalConversions, setTotalConversions] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [topLinks, setTopLinks] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [totalUserConversions, setTotalUserConversions] = useState(0);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const getTotal = async () => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post(
        'https://link-shorten-two.vercel.app/api/admin/report', 
        {
          startDate: startDate,
          endDate: endDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );

      const report = response.data.report;
      setTotalConversions(report.total_conversions || 0);
      setActiveUsers(report.active_users || 0);
      setTopLinks(report.top_links || []);
      setUserActivity(report.user_activity || []);

      // Calculate total conversions from user_activity
      const totalConversionsFromUsers = report.user_activity.reduce((sum, user) => sum + parseInt(user.conversions, 10), 0);
      setTotalUserConversions(totalConversionsFromUsers);
      
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false); // Stop loading
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
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem(`shortenedLinks_${localStorage.getItem('userId')}`);
          navigate('/');
        }}
        showLoginSignup={false}
      />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 p-4 overflow-x-auto">
          {/* Date Filter */}
          <div className="w-full lg:w-10/12 m-auto mt-6 flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
              <button
                onClick={getTotal}
                className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable button during loading
              >
                {loading ? 'Loading...' : 'Get Total'}
              </button>
            </div>
          </div>

          {/* Loading spinner or message */}
          {loading && (
            <div className="w-full lg:w-10/12 m-auto mt-4 flex justify-center">
              <p className="text-xl font-bold">Fetching data, please wait...</p>
            </div>
          )}

          {/* Display Total Conversions and Active Users */}
          {!loading && (
            <div className="w-full lg:w-10/12 m-auto mt-[2%] flex flex-col lg:flex-row justify-between gap-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
                <h3 className="text-left text-xl font-bold">Total Conversions</h3>
                <p className="text-5xl font-bold mt-4">{totalConversions}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
                <h3 className="text-left text-xl font-bold">User Activity</h3>
                <p className="text-5xl font-bold mt-4">{totalUserConversions}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
                <h3 className="text-left text-xl font-bold">Active Users</h3>
                <p className="text-5xl font-bold mt-4">{activeUsers}</p>
              </div>
            </div>
          )}

          {/* Top Links Section */}
          {!loading && (
            <div className="w-full lg:w-10/12 m-auto mt-6">
              <h3 className="text-left text-xl font-bold">Top Links</h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow border border-black mt-4">
                {topLinks.length > 0 ? (
                  topLinks.map((link, index) => (
                    <div key={index} className="flex justify-between mb-4">
                      <span>Original URL: {link.original_url}</span>
                      <span>Short URL: {link.short_url}</span>
                      <span>Total Clicks: {link.total_clicks}</span>
                    </div>
                  ))
                ) : (
                  <p>No top links available</p>
                )}
              </div>
            </div>
          )}

{!loading && (
  <div className="w-full lg:w-10/12 m-auto mt-6">
    <h3 className="text-left text-xl font-bold">User Activity Breakdown</h3>
    <div className="border border-black rounded-lg overflow-hidden mt-4">
      <table className="min-w-full">
        <thead className="bg-gray-100 border-b  border-black">
          <tr>
            <th className="px-4 py-2 text-center text-black">Username</th>
            <th className="px-4 py-2 text-center text-black">Total Shortened</th>
            <th className="px-4 py-2 text-center text-black">Total Clicks</th>
          </tr>
        </thead>
        <tbody>
          {userActivity.length > 0 ? (
            userActivity.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-gray-600">{user.username}</td>
                <td className="px-4 py-2 text-gray-600">{user.conversions}</td>
                <td className="px-4 py-2 text-gray-600">{user.total_clicks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center text-gray-600">No user activity available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}

export default AdminReport;
