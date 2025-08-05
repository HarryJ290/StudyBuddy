import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 border border-white border-opacity-20">
          <h1 className="text-5xl font-bold text-purple-950 mb-6">
            Welcome to StudyBuddy AI
          </h1>
          <p className="text-xl text-black text-opacity-90 mb-8">
            Your intelligent study companion powered by advanced AI. Get personalized help, 
            explanations, and study guidance tailored to your learning needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-20 rounded-xl p-6 border border-white border-opacity-30">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-black font-semibold mb-2">Smart Learning</h3>
              <p className="text-black text-opacity-80 text-sm">
                Get personalized explanations and study materials
              </p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-xl p-6 border border-white border-opacity-30">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-black font-semibold mb-2">Interactive Chat</h3>
              <p className="text-black text-opacity-80 text-sm">
                Ask questions and get instant, intelligent responses
              </p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-xl p-6 border border-white border-opacity-30">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-black font-semibold mb-2">Track Progress</h3>
              <p className="text-black text-opacity-80 text-sm">
                Monitor your learning journey and study sessions
              </p>
            </div>
          </div>
          
          <Link 
            to="/chat"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Studying Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home