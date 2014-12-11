(function() {
    'use strict';

    var module = angular.module('mapstory.styleEditor.svgIcon', []);

    module.factory('stSvgIcon', function($cacheFactory, $http, $q, $log) {
        var element = angular.element(document.createElement('div'));
        var imageCache = $cacheFactory('stSvgImage');
        var dataCache = $cacheFactory('stSvgData');
        function process(svg, fill, stroke) {
            element.html(svg);
            // @todo make smarter
            ['path', 'rect'].forEach(function(el) {
                angular.forEach(element.find(el), function(e) {
                    // @todo does it make sense to override stroke width?
                    e = angular.element(e);
                    var css = {
                        opacity: 1
                    };
                    var existingFill = e.css('fill');
                    if (existingFill != 'none' && existingFill != 'rgb(255, 255, 255)') {
                        css.fill = fill;
                    }
                    var existingStroke = e.css('stroke');
                    if (existingStroke != 'none') {
                        css.stroke = stroke;
                    }
                    e.css(css);
                });
            });
            var root = element.find('svg');
            return {
                dataURI: 'data:image/svg+xml;base64,' + btoa(element.html()),
                width: parseInt(root.attr('width')),
                height: root.attr('height')
            };
        }
        return {
            getImage: function(svgURI, fill, stroke, sync) {
                var key = svgURI + fill + stroke;
                var cached = imageCache.get(key);
                var deferred = $q.defer();
                if (cached) {
                    if (sync) {
                        return cached;
                    }
                    deferred.resolve(cached);
                } else {
                    if (sync) {
                        var svg = dataCache.get(svgURI);
                        if (svg) {
                            var imageInfo = process(svg, fill, stroke);
                            imageInfo.uri = svgURI;
                            imageCache.put(key, imageInfo);
                            return imageInfo;
                        }
                        return null;
                    }
                    this.getImageData(svgURI).success(function(data) {
                         var imageInfo = process(data, fill, stroke);
                         imageInfo.uri = svgURI;
                         imageCache.put(key, imageInfo);
                         deferred.resolve(imageInfo);
                         dataCache.put(svgURI, data);
                    }).error(function() {
                         $log.warn('error fetching ' + svgURI);
                         deferred.reject('error');
                    });
                }
                return deferred.promise;
            },
            getImageData: function(svgURI) {
                return $http.get(svgURI, {cache: true});
            }
        };
    });

    module.factory('iconCommons', function($injector, $q, stSvgIcon) {
        var impl;
        if ($injector.has('iconCommonsImpl')) {
            impl = $injector.get('iconCommonsImpl');
        } else {
            impl = {
                defaults: []
            };
        }
        return {
            defaults: function() {
                return $q.all(impl.defaults.map(function(uri) {
                    return stSvgIcon.getImage(uri, '#000', '#fff');
                }));
            }
        };
    });
})();
