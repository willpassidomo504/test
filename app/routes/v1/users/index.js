var User = require('../../../models/user')
var express = require('express')
var router = express.Router()

        router.get('/', function(req, resp) {
        User.findAll(function (err, users) {
            if (err) {
                console.log(err);
            } else {
                resp.send(users);
            }
        })
    });
    router.delete('/', function (req, resp) {
        User.removeAll(function (err) {
            if (err) {
                console.log(err)
                resp.send("not deleted");
            } else {
                resp.send("deleted");
            }
        });
    });

    router.delete('/:user_id', function(req, resp) {
        var id = req.params.user_id;
        if (!id) {
            resp.send("need paramter user_id");
            return;
        }
        User.delete(id, function(err, user) {
            if (err) {
                console.log(err);
                resp.send("could not delete item: " + id);
            } else {
                resp.send("deleted" + user);
            }
        })
    })

    router.post('/', function (req, resp) {
        if (req.decoded._doc.isAdmin) {
            var isAdmin = req.body.isAdmin;
            var username = req.body.username;
            var password = req.body.password;
            User.create(username, password, isAdmin, function(response) {
                if (response) {
                    resp.send({
                        admin: response._doc.name,
                        name: response._doc.isAdmin,
                        dateCreated: response._doc.dateCreated
                    });
                } else {
                    resp.send(
                        {
                            status: "failure",
                            message: "user creation failed",
                            error: response
                        });
                }
            });
        } else {
            resp.send({
                status: "failure",
                message: "user must be admin"
            });
        }
    })

module.exports = router;