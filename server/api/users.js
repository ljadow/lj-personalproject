const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, getUserByGroupId, createUser, updateUser, deleteUser } = require('../db/helpers/users');

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

//users by groupID -- goes to /api/users/group/id
router.get('/group/:id', async (req, res, next) => {
    try {
        const users = await getUserByGroupId(req.params.id);
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

router.put('/:id', async (req, res, next) => {
    try {
        const users = await updateUser(req.params.id, req.body);
        res.send(users);
    } catch (error) {
        next(error);
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