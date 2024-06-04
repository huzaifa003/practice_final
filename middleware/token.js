const jwt = require('jsonwebtoken');
const token = (req, res, next) => {
    const token = req.query?.token || req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied. No token provided. Please Login to access this route.');

    jwt.verify(token, "SECRET", (err, decoded) => {
        if (err) {
            res.status(400).send('Invalid token.');
            return;
        }
        req.user = decoded;
        next();
    })



}

module.exports = token;
