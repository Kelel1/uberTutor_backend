const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  custom: { type: Boolean, required: true , default: false },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Category", categorySchema);