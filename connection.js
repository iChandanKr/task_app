const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/task";

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