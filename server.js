const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "development";
const path =
  environment === "development" ? "./config/dev.env" : "./config/test.env";
  console.log(path)
dotenv.config({ path });
const app = require("./app");
const connectDb = require("./connection");

// connect to database
connectDb();
console.log(process.env.PORT);
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`server is started on port ${port}`);
});
