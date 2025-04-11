// det up .. this is similar to when we use our default tags in html

// grav express framwork and store in var
const express = require("express")

// adding cors for cross origin scripting
// have to use cors in order to host front end and backend on same device
// cors added as var rather than const since it is global
var cors = require("cors")

// route 
const router = express.Router()

app.use(cors())
// activate or tell app variable to be an express server
const app = express()

// start the web server... format: app.listen(portnumber, function)

// making an api using routes
// routes are used to handle browsers requests - look like urls - 
// diference is when a browser requests a route it is dynamically handled using  a function
// route data or route requests
 
// GET request when someone goes to http://localhost:3000/hello
// when using a function in a route you almost always have a parm or handle a response and request
app.get("/hello", function(req, res) {
    res.send("<h1> Hi, Express!</h1>")
})

// 
app.get("/goodbye", function(req, res) {
    res.send("<h1> Bye, Express!</h1>")
})


router.get("/songs", function(req, res) {
    // create object in get request
    const song = {
        title: "Uptown Funk",
        artist: "Bruno Mars",
        popularity: 10,
        genre: ["funk", "boogie"]
    }
    const songs = [
        {
            title: "We Found Love",
            artist: "Rihanna",
            popularity: 10,
            releaseDate: new Date(2011, 9, 22),
            genre: ["electro house"]
        },
    
        {
            title: "Happy",
            artist: "Pharrell Williams",
            popularity: 10,
            releaseDate: new Date(2013, 11, 21),
            genre: ["soul", "new soul"]
        }
        ];

        res.json(songs)
})

// all requests that ususally use an api start with /api...
// so the url would be localhost:3000/api/songs

app.use("/api", router)
app.listen(3000)