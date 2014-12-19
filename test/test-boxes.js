var boxes = require('../lib/core/time/boxes.js');
var utils = require('../lib/core/time/utils.js');
var Box = boxes.Box;
var BoxModel = boxes.BoxModel;

describe("test boxes", function() {
    it("finds the right box by index", function() {
        function expectBoxOffset(data, idx) {
            return expect(boxes.findBox(data, idx)._offset);
        }
        ;
        var data = [{_offset: 0}];
        expectBoxOffset(data, 0).toBe(0);
        expectBoxOffset(data, 1).toBe(0);

        data = [{_offset: 0}, {_offset: 10}];
        expectBoxOffset(data, 0).toBe(0);
        expectBoxOffset(data, 5).toBe(0);
        expectBoxOffset(data, 10).toBe(10);
        expectBoxOffset(data, 11).toBe(10);
    });
    it("box steps works", function() {
        expect(new Box({data: [1, 2, 3]}).getSteps()).toBe(3);
        expect(new Box({range: utils.createRange(10000, 20000), speed: {interval: 1000}}).getSteps()).toBe(11);
        expect(new Box({range: utils.createRange(10000, 11000), speed: {interval: 333}}).getSteps()).toBe(4);
    });
    it("box getIndex works", function() {
        var box = new Box({data: [1, 5, 10]});
        expect(box.getIndex(0)).toBe(0);
        expect(box.getIndex(1)).toBe(0);
        expect(box.getIndex(3)).toBe(0);
        expect(box.getIndex(10)).toBe(2);

        box = new Box({range: utils.createRange(10, 20), speed: {interval: 5}});
        expect(box.getIndex(5)).toBe(0);
        expect(box.getIndex(10)).toBe(0);
        expect(box.getIndex(12)).toBe(0);
        expect(box.getIndex(15)).toBe(1);
        expect(box.getIndex(18)).toBe(1);
        expect(box.getIndex(20)).toBe(2);
        expect(box.getIndex(25)).toBe(2);
    });
    it("box getDate works", function() {
        var box = new Box({data: [1, 5, 10]});
        box._offset = 0;
        expect(box.getDate(0)).toBe(1);
        box._offset = 10;
        expect(box.getDate(11)).toBe(5);

        box = new Box({range: utils.createRange(10, 20), speed: {interval: 5}});
        box._offset = 0;
        expect(box.getDate(0)).toBe(10);
        box._offset = 10;
        expect(box.getDate(11)).toBe(15);
    });
});

describe("test box model", function() {
    it("should work with a single box of list data", function() {
        var controller = new BoxModel([{data: [1, 2, 3]}]);
        var range = controller.getRange();
        expect(range.start).toBe(1);
        expect(range.end).toBe(3);
        expect(controller.getSteps()).toBe(3);
        range = controller.getRangeAt(0, 1);
        expect(range.start).toBe(1);
        expect(range.end).toBe(2);
        expect(controller.getIndex(1)).toBe(0);
    });
    it("should work with two list boxes", function() {
        var controller = new BoxModel([{data: [1, 2, 3]}, {data: [4, 5, 6]}]);
        var range = controller.getRange();
        expect(range.start).toBe(1);
        expect(range.end).toBe(6);
        expect(controller.getSteps()).toBe(6);
        range = controller.getRangeAt(2, 3);
        expect(range.start).toBe(3);
        expect(range.end).toBe(4);
        expect(controller.getIndex(0)).toBe(0);
        expect(controller.getIndex(3)).toBe(2);
        expect(controller.getIndex(4)).toBe(3);
        expect(controller.getIndex(7)).toBe(6);
    });
    it("should work with one range box", function() {
        var controller = new BoxModel([{range: utils.createRange(10, 20), speed: {interval: 5}}]);
        var range = controller.getRange();
        expect(range.start).toBe(10);
        expect(range.end).toBe(20);
        expect(controller.getSteps()).toBe(3);
        range = controller.getRangeAt(0, 1);
        expect(range.start).toBe(10);
        expect(range.end).toBe(15);
        expect(controller.getIndex(1)).toBe(0);
        
    });
    it("should work with two range boxes", function() {
        var controller = new BoxModel([
            {range: utils.createRange(10, 20), speed: {interval: 5}},
            {range: utils.createRange(30, 50), speed: {interval: 10}}
        ]);
        var range = controller.getRange();
        expect(range.start).toBe(10);
        expect(range.end).toBe(50);
        expect(controller.getSteps()).toBe(6);
        range = controller.getRangeAt(2, 3);
        expect(range.start).toBe(20);
        expect(range.end).toBe(30);
        expect(controller.getIndex(40)).toBe(4);
    });
});
