(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.layerClassificationService', []);

    module.factory('stLayerClassificationService', function($q, $http, $log) {
        return {
            classify: function(layer, attribute, method, numClasses) {
                if (!this.cache) {
                    this.cache = {};
                }
                var defer;
                if (attribute === null || method === null) {
                    defer = $q.defer();
                    defer.reject('Not enough info to perform WPS request.');
                    return defer.promise;
                }
                var key = layer.get('id') + '|' + attribute + '|' + method + '|' + numClasses;
                if (this.cache[key]) {
                    defer = $q.defer();
                    defer.resolve(this.cache[key]);
                    return defer.promise;
                }
                var xml, service = this;
                var wps = new storytools.edit.WPSClassify.WPSClassify();
                var server = layer.get('server');
                var url = server.path + 'wps';
                if (method === 'unique') {
                    xml = wps.getUniqueValues({
                        featureNS: layer.get('layerInfo').featureNS,
                        typeName: layer.get('layerInfo').typeName,
                        featurePrefix: layer.get('layerInfo').featurePrefix,
                        attribute: attribute
                    }, true);
                    return $http({
                        url:  url,
                        method: "POST",
                        data: xml,
                        headers: {'Content-Type': 'application/xml'}
                    }).then(function(result) {
                        var results = [];
                        if (result.data && result.data.features) {
                            for (var i=0, ii=Math.min(result.data.features.length, numClasses); i<ii; ++i) {
                                var feature = result.data.features[i];
                                results.push({
                                    name: feature.properties.value,
                                    value: feature.properties.value
                                });
                            }
                        }
                        service.cache[key] = results;
                        return results;
                    });
                } else {
                    var wpsMethod;
                    if (method === 'Natural Breaks') {
                        wpsMethod = 'NATURAL_BREAKS';
                    } else if (method === 'Equal Interval') {
                        wpsMethod = 'EQUAL_INTERVAL';
                    } else if (method === 'Quantile') {
                        wpsMethod = 'QUANTILE';
                    }
                    // this should not happen since we only have methods in the UI that we support
                    if (wpsMethod !== undefined) {
                        xml = wps.classifyVector({
                            featureNS: layer.get('layerInfo').featureNS,
                            typeName: layer.get('layerInfo').typeName,
                            featurePrefix: layer.get('layerInfo').featurePrefix,
                            attribute: attribute,
                            numClasses: numClasses,
                            method: wpsMethod
                        }, true);
                        return $http({
                            url: url,
                            method: "POST",
                            data: xml,
                            headers: {'Content-Type': 'application/xml'}
                        }).then(function(result) {
                            var response = wps.parseResult(result.data);
                            if (response.success === true) {
                                service.cache[key] = response.rules;
                                return response.rules;
                            } else {
                                $log.warn(response.msg);
                                return [];
                            }
                        });
                    }
                }
            }
        };
    });
})();
