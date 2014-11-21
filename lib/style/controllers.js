(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.controllers', []);

    function promptClassChange($scope) {
        // @todo should check for rule edits?
        if ($scope.activeStyle.rules.length > 0) {
            return window.confirm('delete existing rules?');
        }
        return true;
    }

    function classify(classificationService, $scope) {
        var activeStyle = $scope.activeStyle;
        classificationService.classify(
            $scope.layer.info.name,
            activeStyle.classify.attribute,
            activeStyle.classify.method).then(function(results) {
            activeStyle.rules = results;
        });
    }

    module.controller('styleEditorController', ['$scope',
        'styleService', 'styleChoices', 'classificationService',
        function($scope, styleService, styleChoices, classificationService) {
            var styles = {};

            function setLayer(layer) {
                $scope.layer = layer;
                $scope.styleTypes = styleService.getTypes(layer.info);
                setActiveStyle($scope.styleTypes[0]);
            }

            function setActiveStyle(styleType) {
                $scope.currentEditor = styleType;
                $scope.activeStyle = getStyle(styleType);
            }

            function getStyle(type) {
                var style;

                if (type.name in styles) {
                    style = styles[type.name];
                } else {
                    var styleType = $scope.styleTypes.filter(function(t) {
                        return t.name == type.name;
                    });
                    if (styleType.length === 0) {
                        throw 'invalid style type: ' + type.name;
                    }
                    style = styleService.createStyle(styleType[0]);
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
                if (!promptClassChange($scope)) {
                    return;
                }
                $scope.activeStyle.classify[prop] = value;
                classify(classificationService, $scope);
            };

            $scope.$watch('activeStyle', function(neu) {
                if ($scope.editorForm.$valid) {
                    $scope.layer.style = $scope.activeStyle;
                    $scope.onChange($scope.layer);
                }
            }, true);
        }]);
})();