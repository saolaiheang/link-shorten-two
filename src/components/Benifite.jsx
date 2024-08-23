import React from 'react';
import Card from './Card';
import { FaThumbsUp, FaRocket, FaShieldAlt } from 'react-icons/fa';

function BenefitsSection() {
  return (
    <>
      <p className="mt-10 text-2xl text-center">Benefits of Shortened URLs</p>
      <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-evenly w-full py-8 space-y-8 sm:space-y-0 sm:space-x-4">
        <Card
          icon={<FaThumbsUp />}
          title="Easy to Use"
          description="Our URL shortener is incredibly simple to use. Just paste your long link, and with a single click, get your shortened URL instantly."
        />
        <Card
          icon={<FaRocket />}
          title="Fast & Efficient"
          description="Experience lightning-fast link shortening with our service. No delays, just quick results every time."
        />
        <Card
          icon={<FaShieldAlt />}
          title="Secure Links"
          description="We ensure your links are safe and secure with advanced encryption and protection against spam and phishing."
        />
      </div>
    </>
  );
}

export default BenefitsSection;
