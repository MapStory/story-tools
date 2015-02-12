require('../lib/ng/edit/time/directives.js');
helpers = require('./helpers.js');

describe('test time directives', function() {

    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('storytools.edit.time.directives');
        window.angular.mock.module('storytools.allTemplates');

        inject(helpers.inject);
    });

    describe('st-date-time-field directive', function() {
        it('should handle epoch properly', function() {
            var el = helpers.compile('<st-date-time-field date-time="value"></st-date-time-field>', {
                value: 0
            });
            input = el.find('input');
            expect(input.val()).toBe('1970-01-01T00:00:00.000Z');
        });
    });
});