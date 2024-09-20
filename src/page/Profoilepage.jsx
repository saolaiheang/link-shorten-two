import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router";
import { useState,useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
function Profilepage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    

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
    localStorage.removeItem(`shortenedLinks_${localStorage.getItem('userId')}`);
    localStorage.removeItem('role');
    navigate('/');
  };

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                userName="Lai heang"
                profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
                onLogout={() => {
                    setIsLoggedIn(false);
                    navigate('/');
                }}
                showLoginSignup={false} />
            <div className="flex">
                <Sidebar />
                <div className="profile-container">
                    <p className="text-left font-semibold  my-[5%] text-lg">Your Profile is here!</p>
                    <div className="bg-[#F2F2F2] w-full p-4 rounded-[15px]">
                        <div className="profile-header">
                            <img
                                src="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
                                alt="Profile"
                                className="profile-image"
                            />
                            <h2 className="text-lg uppercase sm:text-2xl"> {loading ? 'Loading...' : userData?.username || 'User'}</h2>
                        </div>
                        <div className="profile-info text-left">
                            <label>Username:</label>
                            <input type="text" value={userData?.username || 'User'} readOnly />

                            <label>Email:</label>
                            <input type="email" value={userData?.email || 'No email available'} readOnly />

                           
                        </div>
                        <button className="logout-button " onClick={handleLogout}  ><FaSignOutAlt /><p>Log out</p></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profilepage;


