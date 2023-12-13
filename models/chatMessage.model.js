const mongoose = require('mongoose')

const chatMessageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
  	timestamps: true
  }
)

const chatMessages = mongoose.model('chatMessage', chatMessageSchema)

module.exports = chatMessages
