(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.layerClassificationService', []);

    module.factory('stLayerClassificationService', function($q, $http) {
        return {
            classify: function(layer, attribute, method, numClasses) {
                var wpsMethod;
                if (method === 'Natural Breaks') {
                    wpsMethod = 'NATURAL_BREAKS';
                } else if (method === 'Equal Interval') {
                    wpsMethod = 'EQUAL_INTERVAL';
                } else if (method === 'Quantile') {
                    wpsMethod = 'QUANTILE';
                }
                if (wpsMethod !== undefined && attribute !== null) {
                    var wps = new storytools.edit.WPSClassify.WPSClassify();
                    var xml = wps.classifyVector({
                        featureNS: layer._layerInfo.featureNS,
                        typeName: layer._layerInfo.typeName,
                        featurePrefix: layer._layerInfo.featurePrefix,
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
        };
    });
})();
