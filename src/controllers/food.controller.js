const FoodCollection = require('../models/food.model');
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
        const food = await FoodCollection.findOne({ slug: req.params.slug });
        if (food) {
            res.render('food/show', {
                food: mongooseToObject(food),
                title: 'Thông Tin Chi Tiết',
            });
            return;
        }
        res.send(`<h1>Dont find food in store</h1> <a href='/'>Go home</a>`);
    }

    // [GET]-[/food/create] - Thêm món mới
    async create(req, res, next) {
        res.render('food/create', {
            title: 'Thêm Sản Phẩm',
        });
    }

    // [POST]-[/food/store] - Save into database
    async createFood(req, res, next) {
        const food = new FoodCollection(req.body);
        food.save()
            .then(() => res.redirect('/me/list'))
            .catch((error) => {});
    }
    // [GET]-[/food/:id/edit] - Sửa món ăn
    async editFood(req, res, next) {
        const food = await FoodCollection.findById({ _id: req.params.id });
        if (food) {
            res.render('food/editFood', {
                food: mongooseToObject(food),
                title: 'Sửa Thông Tin Sản Phẩm',
            });
            return;
        }
        res.send(
            `<h1>Dont find food in store</h1> <a href='/me/list'>Go To Your List Food</a>`,
        );
    }

    // [PUT]-[/food/:id] - Update
    async updateFood(req, res, next) {
        const food = await FoodCollection.updateOne(
            { _id: req.params.id },
            req.body,
        );
        if (food) {
            res.redirect('/me/list');
            return;
        }
        res.send(
            `<h1>Dont find food in store</h1> <a href='/me/list'>Go To Your List Food</a>`,
        );
    }

    // [PATCH]-[/food/restore/:id] - Restore Food
    async restoreFood(req, res, next) {
        const food = await FoodCollection.restore({ _id: req.params.id });
        if (food) {
            res.redirect('back');
            return;
        }
        res.send(
            `<h1>Dont find food in store</h1> <a href='/me/list'>Go To Your List Food</a>`,
        );
    }

    // [DELETE]-[/food/:id] - soft delete food
    async deleteFood(req, res, next) {
        const food = await FoodCollection.delete({ _id: req.params.id });
        if (food) {
            res.redirect('back');
            return;
        }
        res.send(
            `<h1>Dont find food in store</h1> <a href='/me/list'>Go To Your List Food</a>`,
        );
    }

    // [DELETE]-[/food/force/:id] - force delete food
    async forceDeleteFood(req, res, next) {
        const food = await FoodCollection.deleteOne({ _id: req.params.id });
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
