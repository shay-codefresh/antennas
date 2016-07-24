/**
 * Created by shay on 20/07/2016.
 */

var _ = require('lodash-node');
var fs = require("fs");
var lodash_check = false;

function getlodashcheck() {
    return lodash_check;
}

function deletetest(name) {
    fs.unlink(__dirname + '/'+name, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function createfile(json,name, callback) {
    fs.writeFile(__dirname + '/'+name, JSON.stringify(json, null, 2), function (err) {
            if (err) {
                return console.log(err);
            }
        });
    callback(null)
}

/**
 *
 function createtest(json, callback) {
    fs.writeFile(__dirname + '/test.json', JSON.stringify(json, null, 2), function (err) {
            if (err) {
                return console.log(err);
            }
        });
}
 */

function myread(filename, callback) {
    lodash_check=false;
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
            var amount = 0;
//need to be checked for num containers

            for (var container in containers) {
                containers[container].created = new Date(containers[container].created);
                answer.push(containers[container]);
//                console.log(new Date(containers[container].created));
//                console.log(answer[amount]);
                amount++;


            }

            //console.log(containers);
            //process.env.USE_LODASH='undefined';
            if (!process.env.USE_LODASH) {
//check the function if we have lodash env , check the function, check the varible
//                console.log("heyyyyy")
//                console.log(process.env.USE_LODASH)
                answer.sort(function (date1, date2) {
                    if (date1.created > date2.created) return 1;
                    if (date1.created < date2.created) return -1;
                    return 0;
                });
                callback(null, answer);

            }
            else {
                lodash_check = true;
//check the function if we have lodash env , check the function, check the varible
                answer = _.sortBy(answer, function (value) {
                    //    console.log(value.getTime());
                    return value.created.getTime();
                    //console.log(value.created.getTime());
                });

                // console.log(answer);
                callback(null, answer);

            }
        }
    });
};

module.exports.myread = myread;
module.exports.createfile = createfile;
module.exports.deletetest = deletetest;
module.exports.getlodashcheck = getlodashcheck;
