const express = require('express');
const router = express.Router();
const { getAllUsers, getAllUsersByGroupId, getUserCountByGroup } = require('../db/helpers/user-group');

//user-group join table -- goes to /api/user-group/
router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

router.get('/count', async (req, res, next) => {
    try {
        const users = await getUserCountByGroup();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const users = await getAllUsersByGroupId(req.params.id);
        res.send(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;