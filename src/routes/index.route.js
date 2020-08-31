const newsRouter = require('../routes/news.route');
const siteRouter = require('../routes/site.route');

function route(app) {
    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
