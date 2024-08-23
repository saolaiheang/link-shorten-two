import React from 'react';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const appName = import.meta.env.VITE_APP_NAME;
 console.log(apiUrl);
  return (
    <div>
      <h1>Welcome to {appName}</h1>
      <p>API URL: {apiUrl}</p>
    </div>
  );

}

export default App;