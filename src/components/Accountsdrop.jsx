

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AccountDropdown({ profilePicUrl, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fetch user data as soon as the component mounts
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
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
            setLoading(false); // Set loading to false once data is fetched
          } else {
            console.error('Failed to fetch user data');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      }
    };

    fetchUserData(); // Fetch user data immediately on mount
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    if (onLogout) onLogout();

    navigate('/');
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
        <img
          className="rounded-full w-10 sm:w-10"
          src={profilePicUrl}
          alt="Profile"
        />
        <span className="text-white text-lg uppercase sm:text-2xl ml-2">
          {loading ? 'Loading...' : userData?.username || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-20">
          <div className="px-4 py-8 w-full text-lg text-black">
            <p>{userData?.username || 'User'}</p>
            <p>{userData?.email || 'No email available'}</p>
          </div>
          <button
            onClick={handleLogout}
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
