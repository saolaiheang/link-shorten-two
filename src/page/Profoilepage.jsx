import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
function Profilepage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };
    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                userName="Lai heang"
                profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
                onLogout={handleLogout}
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
                            <h2>Lai heang</h2>
                        </div>
                        <div className="profile-info text-left">
                            <label>Username:</label>
                            <input type="text" value="Lai heang" readOnly />

                            <label>Email:</label>
                            <input type="email" value="laiheang@gmail.com" readOnly />

                            <label>Password:</label>
                            <input type="password" value="12345678" readOnly />
                        </div>
                        <button className="logout-button "><FaSignOutAlt /><p>Log out</p></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profilepage;



// import { useEffect, useState } from "react";

// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import { useNavigate } from "react-router";
// import { FaSignOutAlt } from "react-icons/fa";

// function Profilepage() {
//     const [isLoggedIn, setIsLoggedIn] = useState(true);
//     const [userData, setUserData] = useState({
//         username: "",
//         email: "",
//         password: "",
//     });

//     const navigate = useNavigate();

//     // Fetch user profile data from API
//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 const response = await axios.get('https://example.com/api/profile', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}` // If using a token
//                     }
//                 });
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error("Error fetching profile data", error);
//                 if (error.response && error.response.status === 401) {
//                     setIsLoggedIn(false);
//                     navigate('/');
//                 }
//             }
//         };

//         fetchProfileData();
//     }, [navigate]);

//     // Handle Logout
//     const handleLogout = async () => {
//         try {
//             // Optional: Call the API to handle logout on the server-side
//             await axios.post('https://example.com/api/logout', {}, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             // Clear token and set login state
//             localStorage.removeItem('token');
//             setIsLoggedIn(false);
//             navigate('/');
//         } catch (error) {
//             console.error("Error logging out", error);
//         }
//     };

//     return (
//         <>
//             <Header
//                 isLoggedIn={isLoggedIn}
//                 userName={userData.username || "Loading..."}
//                 profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
//                 onLogout={handleLogout}
//                 showLoginSignup={false} />
//             <div className="flex">
//                 <Sidebar />
//                 <div className="profile-container">
//                     <p className="text-left font-semibold my-[5%]">Your Profile is here!</p>
//                     <div className="bg-[#F2F2F2] w-full p-4 rounded-[15px]">
//                         <div className="profile-header">
//                             <img
//                                 src="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
//                                 alt="Profile"
//                                 className="profile-image"
//                             />
//                             <h2>{userData.username || "Loading..."}</h2>
//                         </div>

//                         <div className="profile-info text-left">
//                             <label>Username:</label>
//                             <input type="text" value={userData.username || "Loading..."} readOnly />

//                             <label>Email:</label>
//                             <input type="email" value={userData.email || "Loading..."} readOnly />

//                             <label>Password:</label>
//                             <input type="password" value={userData.password || "********"} readOnly />
//                         </div>

//                         <button className="logout-button" onClick={handleLogout}>
//                             <FaSignOutAlt className="mr-2" />
//                             Log out
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Profilepage;
