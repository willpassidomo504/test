/**
 * Created by willpassidomo on 12/29/16.
 */

var utils = require('./utils/password_utils');
var apiEndpoints = require('./routes/api_');
var jwt = require('jsonwebtoken');

module.exports = function(app){

    app.use(function(req, resp, next) {
        var _ = require('underscore');
        var nonSecurePaths = '/login';

        if (req.path.endsWith(nonSecurePaths) ) { return next(); }


        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if (err) {
                    console.log("authentication failed, error");
                    console.log(err);
                    return resp.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    console.log("authentication good");
                    next();
                }
            });

        } else {
            console.log("authentication failed, no token");
            return resp.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }

    });

    app.use('/api', apiEndpoints);

    app.get('*', function (req, resp) {
        resp.sendfile('./public/views/index.html');
    });

    app.get('/teststuf', function(req, resp) {
        resp.send({status: success});
    })
}
