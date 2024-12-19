import express from 'express';
import User from '../Schema/model.mjs';
import axios from 'axios';

const router = express.Router();

//CREATE -Adding a new user
router.post('/register', async (req, res) =>{
    const {name, email, password} = req.body;


    try {
         // Check if the data exists (optional validation)
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }


        //Save to MongoDB
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json(newUser).send('User Created sucessfully');

    } catch (error) {
        res.status(400).json({message:'Server error while creating user',error: error.message});
        
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