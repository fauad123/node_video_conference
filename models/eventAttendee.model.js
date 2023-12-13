const mongoose = require('mongoose')

const eventAttendeeSchema = mongoose.Schema(
  {
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

const eventAttendees = mongoose.model('eventAttendee', eventAttendeeSchema)
module.exports = eventAttendees