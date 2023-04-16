const mongoose = require("mongoose");



const tweetModel = new mongoose.Schema({
  tweetContent: {
    type: String,
  },
  date: {
    type: String,
  },
});

const Tweet = mongoose.model("Tweet", tweetModel);

module.exports = Tweet;
