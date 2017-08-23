var validationServices = {};

validationServices.validateIPV4 = function (ipAddr) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddr)) {
        console.log('VALID IP ADDRESS')
        return true
    }else{
        console.log('INVALID IP ADDRESS')
        return false
    }
}

validationServices.validateDomainName = function (domainName) {
    //TODO: validate domain name
    if (/^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,6}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,3})$/.test(domainName)) {
        console.log('VALID IP ADDRESS')
        return true
    }else{
        return false
    }
}
module.exports = validationServices;