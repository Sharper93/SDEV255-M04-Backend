const express = require("express")
const Song = require("./models/song")

const app = express()

// Middleware that parses HTTP requests with JSON body
app.use(express.json())

// route 
const router = express.Router()

// get all songs in db
router.get("/songs", async(req, res) => {
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err) {
        console.log(err)
    }
})

// POST REQ for adding songs to DB
router.post("/songs", async(req, res) => {
    try{
        const song = await new Song(req.body)
        await song.save({})
        res.status(201).json(song)
        console.log(song)
    }
    catch(err) {
        res.status(400).send(err)
    }

})

app.use("/api", router)
app.listen(3000)