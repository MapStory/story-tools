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
                templateUrl: templateUrl,
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
    editorDirective('colorEditor', 'color-editor.html');
    editorDirective('labelEditor', 'label-editor.html', 'label');

    module.directive('classifyEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'classify-editor.html',
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

    module.directive('classRules', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'class-rules.html'
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
                    var template = currentEditor.name.replace(' ', '-') + ".html";
                    element.html($templateCache.get(template));
                    $compile(element.contents())(scope);
                });
            }
        };
    });
})();