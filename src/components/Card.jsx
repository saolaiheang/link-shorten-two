import React from 'react';

function Card({ icon, title, description }) {
  return (
    <div className="flex flex-col w-[394.26px] h-[362px] items-center mt-10 p-2 border rounded-lg shadow-lg text-center">
      <div className="text-6xl mt-5 ">
        {icon}
      </div>
      <h2 className="text-xl font-bold mt-5">{title}</h2>
      <p className="text-gray-600 text-center  mt-5">{description}</p>
    </div>
  );
}

export default Card;
