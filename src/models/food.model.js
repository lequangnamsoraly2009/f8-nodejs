const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Food = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String, maxLength: 255 },
        type: { type: String, maxLength: 255, required: true },
        slug: { type: String, slug: 'name', unique: true },
        choose: {
            type: Boolean,
            required: true,
            unique: true,
            default: 'false',
        },
    },
    {
        timestamps: true, //cái này là sẵn createAt vs updateAt
    },
);

// Plugins
mongoose.plugin(slug);
Food.plugin(mongooseDelete, {
    overrideMethods: 'all', //xóa đè lên database
    deletedAt: true, // Thời gian xóa
    deletedBy: true, //Người xóa?
});

module.exports = mongoose.model('Food', Food);
