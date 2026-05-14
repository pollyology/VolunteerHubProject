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
import LoginAdmin from './pages/LoginAdmin'
import Signup from './pages/Signup'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import ConfirmEvent from './pages/ConfirmEvent'
import EventCreated from './pages/EventCreated'
import EditEvent from "./pages/EditEvent";

function App() {

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<LoginStudents />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/confirm-event" element={<ConfirmEvent />} />
        <Route path="/event-created" element={<EventCreated />} />
        <Route path="/edit-event" element={<EditEvent />} />
      </Routes>

    </ BrowserRouter>
  )
}

export default App
