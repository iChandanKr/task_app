const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
const customError = require('./utils/customError');
app.use(express.json())



// Routes -----
app.use('/api/v1/users',userRoute);
app.use('/api/v1/tasks',taskRoute);
app.all('*',(req,res,next)=>{
    const error = new customError(`can't find ${req.originalUrl} on the server!`,404);
    next(error); // it will call global error handler 
})



// Global error handler---
app.use((error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Error';
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message,
    });
})
module.exports = app;