import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// Custom Components
import Navbar from './components/Navbar'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
    </ BrowserRouter>
  )
}

export default App
