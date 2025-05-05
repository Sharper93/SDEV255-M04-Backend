const mongoose = require("../db") // `db` is your mongoose connection

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: String,
})

const User = mongoose.model("User", userSchema)

module.exports = User;