class NewsController {
    // API mặc định của news (/news)
    // [GET-/news]
    index(req, res) {
        res.render('news');
    }
    // [GET-/news/:slug]
    show(req, res) {
        res.send('Slug của News');
    }
}

module.exports = new NewsController();
