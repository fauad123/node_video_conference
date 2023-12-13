module.exports = (req, res, next, schema, property) => {
  const { error, value } = schema.validate(req[property])

  if (error) {
  	const { details } = error
  	const message = details.map(i => i.message).join(", ")

  	res.status(422).json({ error: message })
  } else {
  	next()
  }
}