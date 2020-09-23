const FoodCollection = require('../models/food.model');
const CartCollection = require('../models/cart.model');
const BillCollection = require('../models/bill.model');
const UserCollection = require('../models/user.model');

const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../util/mongoose');

class MeController {
    async all(req, res) {
        res.redirect('/', { title: 'Trang Chủ' });
    }
    // [GET]-[/me/list]
    async listFood(req, res, next) {
        try {
            const countDeletedFood = await FoodCollection.countDocumentsDeleted(
                {},
            );
            const foods = await FoodCollection.find({});
            res.render('me/listFood', {
                countDeletedFood,
                foods: multipleMongooseToObject(foods),
                title: 'Danh sách sản phẩm',
                user: req.user.name,
            });
        } catch (error) {}
    }
    // [GET]-[/me/trash]
    async listTrashFood(req, res, next) {
        const foods = await FoodCollection.findDeleted({});
        res.render('me/listTrashFood', {
            foods: multipleMongooseToObject(foods),
            title: 'Thùng Rác',
            user: req.user.name,
        });
    }

    // [GET]-[/me/cart]
    async cartFood(req, res, next) {
        const arrCart = [];
        const userAll = await UserCollection.find({ email: req.user.email });
        await CartCollection.find({ customer: userAll[0]._id })
            .populate('product')
            .then((carts) => {
                carts.forEach((cart) => {
                    arrCart.push(cart.product);
                });
            });
        const countProducts = arrCart.length;
        res.render('me/cartFood', {
            countProducts,
            foods: multipleMongooseToObject(arrCart),
            carts: multipleMongooseToObject(arrCart),
            title: 'Giỏ Hàng Của Bạn',
            user: req.user.name,
        });
    }

    // [POST]-[/me/cart/add/:id]
    async cartAddFood(req, res, next) {
        const userAll = await UserCollection.find({ email: req.user.email });
        const condition = {
            customer: userAll[0]._id, // vi chua cho auth nen t lay tam ben data
            product: req.params.id,
        };

        CartCollection.create(condition)
            .then((cart) => {
                if (cart) {
                    res.redirect('back');
                }
            })
            .catch();
    }

    // [POST]-[/me/cart/delete/:id]
    async cartDeleteFood(req, res, next) {
        const userAll = await UserCollection.find({ email: req.user.email });
        // const food = await Food.findByIdAndUpdate({ _id: req.params.id }, { 'choose': true }, {new: true})
        // food.save(); // can lay ra ms find. k can save
        // await FoodCollection.updateOne({ _id: req.params.id }, { choose: false });
        await CartCollection.deleteOne({
            customer: userAll[0]._id,
        });
        res.redirect('back');
    }

    // CART TÍNH TIỀN

    // [POST]-[/me/cart/payment]
    async paymentCart(req, res, next) {
        // const cart = new CartCollection.create(req.body); //Bí cmn rồi
        const userAll = await UserCollection.find({ email: req.user.email });

        const arrProduct = [];
        await CartCollection.find({ customer: userAll[0]._id })
            .populate('product')
            .then((carts) => {
                carts.forEach((cart) => {
                    arrProduct.push(cart.product);
                });
            });
        const condition = {
            customer: userAll[0]._id,
            products: arrProduct,
        };
        const bill = await BillCollection.create(condition);

        await CartCollection.deleteMany({
            customer: userAll[0]._id,
        });

        if (bill) {
            let totalPrice = 0;
            const arrPrice = [];
            arrProduct.forEach((product) => {
                arrPrice.push(product.price);
            });
            totalPrice = arrPrice.reduce((a, b) => {
                return Number(a) + Number(b);
            }, 0);
            const countProducts = arrProduct.length;
            res.render('bill/checkout', {
                countProducts,
                totalPrice,
                arrProduct: multipleMongooseToObject(arrProduct),
                title: 'Thanh Toán Sản Phẩm',
                user: req.user.name,
            });
        }
    }
}

module.exports = new MeController();
