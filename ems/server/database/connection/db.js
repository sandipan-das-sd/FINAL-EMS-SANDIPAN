const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Connection = async () => {
  // const { DB_USERNAME, DB_PASSWORD } = process.env;
 const  mongo_URL=`mongodb+srv://pyqplatform:4lvW8IbQPvKRETfB@cluster0.3tzpejq.mongodb.net/curd_ems?retryWrites=true&w=majority&appName=Cluster0`;
  

  try {
    await mongoose.connect(mongo_URL, {
     
    });
    console.log("Db Connection Successfully");
  } catch (error) {
    console.log("Connection Error with Database", error);
  }
};

module.exports = Connection;
