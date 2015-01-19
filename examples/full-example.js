'use strict';

(function() {

    var module = angular.module('fullExample', [
        'storytools.examples.common',
        'storytools.core.time',
        'storytools.edit.style',
        'storytools.edit.boxes',
        'storytools.edit.pins',
        'colorpicker.module',
        'ui.bootstrap'
    ]);

    module.controller('exampleController', function($scope, $http, ol3StyleConverter, mapFactory, stTimeControlsFactory) {
        $scope.map = mapFactory.create();
        $scope.timeControls = null;

        $scope.styleChanged = function(layer) {
            var sld = new storytools.edit.SLDStyleConverter.SLDStyleConverter();
            if (layer instanceof ol.layer.Vector) {
                layer.setStyle(function(feature, resolution) {
                    return ol3StyleConverter.generateStyle(layer.style, feature, resolution);
                });
            } else {
                var xml = sld.generateStyle(layer.style, layer.getSource().getParams().LAYERS, true);
                $http({
                    url: '/gslocal/rest/styles/' + layer.get('layerInfo').styleName + '.xml',
                    method: "PUT",
                    data: xml,
                    headers: {'Content-Type': 'application/vnd.ogc.sld+xml; charset=UTF-8'}
                }).then(function(result) {
                    layer.getSource().updateParams({"_olSalt": Math.random()});
                });
            }
        };

        // we currently need to lazily create the timeControls, should probably extract this
        // @todo! we don't want to create the timeControls here if there is a saved configuration
        $scope.map.map.getLayers().on('change:length', function() {
            if ($scope.timeControls == null) {
                // need some layer with time to start with
                var hasTime = false;
                $scope.map.map.getLayers().forEach(function(l) {
                    hasTime |= angular.isDefined(l._times);
                });
                if (hasTime) {
                    $scope.timeControls = stTimeControlsFactory.create({map: $scope.map.map});
                }
            }
        });
    });
})();
