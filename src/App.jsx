import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './page/Landingpage';
import LoginPage from './page/Loginpage';
import SignUp from './page/SignUp';
import ShortenUrl from './page/ShortensUrl';
import './App.css'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/shortenurls" element={<ShortenUrl/>} />
    </Routes>
    </>
  )
}

export default App
