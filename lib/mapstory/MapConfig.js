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
        createBaseLayer: function(layer) {
            var lyr;
            if (layer.type === 'HOT') {
                lyr = new ol.layer.Tile({group: 'background', title: layer.title});
                lyr.setSource(new ol.source.OSM({
                    attributions: [
                        new ol.Attribution({
                            html: 'Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                        }),
                        ol.source.OSM.ATTRIBUTION
                    ],
                    crossOrigin: null,
                    url: 'http://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                }));
            }
            else if (layer.type === 'OSM') {
                lyr = new ol.layer.Tile({group: 'background', title: layer.title});
                lyr.setSource(new ol.source.OSM());
            } else if (layer.type === 'MapBox') {
                lyr = new ol.layer.Tile({group: 'background', title: layer.title});
                var name = layer.name;
                var urls = [
                    'http://a.tiles.mapbox.com/v1/mapbox.',
                    'http://b.tiles.mapbox.com/v1/mapbox.',
                    'http://c.tiles.mapbox.com/v1/mapbox.',
                    'http://d.tiles.mapbox.com/v1/mapbox.'
                ];
                var tileUrlFunction = function(tileCoord, pixelRatio, projection) {
                    var zxy = tileCoord;
                    if (zxy[1] < 0 || zxy[2] < 0) {
                        return "";
                    }
                    return urls[Math.round(Math.random()*3)] + name + '/' +
                        zxy[0].toString()+'/'+ zxy[1].toString() +'/'+
                        zxy[2].toString() +'.png';
                };
                lyr.setSource(new ol.source.TileImage({
                    crossOrigin: null,
                    attributions: [
                        new ol.Attribution({
                            html: /^world/.test(name) ?
                                "<a href='http://mapbox.com'>MapBox</a> | Some Data &copy; OSM CC-BY-SA | <a href='http://mapbox.com/tos'>Terms of Service</a>" :
                                "<a href='http://mapbox.com'>MapBox</a> | <a href='http://mapbox.com/tos'>Terms of Service</a>"
                        })
                    ],
                    tileGrid: new ol.tilegrid.TileGrid({
                        origin: [-128 * 156543.03390625, -128 * 156543.03390625],
                        resolutions: [
                            156543.03390625, 78271.516953125, 39135.7584765625,
                            19567.87923828125, 9783.939619140625, 4891.9698095703125,
                            2445.9849047851562, 1222.9924523925781, 611.4962261962891,
                            305.74811309814453, 152.87405654907226, 76.43702827453613,
                            38.218514137268066, 19.109257068634033, 9.554628534317017,
                            4.777314267158508, 2.388657133579254, 1.194328566789627,
                            0.5971642833948135
                        ]
                    }),
                    tileUrlFunction: tileUrlFunction
                }));
                lyr.getSource().set('name', layer.name);
            } else if (layer.type === 'MapQuest') {
                lyr = new ol.layer.Tile({group: 'background', title: layer.title});
                lyr.setSource(new ol.source.MapQuest({layer: layer.layer}));
            }
            return lyr;
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
                        if (layer.resolutions && layer.origin) {
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
