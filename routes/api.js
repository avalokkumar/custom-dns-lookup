var services = {};
const dnsSync = require('dns-sync'),
    dns = require('dns'),
    flash = require('connect-flash'),
    fs = require('fs'),
    validationService = require('./validation-service'),
    hostnames = JSON.parse(fs.readFileSync('./hostnames.json')),
    os = require('os');

const netInterfaces = os.networkInterfaces();

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

updateIPV4 = function (hostnames, ipAddress, domainName) {
    var currentCount = hostnames[hostnames.length-1].id;
    hostnames.push({id: ++currentCount, ipAddress: ipAddress, domainName: domainName});
    fs.writeFileSync('./hostnames.json', JSON.stringify({data: hostnames}), 'utf8');
}

updateErrorMessage = function (hostnames) {
    hostnames.push({error: {
                        code: 400,
                        message: 'Invalid IP Address Provided'
                        }
                    });

    fs.writeFileSync('./hostnames.json', JSON.stringify({data: hostnames}), 'utf8');
}

resolveIPAddrtoDomainName = function (ipAddr) {

    return '';
}

services.resolveByHostname = function (req, res) {
    var hostnames = JSON.parse(fs.readFileSync('./hostnames.json')).data;
    var domainName = req.body.domainName;
    //TODO: find domain name
    var ipAddress = resolveIPAddrtoDomainName(domainName);

    if(validationService.domainName(domainName)) {
        updateIPV4(hostnames, ipAddress, domainName)
    }else{
        updateErrorMessage(hostnames)
    }

    //req.flash('hostNames', hostNames);
    console.log(domainName);
    res.redirect('/');
};
module.exports = services;