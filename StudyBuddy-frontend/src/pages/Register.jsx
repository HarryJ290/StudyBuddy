import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    setLoading(true)
    
    try {
      await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      alert('Registration successful! Please login.')
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 border border-white border-opacity-20">
          <h2 className="text-3xl font-bold text-center text-black mb-8">Register</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white bg-opacity-20 text-black placeholder-gray-500 placeholder-opacity-60 px-4 py-3 rounded-full border border-black border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
            </div>
            
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
            
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-white bg-opacity-20 text-black placeholder-gray-500 placeholder-opacity-60 px-4 py-3 rounded-full border border-black border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-black py-3 rounded-full font-medium transition-colors"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <p className="text-center text-black text-opacity-80 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-black underline hover:text-gray-200">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register