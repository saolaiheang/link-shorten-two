import React, { useState } from 'react';

function SuccessMessage({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md p-4 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg z-50 mt-[90px] md:mt-[90px] lg:mt-[90px]" role="alert">      <strong className="font-bold">Success!</strong>
      <span className="inline sm:inline ml-2">{message}</span>
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 mt-2 mr-2 text-green-500 hover:text-green-700"
      >
       
      </button>
    </div>
  );
}
export default SuccessMessage;
