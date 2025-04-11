// det up .. this is similar to when we use our default tags in html

// grav express framwork and store in var
const express = require("express")

// activate or tell app variable to be an express server
const app = express()

// start the web server... format: app.listen(portnumber, function)
app.listen(3000, function() {
    console.log("listening on port 3000")
})

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