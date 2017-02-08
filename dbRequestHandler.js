/**
 * Created by cj on 2016-12-13.
 */

var mysql = require("mysql");

var connection = mysql.createConnection({

    host: "localhost",
    user: "vsTest",
    password: "!QAZ2wsx",
    database: "vsTest"
});

connection.connect(function (error) {
    if (!!error) {
        console.log("Error when connecting to DB");
    } else {
        console.log("Connected to DB");
    }

});


module.exports = {

    getPositions: function (callback) {
        var positions = [];
        var query = "SELECT * FROM vsTest.position";

        connection.query(query, function (error, rows, fields) {
            if (!!error) {
                console.log("Error in query, %j", error.message);

            } else {

                for (var i = rows.length - 1; i >= 0; i--) {
                    var rY = rows[i].y;
                    var rX = rows[i].x;

                    var pos = {x: rX, y: rY};

                    positions.push(pos);
                }
                ;
                callback(positions);
            }

        });
    },

    insertPosition: function (x, y,callback) {
        var query = "INSERT INTO vsTest.position (x,y) VALUES (" + x + "," + y + ")";
        console.log("query call = " + query);
        connection.query(query, function (error, rows, fields) {
            if (!!error) {
                console.log("Error in query, %j", error.message);
                callback({success: false});

            } else {
                console.log("success");
                callback({success: true});
            }
        });
    },

    resetPositions: function (callback) {
        var query = "TRUNCATE vsTest.position";
        console.log("query call = " + query);
        connection.query(query, function (error, rows, fields) {
            if (!!error) {
                console.log("Error in query, %j", error.message);

            } else {
                console.log("success");
                callback({success: true});
            }
        });
    }

};
















