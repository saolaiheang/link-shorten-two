import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import axios from 'axios';

function AdminReport() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalConversions, setTotalConversions] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [topLinks, setTopLinks] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);

  const getTotal = async () => {
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post(
        'https://link-shorten-two.vercel.app/api/report/report', 
        {
          startDate: startDate,
          endDate: endDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the headers
          }
        }
      );

      const report = response.data.report;
      setTotalConversions(report.total_conversions || 0);
      setActiveUsers(report.active_users || 0);
      setTopLinks(report.top_links || []);
      setDailyStats(report.daily_stats || []);
    } catch (error) {
      console.error('Error fetching report data:', error);
      
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
              <label >Start Date:</label>
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
                className="bg-blue-500 text-white p-2 rounded"
              >
                Get Total
              </button>
            </div>
          </div>

          {/* Display Total Conversions and Active Users */}
          <div className="w-full lg:w-10/12 m-auto mt-[2%] flex flex-col lg:flex-row justify-between gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
              <h3 className="text-left text-xl font-bold">Total Conversions</h3>
              <p className="text-5xl font-bold mt-4">{totalConversions}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
              <h3 className="text-left text-xl font-bold">User activity</h3>
              <p className="text-5xl font-bold mt-4">{totalConversions}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
              <h3 className="text-left text-xl font-bold">Active Users</h3>
              <p className="text-5xl font-bold mt-4">{activeUsers}</p>
            </div>
          </div>

          {/* Display Top Links */}
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

          {/* Display Daily Stats */}
          <div className="w-full lg:w-10/12 m-auto mt-6">
            <h3 className="text-left text-xl font-bold">Daily Stats</h3>
            <div className="bg-gray-100 p-4 rounded-lg shadow border border-black mt-4">
              {dailyStats.length > 0 ? (
                dailyStats.map((stat, index) => (
                  <div key={index} className="flex justify-between mb-4">
                    <span>Date: {new Date(stat.date).toLocaleDateString()}</span>
                    <span>Conversions: {stat.conversions}</span>
                    <span>Total Clicks: {stat.total_clicks}</span>
                  </div>
                ))
              ) : (
                <p>No daily stats available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReport;
