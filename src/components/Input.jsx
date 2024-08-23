
// import React, { useState } from 'react';
// import Btn from "./Btn";
// async function shortenUrlWithBikay(longUrl) {
//   const apiUrl = 'https://link-shortener-express.vercel.app/api/users';

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ longUrl })
//     });

//     if (!response.ok) {
//       throw new Error('Failed to shorten URL');
//     }

//     const data = await response.json();
//     return data.shortUrl;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

// function copyToClipboard(text) {
//   navigator.clipboard.writeText(text)
//     .then(() => {
//       alert('Shortened URL copied to clipboard!');
//     })
//     .catch((error) => {
//       console.error('Failed to copy:', error);
//     });
// }

// function handleEdit(setLongUrl, setShortUrl) {
//   setShortUrl('');  // Clear the current shortened URL so the user can edit the long URL
// }

// function handleDelete(setLongUrl, setShortUrl) {
//   setLongUrl('');   // Clear the input field
//   setShortUrl('');  // Clear the shortened URL
// }

// function UrlShortener() {
//   const [longUrl, setLongUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleShorten = async () => {
//     if (!longUrl || !longUrl.startsWith('http')) {
//       setError('Please enter a valid URL');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     const result = await shortenUrlWithBikay(longUrl);
//     if (result) {
//       setShortUrl(result);
//     } else {
//       setError('Failed to shorten URL');
//     }
//     setLoading(false);
//   };


//   return (
//     <>
//     <div className="w-[50% ] h-10 flex justify-center  mt-10">
//       <input
//         type="text"
//         value={longUrl}
//         onChange={(e) => setLongUrl(e.target.value)}
//         placeholder="Enter long URL"
//         className="border-2 border-gray-300 rounded-[10px] mr-3 px-8 py-5 w-[50%]"
//       />
//        <Btn onClick={handleShorten} text="short" type="button-blues" />
//        </div>

//       {shortUrl && (
//         <div className="mt-4">
//           <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          
          
//           </p>
//           <div className="flex space-x-2 mt-2">
//           <button 
//               className="ml-4 px-2 py-1 bg-blue-500 text-white rounded" 
//               onClick={() => copyToClipboard(shortUrl)}
//             >
//               Copy
//             </button>
//             <button 
//               className="px-2 py-1 bg-blue-500 text-white rounded" 
//               onClick={() => copyToClipboard(shortUrl)}
//             >
//               Copy
//             </button>
//             <button 
//               className="px-2 py-1 bg-yellow-500 text-white rounded" 
//               onClick={() => handleEdit(setLongUrl, setShortUrl)}
//             >
//               Edit
//             </button>
//             <button 
//               className="px-2 py-1 bg-red-500 text-white rounded" 
//               onClick={() => handleDelete(setLongUrl, setShortUrl)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       )}

//       {error && (
//         <div className="mt-4 text-red-500">
//           <p>{error}</p>
//         </div>
//       )}
    
//     </>
//   );
// }

// export default UrlShortener;



import React, { useState } from 'react';
import Btn from "./Btn";

async function shortenUrlWithBikay(longUrl) {
  const apiUrl = import.meta.env.VITE_API_URL; // Use the environment variable

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
    return data.shortUrl;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Shortened URL copied to clipboard!');
    })
    .catch((error) => {
      console.error('Failed to copy:', error);
    });
}

function handleEdit(setLongUrl, setShortUrl) {
  setShortUrl('');  // Clear the current shortened URL so the user can edit the long URL
}

function handleDelete(setLongUrl, setShortUrl) {
  setLongUrl('');   // Clear the input field
  setShortUrl('');  // Clear the shortened URL
}

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!longUrl || !longUrl.startsWith('http')) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    const result = await shortenUrlWithBikay(longUrl);
    if (result) {
      setShortUrl(result);
    } else {
      setError('Failed to shorten URL');
    }
    setLoading(false);
  };

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

      {shortUrl && (
        <div className="mt-4">
          <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <div className="flex space-x-2 mt-2">
            <button 
              className="px-2 py-1 bg-blue-500 text-white rounded" 
              onClick={() => copyToClipboard(shortUrl)}
            >
              Copy
            </button>
            <button 
              className="px-2 py-1 bg-yellow-500 text-white rounded" 
              onClick={() => handleEdit(setLongUrl, setShortUrl)}
            >
              Edit
            </button>
            <button 
              className="px-2 py-1 bg-red-500 text-white rounded" 
              onClick={() => handleDelete(setLongUrl, setShortUrl)}
            >
              Delete
            </button>
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

