var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var nconf = require('nconf');
var mysql = require('mysql');

nconf.argv()
	.env()
	.file({file: './config.json'});

var pool = mysql.createPool({
	connectionLimit : nconf.get('database:connectionLimit'),
	host : nconf.get('database:uri'),
	database: nconf.get('database:name'),
	user: nconf.get('database:user'),
	password: nconf.get('database:password')

});

var getRequest = 'SELECT * FROM ??';
var getByIdREquest = 'SELECT ?? FROM ?? WHERE id = ?'

app.use(bodyParser());
app.use(methodOverride());

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/api/:table', function(req, res) {
	pool.query(getRequest, ['users'], function(err, rows, fields) {
		if (err) throw err;
		res.send('rows: ' + rows.length);
	});
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

app.listen(nconf.get('port'), function(){
    console.log('Express server listening on port ' + nconf.get('port'));
});