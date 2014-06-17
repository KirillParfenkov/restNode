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
var getByIdREquest = 'SELECT * FROM ?? WHERE id = ?'

app.use(bodyParser());
app.use(methodOverride());

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/api/:table', function(req, res) {
	pool.query(getRequest, [ req.params.table], function(err, rows, fields) {
		if (err) {
			res.json( 400, { error: 'SQL error' });
		} else {
			res.json( rows );
		}
	});
});

app.post('/api/:table', function(req, res) {
	res.send('POST request');
});

app.get('/api/:table/:id', function(req, res) {
	pool.query(getByIdREquest, [req.params.table, req.params.id], function(err, rows, fields) {
		if (err || rows.length == 0) {
			res.json( 400, { error: 'SQL error' });
		} else {
			res.json(rows[0]);
		}
	});
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