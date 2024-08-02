const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
app.use(express.json())




app.use('/api/v1/users',userRoute)

// const createUser = async()=>{

// createUser();

// const createTask = async()=>{
//     const newTask = await Task.create({description:'lkdfj',isCompleted:false});
//     console.log(newTask);
// }

// createTask();

module.exports = app;