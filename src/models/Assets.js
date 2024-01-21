const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let AssetsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    assetType: {
      type: String,
      required: true,
      unique: false,
    },
    publicKey: {
      type: String,
      required: false,
    },
    privateKey: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    more: {},
    user : { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Assets", AssetsSchema);
