(function() {
    'use strict';
    var module = angular.module('style.directives', ['styleTemplates']);

    function editorDirective(name, templateUrl, property, linker) {
        module.directive(name, function(styleChoices) {
            return {
                restrict: 'E',
                scope: {
                    ngModel: "=ngModel",
                    property: "@property",
                    popover: "@popoverText"
                },
                templateUrl: templateUrl,
                link: function(scope, element, attrs) {
                    scope.layerInfo = scope.$parent.layerInfo; // @todo bleck
                    scope.model = scope.ngModel[property || scope.property];
                    scope.styleChoices = styleChoices;
                    if (linker) {
                        linker(scope, element, attrs);
                    }
                }
            };
        });
    }

    module.directive('styleEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'style-editor.html'
        };
    });

    module.directive('symbolEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'symbol-editor.html'
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
                scope.showMethod = attrs.showMethod;
                scope.showMaxClasses = attrs.showMaxClasses;
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