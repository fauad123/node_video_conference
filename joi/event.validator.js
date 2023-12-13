const joi = require('joi')

const accessRestrictionEnum = ['Public', 'Private']

const eventObject = {
  title: joi.string().required(),
  description: joi.string().required(),
  date: joi.date().required(),
  duration: joi.number().required(),
  accessRestriction: joi.string().valid(...accessRestrictionEnum).required()
}

const eventSchema = joi.object(eventObject)

module.exports = eventSchema