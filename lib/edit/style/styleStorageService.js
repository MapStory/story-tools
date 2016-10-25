//'use strict';

exports.styleStorageService = function() {
  var stSavedStyle = {};

  var isDefAndNotNull = function(a) {
    if (a !== undefined && a !== null) {
      return true;
    }
    return false;
  };

  stSavedStyle.getSavedStyle = function(layer) {
    var layerStyleJson = null;
    var layerName;
    var isObject = (typeof layer === 'object');
    var isString = (typeof layer === 'string');
    if (isObject) {
      layerName = layer.get('metadata').name;
    } else if (isString){
      layerName = layer;
    }
    var chapter_index = window.config.chapter_index;
    // if json style exists in the layer metadata, grab it
    if (isObject && layer.get('metadata').jsonstyle) {
      layerStyleJson = layer.get('metadata').jsonstyle;
    // or if it exists in the temporary style store, grab that one
    } else if (isDefAndNotNull(window.config.stylestore) &&
              isDefAndNotNull(chapter_index) &&
              isDefAndNotNull(window.config.stylestore[chapter_index][layerName])) {
      layerStyleJson = window.config.stylestore[chapter_index][layerName];
    }
    return layerStyleJson;
  };

  stSavedStyle.saveStyle = function(layer) {
    if (isDefAndNotNull(window.config)) {
      var chapter_index = window.config.chapter_index;
      var style = layer.get('style') || layer.get('metadata').style;
      // if a temporary style store has been created, overwrite it
      if (isDefAndNotNull(window.config.stylestore)) {
        if (isDefAndNotNull(window.config.stylestore[chapter_index])) {
          window.config.stylestore[chapter_index][layer.get('metadata').name] = style;
        } else {
          window.config.stylestore[chapter_index] = {};
          window.config.stylestore[chapter_index][layer.get('metadata').name] = style;
        }
      // otherwise create a temporary place to store the style
      } else {
        window.config.stylestore = {};
        window.config.stylestore[chapter_index] = {};
        window.config.stylestore[chapter_index][layer.get('metadata').name] = style;
      }
    }
  };

  return stSavedStyle;
};
