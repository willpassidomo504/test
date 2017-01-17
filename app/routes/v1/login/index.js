var User = require('../../../models/user');
var Beacon = require('../../../models/beacon')
var express = require('express');
var utils = require('../../../utils/password_utils');
var jwt    = require('jsonwebtoken');
var router = express.Router()
var app = express();

router.post('/', function (req,resp){
    var userName = req.body.username;
    if (userName == null) {
        console.log("username parameter not included");
        resp.send({
            status: "failure",
            message: "username parameter not included"
        });
        return;
    }
    User.findByName(userName, function(err, users) {
        if (err || users == null || users.size < 1 || users[0] == null) {
            console.log("user not found - " + userName);
            resp.send({
                status: "failure",
                message: "user not found"
            });
            return;
        }
        var user = users[0];
        utils.isMatch(user.passwordHash, req.body.password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                console.log("success, user - " + user.name);
                var token = jwt.sign(user, req.app.get('secret'), {
                    expiresIn: 1440 // expires in 24 hours
                });
                var beacons = Beacon.getBeacons(user._id, function(err, beacons) {
                    if (err) {
                        console.log(err);
                        resp.send({
                            status: "failure",
                            message: "could not retrieve beacons"
                        });
                        return;
                    }
                    resp.send({
                        status: "success",
                        user: user,
                        token: token,
                        beacons: beacons,
                        message: "success"
                    });
                    return;
                })

            } else {
                console.log(req.body);
                console.log("wrong password")
                resp.send({
                    status: "failure",
                    message: "wrong password"
                });
                return;
            }
        });

    })
});

module.exports = router;