import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <nav className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-black text-xl font-bold">
              🤖 StudyBuddy AI
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/chat" 
              className="text-black hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Chat
            </Link>
            <Link 
              to="/sessions" 
              className="text-black hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sessions
            </Link>
            
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar