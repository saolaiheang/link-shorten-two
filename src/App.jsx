import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './page/Landingpage';
import LoginPage from './page/Loginpage';
import SignUp from './page/SignUp';
import ShortenUrl from './page/ShortensUrl';
import DashboardPage from './page/DashboardPage';
import './App.css'
import Customaliasespage from './page/Customaliasespage';

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/shortenurls" element={<ShortenUrl/>} />
      <Route path="/dashboard" element={<DashboardPage/>} />
      <Route path="/customalaises" element={<Customaliasespage/>} />

    </Routes>
    </>
  )
}

export default App
