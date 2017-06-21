'use strict';

var angular = require('angular');
var MapManager = require('./mapManager.js');

angular.module('composer').service('MapManager', function($injector) {
    return $injector.instantiate(MapManager);
});
