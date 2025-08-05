import React, { useState, useEffect } from 'react'
import axios from 'axios'

const StudySessions = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await axios.get('/api/sessions')
      setSessions(response.data.sessions || [])
    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
    setLoading(false)
  }

  const createNewSession = async () => {
    try {
      const response = await axios.post('/api/sessions', {
        title: `Study Session ${new Date().toLocaleDateString()}`,
        subject: 'General'
      })
      setSessions(prev => [response.data.session, ...prev])
    } catch (error) {
      console.error('Error creating session:', error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 flex justify-center items-center h-64">
        <div className="text-black text-xl">Loading sessions...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl border border-black border-opacity-20 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">Study Sessions</h2>
          <button
            onClick={createNewSession}
            className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-full font-medium transition-colors"
          >
            New Session
          </button>
        </div>
        
        {sessions.length === 0 ? (
          <div className="text-center text-black text-opacity-60 py-12">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-xl mb-4">No study sessions yet</p>
            <p>Create your first session to start tracking your progress!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {sessions.map((session, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-xl p-6 border border-black border-opacity-30">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-black">{session.title}</h3>
                  <span className="bg-blue-500 text-black px-3 py-1 rounded-full text-sm">
                    {session.subject}
                  </span>
                </div>
                <p className="text-black text-opacity-80 mb-4">
                  Started: {new Date(session.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-black text-opacity-60">
                    Duration: {session.duration || '0'} minutes
                  </span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded-lg text-sm transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudySessions
