const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.cookies['auth-token'];
    if (!token) return res.redirect('/auth/sign-in');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.redirect('/auth/sign-in');
    }
};
