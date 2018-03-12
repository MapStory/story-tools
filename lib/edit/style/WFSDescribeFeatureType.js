//'use strict';

exports.WFSDescribeFeatureType = function() {
  this.parseResult = function(data) {
    var element = data.featureTypes[0].properties;
    var fields = [];
    var geometryType;
    var timeAttrs = [];
    for (var i = 0, ii = element.length; i < ii; ++i) {
      var el = element[i];
      var lp = el.type;
      if (lp.indexOf("Polygon") !== -1) {
        geometryType = "polygon";
      } else if (lp.indexOf("LineString") !== -1) {
        geometryType = "line";
      } else if (lp.indexOf("Point") !== -1) {
        geometryType = "point";
      } else if (
        lp.indexOf("dateTime") !== -1 ||
        lp.indexOf("date-time") !== -1
      ) {
        timeAttrs.push(el.name);
      }
      fields.push({
        name: el.name,
        type: el.type,
        typeNS: el.type.namespaceURI
      });
    }
    return {
      timeAttribute: timeAttrs.length > 0 ? timeAttrs[0] : null,
      geomType: geometryType,
      attributes: fields
    };
  };
};
