const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: {
            type: String,
        },
        province: {
            type: String,
        },
        email: {
            type: String,
            require: true,
        },
        // hashPassword: { type: String, unique: true, required: true }, // sau xài cái này bằng middleware
        password: { type: String, require: true }, //test user
    },
    {
        timestamps: true, //cái này là sẵn createAt vs updateAt
    },
);

// Plugins
mongoose.plugin(slug);

module.exports = mongoose.model('User', User);
