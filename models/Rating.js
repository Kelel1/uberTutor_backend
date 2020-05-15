const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  user: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: false },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Rating", ratingSchema);