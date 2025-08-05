import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { text: input, sender: 'user', timestamp: Date.now() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat', { message: input })
      const aiMessage = { 
        text: response.data.response, 
        sender: 'ai', 
        timestamp: Date.now() 
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'ai', 
        timestamp: Date.now() 
      }
      setMessages(prev => [...prev, errorMessage])
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-t-3xl border border-black border-opacity-20 flex-1 flex flex-col">
        <div className=" p-6 border-b border-black border-opacity-20">
          <h2 className=" flex items-center justify-center text-2xl font-bold text-black ">Chat with StudyBuddy AI</h2>
          <p className="flex items-center justify-center text-black text-opacity-80">Ask me anything about your studies!</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-black text-opacity-60 py-8">
              <div className="text-4xl mb-4 ">🤖</div>
              <p>Start a conversation! Ask me about any topic you're studying.</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-black' 
                  : 'bg-blue-500 bg-opacity-20 text-black border border-black border-opacity-30'
              }`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-blue-500 bg-opacity-20 text-black px-4 py-2 rounded-2xl border border-white border-opacity-30">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={sendMessage} className="p-6 border-t border-black border-opacity-20">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white bg-opacity-20 text-black placeholder-gray-500 placeholder-opacity-60 px-4 py-3 rounded-full border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-white hover:bg-blue-600 disabled:bg-gray-400 text-black px-6 py-3 rounded-full font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chat
