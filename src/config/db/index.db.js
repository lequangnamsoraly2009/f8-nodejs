const mongoose = require('mongoose');
const connection = mongoose.connection;
uri = process.env.URL_MONGODB;
class Connect {
    onConnection() {
        connection.on('connected', () => {
            console.log('Mongo Connection Established');
        });

        connection.on('reconnected', () => {
            console.log('Mongo Connection Reestablished');
        });

        connection.on('disconnected', () => {
            console.log('Mongo Connection Disconnected');
            console.log('Trying to reconnect to Mongo...');
            setTimeout(() => {
                mongoose.connect(this.uri, {
                    keepAlive: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    socketTimeoutMS: 3000,
                    connectTimeoutMS: 3000,
                });
            }, 3000);
        });
        connection.on('close', () => {
            console.log('Mongo Connection Closed');
        });

        connection.on('error', (error) => {
            console.log('Mongo Connection Error:' + error);
        });

        const run = async () => {
            await mongoose.connect(uri, {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true,
            });
        };

        run().catch((error) => console.error(error));
    }
}

module.exports = new Connect();
