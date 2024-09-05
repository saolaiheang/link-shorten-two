import React, { useState } from 'react';

function AccountDropdown({ userName, profilePicUrl, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
        <img
          className="rounded-full w-10 sm:w-10"
          src={profilePicUrl}
          alt="Profile"
        />
        <span className="text-white text-lg sm:text-2xl ml-2">{userName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <div className="px-4 py-2 w-full text-sm text-gray-700">
            <p>{userName}</p>
            <p>Email: example@example.com</p> {/* Add any additional info here */}
          </div>
          <button
            onClick={onLogout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
