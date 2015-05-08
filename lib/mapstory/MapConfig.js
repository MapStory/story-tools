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
        read: function(data, mapManager) {
            // old style GXP
            if (data.tools) {
                data = MapConfigTransformer(data);
                return data;
            } else {
                for (var i=0, ii=data.map.layers.length; i<ii; ++i) {
                    var layer = data.map.layers[i], layerInfo = layer.layerInfo;
                    if (layerInfo) {
                        if (storytools.core.time.utils.isRangeLike(layerInfo.times)) {
                            layerInfo.times = new storytools.core.time.utils.Interval(layerInfo.times);
                        }
                    }
                }
            }
            this.apply(data, mapManager);
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
        },
        apply: function(data, mapManager) {
            mapManager.mapid = data.id;
            mapManager.mode = data.playbackMode;
            mapManager.map.setView(new ol.View({
                center: data.map.center,
                zoom: data.map.zoom,
                projection: data.map.projection
            }));
            var hasBaseLayer = false;
            for (var i=0, ii=data.map.layers.length; i<ii; ++i) {
                var layer = data.map.layers[i], lyr, cfg;
                var baseLayer = this.createBaseLayer(layer);
                if (baseLayer !== undefined) {
                    hasBaseLayer = true;
                    mapManager.setBaseLayer(layer, baseLayer);
                }
                if (layer.type === 'WMS') {
                    cfg = {
                        id: layer.id,
                        name: layer.id,
                        title: layer.title,
                        layerInfo: layer.layerInfo,
                        useOldAsInterimTiles: layer.useOldAsInterimTiles
                    };
                    if (layer.singleTile === true) {
                        lyr = new ol.layer.Image(cfg);
                    } else {
                        lyr = new ol.layer.Tile(cfg);
                    }
                    if (layer.singleTile === true) {
                        lyr.setSource(new ol.source.ImageWMS({
                            url: layer.url,
                            params: layer.params
                        }));
                    } else {
                        var tileGrid;
                        if (layer.resolutions && layer.bbox) {
                            tileGrid = new ol.tilegrid.TileGrid({
                                extent: layer.bbox,
                                resolutions: layer.resolutions
                            });
                        }
                        lyr.setSource(new ol.source.TileWMS({
                            url: layer.url,
                            params: layer.params,
                            tileGrid: tileGrid
                        }));
                    }
                    if (layer.style !== undefined) {
                        lyr.style = layer.style;
                        // set it to readOnly so that it's not overwritten by the style tools
                        lyr.style.readOnly = true;
                    }
                    if (layer.layerInfo && !layer.layerInfo.attributes) {
                        /*jshint -W083 */
                        angular.bind({counter: i, layer: lyr}, function() {
                            var me = this;
                            mapManager.describeFeatureType(lyr, layer.url.replace('wms', 'wfs')).then(function(result) {
                                mapManager.map.getLayers().insertAt(me.counter, me.layer);
                            });
                        })();
                    } else {
                        mapManager.map.getLayers().insertAt(i, lyr);
                    }
                } else if (layer.type === 'Vector') {
                    cfg = { 
                        id: layer.id,
                        name: layer.id,
                        title: layer.title,
                        layerInfo: layer.layerInfo
                    };
                    lyr = new ol.layer.Vector(cfg);
                    if (layer.style !== undefined) {
                        lyr.style = layer.style;
                        // set it to readOnly so that it's not overwritten by the style tools
                        lyr.style.readOnly = true;
                    }
                    mapManager.map.getLayers().insertAt(i, lyr);
                    var start = cfg.layerInfo.times ? cfg.layerInfo.times.start || cfg.layerInfo.times[0] : undefined;
                    mapManager.getFeatures.call(mapManager, lyr, cfg.layerInfo.wfsUrl, start);
                }
            }
            if (hasBaseLayer === false) {
                mapManager.setBaseLayer({type: 'None', title: 'No background'});
            }
        }
    };
};
