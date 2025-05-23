const express = require("express")
const Song = require("./models/song")
var cors = require('cors')

// for login
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const user = require('./models/users')

const app = express()
app.use(cors())

// Middleware that parses HTTP requests with JSON body
app.use(express.json())

// route 
const router = express.Router()

//login authen 
const secret = "supersecret"
app.use("/api", router)

const User = require("./models/users");

//creating a new user
router.post("/user", async (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })

    try{
        await newUser.save()
        res.status(201).json({ message: "User created successfully!", user: newUser }) // created user

    }
    catch (err) {
        console.log(err)
    }
})

//route to authenticate or log in user
//post request - when you log in you create a new 'session' for user
router.post("/auth", async(req,res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password!"});
        return 
    }
    // try to find username in db, then see if it matches with key:value of username:password
    // await finding a user

    let user = await User.findOne({username : req.body.username})


    // connection or server error
    if(!user){
            res.status(401).json({error : "Bad Username"})
        }
        // check to see if the password matches
        else{
            if(user.password != req.body.password){
                res.status(401).json({error: "Bad Password"})
            }
            else{
                // successful password
                // create token that is encode with jwt library 
                // send back the username
                // also send back as part of token that you are currently authorized - boolean or num value i.e. if auth - 0 you are not authorized if auth = 1 you are authorized
                username2 = user.username
                const token = jwt.encode({username: user.username}, secret)
                // token is username and .secret is encoding the username
                const auth = 1
                // respond with the token

                res.json({
                    username2, 
                    token: token, 
                    auth: auth
                })
            }
        }
    })

// check status of user with a valid token, see if it matches the frontend token
router.get("/status", async (req, res) => {
    if(!req.headers["x-auth"]){
        return res.status(401).json({error: "Missing X-Auth"})
    }

    // if x-auth contains the token (it should)
    const token = req.headers("x-auth")
    try {
        const decoded = jwt.decode(token,secret)

        //send back all username and status fields to user/frontend
        let users = User.find({}, "username status")
        res.json(users)
    }
    catch(ex){
        res.status(401).json({error: "invalid jwt"})
    }
})


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

// grab single song from db
router.get("/songs/:id", async (req,res) => {
    try {
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// POST REQ for adding songs to DB
router.post("/songs", async (req, res) => {
    try {
        console.log("Incoming song data:", req.body)  // <== log this

        const song = new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log("Saved song:", song)
    } catch (err) {
        console.error("Error saving song:", err)  // <== log the error
        res.status(400).send({ error: err.message })
    }
})

router.put("/songs/:id", async (req, res) => {
    // first find the song and update the song the front end wants us to update
    // need to request the id of the song from request
    // and the find it in the database and update it
    try {
        const song = req.body
        await Song.updateOne({ _id: req.params.id }, song)
        console.log(song)
        res.sendStatus(204)
    } catch (err) {
        console.error("PUT error:", err)
        res.status(400).send({ error: err.message })
    }
})

// delete a song from db
router.delete("/songs/:id", async (req, res) => {
    try {
        const result = await Song.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.use("/api", router)
console.log("Server is running on port 3000")
app.listen(3000)