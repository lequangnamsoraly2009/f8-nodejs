const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
            index: { unique: true },
        },
        // hashPassword: { type: String, unique: true, required: true }, // sau xài cái này bằng middleware
        password: { type: String, unique: true, required: true }, //test user
        nameTrue: { type: String },
    },
    {
        timestamps: true, //cái này là sẵn createAt vs updateAt
    },
);

// Plugins
mongoose.plugin(slug);

module.exports = mongoose.model('User', User);
