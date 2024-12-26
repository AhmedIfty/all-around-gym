const mongoose = require("mongoose");

// Connect to MongoDB
const connect = mongoose.connect("mongodb://0.0.0.0:27017/bs", {
});

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
  planType: {
    type: String,
    default: 'none', // Default role is 'user',
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
  forumPosts: [
    {
      content: { type: String, required: true },
      category: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  workoutTimes: [
    {
      time: { type: Date, required: true },
    },
  ],
});

// Define the Gym schema
const GymSchema = new mongoose.Schema({
  gymId: {
    type: Number,
    required: true,
    unique: true, // Ensures that each gym has a unique ID
  },
  name: {
    type: String,
    required: true, // Gym name is required
  },
  location: {
    type: String,
    required: true, // Gym location is required
  },
  description: {
    type: String,
    required: false, // Gym description is optional
  },
  planType: {
    type: String,
  },
  facilities: [
    {
      type: String, // List of facilities the gym offers
    },
  ],
  subscriptionFee: {
    type: Number, // Monthly subscription fee
    required: true,
  },
  gymImage: {
    type: String, // Link to gym image (optional)
    required: false, // Gym image is optional
  },
});

// Create models from the schemas
const UserModel = mongoose.model("users", UserSchema);
const GymModel = mongoose.model('Gym', GymSchema);

// Function to search users or exercises by search term
const searchUsers = async (searchTerm) => {
  try {
    const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex for search

    // Search in UserModel
    const userResults = await UserModel.find({
      $or: [
        { username: regex }, // Search in usernames
        { email: regex }, // Search in emails
        { "exercises.exerciseName": regex }, // Search in exercise names
      ],
    });

    // Search in GymModel
    const gymResults = await GymModel.find({
      $or: [
        { name: regex }, // Search in gym names
        { location: regex }, // Search in gym locations
        { description: regex }, // Search in gym descriptions
        { facilities: regex }, // Search in gym facilities
      ],
    });

    // Combine results
    const results = {
      users: userResults,
      gyms: gymResults,
    };

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
  GymModel,
};