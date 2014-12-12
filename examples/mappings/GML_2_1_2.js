var GML_2_1_2_Module_Factory = function () {
  var GML_2_1_2 = {
    n: 'GML_2_1_2',
    dens: 'http:\/\/www.opengis.net\/gml',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    tis: [{
        ln: 'BoxType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'coord',
            col: true,
            ti: '.CoordType'
          }, {
            n: 'coordinates',
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'AbstractFeatureType',
        ps: [{
            n: 'description'
          }, {
            n: 'name'
          }, {
            n: 'boundedBy',
            ti: '.BoundingShapeType'
          }, {
            n: 'fid',
            ti: 'ID',
            an: {
              lp: 'fid'
            },
            t: 'a'
          }]
      }, {
        ln: 'PointPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'CoordType',
        ps: [{
            n: 'x',
            en: 'X',
            ti: 'Decimal'
          }, {
            n: 'y',
            en: 'Y',
            ti: 'Decimal'
          }, {
            n: 'z',
            en: 'Z',
            ti: 'Decimal'
          }]
      }, {
        ln: 'GeometryCollectionType',
        bti: '.AbstractGeometryCollectionBaseType',
        ps: [{
            n: 'geometryMember',
            col: true,
            mx: false,
            dom: false,
            typed: false,
            ti: '.GeometryAssociationType',
            t: 'er'
          }]
      }, {
        ln: 'MultiPolygonType',
        bti: '.GeometryCollectionType'
      }, {
        ln: 'LineStringMemberType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'MultiPointPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'AbstractGeometryCollectionBaseType',
        bti: '.AbstractGeometryType'
      }, {
        ln: 'AbstractFeatureCollectionType',
        bti: '.AbstractFeatureCollectionBaseType',
        ps: [{
            n: 'featureMember',
            col: true,
            ti: '.FeatureAssociationType'
          }]
      }, {
        ln: 'PointMemberType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'MultiPointType',
        bti: '.GeometryCollectionType'
      }, {
        ln: 'GeometryAssociationType',
        ps: [{
            n: 'geometry',
            mx: false,
            dom: false,
            typed: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'MultiLineStringType',
        bti: '.GeometryCollectionType'
      }, {
        ln: 'PolygonPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'PolygonMemberType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'LinearRingType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'coord',
            col: true,
            ti: '.CoordType'
          }, {
            n: 'coordinates',
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'AbstractFeatureCollectionBaseType',
        bti: '.AbstractFeatureType'
      }, {
        ln: 'CoordinatesType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'decimal',
            an: {
              lp: 'decimal'
            },
            t: 'a'
          }, {
            n: 'cs',
            an: {
              lp: 'cs'
            },
            t: 'a'
          }, {
            n: 'ts',
            an: {
              lp: 'ts'
            },
            t: 'a'
          }]
      }, {
        ln: 'MultiLineStringPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'MultiPolygonPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'LineStringType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'coord',
            col: true,
            ti: '.CoordType'
          }, {
            n: 'coordinates',
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'LineStringPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'FeatureAssociationType',
        ps: [{
            n: 'feature',
            mx: false,
            dom: false,
            typed: false,
            en: '_Feature',
            ti: '.AbstractFeatureType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GeometryPropertyType',
        ps: [{
            n: 'geometry',
            mx: false,
            dom: false,
            typed: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'BoundingShapeType',
        ps: [{
            n: 'box',
            en: 'Box',
            ti: '.BoxType'
          }, {
            n: '_null',
            en: 'null'
          }]
      }, {
        ln: 'LinearRingMemberType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'MultiGeometryPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'PointType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'coord',
            ti: '.CoordType'
          }, {
            n: 'coordinates',
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'PolygonType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'outerBoundaryIs',
            ti: '.LinearRingMemberType'
          }, {
            n: 'innerBoundaryIs',
            col: true,
            ti: '.LinearRingMemberType'
          }]
      }, {
        ln: 'AbstractGeometryType',
        ps: [{
            n: 'gid',
            ti: 'ID',
            an: {
              lp: 'gid'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'NullType',
        vs: ['inapplicable', 'unknown', 'unavailable', 'missing']
      }],
    eis: [{
        en: 'LineString',
        ti: '.LineStringType',
        sh: '_Geometry'
      }, {
        en: '_Feature',
        ti: '.AbstractFeatureType'
      }, {
        en: 'geometryMember',
        ti: '.GeometryAssociationType'
      }, {
        en: 'position',
        ti: '.PointPropertyType',
        sh: 'pointProperty'
      }, {
        en: 'MultiPoint',
        ti: '.MultiPointType',
        sh: '_Geometry'
      }, {
        en: 'innerBoundaryIs',
        ti: '.LinearRingMemberType'
      }, {
        en: 'multiCenterOf',
        ti: '.MultiPointPropertyType',
        sh: 'multiPointProperty'
      }, {
        en: 'boundedBy',
        ti: '.BoundingShapeType'
      }, {
        en: 'centerOf',
        ti: '.PointPropertyType',
        sh: 'pointProperty'
      }, {
        en: 'multiGeometryProperty',
        ti: '.MultiGeometryPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'coord',
        ti: '.CoordType'
      }, {
        en: 'featureMember',
        ti: '.FeatureAssociationType'
      }, {
        en: 'coordinates',
        ti: '.CoordinatesType'
      }, {
        en: 'coverage',
        ti: '.PolygonPropertyType',
        sh: 'polygonProperty'
      }, {
        en: 'MultiLineString',
        ti: '.MultiLineStringType',
        sh: '_Geometry'
      }, {
        en: 'Box',
        ti: '.BoxType'
      }, {
        en: '_FeatureCollection',
        ti: '.AbstractFeatureCollectionType',
        sh: '_Feature'
      }, {
        en: 'outerBoundaryIs',
        ti: '.LinearRingMemberType'
      }, {
        en: 'description'
      }, {
        en: 'multiLineStringProperty',
        ti: '.MultiLineStringPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'pointProperty',
        ti: '.PointPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'polygonProperty',
        ti: '.PolygonPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'multiExtentOf',
        ti: '.MultiPolygonPropertyType',
        sh: 'multiPolygonProperty'
      }, {
        en: '_Geometry',
        ti: '.AbstractGeometryType'
      }, {
        en: 'geometryProperty',
        ti: '.GeometryAssociationType'
      }, {
        en: 'Point',
        ti: '.PointType',
        sh: '_Geometry'
      }, {
        en: 'centerLineOf',
        ti: '.LineStringPropertyType',
        sh: 'lineStringProperty'
      }, {
        en: 'multiCenterLineOf',
        ti: '.MultiLineStringPropertyType',
        sh: 'multiLineStringProperty'
      }, {
        en: 'polygonMember',
        ti: '.PolygonMemberType',
        sh: 'geometryMember'
      }, {
        en: '_geometryProperty',
        ti: '.GeometryAssociationType'
      }, {
        en: 'multiPolygonProperty',
        ti: '.MultiPolygonPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'multiPointProperty',
        ti: '.MultiPointPropertyType',
        sh: '_geometryProperty'
      }, {
        en: '_GeometryCollection',
        ti: '.GeometryCollectionType',
        sh: '_Geometry'
      }, {
        en: 'lineStringProperty',
        ti: '.LineStringPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'LinearRing',
        ti: '.LinearRingType',
        sh: '_Geometry'
      }, {
        en: 'extentOf',
        ti: '.PolygonPropertyType',
        sh: 'polygonProperty'
      }, {
        en: 'MultiPolygon',
        ti: '.MultiPolygonType',
        sh: '_Geometry'
      }, {
        en: 'lineStringMember',
        ti: '.LineStringMemberType',
        sh: 'geometryMember'
      }, {
        en: 'Polygon',
        ti: '.PolygonType',
        sh: '_Geometry'
      }, {
        en: 'multiPosition',
        ti: '.MultiPointPropertyType',
        sh: 'multiPointProperty'
      }, {
        en: 'pointMember',
        ti: '.PointMemberType',
        sh: 'geometryMember'
      }, {
        en: 'edgeOf',
        ti: '.LineStringPropertyType',
        sh: 'lineStringProperty'
      }, {
        en: 'multiCoverage',
        ti: '.MultiPolygonPropertyType',
        sh: 'multiPolygonProperty'
      }, {
        en: 'name'
      }, {
        en: 'multiLocation',
        ti: '.MultiPointPropertyType',
        sh: 'multiPointProperty'
      }, {
        en: 'MultiGeometry',
        ti: '.GeometryCollectionType',
        sh: '_Geometry'
      }, {
        en: 'multiEdgeOf',
        ti: '.MultiLineStringPropertyType',
        sh: 'multiLineStringProperty'
      }, {
        en: 'location',
        ti: '.PointPropertyType',
        sh: 'pointProperty'
      }]
  };
  return {
    GML_2_1_2: GML_2_1_2
  };
};
if (typeof define === 'function' && define.amd) {
  define([], GML_2_1_2_Module_Factory);
}
else {
  var GML_2_1_2_Module = GML_2_1_2_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.GML_2_1_2 = GML_2_1_2_Module.GML_2_1_2;
  }
  else {
    var GML_2_1_2 = GML_2_1_2_Module.GML_2_1_2;
  }
}