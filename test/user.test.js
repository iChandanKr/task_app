const request = require('supertest');
const app = require('../app');
const connectDb = require('../connection');
connectDb();
test('Shoud signup a new user',async()=>{
    const response=await request(app).post('/api/v1/users/register').send({
        name:"Chandan",
        email:"chandan@gmail.com",
        password:"password",
        confirmPassword:"password",
    }).expect(201);
    console.log(response.status);
    
})