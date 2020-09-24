const userCollection = require('../models/user.model');
const { hashPassword, comparePassword } = require('../middleWare/bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async all(req, res) {
        res.redirect('/', { title: 'Trang Chủ' });
    }

    async signIn(req, res) {
        res.render('auth/sign-in', { title: 'Đăng Nhập' });
    }

    async signUp(req, res) {
        res.render('auth/sign-up', { title: 'Đăng Kí' });
    }

    async logOut(req, res) {
        let token = req.cookies['auth-token'];
        res.clearCookie('auth-token');
        res.redirect('/auth/sign-in');
    }

    async postSignUp(req, res) {
        req.body.password = await hashPassword(req.body.password);
        const user = await userCollection.create(req.body);
        res.redirect('/auth/sign-in');
    }

    async postSignIn(req, res) {
        const user = await userCollection.findOne({ email: req.body.email });
        if (user) {
            const compare = await comparePassword(
                req.body.password,
                user.password,
            );
            if (compare) {
                const token = jwt.sign(
                    { email: user.email, name: user.name },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: 60 * 60 * 24,
                    },
                );
                res.cookie('auth-token', token);
                res.redirect('/');
                return;
            }
            res.redirect('back');
            return;
        }
        res.redirect('back');
    }
}

module.exports = new AuthController();
