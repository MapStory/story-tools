(function() {
    'use strict';

    var module = angular.module('storytools.edit.time.directives', []);

    module.directive('stDateTimeField', function() {
        return {
            restrict: 'E',
            templateUrl: 'time/date-time-field.html',
            scope: {
                dateTime: '=',
                currentTime: '='
            },
            link: function(scope, elem) {
                scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    scope.opened = true;
                };
            }
        };
    });

    module.directive('isoDateTime', function($log) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModelCtrl) {
                ngModelCtrl.$formatters.push(function(modelValue) {
                    return modelValue ? new Date(modelValue).toISOString() : '';
                });
                ngModelCtrl.$parsers.push(function(viewValue) {
                    var parsed =  Date.parse(viewValue);
                    var valid = !isNaN(parsed);
                    ngModelCtrl.$setValidity('dateTime', valid);
                    return valid ? parsed : null;
                });
                scope.setFromCurrentTime = function() {
                    if (scope.currentTime) {
                        ngModelCtrl.$modelValue = scope.currentTime;
                    } else {
                        $log.error('no current time provided!');
                    }
                };
            }
        };
    });
})();