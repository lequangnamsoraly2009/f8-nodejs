const FoodCollection = require('../models/food.model');
const { multipleMongooseToObject } = require('../util/mongoose');
const CartCollection = require('../models/cart.model');
const UserCollection = require('../models/user.model');

class SiteController {
    // API mặc định của news (/news)
    // [GET-(/home)-/]
    async home(req, res) {
        const userAll = await UserCollection.find({ email: req.user.email });
        const foods = await FoodCollection.find({}); //xem cách gọi nhé
        const carts = await CartCollection.find({
            customer: userAll[0]._id,
        }).populate('product');
        res.render('home', {
            countProducts: carts.length,
            foods: multipleMongooseToObject(foods),
            carts: multipleMongooseToObject(carts).map((cart) => cart.product),
            title: 'Trang Chủ',
            user: req.user.name,
        });
    }
}

module.exports = new SiteController();
