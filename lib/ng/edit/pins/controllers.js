(function() {
    'use strict';

    var module = angular.module('storytools.edit.pins.controllers', []);

    module.controller('pinEditorController',
        function($scope) {
            $scope.$watch('pinForm.$valid', function(neu) {
                $scope.onValidChange(neu);
            });
        });
})();
