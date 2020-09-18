const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');

const billSchema = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, ref: User },
        products: { type: Array, default: [] },
    },
    {
        timestamps: true, //cái này là sẵn createAt vs updateAt
    },
);

module.exports = mongoose.model('Bill', billSchema);

// [
//     {
//         id: {type:  Schema.Types.ObjectId},
//         name: {type: String},
//         price: {type: Number},
//         image: {type: String},
//         number: {type: Number},
//     }
// ]
