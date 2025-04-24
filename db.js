// import mongoose library
const mongoose = require('mongoose')
// connection string
mongoose.connect("mongodb+srv://sharper:Password1@song-db.0hpberu.mongodb.net/?retryWrites=true&w=majority&appName=Song-db", {useNewUrlParser: true})

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
});

module.exports = mongoose

