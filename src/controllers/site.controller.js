const Course = require('../models/course.model');
const { mutipleMongooseToObject } = require('../util/mongoose');
const { clearConfigCache } = require('prettier');
class SiteController {
    // API mặc định của news (/news)
    // [GET-/home-/]
    async home(req, res) {
        const courses = await Course.find({}); //xem cách gọi nhé
        // console.log(courses);
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
