import  mongoose from 'mongoose';

let Schema = mongoose.Schema;

let RoleSchema = Schema({
    name    : String,
    code    : Number,
    data    : {},
    state   :{ type: Number, default: 1 },
    more: {}
},{ timestamps: {  } });

module.exports = mongoose.model('Role', RoleSchema);