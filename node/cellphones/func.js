var math = require('mathjs');
var fs = require("fs");
var _ = require('lodash-node');

function myread(filename, x1, y1, x2, y2, callback) {
    lodash_check = false;
    fs.readFile(__dirname + '/' + filename, function (err, result) {
        if (err) {
//check if the path is wrong
            var error = new Error(err);
            callback(error);
        }
        else {
            var antennas = JSON.parse(result);
            var answer = [];
            for (var ann in antennas) {
                //function add distance from dot1 and dot2
                //check if int.parse is needed
                ann.distance1 = distance(ann.x, ann.y, x1, y1);
                ann.distance2 = distance(ann.x, ann.y, x2, y2);
                answer.push(antennas[ann]);
            }
            callback(null,antennas);
        }
    });
}
7

function distance(x1, y1, x2, y2) {
    return math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2));
}

function orderarray(array, whichdot) {
    if (whichdot === 1) {
        array = _.sortBy(array, function (value) {
            return value.distance1;
        })
    }
    else {
        array = _.sortBy(array, function (value) {
            return value.distance2;
        })
    }
    return array;
}


function phase1(filename, x1, y1, x2, y2, callback) {
    fs.readFile(__dirname + '/' + filename, function (err, result) {
        console.log(__dirname + '/' + filename)
        if (err) {
//check if the path is wrong
            var error = new Error(err);
            callback(error);
        }
        else {
            //ann array with id and distance
            var antenna1=[0,Number.MAX_VALUE];
            var antenna2=[0,Number.MAX_VALUE];
            var antennas = JSON.parse(result);
            for (var ann in antennas) {
                antennas[ann].distance1 = distance(antennas[ann].position.x, antennas[ann].position.y, x1, y1);
                antennas[ann].distance2 = distance(antennas[ann].position.x, antennas[ann].position.y, x2, y2);
                if (antennas[ann].distance1<antenna1[1]) {
                    antenna1[0]=antennas[ann].id;
                    antenna1[1]=antennas[ann].distance1;
                }
                if (antennas[ann].distance2<antenna2[1]) {
                    antenna2[0]=antennas[ann].id;
                    antenna2[1]=antennas[ann].distance2;
                }
            }
            var result=[antenna1[0],antenna2[0]];
            callback(null,result);
        }
    });
}




module.exports.orderarray = orderarray;
module.exports.myread = myread;
module.exports.phase1 = phase1;
module.exports.distance = distance;

