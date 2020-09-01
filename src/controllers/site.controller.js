const Course = require('../models/course.model');
// const { mutipleMongooseToObject } = require('../util/mongoose');
class SiteController {
    // API mặc định của news (/news)
    // [GET-/home-/]
    async home(req, res) {
        // Course.find({})
        //     .then((courses) =>
        //         res.render('home', {
        //             courses: mutipleMongooseToObject(courses),
        //         }),
        //     )
        //     .catch(next);
        // res.render('home');
        const courses = await Course.find({});
        res.render('home', {
            courses,
        });
    }
    // [GET-/search]
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
