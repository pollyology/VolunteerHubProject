import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// Custom Components
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginForm from './components/LoginForm'
import LoginStudents from './pages/LoginStudents'
import LoginAdmin from './pages/LoginAdmin'
import Signup from './pages/Signup'
import Events from './pages/Events'

function App() {

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/login" element={<LoginStudents />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
      </Routes>

    </ BrowserRouter>
  )
}

export default App
