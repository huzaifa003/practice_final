const userModel = require('../models/UserSchema');
const router = require('express').Router();

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

module.exports = router;