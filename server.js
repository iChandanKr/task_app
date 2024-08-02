const app = require("./app");
const connectDb = require("./connection");

// connect to database
connectDb();

const port = 7000;
app.listen(
  port,() => {
    console.log(`server is started on port ${port}`);
  }
);
