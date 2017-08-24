var services = {};
const dnsSync = require('dns-sync'),
    dns = require('dns'),
    fs = require('fs'),
    validationService = require('./validation-service'),
    hostnames = JSON.parse(fs.readFileSync('./hostnames.json')),
    os = require('os');

const netInterfaces = os.networkInterfaces(),
      INVALID_DOMAIN_NAME = "Invalid Doman Name";

services.name = function (req, res) {
    res.json({
        name: 'Bob'
    });
};

services.getCurrentIPAddress = function () {
    var systemIp = "";
    Object.keys(netInterfaces).forEach(function (ifname) {
        var alias = 0;

        netInterfaces[ifname].forEach(function (netInterfaces) {
            if ('IPv4' !== netInterfaces.family || netInterfaces.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, netInterfaces.address);
            } else {
                // this interface has only one ipv4 adress
                console.log(netInterfaces.address);
                systemIp = netInterfaces.address;
            }
            ++alias;
        });
    });
    console.log('systemIp : '+systemIp);
    return systemIp;
}

updateIPV4 = function (hostnames, ipAddresses, domainName) {
    var currentCount = hostnames[hostnames.length-1].id;
    console.log('Inside updateIPV4 : ')
    console.log(ipAddresses);
    hostnames.push({id: ++currentCount, ipAddresses: ipAddresses, domainName: domainName});
    fs.writeFileSync('./hostnames.json', JSON.stringify({data: hostnames}), 'utf8');
}

updateErrorMessage = function (hostnames) {
    hostnames.push({error: {
                        code: 400,
                        message: 'Invalid Domain Name Provided'
                        }
                    });

    fs.writeFileSync('./hostnames.json', JSON.stringify({data: hostnames}), 'utf8');
}

resolveIPAddrtoDomainName = function (ipAddr) {

    return '';
}

function resolveDomainNameToIPAddress(domainName, getIpAddressCallback) {
    /*var ipAddresses = [];*/
    dns.resolve4(domainName, function (err, addresses) {
        if(err){
            getIpAddressCallback(INVALID_DOMAIN_NAME);
            return;
        }
        console.log(JSON.stringify(addresses));
        addresses.forEach(function (result) {
            getIpAddressCallback(result);
        });
    });
}

services.resolveByHostname = function (req, res) {
    var hostnames = JSON.parse(fs.readFileSync('./hostnames.json')).data;
    var domainName = req.body.domainName;
    //TODO: find domain name
    resolveDomainNameToIPAddress(domainName, function (result) {
        validationService.validateDomainName(domainName)?updateIPV4(hostnames, result, domainName):updateErrorMessage(hostnames);
        res.redirect('/');
    });
};

services.reverseDNSLookup = function (req, res, next) {
    console.log('Calling Reverse DNS Lookup Service');
    res.render('pages/reverse-lookup', {title: 'Reverse DNS Lookup', currIPAddr: services.getCurrentIPAddress(), hostnames: {}});
}

module.exports = services;