import React from 'react';

function Header() {
  return (
    <header className="flex justify-between items-center h-[83px] bg-blue-600 ">
      <div className="m-10">
        <img className='rounded-full w-14' src="https://media.licdn.com/dms/image/v2/C560BAQE55kHfjFuzlg/company-logo_200_200/company-logo_200_200/0/1631377740362?e=2147483647&v=beta&t=lwTHSGTyiLNCxcgBP36R49o1XEATmojFUK8g27vK0BY" alt="Logo"  />
      </div>
      <nav className="flex space-x-[18px] m-10">
        <a href="/login" className="text-white font-semibold text-3xl hover:text-red-200">
          login
        </a>
        <a href="/signup" className="text-white font-semibold text-3xl hover:text-red-200">
          sign up
        </a>
      </nav>
    </header>
  );
}

export default Header;