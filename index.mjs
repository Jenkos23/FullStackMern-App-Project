import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import db from './connectdb/conn.mjs';
import userRoutes from './routes/users.mjs'

//load environment variables from .env file
dotenv.config();

const app = express();

//CORS Middleware
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5000', 'https://fullstackmern-app-project.onrender.com/users']
// const corsWare = {
//     origin: allowedOrigins ,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,

// }


//Usage of CORS middleware with the corsWare
app.use(cors());

//Middleware to parse JSON request body
app.use(express.json());

//Define routes
app.use('/users', userRoutes);


//To check if my server is rendering..
app.get('/', (req, res) => {
    res.send('Welcome to the Full Stack Mern App')
})






//To check if my port is listening to server...
const PORT = process.env.PORT || 3000; //Use PORT from .env or default to 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port : ${PORT}`)
})