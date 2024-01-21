const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let CompensationsSchema = Schema(
  {
    compensation: {
      type: Number,
      required: true,
      unique: false,
    },
    activity: {
      type: String,
      required: true,
      unique: false,
    },
    fileCompensation: {
        type: String,
        required: false,
        unique: false,
      },
    more: {},
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Compensations", CompensationsSchema);