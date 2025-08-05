import mongoose from 'mongoose'

const studySessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [{
    text: String,
    sender: {
      type: String,
      enum: ['user', 'ai']
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  duration: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('StudySession', studySessionSchema)
