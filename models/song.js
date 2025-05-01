const mongoose = require("../db") // `db` is your mongoose connection

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: String,
  popularity: { type: Number, min: 1, max: 10 },
  releaseDate: { type: Date, default: Date.now },
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song