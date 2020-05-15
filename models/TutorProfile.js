const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tutorProfileSchema = new Schema({
  user: { type: String, required: true },
  categories: { type: [String], required: true },
  ratings: { type: [String], required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("TutorProfile", tutorProfileSchema);