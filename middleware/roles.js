const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

const roles = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).send('Access denied. You do not have the required role to access this route.');
        console.log(req.user);
        next();
    }
}

module.exports = { ROLES, roles };
