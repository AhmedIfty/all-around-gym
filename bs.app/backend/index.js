const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local');
const cors = require('cors'); // To handle cross-origin requests
const collection = require('./config/config'); // Assuming this is your MongoDB connection

const app = express();
const saltRounds = 10;

// Enable CORS to allow requests from React frontend
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true,
}));

// Parse JSON bodies for POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(
  session({
    secret: "SecretWord",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      
      // Store user data in session (excluding sensitive data like password)
      req.session.user = {
        _id: user._id,
        username: user.username,
        email: user.email
      };

      return res.status(200).json({ message: 'Login successful', user });
    } else {
      return res.status(400).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
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


// API route to handle registration
app.post('/register', async (req, res) => {
    try {
      const { email, username, password } = req.body;
  
      // Check if user already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create new user object
      const newUser = new collection({
        email: email,
        username: username,
        password: hashedPassword,
      });
  
      // Save new user to database
      await newUser.save();
      
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

// API route to handle profile update
app.put('/profileUpdate', async (req, res) => {
  try {
    const { email, username, password } = req.body; // Get data from request body
    const userId = req.session.user?._id; // Use session to identify the logged-in user

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    // Prepare update object
    const updateData = { username, email };
    if (password) {
      // Hash new password if provided
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedPassword;
    }

    // Update the user in the database
    await collection.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send user data stored in the session to profileUpdate page
app.get('/profileUpdate', (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);  
  } else {
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
});

// Start the server
const port = 5000; // Change the port since React runs on 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
