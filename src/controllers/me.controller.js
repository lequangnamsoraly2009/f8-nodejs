const Food = require('../models/food.model');
const { mutipleMongooseToObject } = require('../util/mongoose');

class MeController {
    async all(req, res) {
        res.redirect('/');
    }

    async listFood(req, res, next) {
        const foods = await Food.find({});
        res.render('me/listFood', {
            foods: mutipleMongooseToObject(foods),
        });
    }
}

module.exports = new MeController();
