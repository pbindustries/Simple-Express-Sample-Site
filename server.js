var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 5000;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// add middleware
app.use(function(req, res, next) {

// allow any origin to access the server
res.header("Access-Control-Allow-Origin", "*");

// indicates available HTTP response headers
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parameter middleware that will run before the next routes
app.param('name', function(req, res, next, name) {
    // save name to the request
    req.name = name;
    next();
});

app.use(express.static(__dirname + '/staticFiles'));

// ROUTES 

// http://localhost:5000/users/philip
app.get('/users/:name', function(req, res) {
    // the user was found and is available in req.user
    res.send('What is up ' + req.name + '!');
});

app.post('/', function(req, res) {
  console.log(req.body); 
 res.send(req.body);
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
