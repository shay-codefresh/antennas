var _ = require('lodash-node');
var express = require('express');
var app = express();
var tools = require('./functions.js')
//   var fs = require("fs");
var filename = "containerss.json"

app.get('/api/containers', function (request, response) {

    var method = 'callback';
    if (request.query.method == "promise") {
        method = 'promise';
    }
    //console.log(method);


    if (method == 'callback') {
        tools.myread(filename, function (error, data) {
            if (error) {
                return response.status(500).send(error.message);
            }
            else {
                response.send(data);
            }
        })


    }
});


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

})













