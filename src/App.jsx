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
import LoginStudents from './pages/LoginStudents'

function App() {

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<LoginStudents />} />
      </Routes>

    </ BrowserRouter>
  )
}

export default App
