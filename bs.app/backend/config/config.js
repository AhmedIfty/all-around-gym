const mongoose = require("mongoose");

// Connect to MongoDB
const connect = mongoose.connect("mongodb://locahost:27017/bs");

// Check if the database is connected or not
connect
    .then(() => {
        console.log("Database connected Successfully");
    })
    .catch((err) => {
        console.error("Database not connected:", err.message);
    });

    // Create a schema for users
    const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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

// Create a collection model
const UserModel = mongoose.model("users", LoginSchema);

// Function to search users or exercises by search term
const searchUsers = async (searchTerm) => {
    try {
        const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex for search
        const results = await UserModel.find({
        $or: [
            { username: regex }, // Search in usernames
            { email: regex }, // Search in emails
            { "exercises.exerciseName": regex }, // Search in exercise names
        ],
        });

        return results;
    } catch (error) {
        console.error("Error during search:", error);
        throw error; // Throw error for handling in routes
    }
    };

    // Export the model and search function
    module.exports = {
    UserModel,
    searchUsers,
    };

