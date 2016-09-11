'use strict';
var detect = require('detect-port');
var opn = require('opn');
var express = require('express');
var server = express();
var DEFAULT_PORT = process.env.PORT || 3000;

server.use('/', express.static(__dirname+'/build'));

module.exports = {
    start: function () {
        detect(DEFAULT_PORT).then(function(port) {
            if (DEFAULT_PORT === port) {
                console.log('port: %d was not occupied', port);
                run(port);
            } else {
                console.log('port: %d was occupied, try port: %d', DEFAULT_PORT, port);
                run(port);
            }
        });
    }
};

function run(port) {
    server.listen(port, "localhost" ,function(error) {
        if (error) {
            console.error(error);
        }
        else {
            console.log('===========================================');
            console.log('  Starting local server at localhost:' + port);
            console.log('===========================================');
            opn('http://localhost:' + port + '/');
        }
    })
}

