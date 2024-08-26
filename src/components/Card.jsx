import React from 'react';

function Card({ icon, title, description }) {
  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto p-4 sm:p-6 items-center m-4 text-center bg-white ">
      <div className="text-4xl sm:text-6xl mt-3 sm:mt-5">
        {icon}
      </div>
      <h2 className="text-lg sm:text-xl font-bold mt-4 sm:mt-6">{title}</h2>
      <p className="text-gray-600 text-sm sm:text-base mt-3 sm:mt-5">{description}</p>
    </div>
  );
}

export default Card;

