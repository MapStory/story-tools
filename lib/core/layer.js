// TODO this probably needs to go in angular space instead of passing around $http
// TODO split up ImmutableStoryLayer and MutableStoryLayer in separate modules
// so that viewer can use only the dependencies needed.

var ImmutableStoryLayer = function(options) {
  this.url = null;
  this.singleTile = null;
  this.timeAttribute = null;
  this.endTimeAttribute = null;
  this.times = null;
  this.name = null;
  this.id = null;
  this.title = null;
  this.type = null;
  for (var prop in options)   {
    if (this.hasOwnProperty(prop)) {
      this[prop] = options[prop];
    }
  }
};

ImmutableStoryLayer.prototype.createLayer = function() {
};

ImmutableStoryLayer.prototype.createFromConfig = function(config) {

};

ImmutableStoryLayer.prototype.getState = function() {
};

ImmutableStoryLayer.prototype.getStart = function() {
  if (this.times) {
    if (this.times.start) { // range
      return this.times.start;
    } else {
      return this.times[0];
    }
  }
};

var MutableStoryLayer = function(options, $http) {
  ImmutableStoryLayer.call(this, options);
  this.styleName = null;
  this.attributes = {};
  this.geomType = null;
  this.typeName = null;
  this.featurePrefix = null;
  this.timeEndpoint = null;
  for (var prop in options)   {
    if (this.hasOwnProperty(prop)) {
      this[prop] = options[prop];
    }
  }
  this.parsers = {};
  this.parsers.WMSGetCapabilities = new ol.format.WMSCapabilities();
  this.parsers.WFSDescribeFeatureType =
      new storytools.edit.WFSDescribeFeatureType.WFSDescribeFeatureType();
  this.getCapabilities($http);
};

MutableStoryLayer.prototype = Object.create(ImmutableStoryLayer);
MutableStoryLayer.prototype.constructor = MutableStoryLayer;

MutableStoryLayer.prototype.getCapabilities = function($http) {
  var me = this;
  var request = 'GetCapabilities', service = 'WMS';
  $http.get({
    method: 'GET',
    url: this.url,
    params: {
      'REQUEST': request,
      'SERVICE': service,
      'VERSION': '1.3.0'
    }
  }).success(function(data) {
    var caps = me.parsers[service + request].read(data);
    var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
    if (me.name in found) {
      me.times = found[me.name];
    }
  });
};

MutableStoryLayer.prototype.getTimeAttribute = function($http) {
  var me = this;
  $http.get({
    method: 'GET',
    url: this.timeEndpoint,
  }).success(function(data) {
    me.timeAttribute = data.attribute;
    if (data.endAttribute) {
      me.endTimeAttribute = data.endAttribute;
    }
  });
};

MutableStoryLayer.prototype.describeFeatureType = function($http) {
  var me = this;
  var request = 'DescribeFeatureType', service = 'WFS';
  $http({
    method: 'GET',
    url: this.url,
    params: {
      'SERVICE': service,
      'VERSION': '1.0.0',
      'REQUEST': request,
      'TYPENAME': this.id
    }
  }).success(function(data) {
    var layerInfo = me.parsers[service + request].parseResult(data);
    if (layerInfo.timeAttribute === null) {
      me.getTimeAttribute($http);
    }
    var parts = id.split(':');
    me.typeName = id;
    me.featurePrefix = parts[0];
  });
};

MutableStoryLayer.prototype.parseCapabilities = function(response) {
  var caps = this.parser.read(response);
  var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
  if (this.name in found) {
    this.times = found[this.name];
  }
};

exports.ImmutableStoryLayer = ImmutableStoryLayer;
exports.MutableStoryLayer = MutableStoryLayer;
