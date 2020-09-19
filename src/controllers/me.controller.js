const FoodCollection = require('../models/food.model');
const CartCollection = require('../models/cart.model');
const BillCollection = require('../models/bill.model');
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
            const countDeletedFood = await FoodCollection.countDocumentsDeleted(
                {},
            );
            const foods = await FoodCollection.find({});
            res.render('me/listFood', {
                countDeletedFood,
                foods: multipleMongooseToObject(foods),
            });
        } catch (error) {}
    }
    // [GET]-[/me/trash]
    async listTrashFood(req, res, next) {
        const foods = await FoodCollection.findDeleted({});
        res.render('me/listTrashFood', {
            foods: multipleMongooseToObject(foods),
        });
    }

    // [GET]-[/me/cart]
    async cartFood(req, res, next) {
        const arrCart = [];
        await CartCollection.find({ customer: '5f6214c6552cbdf5ec1db9f4' })
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
        });
    }

    // [POST]-[/me/cart/add/:id]
    async cartAddFood(req, res, next) {
        const condition = {
            customer: '5f6214c6552cbdf5ec1db9f4', // vi chua cho auth nen t lay tam ben data
            product: req.params.id,
        };

        CartCollection.create(condition).then((cart) => {
            if (cart) {
                res.redirect('/');
            }
            res.send('<h1>Khong the them</h1>');
        });
    }

    // [POST]-[/me/cart/delete/:id]
    async cartDeleteFood(req, res, next) {
        // const food = await Food.findByIdAndUpdate({ _id: req.params.id }, { 'choose': true }, {new: true})
        // food.save(); // can lay ra ms find. k can save
        // await FoodCollection.updateOne({ _id: req.params.id }, { choose: false });
        await CartCollection.deleteOne({
            customer: '5f6214c6552cbdf5ec1db9f4',
        });
        res.redirect('back');
    }

    // CART TÍNH TIỀN

    // [POST]-[/me/cart/payment]
    async paymentCart(req, res, next) {
        // const cart = new CartCollection.create(req.body); //Bí cmn rồi
        const arrProduct = [];
        await CartCollection.find({ customer: '5f6214c6552cbdf5ec1db9f4' })
            .populate('product')
            .then((carts) => {
                carts.forEach((cart) => {
                    arrProduct.push(cart.product);
                });
            });
        const condition = {
            customer: '5f6214c6552cbdf5ec1db9f4',
            products: arrProduct,
        };
        const bill = await BillCollection.create(condition);

        await CartCollection.deleteMany({
            customer: '5f6214c6552cbdf5ec1db9f4',
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
            });
        }
    }

    async bill(req, res) {
        //tim bill -> lay ds sp -> tinh trong
        // render(ds sp, gia tong);
    }
}

module.exports = new MeController();
