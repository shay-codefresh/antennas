var _ = require('lodash-node');
var express = require('express');
var app = express();

app.get('/api/containers', function (req, res) {
    var fs =require("fs");
    var filename = "containers.json";
    var filesj= fs.readFileSync(filename);
var containers =JSON.parse(filesj);
    //console.log("Output Content : \n"+ array);
    var array=[];

    for(var container in containers ){
            array.push(new Date(containers[container].created));
    }
if(typeof USE_LODASH =="undefined")
    array.sort(function (date1, date2) {
        if (date1 > date2) return 1;
        if (date1 < date2) return -1;
        return 0;
    });
else {
        array=_.sortBy(array,function (value){
            console.log(value.getTime());
            return value.getTime();

        })
    }
    res.send(array);
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

})













