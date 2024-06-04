const { roles, ROLES } = require('../middleware/roles');
const token = require('../middleware/token');
const userModel = require('../models/UserSchema');
const router = require('express').Router();
const jwt = require('jsonwebtoken');;
router.post('/register', async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        if (users.length === 0) return res.send('No user found');
        else
            res.send(users);
    } catch (error) {
        res
    }
});

router.post('/login',  async (req, res) => {
    try {
        const user = await userModel.findOne({
            email: req
                .body.email
        });
        if (!user) return res.status(400).send('User not found');
        if (user.password !== req.body.password) return res.status(400).send('Invalid password');
        const token = jwt.sign({ _id : user._id, role : user.role}, 'SECRET', { expiresIn: '1h' });
        res.send(token);
    } catch (error) {
        res.status(500).send
    }
}
);

router.get("/protected", token, roles(ROLES.ADMIN), (req, res) => { 

    res.send("This is a protected route");
});

router.get("/protectedUser", token, roles(ROLES.USER), (req, res) => {
    res.send("This is a User Route");
})


module.exports = router;