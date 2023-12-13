const Events = require('../models/event.model')

module.exports = { create, update, remove, list }

async function create(req, res) {
  const event = req.body

  const createdEvent = await Events.create(event)
  return res.send(createdEvent)
}

async function update(req, res) {
  const eventId = req.params.eventId
  const updateArgs = req.body
  
  const event = await Events.findByIdAndUpdate(eventId, updateArgs)
  return res.send(event)
}

async function remove(req, res) {
  const eventId = req.params.eventId
  
  const event = await Events.findByIdAndDelete(eventId)
  return res.send({ message: 'Event deleted successfully' })
}

async function list(req, res) {
  const events = await Events.find({}, 'title date accessRestriction')
  
  return res.send(events)
}