import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './page/Landingpage';
import LoginPage from './page/Loginpage';

import './App.css'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Add more routes here as needed */}
    </Routes>
    </>
  )
}

export default App
