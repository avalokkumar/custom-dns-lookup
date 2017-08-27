var express = require('express');
var router = express.Router();
var fs = require('fs');
var lookUpService = require('./lookup-service');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Calling getCurrentIPAddress');
    var hostnames = JSON.parse(fs.readFileSync('./hostnames.json'));
    var currentIPAddr = lookUpService.getCurrentIPAddress();
    res.render('pages/index', { title: 'DNS Lookup', currIPAddr: currentIPAddr, hostnames: hostnames.data});
});

router.get('/reverselookup', function (req, res, next) {
    var hostnames = JSON.parse(fs.readFileSync('./hostnames.json'));
    var currentIPAddr = lookUpService.getCurrentIPAddress();
    res.render('pages/reverse-lookup', { title: 'Reverse DNS Lookup', currIPAddr: currentIPAddr, hostnames: hostnames.data});
});

module.exports = router;
