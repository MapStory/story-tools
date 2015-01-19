require('../lib/ng/edit/style/directives/directives.js');
require('../lib/ng/edit/style/services/iconCommons.js');
require('../lib/ng/edit/style/services/styleChoices.js');
require('../lib/ng/core/style/ol3StyleConverter.js');
require('../lib/ng/core/style/svgIcon.js');
$ = require('../bower_components/jquery/dist/jquery.js');

function setInputValue(el, val) {
    el.val(val);
    // tiggerHandler only works with angular element (not jquery)?
    angular.element(el).triggerHandler(sniffer.hasEvent('input') ? 'input' : 'change');
    return el;
}

function click(el) {
    angular.element(el).triggerHandler('click');
}

function compile(html, contents) {
    var scope = $rootScope.$new();
    var el = $compile(html)(scope);
    angular.extend(scope, contents);
    scope.$digest();
    return $(el);
}

function getScope(el) {
    return angular.element(el).scope();
}

describe('test directives', function() {

    beforeEach(function() {
        // @todo mock dependency for now - used by graphicEditor
        window.angular.mock.module(function($provide) {
            $provide.value('$modal', {open: new Function()});
        });

        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('storytools.edit.style.directives');
        window.angular.mock.module('storytools.allTemplates');
        window.angular.mock.module('storytools.edit.style.styleChoices');
        window.angular.mock.module('storytools.edit.style.iconCommons');
        window.angular.mock.module('storytools.core.style.ol3StyleConverter');
        window.angular.mock.module('storytools.core.style.svgIcon');

        inject(inject(function(_$compile_, _$rootScope_, $sniffer) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            sniffer = $sniffer;
        }));
    });

    describe('number editor', function() {
        it('should bind and edit', function() {
            var el = compile("<number-editor st-model='thing' property='value'></number-editor>", {thing: {value: 42}});
            expect(el.find('button').text().trim()).toBe('42');
            setInputValue(el.find('input'), '13');
            expect(getScope(el).thing.value).toBe(13);
        });
    });

    describe('color editor', function() {
        it('should bind and edit', function() {
            var el = compile("<color-editor st-model='thing' property='value'></color-editor>", {thing: {value: '#faa'}});
            expect(el.find('i').css('backgroundColor')).toBe('rgb(255, 170, 170)');
            setInputValue(el.find('input'), '#aaa');
            expect(getScope(el).thing.value).toBe('#aaa');
            expect(el.find('i').css('backgroundColor')).toBe('rgb(170, 170, 170)');
        });
    });

    describe('graphic-editor', function() {
        beforeEach(inject(function($injector) {
            stRecentChoices = $injector.get('stRecentChoices');
            // clear these as they may trigger http requests
            stRecentChoices.icons.clear();
        }));
        it('should bind and edit marks', function() {
            var el = compile("<graphic-editor symbol='thing'></graphic-editor>", {thing: {shape: 'circle'}});
            // @todo not a great test - instead of using a canvas, this could be an image w/ data URI
            expect(el.find('span canvas').attr('mark')).toBe('circle');
            angular.forEach(el.find('canvas'), function(e) {
                e = angular.element(e);
                if (e.attr('mark') == 'square') {
                    e.triggerHandler('click');
                }
            });
            expect(el.find('span canvas').attr('mark')).toBe('square');
        });
        describe('works with icon commons', function() {
            // extra gnarl - rendering of the recent-icons requires some
            // mock http to talk to the iconCommons and wait until the
            // directive updates itself - see whenReady
            beforeEach(inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                stRecentChoices = $injector.get('stRecentChoices');
                $q = $injector.get('$q');
                $timeout = $injector.get('$timeout');

                stRecentChoices.icons.add('/item1.svg');
                stRecentChoices.icons.add('/item2.svg');
                // mock requests for the icons
                $httpBackend.when('GET', '/item1.svg').respond('<svg></svg>', {'Content-Type': 'text/xml'});
                $httpBackend.when('GET', '/item2.svg').respond('<svg></svg>', {'Content-Type': 'text/xml'});
            }));
            // return a promise that will resolve once the http requests have
            // completed and the recent icons have been set in the scope
            function whenReady(el, $httpBackend) {
                // grab the directive scope and watch for svg icons to resolve before running tests
                var scope = getScope(el.children());
                var loaded = $q.defer();
                scope.$watch('recent', function() {
                    loaded.resolve(true);
                });
                // flush pending requests
                $httpBackend.flush();
                return loaded.promise;
            }
            // IMPORTANT : for all tests here, if `done` is not called, jasmine will timeout -
            // this will cover the failure case. see: http://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support
            // IMPORTANT: $timeout.flush() is required to trigger promise resolution
            it('should bind to recent choices', function(done) {
                var el = compile("<graphic-editor symbol='thing'></graphic-editor>", {thing: {}});
                whenReady(el, $httpBackend).then(function() {
                    var img = el.find('.recent-icons img');
                    expect(img.length).toBe(2);
                    done();
                });
                $timeout.flush();
            });
            it('should update with change in recent choices', function(done) {
                var el = compile("<graphic-editor symbol='thing'></graphic-editor>", {thing: {}});

                whenReady(el, $httpBackend).then(function() {
                    var img = el.find('.recent-icons img');
                    expect(img.length).toBe(2);
                    expect(img.attr('src').indexOf('data:image/svg+xml;base64,')).toBe(0);

                    // because we're already in the digest, call this with a timeout
                    $timeout(function() {
                        // queue up expected request
                        $httpBackend.when('GET', '/item3.svg').respond('<svg></svg>', {'Content-Type': 'text/xml'});
                        // and add this recent choice (normally would be from user selecting from icon-commons dialog
                        stRecentChoices.icons.add('/item3.svg');
                        // this triggers an update as if user used the dialog
                        getScope(el.children())._updateRecent();
                        // there should be 3 icons now
                        whenReady(el, $httpBackend).then(function() {
                            var img = el.find('.recent-icons img');
                            expect(img.length).toBe(3);
                            done();
                        });
                    });
                });
                $timeout.flush();
            });
            it('should bind and edit svg', function(done) {
                var el = compile("<graphic-editor symbol='thing'></graphic-editor>", {thing: {graphic: '/item1.svg'}});
                whenReady(el, $httpBackend).then(function() {
                    var img = el.find('.recent-icons img');
                    expect(img.length).toBe(2);
                    expect(img.attr('src').indexOf('data:image/svg+xml;base64,')).toBe(0);
                    done();
                });
                $timeout.flush();
            });

        });
    });

    describe('label-editor', function() {
        it('should bind and edit attribute', function() {
            var label = {
                "attribute": null,
                "fillColor": "#000000",
                "fontFamily": "Serif",
                "fontSize": 10,
                "fontStyle": "normal",
                "fontWeight": "normal"
            };
            var el = compile("<label-editor st-model='thing'></graphic-editor>", {
                thing: {label: label},
                layer: {info: {attributes: ['a', 'b']}}
            });
            expect(el.find('.dropdown-toggle').eq(0).text().trim()).toBe('Select Attribute');
            click(el.find('.dropdown-menu').eq(0).find('li').eq(1));
            expect(label.attribute).toBe('a');
        });
    });

    describe('classify-editor', function() {
        var classify, el;
        beforeEach(function() {
            classify = {
                method: null,
                attribute: null,
                maxClasses: 5,
                range: {
                    min: 0,
                    max: 16
                }
            };
            el = compile("<classify-editor show-max-classes=true show-fixed-classes></classify-editor>", {
                layer: {info: {attributes: ['a', 'b']}},
                activeStyle: {classify: classify},
                changeClassifyProperty: function(prop, val) {
                    classify[prop] = val;
                },
                showMaxClasses: true,
                showFixedClasses: true
            });
        });
        it('should bind and edit attribute', function() {
            click(el.find('ul.dropdown-menu li').get(0));
            expect(classify.attribute).toBe('a');
        });
        it('should bind and edit maxClasses', function() {
            setInputValue(el.find('[ng-if=showMaxClasses] input').eq(0), '13');
            expect(classify.maxClasses).toBe(13);
        });
    });

    describe('stroke-editor', function() {
        it('has a smoke test', function() {
            var el = compile("<stroke-editor st-model='thing'></stroke-editor>", {thing: {stroke: {}}});
            expect(el.children().length).toBe(1);
        });
    });

    describe('rules-editor', function() {
        it('has a smoke test', function() {
            var el = compile("<rules-editor></rules-editor>", {});
            expect(el.children().length).toBe(1);
        });
    });
});