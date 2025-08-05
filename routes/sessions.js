import express from 'express'
import StudySession from '../models/StudySession.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// Get all sessions for user
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await StudySession.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(20)

    res.json({ sessions })
  } catch (error) {
    console.error('Get sessions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create new session
router.post('/', auth, async (req, res) => {
  try {
    const { title, subject } = req.body

    const session = new StudySession({
      title,
      subject,
      user: req.userId
    })

    await session.save()
    res.status(201).json({ session })
  } catch (error) {
    console.error('Create session error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get specific session
router.get('/:id', auth, async (req, res) => {
  try {
    const session = await StudySession.findOne({
      _id: req.params.id,
      user: req.userId
    })

    if (!session) {
      return res.status(404).json({ message: 'Session not found' })
    }

    res.json({ session })
  } catch (error) {
    console.error('Get session error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router