const express = require('express')
const asyncHandler = require('express-async-handler')
const authCtrl = require('../controllers/auth.controller')
const { localAuthHandler } = require('../middleware/auth')

const router = express.Router()
module.exports = router

router.post('/login', localAuthHandler, asyncHandler(authCtrl.login))
router.post('/signup', asyncHandler(authCtrl.signup))