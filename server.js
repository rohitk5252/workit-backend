// configuring .env 
require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user')

//  Checks if the req has a body ( data ) ,
// if yes then it parses it and attaches it to the REQ Object
// So that we can access it in the request handler 
app.use(express.json());
app.use((req ,res ,next)=>{
    console.log(req.path, req.method);
    // to move to next middleware
    next();
})

// Use Routes 
app.use('/api/workouts',workoutRoutes);
// User Routes 
app.use('/api/user', userRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('Listening on port 4000');
        });
    })
    .catch((err)=>{
        console.log(err);
    })
    
