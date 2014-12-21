var utils = require('../lib/core/time/utils.js');
var moment = require('vis/node_modules/moment');

describe("test utils", function() {
    it("tests finding", function() {
        var data = [1,5,10];
        expect(utils.find(data, 0)).toBe(0);
        expect(utils.find(data, 1)).toBe(0);
        expect(utils.find(data, 2)).toBe(0);
        expect(utils.find(data, 5)).toBe(1);
        expect(utils.find(data, 6)).toBe(1);
        expect(utils.find(data, 10)).toBe(2);
        expect(utils.find(data, 11)).toBe(2);
    });
    it("range works", function() {
        var r = utils.createRange('2000', '2001');
        expect(r.start).toBe(Date.parse('2000'));
        expect(r.end).toBe(Date.parse('2001'));
        r = utils.createRange(2000, 2003);
        expect(r.start).toBe(2000);
        expect(r.end).toBe(2003);
        r = utils.createRange(r);
        expect(r.start).toBe(2000);
        expect(r.end).toBe(2003);
        expect(r.center()).toBe(2001);
        expect(r.width()).toBe(3);

        expect(r.intersects(1999)).toBe(false);
        expect(r.intersects(2000)).toBe(true);
        expect(r.intersects(2001)).toBe(true);
        expect(r.intersects(2003)).toBe(false);
        
        expect(r.intersects(utils.createRange(1999, 2000))).toBe(true);
        expect(r.intersects(utils.createRange(2000, 2001))).toBe(true);
        expect(r.intersects(utils.createRange(2002, 2003))).toBe(true);
        expect(r.intersects(utils.createRange(1999, 2003))).toBe(true);
        expect(r.intersects(utils.createRange(1999, 2004))).toBe(true);
        expect(r.intersects(utils.createRange(2004, 2005))).toBe(false);
        expect(r.intersects(utils.createRange(1998, 1999))).toBe(false);
    });
    it("tests interval picking", function() {
        expect(utils.pickInterval(utils.createRange('2000','2001'))).toBe(
            moment.duration(1, 'months').asMilliseconds()
        );
        expect(utils.pickInterval(utils.createRange('2000-01-01','2000-02-01'))).toBe(
            moment.duration(1, 'weeks').asMilliseconds()
        );
    });
    it("tests compute range works", function() {
        var r = utils.computeRange([utils.createRange(100,200)]);
        expect(r.start).toBe(100);
        expect(r.end).toBe(200);
        r = utils.computeRange([utils.createRange(100,400), utils.createRange(100,300)]);
        expect(r.start).toBe(100);
        expect(r.end).toBe(400);
    });
});
