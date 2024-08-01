const express = require('express');
const connectDb = require('./connection');
const User = require('./model/userModel');
const app = express();
connectDb();

const createUser = async()=>{
    const res = await User.create({name:'chandan',age:21});
    console.log(res);
}

createUser();
