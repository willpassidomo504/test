var mongoose = require('mongoose');
var utils = require('../utils/password_utils');
var Schema = mongoose.Schema;

var userSchema =  new Schema({
    name : String,
    passwordHash : String ,
    id : String,
    dateCreated : {type: Date, default: Date.now()},
    isAdmin: {type: Boolean, default: true}
});

var userModel = mongoose.model(
	'User', userSchema);

module.exports = {
    userModel: userModel,
    findByName: function (name, cb) {
        userModel.find({  name: new RegExp(name, 'i') }, cb);
    },
    create: function (name, password, isAdmin, cb) {
        var hashedPassword = utils.hashPassword(password, function (err, hashedPassword) {
            if (err) {
                console.log(err);
                //handle error
            }
            console.log(hashedPassword);
            var user = new userModel({
                name: name,
                passwordHash: hashedPassword,
                isAdmin: isAdmin
            });
            console.log("saving..");
            console.log(user);
            user.save()
                .then(function success(response) {
                    cb(response);
                }, function failure(response) {
                    cb(response);
                });
        });

    },
    removeAll: function (cb) {
        userModel.remove({}, cb);
    },
    findAll: function (cb) {
        userModel.find({}, cb);
    },
    delete: function(id, cb) {
        userModel.find({_id: id}).remove(cb);
    }
};

