var maps = require('../lib/time/maps.js');
var fs = require('fs');

describe("test maps", function() {
    it("parseISODuration should throw sometimes", function() {
        expect(function() {
            maps.parseISODuration('TP1M');
        }).toThrow('expected P as starting duration : TP1M');
        expect(function() {
            maps.parseISODuration('P1X');
        }).toThrow('unknown duration specifier : X');
    });
    it("parseISODuration should parse correctly", function() {
        expect(maps.parseISODuration('PT1S')).toBe(1000);
        expect(maps.parseISODuration('PT1M')).toBe(60000);
        expect(maps.parseISODuration('PT1H')).toBe(3600000);
        expect(maps.parseISODuration('P1D')).toBe(86400000);
        expect(maps.parseISODuration('P1W')).toBe(604800000);
        expect(maps.parseISODuration('P1M')).toBe(2592000000);
        expect(maps.parseISODuration('P1Y')).toBe(31536000000);
        expect(maps.parseISODuration('P1MT1M')).toBe(2592000000 + 60000);
    });
    it("readCapabilitiesTimeDimensions works", function() {
        function makeCaps(config) {
            return {
                Capability: {
                    Layer: {
                        Layer: Object.getOwnPropertyNames(config).map(function(lyr) {
                            return {Name: lyr, Dimension: [{name: 'time', values: config[lyr]}]};
                        })
                    }
                }
            };
        }
        function expectData(args) {
            return expect(maps.readCapabilitiesTimeDimensions(makeCaps(args)));
        };
        function read(values) {
            return maps.readCapabilitiesTimeDimensions(makeCaps({data:values})).data;
        }
        function time(str) {
            return new Date(str).getTime();
        }
        var r = read('1990-01-01T00:00:00.000Z/2009-01-01T00:00:00.000Z/P1Y');
        expect(r.start).toBe(time('1990-01-01T00:00:00.000Z'));
        expect(r.end).toBe(time('2009-01-01T00:00:00.000Z'));
        expect(r.interval).toBe(31536000000);

        expectData({list: '1990'}).toEqual(
                {list: [time('1990')]}
        );
        expectData({list: '1990,1991,1992'}).toEqual(
                {list: [time('1990'),time('1991'),time('1992')]}
        );

        r = read('2000/2001');
        expect(r.start).toBe(time('2000'));
        expect(r.end).toBe(time('2001'));
    });
});
