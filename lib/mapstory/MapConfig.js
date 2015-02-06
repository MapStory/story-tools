exports.MapConfig = function() {
    return {
        read: function(data, mapManager) {
            // old style GXP
            if (data.tools) {
                data = this.transform(data);
            }
            this.apply(data, mapManager);
        },
        transform: function(data) {
            var layers = [];
            // look for playback mode
            var i, ii, mode = 'instant';
            for (i=0, ii=data.tools.length; i<ii; ++i) {
                var tool = data.tools[i];
                if (tool.ptype === "gxp_playback" && tool.outputConfig) {
                    if (tool.outputConfig.playbackMode === 'cumulative') {
                        mode = 'cumulative';
                    }
                    // TODO other modes
                }
            }
            for (i=0, ii=data.map.layers.length; i<ii; ++i) {
                var layer = data.map.layers[i];
                if (layer.visibility === true) {
                    var source = data.sources[layer.source];
                    if (source.ptype === "gx_olsource" || source.ptype === "gxp_wmscsource") {
                        var layerConfig = {
                            visibility: layer.visibility,
                            group: layer.group,
                            type: (source.ptype === "gx_olsource") ? layer.type.replace('OpenLayers.Layer.', '') : "WMS"
                        };
                        if (layerConfig.type === 'WMS') {
                            var params;
                            if (source.ptype === "gx_olsource") {
                                params = layer.args[2] || {};
                                for (var key in params) {
                                    if (angular.isArray(params[key])) {
                                        params[key.toUpperCase()] = params[key].join(',');
                                    }
                                }
                                layerConfig.url = layer.args[1];
                            } else {
                                params = {
                                    LAYERS: layer.name,
                                    STYLES: layer.styles,
                                    TILED: 'TRUE',
                                    FORMAT: layer.format,
                                    TRANSPARENT: layer.transparent
                                };
                                if (layer.tiled === false) {
                                    layerConfig.singleTile = true;
                                }
                                layerConfig.id = layer.name;
                                layerConfig.title = layer.title;
                                layerConfig.url = source.url;
                            }
                            layerConfig.params = params;
                            layerConfig.params.VERSION = '1.1.1';
                            // TODO require dependency explicitly?
                            if (layer.capability) {
                               layerConfig.latlonBBOX = layer.capability.bbox['EPSG:4326'].bbox;
                               layerConfig.times = storytools.core.time.maps.readCapabilitiesTimeDimensions(layer.capability, true);
                            }
                        }
                        layers.push(layerConfig);
                    }
                }
            }
            return {
                playbackMode: mode,
                map: {
                    center: data.map.center,
                    projection: data.map.projection,
                    zoom: data.map.zoom,
                    layers: layers
                }
            };
        },
        apply: function(data, mapManager) {
            mapManager.mode = data.playbackMode;
            mapManager.map.setView(new ol.View({
                center: data.map.center,
                zoom: data.map.zoom,
                projection: data.map.projection
            }));
            for (var i=0, ii=data.map.layers.length; i<ii; ++i) {
                var layer = data.map.layers[i], lyr;
                if (layer.type === 'OSM') {
                    lyr = new ol.layer.Tile();
                    lyr.setSource(new ol.source.OSM());
                    mapManager.map.getLayers().insertAt(i, lyr);
                } else if (layer.type === 'WMS') {
                    var cfg = {id: layer.id, name: layer.id, title: layer.title, times: layer.times};
                    if (layer.singleTile === true) {
                        lyr = new ol.layer.Image(cfg);
                    } else {
                        lyr = new ol.layer.Tile(cfg);
                    }
                    if (layer.latlonBBOX) {
                        lyr.setExtent(
                            ol.proj.transformExtent(
                                layer.latlonBBOX,
                                'EPSG:4326',
                                mapManager.map.getView().getProjection()
                            )
                        );
                    }
                    if (layer.singleTile === true) {
                        lyr.setSource(new ol.source.ImageWMS({
                            url: layer.url,
                            params: layer.params
                        }));
                    } else {
                        lyr.setSource(new ol.source.TileWMS({
                            url: layer.url,
                            params: layer.params
                        }));
                    }
                    if (layer.times && !layer.layerInfo) {
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
                }
            }
        }
    };
};
