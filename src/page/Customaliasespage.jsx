
// import Header from "../components/Header";
// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import Sidebar from "../components/Sidebar";
// import Btn from "../components/Btn";
// import QRCodeComponent from "../components/Responsiveqrcode";
// import SuccessMessage from "../components/Successalert";
// import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa';

// function Customaliasespage() {
//     const [isLoggedIn, setIsLoggedIn] = useState(true);
//     const [longUrl, setLongUrl] = useState("");
//     const [alias, setAlias] = useState("");
//     const [shortenedUrl, setShortenedUrl] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//         navigate('/');
//     };
//     function copyToClipboard(text) {
//         if (navigator && navigator.clipboard) {
//             navigator.clipboard.writeText(text)
//                 .then(() => {
//                     setShowSuccessMessage(true);
//                     setTimeout(() => setShowSuccessMessage(false), 5000);
//                 })
//                 .catch((error) => {
//                     console.error('Failed to copy:', error);
//                 });
//         } else {
//             alert('Clipboard functionality not supported.');
//             console.error('Clipboard functionality not supported in this browser.');
//         }
//     }
//     function handleEdit(setLongUrl, setShortenedUrl) {
//         setShortenedUrl('');
//     }

//     function handleDelete(setLongUrl, setShortenedUrl, setAlias) {
//         setLongUrl('');
//         setShortenedUrl('');
//         setAlias('');
//     }
//     const handleSubmit = async () => {
//         const apiUrl = `${import.meta.env.VITE_API_URL}/custom/custom-aliases`;
//         const token = localStorage.getItem('token');
//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     original_link: longUrl,
//                     custom_link: alias,
//                 }),
//             });

//             const data = await response.json();

//             if (response.ok && data.code === 200) {
//                 // Set the shortened URL with the converted custom link from the response
//                 setShortenedUrl(data.data.converted_custom_link);
//             } else {
//                 setError(data.message || 'Custom link already exists');
//             }
//         } catch (error) {
//             setError('Failed to shorten URL. Please try again later.');
//         }
//     };

//     return (
//         <>
//             <Header
//                 isLoggedIn={isLoggedIn}
//                 userName="Lai heang"
//                 profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
//                 onLogout={handleLogout}
//                 showLoginSignup={false}
//             />
//             <div className="flex w-full ">
//                 <Sidebar />
//                 <div className="w-full h-auto overflow-hidden">
//                     <div className="w-[60%] max-sm:w-[90%] max-sm:items-center h-10 m-auto mt-[131px] max-sm:mt-[50px]">
//                         <h1 className="text-left text-[20px] py-4">Shorten a long URL</h1>
//                         <div className="flex gap-4 w-[100%] h-[56.1px] max-sm:h-auto">
//                             <input
//                                 type="text"
//                                 value={longUrl}
//                                 onChange={(e) => setLongUrl(e.target.value)}
//                                 placeholder="Enter long URL"
//                                 className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[60%]"
//                             />
//                         </div>
//                         <h1 className="text-left text-[20px] pt-8 max-sm:py-4 pb-4">Customize your link</h1>
//                         <div className="flex flex-wrap max-sm:flex-col gap-[57px] max-[1000px]:gap-[20px]">
//                             <input
//                                 type="text"
//                                 placeholder="https://link-shortener-frontend-gules.vercel.app/"
//                                 className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[100%] h-[56.1px] max-sm:h-[56.1px]  pointer-events-none font-extrabold "
//                                 readOnly
//                             />
//                             <input
//                                 type="text"
//                                 value={alias}
//                                 onChange={(e) => setAlias(e.target.value)}
//                                 placeholder="Enter alias"
//                                 className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[100%] h-[56.1px] max-sm:h-[56.1px]"
//                             />
//                         </div>

//                         <div className="pt-[54px] text-left">
//                             <Btn type="button-blues" text="Customs" onClick={handleSubmit} />
//                         </div>
//                         {error && <p className="text-red-500">{error}</p>}
//                         {showSuccessMessage && <SuccessMessage message="Your copy is completed!" />}
//                         {shortenedUrl && (

//                             <div className="w-full h-auto max-sm:h-auto flex max-sm:flex-col overflow-hidden  bg-white shadow-lg rounded-lg p-2 max-sm:p-1 mt-[49px] border border-gray-300 max-sm:shadow-none  max-sm:border-none max-sm:items-center">

//                                 <QRCodeComponent value={shortenedUrl} isLoggedIn={isLoggedIn} />
//                                 <div className="flex w-[100%] flex-wrap max-sm:flex-col ">

//                                     <div className="px-2 w-[80%] md:w[90%] xl:w-[80%] max-sm:w-[90%]">
//                                         <p className="text-sm sm:text-xs md:text-sm mt-2 md:mt-0 text-left maxmd:text-center max-sm:text-center overflow-hidden font-medium break-words">
//                                             <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{shortenedUrl}</a>
//                                         </p>
//                                         <p className="text-sm max-md:w-90 min-md:w-60 max-lg:w-70 sm:text-sm md:text-xs mt-1 text-left max-sm:text-center max-sm:m-auto text-gray-500 break-words">{longUrl}</p>
//                                     </div>
//                                     <div className="flex h-10 md:h-8 md:px-[30%] xl:px-1  xl:h-8 max-sm:h-8 max-sm:w-[5%] gap-2 max-sm:mt-3 max-sm:gap-1">
//                                         <button
//                                             className="px-3 py-2 bg-gray-300 flex justify-center  items-center max-sm:px-1 max-sm:py-1 text-white rounded hover:bg-gray-400"
//                                             onClick={() => copyToClipboard(shortenedUrl)}
//                                         >
//                                             <FaCopy className="mr-1" />Link
//                                         </button>

//                                         <button
//                                             className="px-1 py-2 bg-white border border-gray-300 flex justify-center items-center rounded hover:bg-gray-100"
//                                             onClick={() => handleEdit(setLongUrl, setShortenedUrl, setAlias)}
//                                         >
//                                             <FaEdit className="fill-black" />
//                                         </button>
//                                         <button
//                                             className="px-1 py-2 bg-white border border-gray-300 flex justify-center items-center rounded hover:bg-gray-100"
//                                             onClick={() => handleDelete(setLongUrl, setShortenedUrl, setAlias)}
//                                         >
//                                             <FaTrash className="fill-black" />
//                                         </button>
//                                     </div>
//                                 </div>


//                             </div>

//                         )}

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Customaliasespage;




import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import Btn from "../components/Btn";
import QRCodeComponent from "../components/Responsiveqrcode";
import SuccessMessage from "../components/Successalert";
import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa';

function Customaliasespage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [longUrl, setLongUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [error, setError] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [links, setLinks] = useState([]);
    const navigate = useNavigate();

    // Load stored links from local storage when component mounts
    useEffect(() => {
        const storedLinks = JSON.parse(localStorage.getItem('shortenedLinks')) || [];
        setLinks(storedLinks);
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    function copyToClipboard(text) {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 5000);
                })
                .catch((error) => {
                    console.error('Failed to copy:', error);
                });
        } else {
            alert('Clipboard functionality not supported.');
            console.error('Clipboard functionality not supported in this browser.');
        }
    }

    function handleEdit(index) {
        const newLinks = [...links];
        newLinks[index] = { ...newLinks[index], isEditing: true };
        setLinks(newLinks);
        setShortenedUrl('');
    }

    function handleDelete(index) {
        const newLinks = links.filter((_, i) => i !== index);
        setLinks(newLinks);
        localStorage.setItem('shortenedLinks', JSON.stringify(newLinks));
    }

    const handleSubmit = async () => {
        const apiUrl = `${import.meta.env.VITE_API_URL}/custom/custom-aliases`;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    original_link: longUrl,
                    custom_link: alias,
                }),
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                const newLink = {
                    originalLink: longUrl,
                    customLink: data.data.converted_custom_link,
                    isEditing: false
                };
                const updatedLinks = [...links, newLink];
                setLinks(updatedLinks);
                localStorage.setItem('shortenedLinks', JSON.stringify(updatedLinks));
                setShortenedUrl(data.data.converted_custom_link);
            } else {
                setError(data.message || 'Custom link already exists');
            }
        } catch (error) {
            setError('Failed to shorten URL. Please try again later.');
        }
    };

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                userName="Lai heang"
                profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
                onLogout={handleLogout}
                showLoginSignup={false}
            />
            <div className="flex w-full ">
                <Sidebar />
                <div className="w-full h-auto overflow-hidden">
                    <div className="w-[60%] max-sm:w-[90%] max-sm:items-center h-10 m-auto mt-[131px] max-sm:mt-[50px]">
                        <h1 className="text-left text-[20px] py-4">Shorten a long URL</h1>
                        <div className="flex gap-4 w-[100%] h-[56.1px] max-sm:h-auto">
                            <input
                                type="text"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                placeholder="Enter long URL"
                                className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[60%]"
                            />
                        </div>
                        <h1 className="text-left text-[20px] pt-8 max-sm:py-4 pb-4">Customize your link</h1>
                        <div className="flex flex-wrap max-sm:flex-col gap-[57px] max-[1000px]:gap-[20px]">
                            <input
                                type="text"
                                placeholder="https://link-shortener-frontend-gules.vercel.app/"
                                className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[100%] h-[56.1px] max-sm:h-[56.1px]  pointer-events-none font-extrabold "
                                readOnly
                            />
                            <input
                                type="text"
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                                placeholder="Enter alias"
                                className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[100%] h-[56.1px] max-sm:h-[56.1px]"
                            />
                        </div>

                        <div className="pt-[54px] text-left">
                            <Btn type="button-blues" text="Customs" onClick={handleSubmit} />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        {showSuccessMessage && <SuccessMessage message="Your copy is completed!" />}
                        {links.length > 0 && (
                            <div className="pt-[54px]">
                                <h2 className="text-left text-[20px] pb-4">Your Shortened Links</h2>
                                {links.map((link, index) => (
                                    <div key={index} className="w-full h-auto max-sm:h-auto flex max-sm:flex-col overflow-hidden  bg-white shadow-lg rounded-lg p-2 max-sm:p-1 mt-[49px] border border-gray-300 max-sm:shadow-none  max-sm:border-none max-sm:items-center">
                                        <QRCodeComponent value={link.customLink} isLoggedIn={isLoggedIn} />
                                        <div className="flex w-[100%] flex-wrap max-sm:flex-col">
                                            <div className="px-2 w-[80%] md:w[90%] xl:w-[80%] max-sm:w-[90%]">
                                                <p className="text-sm sm:text-xs md:text-sm mt-2 text-left maxmd:text-center max-sm:text-center overflow-hidden font-medium break-words">
                                                    <a href={link.customLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.customLink}</a>
                                                </p>
                                                <p className="text-sm max-md:w-90 min-md:w-60 max-lg:w-70 sm:text-sm md:text-xs mt-1 text-left max-sm:text-center max-sm:m-auto text-gray-500 break-words">{link.originalLink}</p>
                                            </div>
                                            <div className="flex h-10 md:h-8 md:px-[30%] xl:px-1 xl:h-8 max-sm:h-8 max-sm:w-[5%] gap-2 max-sm:mt-3 max-sm:gap-1">
                                                <button
                                                    className="px-3 py-2 bg-gray-300 flex justify-center items-center max-sm:px-1 max-sm:py-1 text-white rounded hover:bg-gray-400"
                                                    onClick={() => copyToClipboard(link.customLink)}
                                                >
                                                    <FaCopy className="mr-1" />Link
                                                </button>
                                                <button
                                                    className="px-1 py-2 bg-white border border-gray-300 flex justify-center items-center rounded hover:bg-gray-100"
                                                    onClick={() => handleEdit(index)}
                                                >
                                                    <FaEdit className="fill-black" />
                                                </button>
                                                <button
                                                    className="px-1 py-2 bg-white border border-gray-300 flex justify-center items-center rounded hover:bg-gray-100"
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    <FaTrash className="fill-black" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Customaliasespage;
