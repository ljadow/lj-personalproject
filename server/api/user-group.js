const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../db/helpers/user-group');

//user-group join table by groupID -- goes to /api/user-group/:id
router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;