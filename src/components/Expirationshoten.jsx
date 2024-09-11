
// import React, { useState, useEffect } from 'react';
// async function fetchExpirationDateShort(shortUrl) {
//     console.log(shortUrl);
//     const apiUrl = `${import.meta.env.VITE_API_URL}/short/${shortUrl}/expires`;
//     console.log('API URL:', apiUrl);
//     try {
//         const response = await fetch(apiUrl);

//         if (!response.ok) {
//             throw new Error('Failed to fetch expiration date');
//         }

//         const data = await response.json();
//         console.log(data);
//         return data.expires_at;

//     } catch (error) {
//         console.error('Error:', error);
//         return null;
//     }
// }
// function formatDateToDDMMYYYY(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getUTCDate()).padStart(2, '0');
//     const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//     const year = date.getUTCFullYear();
//     return `${day}/${month}/${year}`;
// }

// function ExpirationDates({ shortUrl }) {
//     const [expirationDates, setExpirationDate] = useState('');
//     console.log(shortUrl);
//     useEffect(() => {
//         if (shortUrl) {
//             const getExpirationDate = async () => {
//                 const date = await fetchExpirationDateShort(shortUrl);
//                 setExpirationDate(date ? formatDateToDDMMYYYY(date) : 'No date');
//             };

//             getExpirationDate();
//         }
//     }, [shortUrl]);
//     return (
//         <>
//             {expirationDates && (
//                 <p className="text-right text-sm text-gray-500  mt-4 max-sm:mt-5 max-sm:text-[9px]">
//                     Expires on: {expirationDates}
//                 </p>
//             )}
//         </>
//     );
// }

// export default ExpirationDates;



import React, { useState, useEffect } from 'react';

// Fetch expiration date based on short URL
async function fetchExpirationDateShort(shortUrl) {
    console.log(shortUrl);
    const apiUrl = `${import.meta.env.VITE_API_URL}/short/${shortUrl}/expires`;
    console.log('API URL:', apiUrl);

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch expiration date');
        }

        const data = await response.json();
        console.log(data);

        return data.expires_at;
    } catch (error) {
        console.error('Error fetching expiration date:', error);
        return null;
    }
}

// Format date to DD/MM/YYYY
function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

// ExpirationDates component
function ExpirationDates({ shortUrl }) {
    const [expirationDate, setExpirationDate] = useState(null);  // Set to null initially
    const [loading, setLoading] = useState(true);                // Track loading state
    const [error, setError] = useState(null);                    // Track any error

    useEffect(() => {
        if (shortUrl) {
            const getExpirationDate = async () => {
                setLoading(true);  // Start loading
                setError(null);    // Reset error
                const date = await fetchExpirationDateShort(shortUrl);

                if (date) {
                    setExpirationDate(formatDateToDDMMYYYY(date));
                } else {
                    setExpirationDate('No date available');
                }
                setLoading(false);  // Stop loading
            };

            getExpirationDate();
        }
    }, [shortUrl]);

    if (loading) {
        return <p className="text-right text-sm text-gray-500 mt-4">Loading expiration date...</p>;
    }

    if (error) {
        return <p className="text-right text-sm text-red-500 mt-4">Error fetching expiration date</p>;
    }

    return (
        <>
            {expirationDate && (
                <p className="text-right text-sm text-gray-500 mt-4 max-sm:mt-5 max-sm:text-[9px]">
                    Expires on: {expirationDate}
                </p>
            )}
        </>
    );
}

export default ExpirationDates;

