const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
  	email: {
  	  type: String,
  	  required: true,
  	  unique: true,
  	  match: /^\S+@\S+\.\S+$/
  	},
  	password: {
  	  type: String,
  	  required: true
  	}
  },
  {
    timestamps: true
  }
)

const Users = mongoose.model('user', userSchema)

module.exports = Users
