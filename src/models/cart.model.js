const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const User = require('./user.model');

const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, ref: 'User' },
        product: [
            {
                nameFood: { type: String, unique: true },
                priceFood: { type: Number, min: 0 },
                numberFood: { type: Number, min: 0 },
            },
        ],
        totalMoney: { type: Number, min: 0 },
    },
    {
        timestamps: true, //cái này là sẵn createAt vs updateAt
    },
);

// Plugins
mongoose.plugin(slug);
Cart.plugin(mongooseDelete, {
    overrideMethods: 'all', //xóa đè lên database
    deletedAt: true, // Thời gian xóa
    deletedBy: true, //Người xóa?
});

module.exports = mongoose.model('Cart', Cart);
