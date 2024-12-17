import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true

    },

    password: {
        type: String,
        required: true,
        match : [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        ]
    }
});


//Hash password before saving to the database
userSchema.pre('save', async function (next) {
    if(this.isModified('password') || this.isNew){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


//Create a User model
const User = mongoose.model( 'User', userSchema);

export default User;