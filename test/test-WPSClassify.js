require('../lib/style/services/WPSClassify.js');

describe('WPSClassify', function() {

    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('mapstory.styleEditor.WPSClassify');

        inject(function(WPSClassify) {
            this.WPSClassify = WPSClassify;
        });
    });

    it('should create the correct WPS request', inject(function(WPSClassify) {
        var request = WPSClassify.classifyVector({});
        window.console.log(request);
    }));

});
