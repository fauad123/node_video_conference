const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    accessRestriction: {
      type: String,
      enum: ['Public', 'Private']
    }
  },
  {
    timestamps: true
  }
)

const Events = mongoose.model('event', eventSchema)

module.exports = Events
