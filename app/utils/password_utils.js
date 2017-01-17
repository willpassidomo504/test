// https://github.com/kelektiv/node.bcrypt.js

var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    isMatch: function (hash, plainTextPassword, cb) {
        bcrypt.compare(plainTextPassword, hash, function(err, match) {
            cb(err, match);
        })
    },
    hashPassword: function (password, cb) {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            cb(err, hash);
        });
    }
}