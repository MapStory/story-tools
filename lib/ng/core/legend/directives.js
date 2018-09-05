(function() {
      'use strict';

    /**
     * @namespace storytools.core.legend.directives
     */
  var module = angular.module('storytools.core.legend.directives', []);

  var legendOpen = false;

  module.directive('stLegend',
      ["$rootScope", "MapManager", function($rootScope, MapManager) {
        return {
          restrict: 'C',
          replace: true,
          templateUrl: 'legend/legend.html',
          // The linking function will add behavior to the template
          link: function(scope, element) {
            scope.mapManager = MapManager;

            var openLegend = function() {
              angular.element(document.getElementById('legend-container'))[0].style.visibility = 'visible';
              angular.element(document.getElementById('legend-panel'))[0].style.display = 'block';
              legendOpen = true;
            };
            var closeLegend = function() {
              angular.element(document.getElementById('legend-panel'))[0].style.display = 'none';
              legendOpen = false;

              //the timeout is so the transition will finish before hiding the div
              setTimeout(function() {
                angular.element('#legend-container')[0].style.visibility = 'hidden';
              }, 350);
            };

            scope.toggleLegend = function() {
              if (legendOpen === false) {
                console.log(angular.element(document.getElementsByClassName('legend-item')));
                //if (angular.element(document.getElementsByClassName('.legend-item')).length > 0) {
                  openLegend();
                //}
              } else {
                closeLegend();
              }
            };

            scope.getLegendUrl = function(layer) {
              var url = null;
              var server = '/geoserver/wms';
              var layer_name = layer.get('typeName') || layer.get('id');
              url = server + '?request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=' +
                  layer_name + '&transparent=true&legend_options=fontColor:0xFFFFFF;' +
                  'fontAntiAliasing:true;fontSize:14;fontStyle:bold;';
              if (layer.get('params').STYLES) {
               url += '&style=' + layer.get('params').STYLES;
              }
              return url;
            };

            scope.$on('layer-added', function() {
              if (legendOpen === false) {
                openLegend();
              }
            });

            scope.$on('layerRemoved', function() {
              //close the legend if the last layer is removed
              if (legendOpen === true && angular.element('.legend-item').length == 1) {
                closeLegend();
              }
            });
          }
        };
      }]);
}());
