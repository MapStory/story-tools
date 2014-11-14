(function() {
    'use strict';

    var module = angular.module('style.controllers', []);

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
            $scope.layerInfo.name,
            activeStyle.classify.attribute,
            activeStyle.classify.method).then(function(results) {
                activeStyle.rules = results;
        });
    }

    module.controller('styleController', function($scope, styleService, styleChoices, classificationService) {
        $scope.styleTypes = styleService.getTypes();
        $scope.currentEditor = styleService.getCurrentStyleType();
        $scope.activeStyle = styleService.getStyle($scope.currentEditor.name);
        $scope.$watch(function() {
            return $scope.styleTypes.filter(function(e) {
                return e.active;
            })[0];
        }, function(currentSlide, previousSlide) {
            if (currentSlide !== previousSlide) {
                styleService.setCurrentStyleType(currentSlide);
                $scope.currentEditor = currentSlide;
                $scope.activeStyle = styleService.getStyle($scope.currentEditor.name);
            }
        });
        $scope.styleChoices = styleChoices;
        $scope.getSymbolizerText = function() {
            return $scope.activeStyle.symbol.shape || $scope.activeStyle.symbol.graphic;
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

        // @todo - approach for managing layer and style change events
        $scope.layerInfo = {
            name : 'layer1',
            attributes : ['name', 'population', 'code']
        };
        $scope.$watch('activeStyle', function() {
            $scope.activeStyleJSON = angular.toJson($scope.activeStyle, true);
        },true);
    });
})();