const newsRouter = require('../routes/news.route');
const siteRouter = require('../routes/site.route');
const foodRouter = require('../routes/food.route');
const meRouter = require('../routes/me.route');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
    app.use('/food', foodRouter);
    app.use('/me', meRouter);
}

module.exports = route;
