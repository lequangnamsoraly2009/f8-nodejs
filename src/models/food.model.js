const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Food = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String, maxLength: 255 },
        type: { type: String, maxLength: 255, required: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true, //cái này là sẳn createAt vs updateAt
    },
);

module.exports = mongoose.model('Food', Food);
