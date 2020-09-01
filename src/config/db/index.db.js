const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect DataBase Successfully');
    } catch (error) {
        console.log('Connect DataBase Failure');
    }
}

module.exports = { connect };
