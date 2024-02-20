// ipTools.js
// Utils to deal with CIDR notations n shiet
// @bdnugget

function cidrToSubnetMask(prefixLength) {
    const subnetMask = [];
    for (let i = 0; i < 32; i++) {
        subnetMask.push(i < prefixLength ? '1' : '0');
    }
    return [
        parseInt(subnetMask.slice(0, 8).join(''), 2),
        parseInt(subnetMask.slice(8, 16).join(''), 2),
        parseInt(subnetMask.slice(16, 24).join(''), 2),
        parseInt(subnetMask.slice(24, 32).join(''), 2)
    ].join('.');
}

function isIPInRange(ip, cidr) {
    const [subnet, prefixLength] = cidr.split('/');
    const subnetMask = cidrToSubnetMask(parseInt(prefixLength, 10));

    const ipParts = ip.split('.');
    const subnetParts = subnet.split('.');
    const subnetMaskParts = subnetMask.split('.');
    
    for (let i = 0; i < 4; i++) {
        const ipPart = parseInt(ipParts[i], 10);
        const subnetPart = parseInt(subnetParts[i], 10);
        const subnetMaskPart = parseInt(subnetMaskParts[i], 10);
        
        if ((ipPart & subnetMaskPart) !== (subnetPart & subnetMaskPart)) {
            return false;
        }
    }
    
    return true;
}

module.exports = { cidrToSubnetMask, isIPInRange };

