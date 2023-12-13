const Users = require('../models/user.model')

module.exports = { login, signup }

async function login(req, res) {
  return res.json({ user: req.user })
}

async function signup(req, res) {
  const user = req.body
  
  const createdUser = await Users.create(user)
  return res.send(createdUser)
}