const Food = require('../models/food.model');
const { multipleMongooseToObject } = require('../util/mongoose');

class SiteController {
    // API mặc định của news (/news)
    // [GET-(/home)-/]
    async home(req, res) {
        const foods = await Food.find({}); //xem cách gọi nhé
        // console.log(courses);
        res.render('home', {
            foods: multipleMongooseToObject(foods),
        });
    }
}

module.exports = new SiteController();
