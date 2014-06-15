var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


//app.use(favicon());
//app.use(express.logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
//app.use(app.router);
//app.use(express.static(path.join(__dirname, "public")));

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/api/:table', function(req, res) {
	res.send('GET request');
});

app.post('/api/:table', function(req, res) {
	res.send('POST request');
});

app.get('/api/:table/:id', function(req, res) {
	res.send('GET request with id');
});

app.put('/api/:table/:id', function(req, res) {
	res.send('PUT request');
});

app.delete('api/:table/:id', function(req, res) {
	res.send('DELETE request');
});

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});