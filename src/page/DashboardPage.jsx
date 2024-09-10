import { useState } from "react";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Cities");

  return (
    <div className="min-h-screen bg-white">
      <Header
        userName="Lai heang"
        profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
      />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 p-4 overflow-x-auto">
          {/* First Table */}
          <div className="w-full lg:w-10/12 m-auto mt-12 border-2 border-slate-600 max-sm:overflow-scroll rounded-lg overflow-hidden">
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-2 text-center">
                    <td className="p-4">
                      <button className="bg-blue-500 text-white py-1 px-3 lg:px-7 rounded-lg hover:bg-blue-600">
                        View
                      </button>
                    </td>
                    <td className="p-4">https://bit.ly/3Xb7hRy</td>
                    <td className="p-4">2</td>
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

          {/* Second Table */}
          <div className="w-full lg:w-10/12 m-auto mt-12 border-2 border-slate-600 rounded-lg overflow-hidden">
            <h2 className="font-bold text-lg mb-4 text-left pt-2 px-12">
              Click + scan by Geographic data
            </h2>

            {/* Tabs */}
            <div className="flex mb-4 w-11/12 m-auto border border-slate-400 rounded-full overflow-hidden">
              <button
                className={`flex-1 py-2 transition-colors text-center text-2xl ${
                  activeTab === "Countries"
                    ? "bg-gray-100 text-gray-700 rounded-full border border-gray-300"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveTab("Countries")}
              >
                Countries
              </button>
              <button
                className={`flex-1 py-2 transition-colors text-center text-2xl ${
                  activeTab === "Cities"
                    ? "bg-gray-100 text-gray-700 rounded-full border border-gray-300"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveTab("Cities")}
              >
                Cities
              </button>
            </div>

            {/* Responsive Table */}
            <table className="w-full lg:w-11/12 m-auto text-sm lg:text-base">
              <thead>
                <tr className="text-center text-base lg:text-xl text-gray-500">
                  <th className="py-2 font-normal">#</th>
                  <th className="py-2 font-normal">City</th>
                  <th className="py-2 font-normal">Clicks+scans</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 font-semibold">1</td>
                  <td className="py-1">PhnomPenh</td>
                  <td className="py-1">20</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold">2</td>
                  <td className="py-1">New York</td>
                  <td className="py-1">15</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold">3</td>
                  <td className="py-1">Tokyo</td>
                  <td className="py-1">15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;
