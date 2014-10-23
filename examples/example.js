$(function() {
    map = new ol.Map({
        layers: [new ol.layer.Tile({
                source: new ol.source.MapQuest({layer: 'sat'})
            })],
        target: 'map',
        view: new ol.View({
            center: [0, 0],
            zoom: 3
        })
    });

    controls = null;
    function createControls() {
        $("#panel").removeClass("hide");
        controls = timeControls.create({
            annotations: [],
            map: null,
            data: map.getLayers().item(1)._times,
            playback: {
                mode: 'instant',
                fixed: false
            }
        });
        controls.on("rangeChange", updateLayers);
    }

    function updateLayers(range) {
        map.getLayers().item(1).getSource().updateParams({TIME: isoDate(range.start) + "/" + isoDate(range.end)});
    }

    function updateControls(times) {
        if (controls == null) {
            createControls();
        } else {
            controls.update({data: times});
        }
    }

    function loadCapabilities(layer) {
        var parser = new ol.format.WMSCapabilities();
        var url = layer.getSource().getUrls()[0];
        var status = $("#loadingLayer").html('Loading...');
        $.ajax(url + '?request=getcapabilities').then(function(response) {
            var caps = parser.read(response);
            var times = caps.Capability.Layer.Layer[0].Dimension[0].values.split(',');
            times = times.map(function(t) {
                return Date.parse(t);
            });
            layer._times = times;
            updateControls(times);
            status.html('');
        });
    }

    function addLayer(name) {
        var url = '/geoserver/geonode/' + name + '/wms';
        var layer = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: url,
                params: {'LAYERS': name, 'VERSION': '1.1.0', 'TILED': true},
                serverType: 'geoserver'
            })
        });
        layer.getSource().setTileLoadFunction((function() {
            var numLoadingTiles = 0;
            var tileLoadFn = layer.getSource().getTileLoadFunction();
            return function(tile, src) {
                if (numLoadingTiles === 0) {
                    console.log('loading');
                }
                ++numLoadingTiles;
                var image = tile.getImage();
                image.onload = image.onerror = function() {
                    --numLoadingTiles;
                    if (numLoadingTiles === 0) {
                        console.log('idle');
                    }
                };
                tileLoadFn(tile, src);
            };
        })());

        map.addLayer(layer);
        loadCapabilities(layer);
    }

    $("#settings form input").on('change', function(ev) {
        var el = $(this);
        var name = el.attr('name');
        if (name === 'playbackMode') {
            controls.update({mode: el.val()});
        } else if (name === 'fixed') {
            controls.update({fixed: el.prop('checked')});
        }
    });

    $("#addlayers form").on('submit', function(ev) {
        ev.preventDefault();
        addLayer($(this).find('input').val());
        return false;
    });

    function isoDate(v) {
        return new Date(v).toISOString();
    }

    if (window.location.search.indexOf('_test') >= 0) {
        var times = [];
        var annotations = [];

        $("#panel").removeClass("hide");
        var date = new Date();
        var amt = 10;
        for (var i = 0; i < amt; i++) {
            date.setDate(date.getDate() + 1);
            times.push(new Date(date).getTime());
        }
        annotations = times.map(function(t, i) {
            return {
                start_time: t,
                end_time: t,
                content: i,
                title: isoDate(t),
                in_timeline: true
            };
        });
        controls = timeControls.create({
            annotations: annotations,
            map: null,
            data: times,
            playback: {
                mode: 'cumulative',
                fixed: false
            }
        });
        controls.on('rangeChange', function(range) {
            $("#dates").html(range.toString());
        });
    }

});