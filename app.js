const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
app.use(express.json())



// Routes -----
app.use('/api/v1/users',userRoute);
app.use('/api/v1/tasks',taskRoute);


module.exports = app;