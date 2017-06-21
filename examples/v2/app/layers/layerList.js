function layerList(stStoryMapBaseBuilder, stEditableStoryMapBuilder, MapManager) {
    return {
        restrict: 'E',
        scope: {
            map: "="
        },
        templateUrl: 'templates/layer-list.html',
        link: function(scope, el, atts) {
            scope.baseLayers = [{
                title: 'World Light',
                type: 'MapBox',
                name: 'world-light'
            }, {
                title: 'Geography Class',
                type: 'MapBox',
                name: 'geography-class'
            }, {
                title: 'Natural Earth 2',
                type: 'MapBox',
                name: 'natural-earth-2'
            }, {
                title: 'Natural Earth',
                type: 'MapBox',
                name: 'natural-earth-1'
            }, {
                title: 'Humanitarian OpenStreetMap',
                type: 'HOT',
                name: 'hot'
            }, {
                title: 'OpenStreetMap',
                type: 'OSM',
                name: 'osm'
            }, {
                title: 'World Topo Map',
                type: 'ESRI',
                name: 'world-topo-map'
            }, {
                title: 'No background',
                type: 'None'
            }];
            var baseLayer = MapManager.storyMap.get('baselayer');
            if (baseLayer) {
                scope.baseLayer = baseLayer.get('title');
            }
            MapManager.storyMap.on('change:baselayer', function() {
                scope.baseLayer = MapManager.storyMap.get('baselayer').get('title');
            });
            scope.layers = MapManager.storyMap.getStoryLayers().getArray();
            MapManager.storyMap.getStoryLayers().on('change:length', function() {
                scope.layers = MapManager.storyMap.getStoryLayers().getArray();
            });
            scope.toggleVisibleLayer = function(lyr) {
                MapManager.storyMap.toggleStoryLayer(lyr);
            };

            scope.removeLayer = function(lyr) {
                MapManager.storyMap.removeStoryLayer(lyr);
            };
            scope.modifyLayer = function(lyr) {
                scope.swapping = true;
                stEditableStoryMapBuilder.modifyStoryLayer(lyr).then(function() {
                    scope.swapping = false;
                });
            };
            scope.onChange = function(baseLayer) {
                stStoryMapBaseBuilder.setBaseLayer(MapManager.storyMap, baseLayer);
            };
            scope.onSort = function(item, partFrom, partTo, indexFrom, indexTo){
                console.log("Changed layer position of " + item.get('title')
                      + " FROM " + indexFrom
                      + " TO " + indexTo);

                partFrom.forEach(function(layer) {
                    console.log(layer.get('title'));
                });

                partTo.forEach(function(layer) {
                    console.log(layer.get('title'));
                });
            };

        }
    };
}

module.exports = layerList;
