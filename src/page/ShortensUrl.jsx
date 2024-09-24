import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import Btn from "../components/Btn";
import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa';
import ResponsiveQRCode from "../components/Responsiveqrcode";
import ExpirationDates from "../components/Expirationshoten";
import SuccessMessage from "../components/Successalert";

function saveLinksToLocalStorageByUserId(userId, links) {
    if (userId) {
        localStorage.setItem(`shortenedLinks_${userId}`, JSON.stringify(links));
    }
}

async function trackClick(shortUrl) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/count/${shortUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });
        if (!response.ok) {
            throw new Error('Failed to track click.');
        }
    } catch (error) {
        console.error('Error tracking click:', error);
    }
}

async function fetchUserLinks() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/short/linked`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch user links. Status: ${response.status}`);
        }
        const data = await response.json();
        const linksArray = Object.keys(data.list_of_converted_links).map((longUrl) => ({
            longUrl: longUrl,
            shortUrl: `${import.meta.env.VITE_API_URL}/short/${data.list_of_converted_links[longUrl]}`
        }));
        return linksArray;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


async function shortenUrlWithBikay(longUrl) {
    const apiUrl = `${import.meta.env.VITE_API_URL}/short/convert`;
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ link: longUrl })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to shorten URL. Status: ${response.status}`);
        }

        const data = await response.json();
        return data.shortened_link;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function handleEdit(setLongUrl, setShortUrl) {
    setShortUrl('');
}

function handleDelete(setLongUrl, setShortUrl, index, links, setLinks) {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    const userId = localStorage.getItem('userId');
    saveLinksToLocalStorageByUserId(userId, updatedLinks);
    setLongUrl('');
    setShortUrl('');
}

function ShortenUrl() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [shortCode, setShortCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            const userLinks = await fetchUserLinks();
            setLinks(userLinks);
        };
        fetchLinks();
    }, []);

    const handleShorten = async () => {
        if (!longUrl || !longUrl.startsWith('http')) {
            setError('Please enter a valid URL');
            return;
        }

        setLoading(true);
        setError('');
        const result = await shortenUrlWithBikay(longUrl);

        if (result) {
            const urlObj = new URL(result);
            const pathname = urlObj.pathname;
            const parts = pathname.split('/');
            const shortCodes = parts[parts.length - 1];
            setShortCode(shortCodes);
            setShortUrl(result);

            const newLink = { longUrl, shortUrl: result };
            setLinks([newLink, ...links]);
        } else {
            setError('Failed to shorten URL');
        }
        setLoading(false);
    };

    const copyToClipboard = async (text, shortUrl) => {
        if (navigator && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 5000);
                // Track click count when the URL is copied
                await trackClick(shortUrl.split('/').pop());
            } catch (error) {
                console.error("Failed to copy:", error);
            }
        } else {
            alert("Clipboard functionality not supported.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);


    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                userName="Lai heang"
                profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
                onLogout={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('role');
                    localStorage.removeItem(`shortenedLinks_${localStorage.getItem('userId')}`);
                    navigate('/');
                }}
                showLoginSignup={false}
            />
            <div className="flex w-full">
                <Sidebar />
                <div className="w-[90%] md:w-[95%] lg:w-[80%] mx-auto h-auto overflow-hidden">
                    <div className="w-[93%] max-sm:w-[90%] max-sm:items-center h-10 mx-[4%] max-sm:mx-[4%] mt-10">
                        <div className="flex gap-4 w-[100%] h-10">
                            <input
                                type="text"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                placeholder="Enter long URL"
                                className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[60%] h-full"
                            />
                            <Btn onClick={handleShorten} text="short" type="button-short" />
                        </div>
                        {loading && <p className="mt-4">Shortening your URL...</p>}
                        {showSuccessMessage && <SuccessMessage message="Your copy is completed!" />}

                        {links.length > 0 && (
                            <div className="mt-10">
                                {links.map((link, index) => (
                                    <div key={index} className="w-full h-[130px] max-sm:h-auto flex max-sm:flex-col overflow-hidden justify-between bg-white shadow-lg rounded-lg p-2 max-sm:p-1 mt-10 border max-sm:shadow-none max-sm:border-none border-gray-300">
                                        <div className="flex p-0 max-sm:flex-col max-sm:items-center">
                                            <div className="max-sm:p-2 px-1">
                                                <ResponsiveQRCode value={link.shortUrl} isLoggedIn={isLoggedIn} />
                                            </div>
                                            <div className="flex flex-col h-auto md:px-2 max-sm:items-center overflow-hidden">
                                                <p className="text-sm sm:text-xs md:text-lg mt-2 md:mt-0 text-left max-sm:text-center overflow-hidden font-medium break-words">
                                                    <a href={link.shortUrl} onClick={() => handleUrlClick(link.shortUrl)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        {link.shortUrl}
                                                    </a>
                                                </p>
                                                <p className="text-sm max-md:w-40 min-md:w-60 max-lg:w-70 sm:text-sm md:text-xs lg:text-sm mt-1 text-left max-sm:text-center text-gray-500 break-words">
                                                    {link.longUrl}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-20 w-[50% ] max-sm:flex max-sm:justify-between">
                                            <div className="flex h-10 max-sm:h-6 max-sm:w-[5%] gap-2 max-sm:mt-3 max-sm:gap-1">
                                                <button
                                                    className="px-3 py-2 bg-gray-300 flex justify-center items-center max-sm:px-1 max-sm:py-1 text-white rounded hover:bg-gray-400"
                                                    onClick={() => copyToClipboard(link.shortUrl, link.shortUrl)}
                                                >
                                                    <FaCopy className="mr-1" />Link
                                                </button>
                                                <button
                                                    className="px-1 py-2 bg-white border border-gray-300 flex justify-center items-center rounded hover:bg-gray-100"
                                                    onClick={() => handleEdit(setLongUrl, setShortUrl)}
                                                >
                                                    <FaEdit className="fill-black" />
                                                </button>
                                                <button
                                                    className="px-1 py-2 bg-white border border-gray-300 flex justify-center items-center rounded hover:bg-gray-100"
                                                    onClick={() => handleDelete(setLongUrl, setShortUrl, index, links, setLinks)}
                                                >
                                                    <FaTrash className="fill-black" />
                                                </button>
                                            </div>
                                            <ExpirationDates shortUrl={link.shortUrl.split('/').pop()} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 text-red-500">
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShortenUrl;
