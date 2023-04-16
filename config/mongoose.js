const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/chatgpt_tweets");

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "error occurred while connecting to database")
);

db.once("open", function () {
  console.log("Successfully connected to the database");
});
