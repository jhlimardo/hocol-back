import  mongoose from 'mongoose';

let Schema = mongoose.Schema;

let LogUsersSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
    status: { type: Number, default: 0 },
    more: {},
},{ timestamps: {  } });

export default mongoose.model('LogUsers', LogUsersSchema);