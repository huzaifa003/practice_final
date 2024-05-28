const token = (req, res, next) => {
    const token = req.query?.token || req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied. No token provided.');
    next();
}

module.exports = token;
