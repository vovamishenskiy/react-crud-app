const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const db = require("./config/db");

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors());
db(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/admin", require("./routes/admin"));

module.exports = app;

// to start mongod: brew services start mongodb/brew/mongodb-community