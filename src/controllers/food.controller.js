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
    // [GET]-[/food/:id/edit] - Sửa món ăn
    async editFood(req, res, next) {
        const food = await Food.findById({ _id: req.params.id });
        if (food) {
            res.render('food/editFood', {
                food: mongooseToObject(food),
            });
            return;
        }
        res.send(
            `<h1>Dont find food in store</h1> <a href='/me/list'>Go To Your List Food</a>`,
        );
    }

    // [PUT]-[/food/:id] - Update
    async updateFood(req, res, next) {
        const food = await Food.updateOne({ _id: req.params.id }, req.body);
        if (food) {
            res.redirect('/me/list');
            return;
        }
        res.send(
            `<h1>Dont find food in store</h1> <a href='/me/list'>Go To Your List Food</a>`,
        );
    }

    // [DELETE]-[/food/:id] - delete food
    async deleteFood(req, res, next) {
        const food = await Food.deleteOne({ _id: req.params.id });
        if (food) {
            res.redirect('back');
            return;
        }
        res.send(
            `<h1>Dont find food in store</h1> <a href='/me/list'>Go To Your List Food</a>`,
        );
    }
}

module.exports = new FoodController();
