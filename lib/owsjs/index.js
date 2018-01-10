//'use strict';

var jsonix = require('jsonix');
var w3c = require('w3c-schemas');
var ogc = require('ogc-schemas');

exports.Jsonix = jsonix.Jsonix;
exports.mappings = {};
exports.mappings.XLink_1_0 = w3c.XLink_1_0;
exports.mappings.Filter_1_0_0 = ogc.Filter_1_0_0;
exports.mappings.GML_2_1_2 = ogc.GML_2_1_2;
exports.mappings.SLD_1_0_0 = ogc.SLD_1_0_0;
exports.mappings.OWS_1_1_0 = ogc.OWS_1_1_0;
exports.mappings.Filter_1_1_0 = ogc.Filter_1_1_0;
exports.mappings.OWS_1_0_0 = ogc.OWS_1_0_0;
exports.mappings.SMIL_2_0 = ogc.SMIL_2_0;
exports.mappings.SMIL_2_0_Language = ogc.SMIL_2_0_Language;
exports.mappings.GML_3_1_1 = ogc.GML_3_1_1;
exports.mappings.WFS_1_1_0 = ogc.WFS_1_1_0;
exports.mappings.WPS_1_0_0 = ogc.WPS_1_0_0;
exports.mappings.XSD_1_0 = w3c.XSD_1_0;
exports.mappings.WMSC_1_1_1 = ogc.WMSC_1_1_1;


// modify the JSONIX mapping to add the GeoServer specific VendorOption
exports.mappings.SLD_1_0_0.tis.push({
    ln: 'VendorOption',
    ps: [{
        n: 'name',
        an: {
            lp: 'name'
        },
            t: 'a'
        }, {
            n: 'content',
            t: 'v'
        }
    ]
});

for (var i=0, ii=exports.mappings.SLD_1_0_0.tis.length; i<ii; i++) {
    if (exports.mappings.SLD_1_0_0.tis[i].ln === 'TextSymbolizer') {
        exports.mappings.SLD_1_0_0.tis[i].ps.push({
            n: 'vendorOption',
            en: 'VendorOption',
            col: true,
            ti: '.VendorOption'
        });
    }
}
// end of modification
