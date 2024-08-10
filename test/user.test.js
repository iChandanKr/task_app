const request = require("supertest");
const app = require("../app");
const connectDb = require("../connection");
const User = require("../model/userModel");
connectDb();
let token = null;
let id = null;
const user = {
  name: "Chandan",
  email: "chandan@gmail.com",
  password: "password",
  confirmPassword: "password",
};
beforeEach(async () => {
  await User.deleteMany();

  const response = await request(app).post("/api/v1/users/register").send(user);

  // console.log(response.body);
  id = response.body.data.user._id;
  token = response.body.token;
  // console.log(id, token);
});
//  const response =  await new User(user).save();
//  const response1 =  await User.create(user);

//  console.log(response1)
//  id = response1._id.toString();
// });

test("Shoud signup a new user", async () => {
  const response = await request(app)
    .post("/api/v1/users/register")
    .send({
      name:"testing",
      email:'test@gmail.com',
      password:"password",
      confirmPassword:"password"
    })
    .expect(201);

  // console.log(response.body);
  // id = response.body._id;
  // token = response.body.token;
  // console.log(id, token);
});

test("Should Login existing user", async () => {
const res =   await request(app)
    .post("/api/v1/users/login")
    .send({
      email: user.email,
      password: user.password,
    });
    expect(res.body.data.user.name).toBe('Chandan');
    // expect(res.body).not.toBeNull()
    // console.log(res.body.data.user.name)
});

test("should not login nonexisting user", async () => {
  await request(app)
    .post("/api/v1/users/login")
    .send({
      email: "abc@gmail.com",
      password: "password",
    })
    .expect(401);
});

test("Should get profile for user", async () => {
  await request(app)
    .post("/api/v1/users/login")
    .set("Authorization", `Bearer ${token}`)
    .send({ email: user.email, password: user.password })
    .expect(200);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete(`/api/v1/users/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});


