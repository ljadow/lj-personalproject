const express = require('express');
const router = express.Router();

router.get('/health', (req, res, next) => {
    res.send('OK');
});

router.use('/tasks', require('./tasks'));
router.use('/users', require('./users'));
router.use('/admins', require('./admins'));
router.use('/groups', require('./groups'));
router.use('/user-group', require('./user-group'));

module.exports = router;