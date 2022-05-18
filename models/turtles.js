const mongoose = require("mongoose");
const Schema = mongoose.Schema

const turtleSchema = new Schema(
    {
        name: String,
        role: String,
    }
)

const Turtle = mongoose.model("Turtle", turtleSchema)

module.exports = Turtle;