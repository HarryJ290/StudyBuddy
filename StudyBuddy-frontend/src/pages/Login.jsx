import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await axios.post('/api/auth/login', formData)
      localStorage.setItem('token', response.data.token)
      navigate('/chat')
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please check your credentials.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 border border-white border-opacity-20">
          <h2 className="text-3xl font-bold text-center text-black mb-8">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white bg-opacity-20 text-black placeholder-gray-500 placeholder-opacity-60 px-4 py-3 rounded-full border border-black border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white bg-opacity-20 text-black placeholder-gray-500 placeholder-opacity-60 px-4 py-3 rounded-full border border-black border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-black py-3 rounded-full font-medium transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="text-center text-black text-opacity-80 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-black underline hover:text-gray-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
