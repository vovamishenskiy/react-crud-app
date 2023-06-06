const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = async (server) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/react-crud-app');
    console.log("mongo connection successful..");

    // Listening to server
    await server.listen(5000, () =>
      console.log(
        `server running on port 5000..`
      )
    );
  } catch (error) {
    console.log("mongo connection failed..");
    console.log(error);
    process.exit(1);
  }
};

const getUserData = async (response) => {
  const res = await User.aggregate([
    { $match: { 'role': 'admin' } }
    // { $match: { 'role': 'user' } }
    // { $set: { 'test_role': 'tester' } }
  ]).exec()
  console.log('aggregate result: ', res)
}

getUserData()