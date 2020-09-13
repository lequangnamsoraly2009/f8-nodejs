const e = require('express');
const Food = require('../models/food.model');
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../util/mongoose');

class FoodController {
    async all(req, res) {
        res.redirect('/');
    }

    // [GET]-[/food/:slug]
    async find(req, res) {
        const food = await Food.findOne({ slug: req.params.slug });
        if (food) {
            res.render('food/show', {
                food: mongooseToObject(food),
            });
            return;
        }
        res.send(`<h1>Dont find food in store</h1> <a href='/'>Go home</a>`);
    }

    // [GET]-[/food/create] - Thêm món mới
    async create(req, res, next) {
        res.render('food/create');
    }

    // [POST]-[/food/store] - Save into database
    async createFood(req, res, next) {
        const formData = req.body;
        const food = new Food(formData);
        food.save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
}

module.exports = new FoodController();
