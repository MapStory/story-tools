(function() {
  'use strict';

  var module = angular.module('storytools.edit.style.styleStorageService', []);

  module.factory('stStorageService', function() {
    var stSavedStyle = {};

    var isDefAndNotNull = function(a) {
      if (a !== undefined && a !== null) {
        return true;
      }
      return false;
    };

    stSavedStyle.getSavedStyle = function(layer) {
      var layerStyleJson = null;
      var savedLayerStyle = null;
      var chapter_index = window.config.chapter_index;
      // if json style exists in the layer metadata, grab it
      if (layer.get('metadata').jsonstyle) {
        layerStyleJson = layer.get('metadata').jsonstyle;
      // or if it exists in the temporary style store, grab that one
      } else if (isDefAndNotNull(window.config.stylestore) &&
                isDefAndNotNull(chapter_index) &&
                isDefAndNotNull(window.config.stylestore[chapter_index][layer.get('metadata').name])) {
        layerStyleJson = window.config.stylestore[chapter_index][layer.get('metadata').name];
      // or get it from the chapter config if that exists
      } else if (isDefAndNotNull(window.config.chapters) &&
                 isDefAndNotNull(window.config.chapters[chapter_index])) {
        var chapterLayers = window.config.chapters[chapter_index].map.layers;
        for (var i = 0; i < chapterLayers.length; i++) {
           if (chapterLayers[i].name === layer.get('metadata').name &&
               isDefAndNotNull(chapterLayers[i]['jsonstyle'])) {
             layerStyleJson = chapterLayers[i]['jsonstyle'];
           }
         }

      }
      return layerStyleJson;
    };

    stSavedStyle.saveStyle = function(layer) {
      if (isDefAndNotNull(window.config)) {
        var chapter_index = window.config.chapter_index;
        var style = layer.get('style') || layer.get('metadata').style;
        // if the story was loaded from a previous save then stash the styling info in the config
        if (isDefAndNotNull(window.config.chapters) &&
            isDefAndNotNull(window.config.chapters[chapter_index])) {
          var chapterLayers = window.config.chapters[chapter_index].map.layers;
          for (var i = 0; i < chapterLayers.length; i++) {
            if (chapterLayers[i].name === layer.get('metadata').name) {
              window.config.chapters[chapter_index].map.layers[i]['jsonstyle'] = style;
            }
          }
        // or if a temporary style store has been created, overwrite it
        } else if (isDefAndNotNull(window.config['stylestore'])) {
          if (isDefAndNotNull(window.config['stylestore'][chapter_index])) {
            window.config['stylestore'][chapter_index][layer.get('metadata').name] = style;
          } else {
            window.config['stylestore'][chapter_index] = {};
            window.config['stylestore'][chapter_index][layer.get('metadata').name] = style;
          }
        // otherwise create a temporary place to store the style
        } else {
          window.config['stylestore'] = {};
          window.config['stylestore'][chapter_index] = {};
          window.config['stylestore'][chapter_index][layer.get('metadata').name] = style;
        }
      }

    };

    return stSavedStyle;
  });
})();
