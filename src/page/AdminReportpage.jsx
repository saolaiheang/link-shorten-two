import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// Example user data
const users = [
  { username: "laihheang24", active: true },
  { username: "RapidFalcon23", active: false },
  { username: "SilverLion99", active: true },
  { username: "MysticWolf45", active: false },
  { username: "BraveTiger87", active: false },
  { username: "ShadowBear34", active: true },
  { username: "StormRider56", active: false },
  { username: "ThunderHawk22", active: true },
  { username: "FireKnight68", active: false },
  { username: "SwiftShark71", active: true }
];

// Example stats
const stats = {
  totalUsers: 51,
  totalShortenedUrls: 51,
  totalClicks: 51
};

function AdminReport() {
  return (
    <div className="min-h-screen bg-white">
      <Header
        userName="Lai heang"
        profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
      />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 p-4 overflow-x-auto">
          {/* Stats Cards */}
          <div className="w-full lg:w-10/12 m-auto mt-6 flex flex-col lg:flex-row justify-between gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
              <h3 className="text-left text-xl font-bold">Total User</h3>
              <p className="text-5xl font-bold mt-4">{stats.totalUsers}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
              <h3 className="text-left text-xl font-bold">Total Shortens url</h3>
              <p className="text-5xl font-bold mt-4">{stats.totalShortenedUrls}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow border border-black w-full lg:w-1/4 h-40">
              <h3 className="text-left text-xl font-bold">Total clicks shortened url</h3>
              <p className="text-5xl font-bold mt-4">{stats.totalClicks}</p>
            </div>
          </div>

          {/* Users Table */}
          <div className="w-full lg:w-10/12 m-auto mt-12 border-2 border-slate-600 max-sm:overflow-scroll rounded-lg overflow-hidden">
            <table className="w-full text-sm lg:text-base">
              <thead>
                <tr className="bg-gray-200 text-center text-base lg:text-xl">
                  <th className="p-4 border font-normal">Action</th>
                  <th className="p-4 border font-normal">Username</th>
                  <th className="p-4 border font-normal">Active</th>
                  <th className="p-4 border font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-2 text-center">
                    <td className="p-4">
                      <button className="bg-blue-500 text-white py-1 px-3 lg:px-7 rounded-lg hover:bg-blue-600">
                        View
                      </button>
                    </td>
                    <td className="p-4">{user.username}</td>
                    <td className="p-4">
                      <span
                        className={`py-1 px-3 rounded-full ${
                          user.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.active ? "active" : "inactive"}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
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

export default AdminReport;
