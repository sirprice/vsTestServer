var express = require('express');
var dbRequestHandler = require('./dbRequestHandler');

var server = express();

server.get('/getPos', function(req, res) {

    dbRequestHandler.getPositions(function (result) {
        res.json({positions: result});

    });
});

server.post('/insertPos', function (req, res) {

    var posX = req.param('posX');
    var posY = req.param('posY');


    //var request = JSON.stringify(req);
    console.log('Position:  X=' + posX +', Y='+posY);

    dbRequestHandler.insertPosition(posX,posY,function (result) {
        if (result.success) {
            console.log('Insert complete');
            res.json({ result: "Your position has been received"})
        } else {
            console.log('Insert fatal error');
            res.json({ result: "Your position was not recorded :("})
        }
    });

});

server.post('/resetPos', function (req, res) {
    console.log('Reset ...');
    dbRequestHandler.resetPositions(function (result) {
        if (result.success) {
            console.log('Reset complete');
            res.json({ result: "Reset done "})
        } else {
            console.log('Reset fatal error');
            res.json({ result: "Reset was not done correctly "})
        }
    });

});



server.listen(3000);