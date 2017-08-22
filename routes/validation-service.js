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

validationServices.domainName = function (domainName) {

    return true;
}
module.exports = validationServices;