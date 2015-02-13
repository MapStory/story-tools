storytools = {
    core: require('../lib/core/index.js')
};
require('../lib/ng/core/time/services.js');

describe('test time services', function() {

    beforeEach(function() {
        window.angular.mock.module('storytools.core.time.services');
    });

    describe('TimeMachine works', function() {
        function timeLayers() {
            var layers = [];
            Array.prototype.slice.call(arguments).forEach(function(data) {
                layers.push({
                    get: function() {
                        return data;
                    }
                });
            });
            return layers;
        };
        beforeEach(function() {

            inject(function($injector) {
                TimeMachine = $injector.get('TimeMachine');
            });
        });
        it('should compute ticks', function() {
            layers = timeLayers(
                [1, 10, 1000],
                [10000, 10, 10]
            );
            expect(TimeMachine.computeTicks(layers)).toEqual([ 1, 10, 1000, 10000 ]);

            layers = timeLayers(
                [10000, 40000],
                [20000, 30000],
                new storytools.core.time.utils.Interval({start: 5000, end: 50000, duration:'P5S'})
            );
            var results = [];
            for (var i = 5000; i <= 50000; i+= 5000 ) {
                results.push(i);
            }
            expect(TimeMachine.computeTicks(layers)).toEqual(results);
        });
    });
});