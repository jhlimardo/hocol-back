const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    lastname: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user', 'operator', 'contractor', 'signer', 'root'],
      default: 'user',
    },
    profile: {
      documentNumber: String,
      documentType: String,
      country: String,
      state: String,
      city: String,
      address: String,
      addressAux: String,
      urlPhoto: String,
      phone: String,
      gender: String,
      dob: String,
    },
    privateKey: {
      type: String,
      required: false,
    },
    publicKey: {
      type: String,
      required: false,
    },
    phoneData: {},
    logs: [{ type: Schema.Types.ObjectId, ref: 'LogUsers' }],
    assets: { type: Schema.Types.ObjectId, ref: 'Assets' },
    more: {},
  },
  { timestamps: {} }
);

module.exports = mongoose.model('User', UserSchema);
