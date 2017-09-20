var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('port', 8081);

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

app.use(express.static('staticFiles'));

// ROUTES 

// http://localhost:8081/users/philip
app.get('/users/:name', function(req, res) {
    // the user was found and is available in req.user
    res.send('What is up ' + req.name + '!');
});

app.post('/', function(req, res) {
  console.log(req.body); 
 res.send(req.body);
});

var server = app.listen(app.get('port'), function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})