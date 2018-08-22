//'use strict';

exports.WFSDescribeFeatureType = function() {
  this.parseResult = function(data) {
    console.log('PARSING RESULTS =--=-==--==-=--=-==--===-=--==-=-=-=-==-=--=-=-=-=');
    var element = data.featureTypes[0].properties;
    var fields = [];
    var geometryType;
    var fieldType;
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
      if (lp.indexOf("xsd:") !== -1) {
        fieldType = lp.split("xsd:")[1];
      }
      fields.push({
        name: el.name,
        type: fieldType || el.type,
        typeNS: "http://www.w3.org/2001/XMLSchema"
      });
    }
    return {
      timeAttribute: timeAttrs.length > 0 ? timeAttrs[0] : null,
      geomType: geometryType,
      featureNS: "http://www.geonode.org/",
      type: geometryType,
      attributes: fields
    };
  };
};
