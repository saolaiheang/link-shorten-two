
import React, { useState, useEffect } from 'react';
function AccountDropdown({ userName, profilePicUrl, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 

      if (token && isOpen && !userData) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data); 
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    if (isOpen) {
      fetchUserData(); 
    }
  }, [isOpen, userData]); 

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
        <img
          className="rounded-full w-10 sm:w-10"
          src={profilePicUrl}
          alt="Profile"
        />
        <span className="text-white text-lg uppercase sm:text-2xl ml-2">{userData ? userData.username : 'Loading...'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-20">
          <div className="px-4 py-8 w-full text-lg  text-black">
            <p>{userData ? userData.username : 'Loading...'}</p>
            <p> {userData ? userData.email : 'Loading...'}</p>
          </div>
          <button
            onClick={onLogout}
            className="block w-full px-4 py-2 text-left text-lg bg-slate-300 text-gray-700 hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
