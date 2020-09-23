const siteRouter = require('../routes/site.route');
const foodRouter = require('../routes/food.route');
const meRouter = require('../routes/me.route');
const authRouter = require('../routes/auth.route');

function route(app) {
    app.use('/', siteRouter);
    app.use('/food', foodRouter);
    app.use('/me', meRouter);
    app.use('/auth', authRouter);
}

module.exports = route;
