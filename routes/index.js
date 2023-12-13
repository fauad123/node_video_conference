const express = require('express')
const authRoutes = require('./auth.route')
const eventRoutes = require('./event.route')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/events', eventRoutes)

module.exports = router