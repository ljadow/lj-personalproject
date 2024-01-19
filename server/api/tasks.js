const express = require('express');
const router = express.Router();
// const { authRequired } = require('./utils');
const { getAllTasks, getTaskById, getTasksByUserId, createTask, updateTask, deleteTask } = require('../db/helpers/tasks');

router.get('/', async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.send(tasks);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const tasks = await getTaskById(req.params.id);
        res.send(tasks);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:id', async (req, res, next) => {
    try {
        const tasks = await getTasksByUserId(req.params.id);
        res.send(tasks);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const tasks = await createTask(req.body);
        res.send(tasks);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const tasks = await updateTask(req.params.id, req.body);
        res.send(tasks);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const tasks = await deleteTask(req.params.id);
        res.send(tasks);
    } catch (err) {
        next(err);
    }
});

module.exports = router;