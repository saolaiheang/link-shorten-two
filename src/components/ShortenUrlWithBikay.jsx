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
  
  // Example usage:
  shortenUrlWithBikay('https://www.example.com/very/long/url')
    .then(shortUrl => {
      if (shortUrl) {
        console.log('Shortened URL:', shortUrl);
      } else {
        console.log('Failed to shorten URL');
      }
    });
  