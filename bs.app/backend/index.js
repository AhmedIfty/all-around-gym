const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors'); // To handle cross-origin requests
const { UserModel, searchUsers } = require('./config/config'); // Correct import
const { GymModel } = require('./config/config'); // Import Gym model

const app = express();
const saltRounds = 10;
const stripe = require('stripe')('sk_test_51QYvzaJi9PDA9XsNYDfB7YOq3M5jlw0tezrf0OfJo8kmTqFhLuQB4JBIbZpVEcsKJUQy3dVHUoomdv0VQfwsIhh300ebHwpHEc');

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
    const { amount } = req.body;

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
    });

    res.json({ sessionId: session.id }); // Return the session ID
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
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
        email: user.email
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
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
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
    const admin = await User.findOne({ email, role: 'admin' });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Store admin session
    req.session.user = {
      id: admin._id,
      username: admin.username,
      role: admin.role,
    };

    res.status(200).json({ message: 'Login successful', admin: req.session.user });
  } catch (err) {
    console.error(err);
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

// API to fetch gym data
app.get('/api/gyms', async (req, res) => {
  try {
    const gyms = await GymModel.find(); // Fetch gyms without references
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


// Check login status
app.get('/checkLogin', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


