const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors'); // To handle cross-origin requests
const { UserModel, searchUsers } = require('./config/config'); // Correct import
const { GymModel } = require('./config/config'); // Import Gym model

const app = express();
const saltRounds = 10;
const stripe = require('stripe')('sk_test_51QYvzaJi9PDA9XsNYDfB7YOq3M5jlw0tezrf0OfJo8kmTqFhLuQB4JBIbZpVEcsKJUQy3dVHUoomdv0VQfwsIhh300ebHwpHEc');
const stringSimilarity = require('string-similarity');

// Enable CORS to allow requests from React frontend
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true, // Allow credentials
}));

// Parse JSON bodies for POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: "SecretWord",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));


// Create Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, planType  } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Service Payment',
            },
            unit_amount: amount * 100, // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: {
        planType: planType,  // Store planType in metadata
      }
    });

    res.json({ sessionId: session.id }); // Return the session ID
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
});

// Payment success callback
app.post('/payment-success', async (req, res) => {
  try {
    // Get user ID from session and planType from request body
    const userId = req.session.userId;
    const { planType } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User not logged in or session expired' });
    }

    if (!planType) {
      return res.status(400).json({ message: 'Invalid plan type' });
    }

    // Update the user's planType in the database
    await UserModel.findByIdAndUpdate(userId, { planType });

    res.status(200).json({ message: 'Plan updated successfully' });
  } catch (error) {
    console.error('Error updating user plan:', error);
    res.status(500).json({ message: 'Failed to update plan' });
  }
});

// DELETE workout time by ID
app.delete('/api/workouts/:workoutId', async (req, res) => {
  try {
    const userId = req.session.userId;
    const { workoutId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const workoutIndex = user.workoutTimes.findIndex(workout => workout._id.toString() === workoutId);
    if (workoutIndex === -1) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    user.workoutTimes.splice(workoutIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE exercise by ID
app.delete('/exercises/:exerciseId', async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const user = await UserModel.findOne({ _id: req.session.userId });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const exerciseIndex = user.exercises.findIndex(ex => ex.exerciseId.toString() === exerciseId);
    if (exerciseIndex === -1) {
      return res.status(404).send('Exercise not found');
    }

    user.exercises.splice(exerciseIndex, 1);
    await user.save();

    res.send('Exercise deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// API endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      // Store user data in session
      req.session.user = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      req.session.userId = user._id; // Store userId separately

      return res.status(200).json({ message: 'Login successful', user });
    } else {
      return res.status(400).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


// Send user data stored in the session
// app.get('/profile', (req, res) => {
//   if (req.session.user) {
//     res.status(200).json(req.session.user);
//   } else {
//     res.status(401).json({ message: 'Unauthorized. Please log in.' });
//   }
// });

app.get('/profile', async (req, res) => {
  try {
    const userId = req.session.userId; // Ensure the user is logged in
    if (!userId) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    // Fetch user data including workoutTimes
    const user = await UserModel.findById(userId).select('username email workoutTimes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Logout API
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ message: 'Failed to log out' });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Profile API
app.get('/profile', (req, res) => {
  if (req.session.user) {
      return res.status(200).json(req.session.user);
  } else {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
});

// Admin login route
app.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin with role 'admin'
    const admin = await UserModel.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Store admin data in session
    req.session.user = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    res.status(200).json({ message: 'Login successful', admin: req.session.user });
  } catch (err) {
    console.error('Error during admin login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to check if admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Example protected admin route
app.get('/admin/dashboard', isAdmin, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});



// New Search API Endpoint
app.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const results = await searchUsers(searchTerm);

    if (results.users.length > 0 || results.gyms.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: 'No matching results found' });
    }
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error during search' });
  }
});

// API route to handle registration
app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/forum/like', async (req, res) => {
  const { postId, username } = req.body;

  if (!postId || !username) {
    return res.status(400).json({ message: 'Post ID and username are required' });
  }

  try {
    const user = await UserModel.findOne({ 'forumPosts._id': postId });

    if (!user) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = user.forumPosts.id(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found within user' });
    }

    if (post.likedBy.includes(username)) {
      return res.status(400).json({ message: 'User has already liked this post' });
    }

    post.likes += 1;
    post.likedBy.push(username);

    await user.save();

    res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API to fetch forum posts
app.get('/api/forum', async (req, res) => {
  try {
    const users = await UserModel.find({}, 'username forumPosts');
    const posts = users.flatMap(user => 
      user.forumPosts.map(post => ({
        _id: post._id,
        username: user.username,
        content: post.content,
        category: post.category,
        createdAt: post.createdAt,
        likes: post.likes,
        likedBy: post.likedBy // Include likedBy field
      }))
    ).sort((a, b) => b.createdAt - a.createdAt);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API to create a new forum post
app.post('/api/forum', async (req, res) => {
  const { username, content, category } = req.body;

  if (!username || !content || !category) {
    return res.status(400).json({ message: 'Username, content, and category are required' });
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = {
      content,
      category,
      createdAt: new Date(),
      likes: 0,
      likedBy: []
    };

    user.forumPosts.push(newPost);
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error posting new message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Fetch exercises
app.get('/exercises', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    const user = await UserModel.findOne({ _id: req.session.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.exercises);
  } catch (error) {
    console.error('Fetch exercises error:', error);
    res.status(500).json({ message: 'Failed to fetch exercises' });
  }
});

// Add exercise
app.post('/addExercise', async (req, res) => {
  try {
    const { workoutName, sets, reps } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    const result = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          exercises: {
            exerciseId: new Date().getTime(),
            exerciseName: workoutName,
            sets: parseInt(sets, 10),
            reps: parseInt(reps, 10),
          },
        },
      }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Exercise added successfully' });
    } else {
      res.status(500).json({ message: 'Failed to add exercise' });
    }
  } catch (error) {
    console.error('Add exercise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API to fetch users with matching workouts
app.get('/api/matching-exercises', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    // Get current user's exercises
    const currentUser = await UserModel.findById(userId).select('exercises');
    if (!currentUser || !currentUser.exercises.length) {
      return res.status(404).json({ message: 'No exercises found for the user.' });
    }

    const userExercises = currentUser.exercises.map((ex) => ex.exerciseName.toLowerCase());

    // Find all other users
    const otherUsers = await UserModel.find({ _id: { $ne: userId } }).select('username exercises');
    const recommendations = [];

    otherUsers.forEach((otherUser) => {
      const matchingExercises = [];
      otherUser.exercises.forEach((exercise) => {
        const similarity = stringSimilarity.findBestMatch(
          exercise.exerciseName.toLowerCase(),
          userExercises
        );

        // If similarity score is above a threshold (e.g., 0.7), consider it a match
        if (similarity.bestMatch.rating >= 0.7) {
          matchingExercises.push(exercise);
        }
      });

      if (matchingExercises.length > 0) {
        recommendations.push({
          username: otherUser.username,
          matchingExercises,
        });
      }
    });

    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// post workout time
app.post('/api/add-workout', async (req, res) => {
  try {
    const userId = req.session.userId;
    const { time } = req.body;
    
    if (!userId || !time) {
      return res.status(400).json({ message: 'Invalid request' });
    }
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.workoutTimes.push({ time });
    await user.save();
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error adding workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// get workout time
app.get('/api/workouts', async (req, res) => {
  try {
    const userId = req.session.userId; // Ensure the user is logged in
    if (!userId) {
      return res.status(401).json({ message: 'User not logged in' });
    }
    
    const user = await UserModel.findById(userId).select('workoutTimes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user.workoutTimes);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
    




// API to fetch gym data with filters
app.get('/api/gyms', async (req, res) => {
  try {
    const { subscriptionType } = req.query; // Extract subscriptionType from query parameters

    let query = {};

    // Apply filter if a subscriptionType is provided
    if (subscriptionType && subscriptionType !== "Any") {
      query.planType = subscriptionType; // Filter gyms by planType
    }

    // Fetch gyms with the applied filter (if any)
    const gyms = await GymModel.find(query);
    res.status(200).json(gyms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching gyms' });
  }
});


// Backend Route to Fetch Single Gym
app.get('/api/gyms/:id', async (req, res) => {
  try {
    const gym = await GymModel.findOne({ gymId: req.params.id });
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.status(200).json(gym);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching gym details' });
  }
});

// Backend Route to TO GET SUBSCRIPTION TYPE Gym
app.get('/api/gyms', async (req, res) => {
  try {
    const { subscriptionType } = req.query;
    const query = {};

    if (subscriptionType) {
      if (subscriptionType === 'Basic') {
        query.subscriptionFee = { $lte: 50 };
      } else if (subscriptionType === 'Advanced') {
        query.subscriptionFee = { $gt: 50, $lte: 100 };
      } else if (subscriptionType === 'Pro') {
        query.subscriptionFee = { $gt: 100 };
      }
    }

    const gyms = await GymModel.find(query);
    res.json(gyms);
  } catch (error) {
    console.error('Error fetching gyms:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/gyms', async (req, res) => {
  try {
    const { gymName, location, description, planType, subscriptionFee, gymImage } = req.body;

    // Validate required fields
    if (!gymName || !location || !planType || !subscriptionFee) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Generate a unique ID for the gym
    const lastGym = await GymModel.findOne().sort({ gymId: -1 });
    const newGymId = lastGym ? lastGym.gymId + 1 : 1;

    // Create a new gym instance
    const newGym = new GymModel({
      gymId: newGymId,
      name: gymName,
      location,
      description,
      planType,
      subscriptionFee,
      gymImage,
    });

    // Save to the database
    const savedGym = await newGym.save();

    res.status(201).json(savedGym); // Return the created gym
  } catch (error) {
    console.error("Error adding gym:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Check login status
app.get('/checkLogin', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});


// Update session route to include user role
app.get('/api/session', (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      loggedIn: true,
      user: {
        _id: req.session.user._id,
        username: req.session.user.username,
        email: req.session.user.email,
        role: req.session.user.role, // Include role
      },
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});




// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


