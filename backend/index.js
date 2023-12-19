import express, { request, response } from "express";
import mongoose from "mongoose";
import userRoute from './routes/users.js';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app =express();

const PORT = process.env.PORT

//Middleware for parsing request
app.use(express.json())


//Middleware for handling CORS policy
//optinn 1: allow all origins
app.use(cors());

/* //option 2:Allow custom origins
app.use(cors({
    origin:'http://localhost:3000/',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
})) */


//Home page
app.get('/', (request,response)=>{
    console.log(request)
    return response.status(234).send('welcome to MERN')
})



app.use('/auth', userRoute)




mongoose.connect(process.env.mongoDBURL)
.then(()=>{
console.log('App connected to mongoDB successfully');

//function to listen to the port

app.listen(PORT,()=>{//callack function
    console.log(`Backend Server is running in port:${PORT} `);
});
})
.catch((error)=>{
    console.log(error)
})