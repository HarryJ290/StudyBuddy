import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router()

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.post('/', async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



    // Create a study-focused prompt
    const studyPrompt = `You are StudyBuddy AI, a helpful and intelligent study companion. Your role is to:
    1. Help students understand complex topics by breaking them down into simple explanations
    2. Provide step-by-step solutions to problems
    3. Offer study tips and learning strategies
    4. Answer questions across various subjects like math, science, history, literature, etc.
    5. Encourage and motivate students in their learning journey
    
    Please respond to the following student question in a helpful, educational, and encouraging manner:
    
    Student Question: ${message}`

    // Generate response
    const result = await model.generateContent(studyPrompt)
    const response = await result.response
    const text = response.text()

    res.json({ response: text })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Failed to generate response' })
  }
})

export default router