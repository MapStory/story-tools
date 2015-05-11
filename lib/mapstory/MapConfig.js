var MapConfigTransformer = require('./MapConfigTransformer.js').MapConfigTransformer;

exports.MapConfig = function() {
    var handleExtent = function(mapManager, layer, config) {
        extent = layer.getExtent();
        if (extent) {
            config.latlonBBOX = ol.proj.transformExtent(extent, mapManager.map.getView().getProjection(), 'EPSG:4326');
        }
    };
    var getLayerConfig = function(layer, mapManager) {
        var source, config = {
            id: layer.get('id'),
            name: layer.get('id'),
            title: layer.get('title')
        };
        if (layer.style !== undefined) {
            config.style = layer.style;
        }
        var layerInfo = layer.get('layerInfo');
        if (layerInfo !== undefined) {
            config.layerInfo = layerInfo;
        }
        var extent;
        if (layer instanceof ol.layer.Tile) {
            source = layer.getSource();
            if (source instanceof ol.source.TileWMS) {
                config.useOldAsInterimTiles = layer.getUseOldAsInterimTiles();
                config.singleTile = false;
                config.type = 'WMS';
                handleExtent(mapManager, layer, config);
                // TODO handle multiple urls
                config.url = source.getUrls()[0];
                config.params = source.getParams();
                return config;
            } else if (source instanceof ol.source.OSM) {
                if (layer.get('title') === 'Humanitarian OpenStreetMap') {
                    config.type = 'HOT';
                } else {
                    config.type = 'OSM';
                }
                return config;
            } else if (source instanceof ol.source.MapQuest) {
                config.type = 'MapQuest';
                config.layer = source.getLayer();
                return config;
            } else if (source instanceof ol.source.TileImage) {
                config.type = 'MapBox';
                config.name = source.get('name');
                return config;
            }
        } else if (layer instanceof ol.layer.Image) {
            source = layer.getSource();
            if (source instanceof ol.source.ImageWMS) {
                config.singleTile = true;
                config.type = 'WMS';
                handleExtent(mapManager, layer, config);
                config.url = source.getUrl();
                config.params = source.getParams();
                return config;
            }
        } else if (layer instanceof ol.layer.Vector) {
            if (config.layerInfo.typeName) {
                config.type = 'Vector';
                handleExtent(mapManager, layer, config);
                return config;
            }
        }
        return null;
    };
    return {
        read: function(data) {
            // old style GXP
            if (data.tools) {
                return MapConfigTransformer(data);
            } else {
                return data;
            }
        },
        write: function(mapManager) {
            var config = {
                id: mapManager.mapid,
                map: {
                    center: mapManager.map.getView().getCenter(),
                    projection: mapManager.map.getView().getProjection().getCode(),
                    zoom: mapManager.map.getView().getZoom(),
                    layers: []
                }
            };
            mapManager.map.getLayers().forEach(function(layer) {
                var layerConfig = getLayerConfig(layer, mapManager);
                if (layerConfig !== null) {
                    config.map.layers.push(layerConfig);
                }
            });
            return config;
        }
    };
};
