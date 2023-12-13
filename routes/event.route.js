const express = require('express')
const asyncHandler = require('express-async-handler')
const eventCtrl = require('../controllers/event.controller')
const { jwtAuthHandler } = require('../middleware/auth')
const schemaValidator = require('../utils/joiSchemaValidator')
const eventSchema = require('../joi/event.validator')

const router = express.Router()
module.exports = router

router.post('/create', (req, res, next) => schemaValidator(req, res, next, eventSchema, 'body'), asyncHandler(eventCtrl.create))
router.put('/:eventId', jwtAuthHandler, asyncHandler(eventCtrl.update))
router.delete('/:eventId', jwtAuthHandler, asyncHandler(eventCtrl.remove))
router.get('/list_events', jwtAuthHandler, asyncHandler(eventCtrl.list))
