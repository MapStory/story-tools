(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.controllers', []);

    module.controller('styleEditorController', ['$scope',
        'stStyleTypes', 'stStyleChoices', 'stLayerClassificationService', 'stStyleRuleBuilder',
        function($scope, styleTypes, styleChoices, layerClassificationService, styleRuleBuilder) {
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
                layerClassificationService.classify(
                    $scope.layer.info.name,
                    activeStyle.classify.attribute,
                    activeStyle.classify.method,
                    activeStyle.classify.maxClasses).then(function(results) {
                    activeStyle.rules = results;
                    styleRuleBuilder.buildRuleStyles(activeStyle);
                });
            }

            function setLayer(layer) {
                $scope.layer = layer;
                $scope.styleTypes = styleTypes.getTypes(layer.info);
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
                    style = styleTypes.createStyle(styleType[0]);
                }
                return style;
            }

            $scope.styleChoices = styleChoices;
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

            $scope.getSymbolizerText = function(model) {
                return model.shape || model.graphic;
            };
            $scope.getSymbolizerImage = function(name) {
                return '';
            };
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
                    $scope.onChange($scope.layer);
                }
            }, true);
        }]);
})();