const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Connection = async () => {
  // const { DB_USERNAME, DB_PASSWORD } = process.env;
  
  

  try {
    await mongoose.connect(process.env.mongo_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Db Connection Successfully");
  } catch (error) {
    console.log("Connection Error with Database", error);
  }
};

module.exports = Connection;
