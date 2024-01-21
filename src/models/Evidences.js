const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let EvidenceSchema = Schema(
  {
    evidence: {
      type: String,
      required: true,
      unique: false,
    },
    async: {
      type: Boolean,
      required: true,
      default: true,
    },
    data: {
      type: String,
      required: false,
      unique: false,
    },
    transactionType: {
      type: String,
      required: false,
      unique: false,
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    hash: {
      type: String,
      required: false,
      unique: false,
    },
    qty: {
      type: Number  ,
      required: false,
      unique: false,
    },
    trxid: {
      type: String,
      required: false,
      unique: false,
    },
    hash2: {
      type: String,
      required: false,
      unique: false,
    },
    hash3: {
      type: String,
      required: false,
      unique: false,
    },
    resume: {
      type: String,
      required: false,
      unique: false,
    },
    url: {
      type: String,
      required: false,
      unique: false,
    },
    reference: {
      type: String,
      required: false,
      unique: false,
    },
    latitude: {
      type: String,
      required: false,
      unique: false,
    },
    longitude: {
      type: String,
      required: false,
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
    trxid: {
      type: String,
      required: false,
    },
    assetName: {
      type: String,
      required: false,
    },

    more: {},
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    asset : { type: Schema.Types.ObjectId, ref: 'Assets' },
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Evidence", EvidenceSchema);
