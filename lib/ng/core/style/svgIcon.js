(function() {
    'use strict';

    var module = angular.module('storytools.core.style.svgIcon', []);

    module.factory('stSvgIcon', function($cacheFactory, $log) {
        var element = angular.element(document.createElement('div'));
        var imageCache = $cacheFactory('stSvgImage');
        var dataCache = $cacheFactory('stSvgData');
        function process(svg, fill, stroke) {
            element.html(svg);
            // @todo make smarter
            ['path', 'polygon', 'circle', 'ellipse', 'rect', 'line', 'polyline'].forEach(function(el) {
                angular.forEach(element.find(el), function(e) {
                    // @todo does it make sense to override stroke width?
                    e = angular.element(e);
                    var css = {
                        opacity: 1
                    };
                    var existingFill = e.css('fill') || e.attr('fill') || '';
                    if (existingFill != 'none' && existingFill != 'rgb(255, 255, 255)' && existingFill.toLowerCase() != '#ffffff') {
                        css.fill = fill;
                    }
                    var existingStroke = e.css('stroke') || e.attr('stroke');
                    if (existingStroke != 'none') {
                        css.stroke = stroke;
                    }
                    e.css(css);
                });
            });
            var root = element.find('svg');
            var width = parseInt(root.attr('width'));
            var height = parseInt(root.attr('height'));
            // ugh - we're totally guessing here but things go badly without:
            // on firefox: ns_error_not_available on calling canvas.drawimage
            // on chrome: very large icon (default size as it renders)
            // we might be able to set the src on an img element and figure this out...
            if (isNaN(width) || isNaN(height)) {
                root.attr('width', 64);
                root.attr('height', 64);
                width = 64;
                height = 64;
            }
            var dataURI = 'data:image/svg+xml;base64,' + btoa(element.html());
            return {
                dataURI: dataURI,
                width: width,
                height: height
            };
        }
        return {
            getImage: function(svgURI, fill, stroke, sync) {
                var key = svgURI + fill + stroke;
                var cached = imageCache.get(key);
                if (cached) {
                    if (sync) {
                        return cached;
                    }
                    return Promise.resolve(cached);
                } else {
                    if (sync) {
                        var svg = dataCache.get(svgURI);
                        if (svg) {
                            var imageInfo = process(svg, fill, stroke);
                            imageInfo.uri = svgURI;
                            imageCache.put(key, imageInfo);
                            return imageInfo;
                        }
                        $log.warning('no svg for', svgURI);
                        return null;
                    }
                    return this.getImageData(svgURI).then(function(response) {
                        var imageInfo = process(response, fill, stroke);
                        imageInfo.uri = svgURI;
                        imageCache.put(key, imageInfo);
                        return Promise.resolve(imageInfo);
                    }, function() {
                        return Promise.reject('error');
                    });
                }
            },
            getImageData: function(svgURI) {
                return fetch(svgURI, {cache: 'force-cache'}).then(rawResponse => {
                    if (!rawResponse.ok) {
                      console.warn('error fetching ' + svgURI);
                      return;
                    }
                    return rawResponse.text().then(response => {
                      dataCache.put(svgURI, response);
                      return response;
                    });
                }, (err) => {
                    console.warn('error fetching ' + svgURI, err);
                });
            }
        };
    });

})();
