require("dotenv").config();

/////////////////////////
// DEPENDENCIES
/////////////////////////
const express = require("express");
const DATABASE_URL = process.env.DATABASE_URL
const Turtle = require("./models/turtles.js")

/////////////////////////
// The Application Object
/////////////////////////
const app = express();

const turtles = [
  { name: "Leonardo", role: "ninja" },
  { name: "Michaelangelo", role: "ninja" },
  { name: "Donatello", role: "ninja" },
  { name: "Raphael", role: "ninja" },
  { name: "Franklin", role: "student" },
  { name: "Master Oogway", role: "Sensei" },
  { name: "Crush", role: "Nemo's ride" },
  { name: "Koopa Troopa", role: "Mario's Foe" },
  { name: "Bowser", role: "King of evil Mario Turtles" },
  { name: "Squirtle", role: "OG starter pokemon" },
  { name: "Pistachio Disguisey", role: "Master of Disguise" },
  { name: "Morla", role: "The Ancient One" },
];

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

// home route that says "hello world" to test server is working
// req , res are arguments of the callback
app.get("/", (req, res) => {
  //res.json let's us send a response as JSON data
  res.json({
    response: "Hello World",
    innerVoice: "I need a nap",
    innerEleanor: "What the fuck",
  });
});

// INDUCES - index new delete update create edit show

// Index
app.get("/turtles", (req, res) => res.json(turtles));

// DELETE
app.delete("/turtles/:index", (req, res) => {
  turtles.splice(req.params.index, 1);
  res.json(turtles);
});

// Update (PUT)
app.put("/turtles/:index", (req, res) => {
  turtles[req.params.index] = req.body;
  res.json(turtles);
});

// Create (POST)
app.post("/turtles", (req, res) => {
  turtles.push(req.body); // add turtle to the array
  res.json(turtles); // send whole thing back to confirm
});

// Show
app.get("/turtles/:index", (req, res) => res.json(turtles[req.params.index]));

// why don't we have new and edit routes?
// because it's 'get' routes that render html pages so we don't need it for crud (create read update delete)

/////////////////////////
// Listener
/////////////////////////
// We chose a non 3000 port because react dev server uses 3000 the highest possible port is 65535
// Why? cause it's the largest 16-bit integer, fun fact!
// But because we are "elite" coders we will use 1337
app.listen(1337, () => console.log("Listening on port 1337"));
