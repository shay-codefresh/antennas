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

            it("should return an array of containers with amount of 5", function (done) {
                tools.myread("/containers.json", function (err, res) {
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

            it("should check if the array of containers amount of 3 objects, creates and deletes file", function (done) {
                var containers = {
                    "container_1": {
                        "id": "1",
                        "name": "container 1",
                        "cpu": 90,
                        "mem": 60,
                        "layers": [
                            "1",
                            "12",
                            "123",
                            "1234",
                            "12345"
                        ],
                        "created": "Mon Jul 18 2016 12:33:00 GMT+0300 (IDT)"
                    },
                    "container_2": {
                        "id": "2",
                        "name": "container 2",
                        "cpu": 70,
                        "mem": 40,
                        "layers": [
                            "1",
                            "12",
                            "123",
                            "1234",
                            "12345"
                        ],
                        "created": "Mon Jul 18 2010 10:50:00 GMT+0300 (IDT)"
                    },
                    "container_3": {
                        "id": "3",
                        "name": "container 3",
                        "cpu": 60,
                        "mem": 30,
                        "layers": [
                            "1",
                            "12",
                            "123",
                            "1234",
                            "12345"
                        ],
                        "created": "Wed Jul 18 2012 10:00:00 GMT+0300 (IDT)"
                    }
                };
                var name = "test.json";
                tools.createfile(containers, name, function (error) {
                    if (error) {
                        return console.log(error);
                    }
                    else {

                        tools.myread(name, function (err, res) {
                            if (err) {
                                tools.deletetest(name);
                                return done(err);
                            }
                            else {

                                expect(res).to.be.instanceof(Array);
                                expect(res.length).to.equal(3);
                                tools.deletetest(name);
                                done();
                            }
                        });

                    }
                });

            });


            it("should return if the 3 containers sorted by date , creates and deletes file", function (done) {
                var containers = {
                    "container_1": {
                        "id": "1",
                        "name": "container 1",
                        "cpu": 90,
                        "mem": 60,
                        "layers": [
                            "1",
                            "12",
                            "123",
                            "1234",
                            "12345"
                        ],
                        "created": "Mon Jul 18 2016 12:33:00 GMT+0300 (IDT)"
                    },
                    "container_2": {
                        "id": "2",
                        "name": "container 2",
                        "cpu": 70,
                        "mem": 40,
                        "layers": [
                            "1",
                            "12",
                            "123",
                            "1234",
                            "12345"
                        ],
                        "created": "Mon Jul 18 2010 10:50:00 GMT+0300 (IDT)"
                    },
                    "container_3": {
                        "id": "3",
                        "name": "container 3",
                        "cpu": 60,
                        "mem": 30,
                        "layers": [
                            "1",
                            "12",
                            "123",
                            "1234",
                            "12345"
                        ],
                        "created": "Wed Jul 18 2012 10:00:00 GMT+0300 (IDT)"
                    }
                };
                var name = 'test.json'
                tools.createfile(containers, name, function (error) {
                    if (error) {
                        return console.log(error)
                    }
                    else {


                        tools.myread(name, function (err, res) {
                            if (err) {
                                tools.deletetest(name);
                                return done(err);
                            }
                            else {
                                tools.deletetest(name);
                                for (var i = 0; i < res.length; i++) {
                                    res[i].created = res[i].created.toString();
                                }
                                //console.log(res);\
                                var sorted = [{
                                    "id": "2",
                                    "name": "container 2",
                                    "cpu": 70,
                                    "mem": 40,
                                    "layers": ["1", "12", "123", "1234", "12345"],
                                    "created": "Sun Jul 18 2010 10:50:00 GMT+0300 (IDT)"
                                }, {
                                    "id": "3",
                                    "name": "container 3",
                                    "cpu": 60,
                                    "mem": 30,
                                    "layers": ["1", "12", "123", "1234", "12345"],
                                    "created": "Wed Jul 18 2012 10:00:00 GMT+0300 (IDT)"
                                }, {
                                    "id": "1",
                                    "name": "container 1",
                                    "cpu": 90,
                                    "mem": 60,
                                    "layers": ["1", "12", "123", "1234", "12345"],
                                    "created": "Mon Jul 18 2016 12:33:00 GMT+0300 (IDT)"
                                }]
                                for (var i = 0; i < res.length; i++) {
                                    expect(res[i]).to.deep.equal(sorted[i]);

                                }
                                done();
                            }
                        });


                    }
                });
            });


            it("should return if the 5 containers sorted by date ", function (done) {
                tools.myread("/containers.json", function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    else {
                        for (var i = 0; i < res.length; i++) {
                            res[i].created = res[i].created.toString();
                        }
                        //console.log(res);\
                        var sorted = [{
                            "id": "2",
                            "name": "container 2",
                            "cpu": 80,
                            "mem": 50,
                            "layers": ["1", "12", "123", "1234", "12345"],
                            "created": "Tue Sep 13 1994 11:33:00 GMT+0200 (IST)"
                        }, {
                            "id": "4",
                            "name": "container 4",
                            "cpu": 60,
                            "mem": 30,
                            "layers": ["1", "12", "123", "1234", "12345"],
                            "created": "Mon Jul 18 2016 10:00:00 GMT+0300 (IDT)"
                        }, {
                            "id": "5",
                            "name": "container 5",
                            "cpu": 50,
                            "mem": 20,
                            "layers": ["1", "12", "123", "1234", "12345"],
                            "created": "Mon Jul 18 2016 10:33:00 GMT+0300 (IDT)"
                        }, {
                            "id": "3",
                            "name": "container 3",
                            "cpu": 70,
                            "mem": 40,
                            "layers": ["1", "12", "123", "1234", "12345"],
                            "created": "Mon Jul 18 2016 10:50:00 GMT+0300 (IDT)"
                        }, {
                            "id": "1",
                            "name": "container 1",
                            "cpu": 90,
                            "mem": 60,
                            "layers": ["1", "12", "123", "1234", "12345"],
                            "created": "Mon Jul 18 2016 12:33:00 GMT+0300 (IDT)"
                        }]
                        for (var i = 0; i < res.length; i++) {
                            expect(res[i]).to.deep.equal(sorted[i]);

                        }
                        done();
                    }
                });
            });

            it("should return an array of containers sorted (using lodash) by date if the environment variable USE_LODASH is exsits", function (done) {
                process.env.USE_LODASH = "HRHWHW";
                tools.myread("/containers.json", function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    else {
                        expect(process.env.USE_LODASH).to.not.equal(undefined);
                        expect(tools.getlodashcheck()).to.equal(true);
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

            it("should return an array of containers sorted by date without using lodash if the environment variable USE_LODASH is not exsits", function (done) {
                process.env.USE_LODASH = '';
                tools.myread("/containers.json", function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    else {
                        expect(process.env.USE_LODASH).to.equal('');
                        expect(tools.getlodashcheck()).to.equal(false);
                        done();
                    }
                });
            });

        });

    });

});