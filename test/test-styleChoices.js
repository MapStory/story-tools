require('../lib/ng/edit/style/services/styleChoices.js');

describe('test styleChoices', function() {

    beforeEach(function() {
        window.angular.mock.module('storytools.edit.style.styleChoices');
    });

    describe('stRecentChoices works', function() {
        beforeEach(function() {

            inject(function($injector) {
                stRecentChoices = $injector.get('stRecentChoices');
            });
        });
        it('should store recent icons', function() {
            var icons = stRecentChoices.icons;
            icons.clear();
            icons.add('a');
            expect(icons.recent).toEqual(['a']);
            icons.add('b');
            expect(icons.recent).toEqual(['a', 'b']);
            icons.add('b');
            expect(icons.recent).toEqual(['a', 'b']);
            var others = 'cdefghijklmonpqrstuvxyz';
            for (var i=0; i<others.length;i++) {
                icons.add(others[i]);
            }
            expect(icons.recent.length).toBe(icons._max);
            // this assertion is based on the assumption of _max=24...
            expect(icons.recent[0]).toBe('b');
        });
    });
});