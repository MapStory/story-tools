'use strict';

var angular = require('angular');

var module = angular.module('composer', [
    'storytools.core.time',
    'storytools.core.mapstory',
    'storytools.core.loading',
    'storytools.core.legend',
    'storytools.edit.style',
    'storytools.edit.boxes',
    'storytools.edit.pins',
    'storytools.core.ogc',
    'colorpicker.module',
    'ui.bootstrap',
    'angular-sortable-view'
]);

module.constant('iconCommonsHost', 'http://mapstory.dev.boundlessgeo.com');

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
                //console.log(watchers);
            }
            last = watchers;
        }, 1000);

    })();
});

module.config(['$qProvider', function($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

var servers = [
    {
        name: 'mapstory',
        path: '/geoserver/',
        absolutePath: 'https://demo.mapstory.org/geoserver/',
        host: 'https://demo.mapstory.org/',
        canStyleWMS: false,
        timeEndpoint: function(name) {
            return '/maps/time_info.json?layer=' + name;
        }
    },
    {
        name: 'storyscapes',
        path: '/gsstoryscapes/',
        canStyleWMS: true,
        host: 'http://storyscapes.geointservices.io/'
    },
    {
        name: 'local',
        path: '/gslocal/',
        canStyleWMS: true
    }
];

function getServer(name) {
    var server = null;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i].name === name) {
            server = servers[i];
            break;
        }
    }
    if (server === null) {
        throw new Error('no server named : ' + name);
    }
    return server;
}

require('./map');
require('./style');
require('./layers');
require('./navigation');
