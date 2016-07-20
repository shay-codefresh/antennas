/**
 * Created by shay on 20/07/2016.
 */

var _ = require('lodash-node');
var fs = require("fs");

function myread(filename, callback) {
    fs.readFile(filename, function (err, result) {
        if (err) {
            //response.status(500).send("didn't work try another path");
            var error = new Error("didn't work try another path");
            callback(error);
        }
        else {
            var containers = JSON.parse(result);
            //console.log("Output Content : \n"+ array);
            var answer = [];

            for (var container in containers) {
                answer.push(new Date(containers[container].created));
            }

            if (!process.env.USE_LODASH) {
                answer.sort(function (date1, date2) {
                    if (date1 > date2) return 1;
                    if (date1 < date2) return -1;
                    return 0;
                });
            }
            else {
                answer = _.sortBy(answer, function (value) {
                    //    console.log(value.getTime());
                    return value.getTime();

                })
                callback(null, answer);
            }
        }
    });


};


module.exports.myread = myread;
