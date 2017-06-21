'use strict';

var angular = require('angular');
var addLayers = require('./addLayers.js');
var layerList = require('./layerList.js');
var tileProgressController = require('./tileProgressController.js');

angular.module('composer').directive('addLayers', addLayers);
angular.module('composer').directive('layerList', layerList);
angular.module('composer').controller('tileProgressController', tileProgressController);
