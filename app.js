var express = require('express');
var app = express();

app.use(express.methodOverride()); 
app.use(express.bodyParser()); 
app.use(express.logger());
app.use(express.static(__dirname + '/dist')); 
app.use(app.router);

app.get(function(req, res) {
  res.sendfile('/dist/index.html');
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});