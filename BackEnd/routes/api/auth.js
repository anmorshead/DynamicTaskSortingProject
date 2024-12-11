// routes/auth.js
import express from 'express';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Store this in a .env file

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    // Check for JWT_SECRET
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is not defined' });
    }

    //if register is successful, generate token
    const token = jwt.sign({ userId: newUser._id}, JWT_SECRET)

    //send the token in a httpOnly cookie for secure storage
    res.cookie("jwt", token, {httpOnly: true, path: '/'})

    res.status(201).json({
      message: 'User registered successfully',
      email: newUser.email,
      token, 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check for JWT_SECRET
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is not defined' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    //send the token in a httpOnly cookie for secure storage 
    res.cookie("jwt", token, {httpOnly: true, path: '/'})

    //if successful, send
    res.status(200).json({
      message: 'Login successful',
      email: user.email,
      token,
    });
    


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('jwt')
  res.sendStatus(204)
})


export default router;
