// @bdnugget test for ipTools

const { cidrToSubnetMask, isIPInRange } = require('./ipTools');

// Test cidrToSubnetMask function
test('CIDR to subnet mask conversion', () => {
    expect(cidrToSubnetMask(24)).toBe('255.255.255.0');
    expect(cidrToSubnetMask(16)).toBe('255.255.0.0');
    expect(cidrToSubnetMask(30)).toBe('255.255.255.252');
});

// Test isIPInRange function
test('Check if IP is in range', () => {
    expect(isIPInRange('192.168.178.115', '192.168.178.0/24')).toBe(true);
    expect(isIPInRange('192.168.1.100', '192.168.1.0/24')).toBe(true);
    expect(isIPInRange('192.168.2.100', '192.168.1.0/24')).toBe(false);
});

