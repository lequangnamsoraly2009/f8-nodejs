const FoodCollection = require('../models/food.model');
const CartCollection = require('../models/cart.model');
const BillCollection = require('../models/bill.model');
const AuthCollection = require('../models/user.model');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../util/mongoose');

class AuthController {
    async all(req, res) {
        res.redirect('/', { title: 'Trang Chủ' });
    }

    async signIn(req, res, next) {
        res.render('auth/sign-in', { title: 'Đăng Nhập' });
    }

    async signUp(req, res, next) {
        res.render('auth/sign-up', { title: 'Đăng Kí' });
    }
}

module.exports = new AuthController();
