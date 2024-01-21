const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ProfileSchema = Schema({
    firstName: {
        type: 'string',
        required: true
    },
    lastName: {
        type: 'string',
        required: true
    },
    addressprofile: {
            address: 'string',
            addressAux: 'string',
            city: 'string',
            state: 'string',
            country: 'string',
            zip: 'string',
    },
    phonedata: {
        phone: 'string',
        phonearea: 'string',
        cell: 'string',
        cellarea: 'string',
    },

    dob: {
        type: 'string',
    },
    status: {
        type: number,
        default: 0
    },
    role: {
        type: 'string',
    },
    active: {
        type: number,
        default: 0
    },
    more: {},
},{ timestamps: {  } });

module.exports = mongoose.model('Profile', ProfileSchema);
