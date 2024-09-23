
import React, { useState, useEffect } from 'react';
async function fetchExpirationDate(shortUrl) {
    const apiUrl = `${import.meta.env.VITE_API_URL}/shorten/${shortUrl}/expires`;
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch expiration date');
        }
        const data = await response.json();
        return data.expires_at;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

function ExpirationDate({ shortUrl }) {
    const [expirationDate, setExpirationDate] = useState('');
    useEffect(() => {
        if (shortUrl) {
            const getExpirationDate = async () => {
                const date = await fetchExpirationDate(shortUrl);
                setExpirationDate(date ? formatDateToDDMMYYYY(date) : 'No date');
            };

            getExpirationDate();
        }
    }, [shortUrl]);
    return (
        <>
            {expirationDate && (
                <p className="text-right text-sm text-gray-500  mt-4 max-sm:mt-5 max-sm:text-[9px]">
                    Expires on: {expirationDate}
                </p>
            )}
        </>
    );
}

export default ExpirationDate;



