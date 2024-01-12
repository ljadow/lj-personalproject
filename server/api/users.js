const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, deleteUser } = require('../db/helpers/users');

router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const users = await getUserById(req.params.id);
        res.send(users);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const users = await createUser(req.body);
        res.send(users);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const users = await deleteUser(req.params.id);
        res.send(users);
    } catch (err) {
        next(err);
    }
});

module.exports = router;