const siteRouter = require('../routes/site.route');
const foodRouter = require('../routes/food.route');
const meRouter = require('../routes/me.route');
const authRouter = require('../routes/auth.route');
const { verifyToken } = require('../middleware/verifyToken');

function route(app) {
    app.use('/', siteRouter);
    app.use('/food', verifyToken, foodRouter);
    app.use('/me', verifyToken, meRouter);
    app.use('/auth', authRouter);
}

module.exports = route;
