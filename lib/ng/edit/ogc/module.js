(function() {
    'use strict';

    var module = angular.module('storytools.edit.ogc', [
    ]);

    function StoryLayer(data) {
      ol.Object.call(this, data);
    }

    StoryLayer.prototype = Object.create(ol.Object.prototype);
    StoryLayer.prototype.constructor = StoryLayer;

    function EditableStoryLayer(data) {
      StoryLayer.call(this, data);
    }

    EditableStoryLayer.prototype = Object.create(StoryLayer.prototype);
    EditableStoryLayer.prototype.constructor = EditableStoryLayer;

    module.constant('StoryLayer', StoryLayer);
    module.constant('EditableStoryLayer', EditableStoryLayer);

    module.service('stAnnotateLayer', function($http) {
      return {
        loadCapabilities: function(EditableStoryLayer) {
          var request = 'GetCapabilities', service = 'WMS';
          $http({
            method: 'GET',
            url: EditableStoryLayer.get('url'),
            params: {
              'REQUEST': request,
              'SERVICE': service,
              'VERSION': '1.3.0'
            }
          }).success(function(data) {
            var caps = new ol.format.WMSCapabilities().read(data);
            var found = storytools.core.time.maps.readCapabilitiesTimeDimensions(caps);
            var name = EditableStoryLayer.get('name');
            if (name in found) {
              EditableStoryLayer.set('times', found[name]);
            }
          });
        }
      };
    });

    module.service('stLayerBuilder', function() {
    });

})();
