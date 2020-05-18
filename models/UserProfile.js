const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  user: { type: String, required: true },
  categories: {type: [String]},
  ratings: { type: [String] },
  location: { type: String },
  avatar: { type: String },
  age: {type: Number},
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);