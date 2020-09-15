const Food = require('../models/food.model');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../util/mongoose');

class MeController {
    async all(req, res) {
        res.redirect('/');
    }
    // [GET]-[/me/list]
    async listFood(req, res, next) {
        try {
            const countDeletedFood = await Food.countDocumentsDeleted({});
            const foods = await Food.find({});
            res.render('me/listFood', {
                countDeletedFood,
                foods: multipleMongooseToObject(foods),
            });
        } catch (error) {}
    }
    // [GET]-[/me/trash]
    async listTrashFood(req, res, next) {
        const foods = await Food.findDeleted({});
        res.render('me/listTrashFood', {
            foods: multipleMongooseToObject(foods),
        });
    }

    // [GET]-[/me/cart]
    async cartFood(req, res, next) {
        const foods = await Food.find({ choose: true });
        res.render('me/cartFood', {
            foods: multipleMongooseToObject(foods),
        });
    }

    // [POST]-[/me/cart/add/:id]
    async cartAddFood(req, res, next) {
        // const food = await Food.findByIdAndUpdate({ _id: req.params.id }, { 'choose': true }, {new: true})
        // food.save(); // can lay ra ms find. k can save
        await Food.updateOne({ _id: req.params.id }, { choose: true });
        res.redirect('back');
    }
}

module.exports = new MeController();
