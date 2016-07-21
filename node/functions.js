/**
 * Created by shay on 20/07/2016.
 */

var _ = require('lodash-node');
var fs = require("fs");

function myread(filename, callback) {
    fs.readFile(__dirname + '/' + filename, function (err, result) {
        if (err) {
//check if the path is wrong
            var error = new Error(err);
            callback(error);
        }
        else {
            var containers = JSON.parse(result);
            //console.log("Output Content : \n"+ array);
            var answer = [];
//need to be checked for num containers
            for (var container in containers) {
                answer.push(new Date(containers[container].created));
            }

            if (!process.env.USE_LODASH) {
//check the function if we have lodash env , check the function, check the varible
                answer.sort(function (date1, date2) {
                    if (date1 > date2) return 1;
                    if (date1 < date2) return -1;
                    return 0;
                });
                callback(null, answer);
            }
            else {
//check the function if we have lodash env , check the function, check the varible
                answer = _.sortBy(answer, function (value) {
                    //    console.log(value.getTime());
                    return value.getTime();

                });
                callback(null, answer);
            }
        }
    });


};

module.exports.myread = myread;
