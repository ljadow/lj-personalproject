const express = require('express');
const router = express.Router();
const { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup } = require('../db/helpers/groups');

router.get('/', async (req, res, next) => {
    try {
        const groups = await getAllGroups();
        res.send(groups);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const groups = await getGroupById(req.params.id);
        res.send(groups);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const groups = await createGroup(req.body);
        res.send(groups);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const groups = await updateGroup(req.params.id, req.body);
        res.send(groups);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const groups = await deleteGroup(req.params.id);
        res.send(groups);
    } catch (err) {
        next(err);
    }
});

module.exports = router;