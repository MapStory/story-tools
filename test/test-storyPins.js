storytools = {
    core: require('../lib/core/index.js')
};
require('../lib/ng/core/pins/module.js');

describe('test storyPins', function() {
    var StoryPin;
    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('storytools.core.pins');

        inject(function($injector) {
            StoryPin = $injector.get('StoryPin');
        });
    });

    describe('StoryPinLayerManager', function() {

    });

});