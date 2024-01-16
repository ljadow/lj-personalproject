const express = require('express');
const router = express.Router();
const { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation } = require('../db/helpers/locations');

router.get('/', async (req, res, next) => {
    try {
        const locations = await getAllLocations();
        res.send(locations);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const locations = await getLocationById(req.params.id);
        res.send(locations);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const locations = await createLocation(req.body);
        res.send(locations);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const locations = await updateLocation(req.params.id, req.body);
        res.send(locations);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const locations = await deleteLocation(req.params.id);
        res.send(locations);
    } catch (err) {
        next(err);
    }
});

module.exports = router;