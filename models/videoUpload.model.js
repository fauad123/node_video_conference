const mongoose = require('mongoose')

const videoUploadSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event'
    }
  },
  {
  	timestamps: true
  }
)

const videoUploads = mongoose.model('videoUpload', videoUploadSchema)

module.exports = videoUploads
