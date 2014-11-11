/*jshint node: true*/
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.route('/:name')
  .get(function(req, res) {
    var file = ('./data/' + req.params.name + '.json');
    var stream = fs.createReadStream(file);
    stream
    .on('readable', function() {
      res.writeHead(200, {'Content-Type': 'application/json'});
      stream.pipe(res);
    });
  })
  .post(function(req, res) {
    var ws = fs.createWriteStream('./data/' + req.params.name + '.json');
    ws.write(JSON.stringify(req.body));
    res.send(req.body);
    res.end();
  });

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server up at %d', port);
});
