const mongoose = require("mongoose");

// Connect to MongoDB
const connect = mongoose.connect("mongodb://0.0.0.0:27017/bs");

// Check if the database is connected or not
connect
    .then(() => {
        console.log("Database connected Successfully");
    })
    .catch((err) => {
        console.error("Database not connected:", err.message);
    });

// Create a schema for users
const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Define allowed roles
      default: 'user', // Default role is 'user'
    },
    exercises: [
      {
        exerciseId: { type: Number, required: true },
        exerciseName: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        exerciseImage: { type: String },
      },
    ],
    subscriptions: [
      {
        gymId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Gym',
        },
        subscribedOn: {
          type: Date,
          default: Date.now,
        },
        subscriptionExpiry: {
          type: Date,
        },
      },
    ],
    bookedTrainers: [
      {
        trainerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Trainer',
        },
        bookingDate: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
  });

// Create a collection model
const UserModel = mongoose.model("users", UserSchema);

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
