(function() {
    'use strict';
    var module = angular.module('mapstory.styleEditor.directives', ['mapstory.styleEditor.templates']);

    function editorDirective(name, templateUrl, property, linker) {
        module.directive(name, ['stStyleChoices', function(styleChoices) {
            return {
                restrict: 'E',
                scope: {
                    stModel: "=stModel",
                    property: "@property",
                    popover: "@popoverText"
                },
                templateUrl: 'widgets/' + templateUrl,
                link: function(scope, element, attrs) {
                    // @todo bleck
                    scope.$watch(function() {
                        return scope.$parent.layer;
                    }, function(neu) {
                        scope.layer = neu;
                    });
                    scope.model = scope.stModel[property || scope.property];
                    scope.styleChoices = styleChoices;
                    if (linker) {
                        linker(scope, element, attrs);
                    }
                }
            };
        }]);
    }

    module.directive('styleEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'style-editor.html',
            controller: 'styleEditorController',
            require: '?styleEditorController',
            scope: {
                layer : '=',
                onChange : '=',
                formChanged : '='
            }
        };
    });

    editorDirective('symbolEditor', 'symbol-editor.html', 'symbol', function(scope, el, attrs) {
        scope.showGraphic = 'showGraphic' in attrs;
        scope.getSymbolizerText = function(model) {
            return model.shape || model.graphic;
        };
        scope.getSymbolizerImage = function(name) {
            return '';
        };
    });
    editorDirective('strokeEditor', 'stroke-editor.html', 'stroke');
    editorDirective('numberEditor', 'number-editor.html', null, function(scope, el, attrs) {
        var defaults = {
            max: 30
        };
        Object.keys(defaults).forEach(function(e) {
            scope[e] = attrs[e] || defaults[e];
        });
    });
    editorDirective('colorEditor', 'color-editor.html');
    editorDirective('labelEditor', 'label-editor.html', 'label', function(scope) {
        // @todo other options
        scope.styleModel = {
            bold : scope.model.fontWeight == 'bold',
            italic : scope.model.fontStyle == 'italic'
        };
        scope.styleModelChange = function() {
            scope.model.fontWeight = scope.styleModel.bold ? 'bold' : 'normal';
            scope.model.fontStyle = scope.styleModel.italic ? 'italic' : 'normal';
        };
    });

    module.directive('graphicEditor', function(stStyleChoices, ol3MarkRenderer) {
        return {
            restrict: 'E',
            templateUrl: 'widgets/graphic-editor.html',
            scope: {
                symbol: '='
            },

            link: function(scope, element, attrs) {
                scope.styleChoices = stStyleChoices;
                function canvas(symbol) {
                    var img = angular.element(ol3MarkRenderer(symbol, 24));
                    img.addClass('symbol-icon');
                    return img;
                }
                // update the element with the data-current-symbol attribute
                // to match the current symbol
                function current() {
                    var els = element.find('*'); // ugh - jqlite element
                    var el;
                    for (var i = 0; i < els.length; i++) {
                        if (els.eq(i).attr('data-current-symbol') === '') {
                            el = els.eq(i);
                            break;
                        }
                    }
                    el.find('*').remove();
                    el.append(canvas(scope.symbol.shape));
                }
                var clicked = function() {
                    var el = angular.element(this);
                    if (el.attr('shape')) {
                        scope.symbol.shape = el.attr('shape');
                    }
                    current();
                };
                // this might be done another way but because we get canvas elements
                // back from ol3 styles, we build the dom manually
                var list = element.find('div');
                stStyleChoices.symbolizers.forEach(function(s) {
                    var img = canvas(s);
                    img.attr('shape', s);
                    img.on('click', clicked);
                    list.append(img);
                });
                current();
            }
        };
    });

    module.directive('classifyEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'widgets/classify-editor.html',
            scope: true,
            link: function(scope, element, attrs) {
                ['showMethod','showMaxClasses', 'showRange',
                    'showColorRamp','showColorPalette'].forEach(function(opt) {
                    scope[opt] = attrs[opt];
                });
            }
        };
    });

    module.directive('colorRamp', function() {
        return {
            restrict: 'A',
            scope: {
                ramp: "=ramp",
            },
            link: function(scope, element, attrs) {
                var ctx = element[0].getContext('2d');
                var gradient = ctx.createLinearGradient(0, 0, attrs.width, 0);
                Object.getOwnPropertyNames(scope.ramp).forEach(function(stop) {
                    stop = parseFloat(stop);
                    if (!isNaN(stop)) {
                        gradient.addColorStop(stop, scope.ramp[stop]);
                    }
                });
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, attrs.width, attrs.height);
            }
        };
    });

    module.directive('colorField', function() {
        var regex = /(^#[0-9a-f]{6}$)|(^#[0-9a-f]{3}$)/i;
        function validColor(value) {
            // @todo support named colors?
            return regex.exec(value);
        }
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.$parsers.push(function(viewValue) {
                    ctrl.$setValidity('color', validColor(viewValue));
                    return viewValue;
                });
                ctrl.$formatters.push(function(modelValue) {
                    // when loaded but also possible the picker widget modifies
                    ctrl.$setValidity('color', validColor(modelValue));
                    return modelValue;
                });
            }
        };
    });

    module.directive('noClose', function() {
        return {
            link: function($scope, $element) {
                $element.on('click', function($event) {
                    $event.stopPropagation();
                });
            }
        };
    });

    module.directive('styleTypeEditor', function($compile, $templateCache) {
        return {
            restrict: "E",
            link: function(scope, element, attrs) {
                scope.$watch('currentEditor', function() {
                    var currentEditor = scope.currentEditor;
                    var template = 'types/' + currentEditor.name.replace(' ', '-') + ".html";
                    element.html($templateCache.get(template));
                    $compile(element.contents())(scope);
                });
            }
        };
    });

    module.directive('rulesEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'rules-editor.html'
        };
    });
})();