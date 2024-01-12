const express = require('express');
const router = express.Router();

router.get('/health', (req, res, next) => {
    res.send('OK');
});

router.use('/tasks', require('./tasks'));
router.use('/locations', require('./locations'));
router.use('/users', require('./users'));
router.use('/groups', require('./groups'));

module.exports = router;