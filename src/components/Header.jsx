
import React from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './Accountsdrop';

function Header({ isLoggedIn, userName, profilePicUrl, onLogout, showLoginSignup }) {
  return (
    <header className="flex justify-between items-center h-[83px] bg-blue-600 p-4 sm:p-10">
      <Link to="/shortenurls">
        <div>
          <img
            className="rounded-full w-12 sm:w-14"
            src="https://media.licdn.com/dms/image/v2/C560BAQE55kHfjFuzlg/company-logo_200_200/company-logo_200_200/0/1631377740362?e=2147483647&v=beta&t=lwTHSGTyiLNCxcgBP36R49o1XEATmojFUK8g27vK0BY"
            alt="Logo"
          />
        </div>
      </Link>
      <nav className="flex items-center space-x-4 sm:space-x-8">
        {showLoginSignup ? (
          <>
            <Link to="/login" className="text-white p-4 text-lg sm:text-2xl hover:text-red-200">
              Login
            </Link>
            <Link to="/signup" className="text-white p-4 text-lg sm:text-2xl hover:text-red-200">
              Sign Up
            </Link>
          </>
        ) : isLoggedIn ? (
          <AccountDropdown
            userName={userName}
            profilePicUrl={profilePicUrl}
            onLogout={onLogout}
          />
        ) : null}
      </nav>
    </header>
  );
}

export default Header;


