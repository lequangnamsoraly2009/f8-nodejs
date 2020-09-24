const UserCollection = require('../models/user.model');

exports.roleAdmin = async (req, res, next) => {
    const userAll = await UserCollection.find({ email: req.user.email });
    if (!userAll[0].role == 'admin') {
        res.send('Không có quyền truy cập');
    }
    next();
};

exports.roleUser = (req, res, next) => {
    next();
};
