var http = require('http');

var server = http.createServer(function (req, res) {
    res.end('Got it');
});

console.log('Listening on :8082');
server.listen(8082);