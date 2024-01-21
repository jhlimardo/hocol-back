import  mongoose from 'mongoose';

let Schema = mongoose.Schema;

let CitySchema = Schema({
    id: String,
    id_state: String,
    name: String,
    more: String,
},{ timestamps: {  } });

export default mongoose.model('City', CitySchema);
