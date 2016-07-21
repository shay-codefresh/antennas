var chai = require('chai');
var expect = chai.expect;
var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var tools = require('../functions');


describe("functions tests", function () {

    describe("myread tests", function () {

        describe("positive", function () {

            it("should return an array of containers", function(done){
                tools.myread("/containers.json", function(err, res){
                    if (err) {
                        return done(err);
                    }
                    else {
                        expect(res).to.be.instanceof(Array);
                        expect(res.length).to.equal(5);
                        done();
                    }
                });

            });

            it("should return the containers sorted by date", function(done){
                tools.myread("/containers.json", function(err, res){
                    if (err) {
                        return done(err);
                    }
                    else {
                        console.log(res)
                        expect(res.toString()).to.equal(
                            "Tue Sep 13 1994 11:33:00 GMT+0200 (IST),"+
                            "Mon Jul 18 2016 10:00:00 GMT+0300 (IDT),"+
                            "Mon Jul 18 2016 10:33:00 GMT+0300 (IDT),"+
                            "Mon Jul 18 2016 10:50:00 GMT+0300 (IDT),"+
                            "Mon Jul 18 2016 12:33:00 GMT+0300 (IDT)"
                        );
                        done();
                    }
                });

            });

        });

        describe("negative", function () {

            it("should fail when passing a path that doesn't contain a file", function (done) {
                tools.myread("./non-existing-file.json", function (error) {
                    if (error) {
                        expect(error.message).to.contain("ENOENT: no such file or directory");
                        done();
                    }
                    else {
                        done(new Error("should have failed"));
                    }
                });
            });

        });

    });

});