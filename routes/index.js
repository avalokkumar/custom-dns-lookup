var express = require('express');
var router = express.Router();
var fs = require('fs');
var apiRef = require('./api');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Calling getCurrentIPAddress');
    var hostnames = JSON.parse(fs.readFileSync('./hostnames.json'));
    var currentIPAddr = apiRef.getCurrentIPAddress();
    res.render('pages/index', { title: 'Express', currIPAddr: currentIPAddr, hostnames: hostnames.data});
});


/*
router.post('/resolvehostname', function (req, res, next){
    res.send('Hello Venom');
   /!* var hostName = req.body.hostnames;
    console.log(hostName);
    res.send(hostName);*!/
});*/

module.exports = router;
