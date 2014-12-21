require('../lib/ng/edit/style/directives/directives.js');
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

function scope(el) {
    return angular.element(el).scope();
}

describe('test directives', function() {

    beforeEach(function() {
        // window.angular.mock.module is work around browserify conflict
        window.angular.mock.module('mapstory.styleEditor.directives');
        window.angular.mock.module('mapstory.allTemplates');
        window.angular.mock.module('mapstory.styleEditor.styleChoices');
        window.angular.mock.module('mapstory.styleEditor.ol3StyleConverter');
        window.angular.mock.module('mapstory.styleEditor.svgIcon');

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
            expect(scope(el).thing.value).toBe(13);
        });
    });

    describe('color editor', function() {
        it('should bind and edit', function() {
            var el = compile("<color-editor st-model='thing' property='value'></color-editor>", {thing: {value: '#faa'}});
            expect(el.find('i').css('backgroundColor')).toBe('rgb(255, 170, 170)');
            setInputValue(el.find('input'), '#aaa');
            expect(scope(el).thing.value).toBe('#aaa');
            expect(el.find('i').css('backgroundColor')).toBe('rgb(170, 170, 170)');
        });
    });

    describe('graphic-editor', function() {
        it('should bind and edit', function() {
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
        // @todo cover svg case
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
            var el = compile("<stroke-editor st-model='thing'></stroke-editor>", { thing : { stroke: {}}});
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