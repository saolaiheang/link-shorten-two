// src/pages/LoginPage.js
import React, { useState } from 'react';
import Header from '../components/Header';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Login attempted with:', { email, password });
    setError('');
  };

  return (
    <>
      <Header />
      <div className="flex justify-center mt-20 sm:mt-[100px]">
        <div className="w-full max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%] ">
          <form onSubmit={handleLogin} className="px-8 pt-6 pb-8 mb-4">
            <h2 className="text-left text-2xl p-4 bg-blue-500 text-white mb-6">Login</h2>
            <div className="mb-4">
              <label className="block text-left text-gray-700 text-lg  mb-4" htmlFor="email">
                E-Mail address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail address"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-left text-gray-700 text-lg  mb-4" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {error && (
              <div className="mb-4 text-left text-red-500">
                <p >{error}</p>
              </div>
            )}
            <div className="">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-8 rounded text-[24px] focus:outline-none focus:shadow-outline"
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
