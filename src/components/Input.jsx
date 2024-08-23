// import React from "react";
// import Btn from "./Btn";
// function Input(){
//     return (
//         <>
//         <div className="w-[50% ] h-10 flex justify-center  mt-10">
//         <input
//       type="text"
//       placeholder="put your long link here"
//       className="border-2 border-gray-300 rounded-[10px] mr-3 px-8 py-5 w-[50%]"
//      />
//         <Btn onClick={() => navigate('')} text="short" type="button-blues" />

//         </div>
//         </>
//     )
// }
// export default Input;



import React, { useState } from 'react';
import Btn from "./Btn";

// Function to interact with Bikay's API
async function shortenUrlWithBikay(longUrl) {
  const apiUrl = 'https://your-bikay-service.com/api/shorten'; // Replace with your Bikay API endpoint

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ longUrl })
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const data = await response.json();
    return data.shortUrl; // Assuming the API returns the shortened URL in a `shortUrl` field
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    setError('');  // Clear any previous errors
    const result = await shortenUrlWithBikay(longUrl);
    if (result) {
      setShortUrl(result);
    } else {
      setError('Failed to shorten URL');
    }
  };

  return (
    <>
    <div className="w-[50% ] h-10 flex justify-center  mt-10">
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter long URL"
        className="border-2 border-gray-300 rounded-[10px] mr-3 px-8 py-5 w-[50%]"
      />
       <Btn onClick={handleShorten} text="short" type="button-blues" />
       </div>

      {shortUrl && (
        <div className="mt-4">
          <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
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
