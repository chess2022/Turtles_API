require("dotenv").config();

/////////////////////////
// DEPENDENCIES
/////////////////////////
const express = require("express");
const DATABASE_URL = process.env.DATABASE_URL
const Turtle = require("./models/turtles.js")
const PORT = process.env.PORT || 3001

/////////////////////////
// The Application Object
/////////////////////////
const app = express();

/////////////////////////
// Mongoose config
/////////////////////////
const mongoose = require("mongoose")
const db = mongoose.connection
mongoose.connect(DATABASE_URL)

// Database connection error/success
db.on("connected", () => console.log("Mongo is a go!"));
db.on("erro", (err) => console.log(err.message));
db.on("disconnected", () => console.log("Mongo disconnected"))

/////////////////////////
// Middleware - so we can use req.body
/////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended: false}))

/////////////////////////
// Routes
/////////////////////////


// SEED 
const turtleSeed = require("./models/seed");
const res = require("express/lib/response");
app.get("/turtles/seed", (req, res) => {
  Turtle.deleteMany({}, (error, allTurtles) => {});
  Turtle.create(turtleSeed, (error, data) => {
    res.redirect("/turtles");
  })
})

// home route that says "hello world" to test server is working
// req , res are arguments of the callback
app.get("/", (req, res) => {
  //res.json let's us send a response as JSON data
  res.json({
    response: "Hello World",
    innerCheryl: "I need a nap",
    innerEleanor: "What the fork",
  });
});

// INDUCES - index new delete update create edit show

// Index
app.get("/turtles", (req, res) => {
    Turtle.find({}, (error, allTurtles) => {
      res.send(allTurtles)
    })
})

// DELETE
app.delete("/turtles/:_id", (req, res) => {
  Turtle.findByIdAndDelete(req.params._id, (error, deletedTurtle) => {
  res.send({ success: true })
});
});

// Update (PUT)
app.put("/turtles/:_id", (req, res) => {
  Turtle.findByIdAndUpdate(
    req.params._id,
    req.body,
    { new: true },
    (error, updatedTurtle) => {
      res.send(updatedTurtle);
    }
  );
});

// Create (POST)
app.post("/turtles", (req, res) => {
  Turtle.create(req.params._id, (error, foundTurtle) => {
    res.send(foundTurtle);
  }); 
  });

// Show
app.get("/turtles/:_id", (req, res) => {
  Turtle.findById(req.params._id, (error, foundTurtle) => {
    res.send(foundTurtle);
  });
});

// why don't we have new and edit routes?
// because it's 'get' routes that render html pages so we don't need it for crud (create read update delete)

/////////////////////////
// Listener
/////////////////////////
// We chose a non 3000 port because react dev server uses 3000 the highest possible port is 65535
// Why? cause it's the largest 16-bit integer, fun fact!
// But because we are "elite" coders we will use 1337
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));
