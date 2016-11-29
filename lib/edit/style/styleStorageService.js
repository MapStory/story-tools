//'use strict';

exports.styleStorageService = function() {
  var stSavedStyle = {};

  var isDefAndNotNull = function(a) {
    if (a !== undefined && a !== null) {
      return true;
    }
    return false;
  };

  stSavedStyle.getSavedStyle = function(layer, chapter) {
    var layerStyleJson = null;
    var layerName;
    var isObject = (typeof layer === 'object');
    var isString = (typeof layer === 'string');
    if (isObject) {
      layerName = layer.get('metadata').name;
    } else if (isString){
      layerName = layer;
    }
    var chapter_index = chapter || window.config.chapter_index;

    // get style from the stylestore if it exists
    if (isDefAndNotNull(window.config.stylestore) &&
              isDefAndNotNull(chapter_index) &&
              isDefAndNotNull(window.config.stylestore[chapter_index]) &&
              isDefAndNotNull(window.config.stylestore[chapter_index][layerName])) {
      layerStyleJson = window.config.stylestore[chapter_index][layerName];
    // or from the chapter config
    } else if (isDefAndNotNull(window.config.chapters) &&
             isDefAndNotNull(window.config.chapters[chapter_index])) {
      var chapterLayers = window.config.chapters[chapter_index].map.layers;
      for (var i = 0; i < chapterLayers.length; i++) {
        if (chapterLayers[i].name === layerName &&
            isDefAndNotNull(chapterLayers[i]['jsonstyle'])) {
          layerStyleJson = chapterLayers[i]['jsonstyle'];
            isDefAndNotNull(chapterLayers[i].jsonstyle)) {
          layerStyleJson = chapterLayers[i].jsonstyle;
        }
      }
    // or from the layer
    } else if (isObject && layer.get('metadata').jsonstyle) {
      layerStyleJson = layer.get('metadata').jsonstyle;
    }
    return layerStyleJson;
  };

  stSavedStyle.saveStyle = function(layer) {
    if (isDefAndNotNull(window.config)) {
      var chapter_index = window.config.chapter_index;
      var style = layer.get('style') || layer.get('metadata').style;
      // if the style store exists, save there
      if (isDefAndNotNull(window.config.stylestore)) {
        if (isDefAndNotNull(window.config.stylestore[chapter_index])) {
          window.config.stylestore[chapter_index][layer.get('metadata').name] = style;
        } else {
          window.config.stylestore[chapter_index] = {};
          window.config.stylestore[chapter_index][layer.get('metadata').name] = style;
        }
      // otherwise create a temporary place to store the style
      // otherwise create a style store and then save
      } else {
        window.config.stylestore = {};
        window.config.stylestore[chapter_index] = {};
        window.config.stylestore[chapter_index][layer.get('metadata').name] = style;
      }
    }
  };

  return stSavedStyle;
};
