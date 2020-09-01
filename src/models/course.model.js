const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 855 },
        image: { type: String, maxLength: 255 },
    },
    {
        timestamps: true, //cái này là sẳn createAt vs updateAt
    },
);

module.exports = mongoose.model('Course', Course);
