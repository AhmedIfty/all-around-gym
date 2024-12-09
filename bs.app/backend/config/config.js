const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/bs");

// check db connected or not
connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database not connected ");
})

//creating a schema
const LoginSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    exercises: [
        {
          exerciseId: { type: Number, required: true }, // Exercise ID
          exerciseName: { type: String, required: true }, // Exercise name
          sets: { type: Number, required: true }, // Number of sets
          reps: { type: Number, required: true }, // Number of reps per set
        },
    ],
});

// collection part , creating model
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;