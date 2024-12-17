import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();




const client = process.env.URI;
let db;

try {
    db = await mongoose.connect(client);
    console.log("Database connected succesfully")
} catch (e) {
    console.error("Database connection error", e)
    
}




export default db;