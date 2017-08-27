var services = {},
    dns = require('dns'),
    os = require('os');

const INVALID_DOMAIN_NAME = "Invalid Domain Name";
const INVALID_IP_ADDRESS = "Invalid IP Address";
const netInterfaces = os.networkInterfaces();


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

services.resolveIPAddrtoDomainName = function (ipAddr, getDomainNamesCallback) {
    dns.reverse(ipAddr, function (err, domainNames) {
        if(err){
            getDomainNamesCallback(INVALID_IP_ADDRESS);
            return;
        }
        console.log(JSON.stringify(domainNames));
        if(domainNames){
            getDomainNamesCallback(domainNames[0]);
        }
    })
}

services.resolveDomainNameToIPAddress= function(domainName, getIpAddressCallback) {
    dns.resolve4(domainName, function (err, addresses) {
        if(err){
            getIpAddressCallback(INVALID_DOMAIN_NAME);
            return;
        }
        console.log(JSON.stringify(addresses));
        if(addresses){
            getIpAddressCallback(addresses[0]);
        }
        /*addresses.forEach(function (result) {
            getIpAddressCallback(result);
        });*/
    });
}

module.exports = services;