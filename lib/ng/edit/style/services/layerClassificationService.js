(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.layerClassificationService', []);

    module.factory('stLayerClassificationService', function($q, $http) {
        return {
            classify: function(layer, attribute, method, numClasses) {
                var xml;
                var wps = new storytools.edit.WPSClassify.WPSClassify();
                if (method === 'unique') {
                    xml = wps.getUniqueValues({
                        featureNS: layer.get('layerInfo').featureNS,
                        typeName: layer.get('layerInfo').typeName,
                        featurePrefix: layer.get('layerInfo').featurePrefix,
                        attribute: attribute
                    }, true);
                    return $http({
                        url: '/gslocal/wps',
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
                    if (wpsMethod !== undefined && attribute !== null) {
                        xml = wps.classifyVector({
                            featureNS: layer.get('layerInfo').featureNS,
                            typeName: layer.get('layerInfo').typeName,
                            featurePrefix: layer.get('layerInfo').featurePrefix,
                            attribute: attribute,
                            numClasses: numClasses,
                            method: wpsMethod
                        }, true);
                        return $http({
                            url: '/gslocal/wps',
                            method: "POST",
                            data: xml,
                            headers: {'Content-Type': 'application/xml'}
                        }).then(function(result) {
                            var response = wps.parseResult(result.data);
                            if (response.success === true) {
                                return response.rules;
                            } else {
                                if (window.console) {
                                    window.console.warn(response.msg);
                                }
                                return [];
                            }
                        });
                    } else {
                        var defer = $q.defer();
                        defer.reject('Not enough info to perform WPS request.');
                        return defer.promise;
                    }
                }
            }
        };
    });
})();
