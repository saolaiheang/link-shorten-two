import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './page/Landingpage'

import './App.css'

function App() {
 

  return (
    <>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Add more routes here as needed */}
    </Routes>
    </>
  )
}

export default App
