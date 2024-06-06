const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL_LOCAL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to the database server");
});

db.on("disconnected", () => {
  console.log("Connection lost");
});

module.exports = db;
