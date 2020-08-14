const secret = "bite me";
const repo = "app/";

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;
console.log("server strted!!");
console.log(__dirname);

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && git pull orign master');
        }
    });

    res.end();
}).listen(8080);