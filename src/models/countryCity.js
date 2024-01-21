import  mongoose from 'mongoose';

let Schema = mongoose.Schema;

let CountryCitySchema = Schema({
    id: String,
    name: String,
    more: String,
},{ timestamps: {  } });

export default mongoose.model('CountryCity', CountryCitySchema);
