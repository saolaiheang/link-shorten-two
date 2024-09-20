import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import SuccessMessage from '../components/Successalert';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); 
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await fetch('https://link-shorten-two.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);  
        setShowSuccess(true);   
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/shortenurls'); 
        }, 2000); 
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };


  return (
    <>
      <Header showLoginSignup={true}/>
      <div className="flex justify-center mt-10 sm:mt-[100px]">
        <div className="w-11/12 sm:w-4/6 md:w-3/6 mx-auto mt-10 sm:mt-12 md:mt-14">
          <form onSubmit={handleLogin}>
            <h2 className="text-left text-2xl p-4 bg-blue-500 text-white mb-6">Login</h2>
            <div className="mb-4">
              <label className="block text-left text-gray-700 text-lg mb-2 sm:mb-4" htmlFor="email">
                E-Mail address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail address"
                className="shadow appearance-none border rounded w-full py-2 sm:py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-left text-gray-700 text-lg mb-2 sm:mb-4" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 sm:py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {error && (
              <div className="mb-4 text-left text-red-500">
                <p>{error}</p>
              </div>
            )}
            {showSuccess && <SuccessMessage message="Login successful!" />} 
            <div className="text-center sm:text-left">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 sm:px-8 rounded text-lg sm:text-[24px] focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
