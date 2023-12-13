const mongoose = require('mongoose')

const mongoDb = "mongodb+srv://fauadhaleem:fauad123@cluster0.hehiqrb.mongodb.net/temp_db?retryWrites=true&w=majority";

async function connectDatabase() {
  await mongoose.connect(mongoDb)
}

module.exports = connectDatabase