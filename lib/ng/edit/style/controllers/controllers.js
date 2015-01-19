(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.controllers', []);

    module.controller('styleEditorController', 
        function($scope, stStyleTypes, stStyleChoices, stLayerClassificationService, stStyleRuleBuilder) {
            var styles = {};

            function promptClassChange() {
                // @todo should check for rule edits?
                if ($scope.activeStyle.rules.length > 0) {
                    return window.confirm('delete existing rules?');
                }
                return true;
            }

            function classify() {
                var activeStyle = $scope.activeStyle;
                stLayerClassificationService.classify(
                    $scope.layer,
                    activeStyle.classify.attribute,
                    activeStyle.classify.method,
                    activeStyle.classify.maxClasses).then(function(results) {
                        activeStyle.rules = results;
                        stStyleRuleBuilder.buildRuleStyles(activeStyle);
                });
            }

            function setLayer(layer) {
                $scope.layer = layer;
                $scope.styleTypes = stStyleTypes.getTypes(layer.get('layerInfo'));
                setActiveStyle($scope.styleTypes[0]);
            }

            function setActiveStyle(styleType) {
                $scope.currentEditor = styleType;
                $scope.activeStyle = getStyle(styleType);
            }

            function getStyle(styleTyle) {
                var style;

                if (styleTyle.name in styles) {
                    style = styles[styleTyle.name];
                } else {
                    var styleType = $scope.styleTypes.filter(function(t) {
                        return t.name == styleTyle.name;
                    });
                    if (styleType.length === 0) {
                        throw 'invalid style type: ' + styleTyle.name;
                    }
                    style = stStyleTypes.createStyle(styleType[0]);
                }
                return style;
            }

            $scope.styleChoices = stStyleChoices;
            setLayer($scope.layer);

            $scope.setActiveStyle = setActiveStyle;

            $scope.$watch(function() {
                var active = $scope.styleTypes.filter(function(e) {
                    return e.active;
                });
                return active[0];
            }, function(currentSlide, previousSlide) {
                if (currentSlide && (currentSlide !== previousSlide)) {
                    setActiveStyle(currentSlide);
                }
            });

            $scope.$watch('layer',function(neu, old) {
                if (neu != old) {
                    setLayer(neu);
                }
            });

            $scope.changeClassifyProperty = function(prop, value) {
                if (false && !promptClassChange()) {
                    return;
                }
                if (prop) {
                    $scope.activeStyle.classify[prop] = value;
                }
                classify();
            };

            $scope.$watch('activeStyle', function(neu) {
                if ($scope.editorForm.$valid) {
                    $scope.layer.style = $scope.activeStyle;
                    ($scope.onChange || angular.noop)($scope.layer);
                }
            }, true);

            $scope.$watch('editorForm.$valid', function() {
                ($scope.formChanged || angular.noop)($scope.editorForm);
            });
        });
})();
