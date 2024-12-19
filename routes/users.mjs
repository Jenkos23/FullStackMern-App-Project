import express from 'express';
import User from '../Schema/model.mjs';
import axios from 'axios';

const router = express.Router();

//CREATE -Adding a new user
router.post('/register', async (req, res) =>{
    console.log(req.body);
    const {name, email, password} = req.body;


   
    // Input Validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });

    try {
        // Save to MongoDB
        await newUser.save();
        
        // Return a success response
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error occurred while saving user:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


//READ - Get all Users
router.get ('/', async (req, res) => {
    try {
        const users = await User.find().limit(20);
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});

//READ - Get a user by ID
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    }catch (error){
        res.status(500).json({message: error.message});

    }
});


//UPDATE - Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({message: error.messgae});
        
    }
});

//DELETE - Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;