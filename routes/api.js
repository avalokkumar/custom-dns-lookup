var services = {};
const fs = require('fs'),
    validationService = require('./validation-service'),
    hostnames = JSON.parse(fs.readFileSync('./hostnames.json')),
    lookupService = require('./lookup-service');

services.name = function (req, res) {
    res.json({
        name: 'Bob'
    });
};

updateIPV4 = function (hostnames, ipAddress, domainName) {
    var currentCount = hostnames[hostnames.length-1].id;
    console.log('Inside updateIPV4 : ')
    console.log(ipAddress);
    hostnames.push({id: ++currentCount, ipAddress: ipAddress, domainName: domainName});
    fs.writeFileSync('./hostnames.json', JSON.stringify({data: hostnames}));
}

updateErrorMessage = function (hostnames, result) {
    hostnames.push({error: {
                        code: 400,
                        message: result
                        }
                    });

    fs.writeFileSync('./hostnames.json', JSON.stringify({data: hostnames}), 'utf8');
};

services.resolveByHostname = function (req, res) {
    var hostnames = JSON.parse(fs.readFileSync('./hostnames.json')).data;
    var domainName = req.body.domainName+'';
    console.log(`domain Name: ${domainName}`);
    lookupService.resolveDomainNameToIPAddress(domainName, function (result) {
        validationService.validateDomainName(domainName)?updateIPV4(hostnames, result, domainName):updateErrorMessage(hostnames, result);
        res.redirect('/');
    });
};

services.reverseDNSLookup = function (req, res, next) {
    var ipAddress = req.body.ipAddress+'';
    console.log('Calling Reverse DNS Lookup Service');
    lookupService.resolveIPAddrtoDomainName(ipAddress, function (result) {
        if(validationService.validateIPV4(ipAddress)){
            console.log('Correct IP Address');
        } else{
            console.log("Invalid IP Address");
        }
        //TODO:Update result with ip address
        res.redirect('/reverselookup');
    })
    // res.render('pages/reverse-lookup', {title: 'Reverse DNS Lookup', currIPAddr: services.getCurrentIPAddress(), hostnames: {}});

}

module.exports = services;