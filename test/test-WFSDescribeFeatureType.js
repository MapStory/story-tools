var WFS_DFT = require('../lib/edit/style/WFSDescribeFeatureType.js').WFSDescribeFeatureType;
var instance = new WFS_DFT();

describe('WFSDescribeFeatureType', function() {
    it('should parse a WFS DescribeFeatureType response', function() {
        var xml = '<?xml version="1.0" encoding="UTF-8"?><xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:geonode="http://geonode.org/" xmlns:gml="http://www.opengis.net/gml" elementFormDefault="qualified" targetNamespace="http://geonode.org/">' +
'  <xsd:import namespace="http://www.opengis.net/gml" schemaLocation="http://mapstory.org:80/geoserver/schemas/gml/2.1.2/feature.xsd"/>' +
'  <xsd:complexType name="african_bees_2009Type">' +
'    <xsd:complexContent>' +
'      <xsd:extension base="gml:AbstractFeatureType">' +
'        <xsd:sequence>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="the_geom" nillable="true" type="gml:MultiPolygonPropertyType"/>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="AREA" nillable="true" type="xsd:double"/>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="PERIMETER" nillable="true" type="xsd:double"/>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="AFRBEEP020" nillable="true" type="xsd:long"/>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="STATE" nillable="true" type="xsd:string"/>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="COUNTY" nillable="true" type="xsd:string"/>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="FIPS" nillable="true" type="xsd:string"/>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="STATE_FIPS" nillable="true" type="xsd:string"/>' +
'          <xsd:element maxOccurs="1" minOccurs="0" name="FIRST_YR" nillable="true" type="xsd:dateTime"/>' +
'        </xsd:sequence>' +
'      </xsd:extension>' +
'    </xsd:complexContent>' +
'  </xsd:complexType>' +
'  <xsd:element name="african_bees_2009" substitutionGroup="gml:_Feature" type="geonode:african_bees_2009Type"/>' +
'</xsd:schema>';
        expect(JSON.stringify(instance.parseResult(xml))).toBe('{"timeAttribute":"FIRST_YR","featureNS":"http://geonode.org/","geomType":"polygon","attributes":[{"name":"the_geom","type":"MultiPolygonPropertyType","typeNS":"http://www.opengis.net/gml"},{"name":"AREA","type":"double","typeNS":"http://www.w3.org/2001/XMLSchema"},{"name":"PERIMETER","type":"double","typeNS":"http://www.w3.org/2001/XMLSchema"},{"name":"AFRBEEP020","type":"long","typeNS":"http://www.w3.org/2001/XMLSchema"},{"name":"STATE","type":"string","typeNS":"http://www.w3.org/2001/XMLSchema"},{"name":"COUNTY","type":"string","typeNS":"http://www.w3.org/2001/XMLSchema"},{"name":"FIPS","type":"string","typeNS":"http://www.w3.org/2001/XMLSchema"},{"name":"STATE_FIPS","type":"string","typeNS":"http://www.w3.org/2001/XMLSchema"},{"name":"FIRST_YR","type":"dateTime","typeNS":"http://www.w3.org/2001/XMLSchema"}]}');
    });
});
