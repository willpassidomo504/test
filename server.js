var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config')[app.get('env')];

console.log("running " + app.get('env'));

var methodOverride = require('method-override');

var port = process.env.PORT || 8080;

mongoose.connect(config.database);

app.set('secret', config.secret);
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    console.log("\n" + req.path);
    next(); // make sure we go to the next routes and don't stop here
});

require('./app/routes')(app);

app.listen(port);

console.log("Server started on port: " + port);

exports = module.exports = app
