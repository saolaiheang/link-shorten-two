import React, { useState } from 'react';
import Btn from "./Btn";
import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa';
import ResponsiveQRCode from './Responsiveqrcode';
import SuccessMessage from './Successalert';
import ExpirationDate from './Expiretiondate';


async function shortenUrlWithBikay(longUrl) {
  const apiUrl = `${import.meta.env.VITE_API_URL}/shorten`;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ link: longUrl })
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
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
function handleDelete(setLongUrl, setShortUrl) {
  setLongUrl('');
  setShortUrl('');
}
function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
      const shortCode = parts[parts.length - 1];
      setShortCode(shortCode);
      setShortUrl(result);

    } else {
      setError('Failed to shorten URL');
    }
    setLoading(false);
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

  return (
    <>
      <div className="w-[50% ] h-10 flex justify-center mt-10">
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          className="border-2 border-gray-300 rounded-[10px] mr-3 px-8 py-5 w-[50%]"
        />
        <Btn onClick={handleShorten} text="short" type="button-blues" />
      </div>
      {loading && <p className="mt-4">Shortening your URL...</p>}
      {showSuccessMessage && <SuccessMessage message="Your copy is completed!" />}

      {shortUrl && (

        <div className="w-full max-sm:w-[90%] md:w-[90%] lg:w-[78%] xl:w-[56.5%] m-auto h-auto max-sm:h-auto flex max-sm:flex-col overflow-hidden justify-between bg-white shadow-lg rounded-lg p-2 max-sm:p-1 mt-10 border max-sm:shadow-none max-sm:border-none border-gray-300">
          <div className="flex p-0 max-sm:flex-col max-sm:items-center">
            <div className='max-sm:p-2 px-1'>

              <ResponsiveQRCode value={shortUrl} />
            </div>


            <div className='flex flex-col max-sm:items-center ' >
              <p className="text-sm sm:text-xs md:text-lg mt-2 md:mt-0 text-left max-sm:text-center font-medium break-words">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {shortUrl}
                </a>
              </p>
              <p className="text-xs sm:text-sm md:text-sm mt-1 text-left max-sm:text-center text-gray-500 break-words">{longUrl}</p>
            </div>
          </div>
          <div className='h-20 w-[50% ] max-sm:flex max-sm:justify-between'>
            <div className="flex h-10 max-sm:h-6  max-sm:w-[5%] gap-2 max-sm:mt-3 max-sm:gap-1">
              <button
                className="px-3 py-2 bg-gray-300 flex justify-center  items-center max-sm:px-1 max-sm:py-1 text-white rounded hover:bg-gray-400"
                onClick={() => copyToClipboard(shortUrl)}
              >
                <FaCopy className="mr-1" />Link
              </button>

              <button
                className="px-0.5 py-2 bg-white border border-gray-300 flex justify-center items-center rounded hover:bg-gray-100"
                onClick={() => handleEdit(setLongUrl, setShortUrl)}
              >
                <FaEdit className="fill-black" />
              </button>
              <button
                className="px-1 py-2 bg-white border border-gray-300 flex justify-center items-center rounded hover:bg-gray-100"
                onClick={() => handleDelete(setLongUrl, setShortUrl)}
              >
                <FaTrash className="fill-black" />
              </button>
            </div>
            <ExpirationDate shortUrl={shortCode} />
          </div>
        </div>

      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

    </>
  );
}

export default UrlShortener;

