// src/LandingPage.js
import React from 'react';
import Header from '../components/Header';
import Btn from '../components/Btn';
import Input from '../components/Input';
import BenefitsSection from '../components/Benifite';
import { Navigate, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
        <Header/>
      <h1 className='text-black font-bold text-4xl mt-12'>Create Short Urls</h1>
      <div className='max-w-[100%] m-auto'>
      <p className='mt-10 text-2xl '><span className='font-somibold text-2xl'>BIKAY</span> is the World's Shortest Link Shortener service to track, brand, and share short URLs.</p>
      </div>
      <div className='mt-10'>
      <Btn onClick={() => navigate('/signup')} text="Get Started" type="button-blue"  />
      </div>
        <Input/>
        <BenefitsSection/>
    </div>
  );
}

export default LandingPage;
