import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// Custom Components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoginForm from './components/LoginForm'

function App() {

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* What to show on the default home page ("/") */}
        <Route path="/" element={<Home />} />
        
        {/* What to show when the URL is "/login" */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>

    </ BrowserRouter>
  )
}

export default App
