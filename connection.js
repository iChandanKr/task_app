const mongoose = require("mongoose");
// for testing purpose
const dotenv = require('dotenv')
const environment = process.env.NODE_ENV || "development";
const path =
environment === "development" ? "./config/dev.env" : "./config/test.env";
dotenv.config({ path });
const uri =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_DB_URI
    : process.env.TEST_DB_URI;
const connection = async () => {
  try {
    const res = await mongoose.connect(uri);
    if (res) {
      console.log(`mongodb is connected with server ${res.connection.host}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
