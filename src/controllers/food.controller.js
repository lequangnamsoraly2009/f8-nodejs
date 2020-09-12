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
}

module.exports = new FoodController();
