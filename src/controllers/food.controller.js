const Food = require('../models/food.model');
const { mongooseToObject } = require('../util/mongoose');

class FoodController {
    // [GET]-[/food/:slug]
    async show(req, res) {
        const food = await Food.findOne({ slug: req.params.slug });
        res.render('food/show', {
            food: mongooseToObject(food),
        });
    }

    // [GET]-[/food/create] - Thêm món mới
    async create(req, res, next) {
        res.render('food/create');
    }

    // [POST]-[/food/store] - Save into database
    async store(req, res, next) {
        const formData = req.body;
        const food = new Food(formData);
        food.save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
}

module.exports = new FoodController();
