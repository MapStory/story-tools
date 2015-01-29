(function() {
    'use strict';
    var module = angular.module('storytools.edit.boxes.directives', [
        'storytools.edit.boxes.controllers'
    ]);

    module.directive('boxChooser', function() {
        return {
            restrict: 'E',
            require: '^boxesEditor',
            templateUrl: 'boxes/box-chooser.html',
            link: function(scope, element, attrs, ctrl) {
            }
        };
    });

    module.directive('boxesEditor', function() {
        return {
            restrict: 'A',
            controller: 'boxesEditorController',
            controllerAs: 'boxesCtrl',
            link: function(scope, element, attrs, ctrl) {
                // @todo if boxesEditorListener provided, hook up to ctrl
                // @todo get passed in boxes and give to ctrl
            }
        };
    });

    module.directive('boxEditor', function() {
        return {
            restrict: 'E',
            controller: 'boxEditorController',
            controllerAs: 'boxCtrl',
            require: '^boxesEditor',
            templateUrl: 'boxes/box-editor.html',
            link: function(scope, element, attrs, ctrl) {
                scope.$watch(function() {
                    return ctrl.editingBox;
                }, function() {
                    scope.editBox = ctrl.editingBox;
                });
            }
        };
    });

    module.directive('boxBoundsEditor', function($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'boxes/bounds-editor.html',
            link: function(scope, element, attrs) {
                var el = element[0].querySelector('.box-bounds-map');
                var map = new ol.Map({target: el});
                map.setView(new ol.View({center: [0, 0], zoom: 3}));
                map.addLayer(new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'osm'})
                }));
                scope.watch('boxBoundsEditorSelected', function(n) {
                    if (n) {
                        map.updateSize();
                    }
                });
            }
        };
    });

    module.directive('boxContentsEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'boxes/contents-editor.html'
        };
    });

    module.directive('boxLayersEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'boxes/layers-editor.html'
        };
    });

    module.directive('boxLayoutEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'boxes/layout-editor.html'
        };
    });
})();