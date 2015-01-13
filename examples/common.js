(function() {

    var module = angular.module('storytools.examples.common', []);

    module.run(function() {
        // install a watchers debug loop
        (function() {
            var root = angular.element(document.getElementsByTagName('body'));
            var last;
            var watchers = 0;

            var f = function(element) {
                if (element.data().hasOwnProperty('$scope')) {
                    watchers += (element.data().$scope.$$watchers || []).length;
                }

                angular.forEach(element.children(), function(childElement) {
                    f(angular.element(childElement));
                });
            };

            window.setInterval(function() {
                watchers = 0;
                f(root);
                if (watchers != last) {
                    console.log(watchers);
                }
                last = watchers;
            }, 1000);

        })();
    });

    function isoDate(v) {
        return new Date(v).toISOString();
    }

    function Map($http) {
        var self = this;
        this.map = new ol.Map({
            layers: [new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'sat'})
                })],
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 3
            })
        });
        this.addLayer = function(name, asVector) {
            var workspace = 'geonode';
            var parts = name.split(':');
            if (parts.length > 1) {
                workspace = parts[0];
                name = parts[1];
            }
            var url = '/geoserver/' + workspace + '/' + name + '/wms';
            var layer;
            if (asVector === true) {
                layer = new ol.layer.Vector({
                    name: name,
                    style: [new ol.style.Style({
                        fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                        stroke: new ol.style.Stroke({color: 'red', width: 1}),
                        image: new ol.style.Circle({
                            radius: 10,
                            fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                            stroke: new ol.style.Stroke({color: 'red', width: 1})
                        })
                    })]
                });
            } else {
                layer = new ol.layer.Tile({name: name});
            }
            return loadCapabilities(layer, url).then(function() {
                self.map.addLayer(layer);
                self.map.getView().fitExtent(layer.getExtent(), self.map.getSize());
            });
        };
        function loadCapabilities(layer, url) {
            function parseTime(response) {
                layer._timeAttribute = response.attribute;
            }
            function parseCapabilities(response) {
                var parser = new ol.format.WMSCapabilities();
                var caps = parser.read(response);
                var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
                var name = layer.get('name');
                if (name in found) {
                    layer._times = found[name];
                    var extent = ol.proj.transformExtent(
                        caps.Capability.Layer.Layer[0].EX_GeographicBoundingBox,
                        'EPSG:4326',
                        self.map.getView().getProjection()
                        );
                    layer.setExtent(extent);
                    var start = layer._times.start || layer._times[0];
                    // @todo use urls for subdomain loading
                    if (layer instanceof ol.layer.Tile) {
                        layer.setSource(new ol.source.TileWMS({
                            url: url,
                            params: {
                                'TIME': isoDate(start),
                                'LAYERS': name,
                                'VERSION': '1.1.0',
                                'TILED': true
                            },
                            serverType: 'geoserver'
                        }));
                    } else if (layer instanceof ol.layer.Vector) {
                        layer.setSource(new ol.source.ServerVector({
                            format: new ol.format.GeoJSON(),
                            loader: function(bbox, resolution, projection) {
                                if (layer._features) {
                                    return;
                                }
                                var wfsUrl = url;
                                wfsUrl += '?service=WFS&version=1.1.0&request=GetFeature&typename=' +
                                    name + '&outputFormat=application/json&' +
                                    '&srsName=' + projection.getCode();
                                $.ajax({
                                    url: wfsUrl
                                }).done(function(response) {
                                    layer._features = layer.getSource().readFeatures(response);
                                    storytools.core.time.maps.filterVectorLayer(layer, {start: start, end: start});
                                });
                            },
                            strategy: ol.loadingstrategy.all,
                            projection: self.map.getView().getProjection()
                        }));
                    }
                }
            }
            var getcaps = url + '?request=GetCapabilities';
            if (layer instanceof ol.layer.Vector) {
                return $http.get('/maps/time_info.json?layer=' + layer.get('name')).success(parseTime).then(function() {
                    return $http.get(getcaps).success(parseCapabilities);
                });
            } else {
                return $http.get(getcaps).success(parseCapabilities);
            }
        }
    }

    module.service('mapFactory', function($http) {
        return {
            create: function() {
                return new Map($http);
            }
        };
    });
})();
