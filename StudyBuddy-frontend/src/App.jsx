import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import StudySessions from './pages/StudySessions'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/sessions" element={<StudySessions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App