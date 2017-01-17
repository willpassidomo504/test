var express = require('express')
var router = express.Router()

var beacons = require('./v1/beacons')
var users = require('./v1/users');
var login = require('./v1/login');

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Connected!' });
});

router.use('/beacons', beacons);
router.use('/users', users);
router.use('/login', login);

module.exports = router;