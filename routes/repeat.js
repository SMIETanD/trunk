var path = require('path');
var doubleMetaphone = require('double-metaphone');
var DTW = require('dtw');

exports.open = function (req, res) {
    res.render("repeat.jade", {title: "repeat"});
};

exports.getPoint = function (req, res) {
    var word1 = req.body.word1;
    var word2 = req.body.word2;

    function foo(str) {
        return str.split('').map(function (char) {
            return char.toLowerCase().charCodeAt() - 'a'.charCodeAt();
        });
    }

    //var dic = new Array();


    var result1 = doubleMetaphone(word1);
    var result2 = doubleMetaphone(word2);
    console.log();
    console.log();
    console.log(result1);
    console.log(result2);
    console.log(foo(result1[0]));
    console.log(foo(result2[0]));


    var a = foo(result1[0]);
    var b = foo(result2[0]);
    var dtw = new DTW();
    console.log(dtw.compute(a, b));
    console.log(dtw.path());

    res.json({score:dtw.compute(a, b)});
};