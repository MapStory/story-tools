//'use strict';
exports.Jsonix = require('../../bower_components/jsonix/dist/Jsonix-all.js').Jsonix;
exports.mappings = {};
exports.mappings.XLink_1_0 = require('../../bower_components/w3c-schemas/scripts/lib/XLink_1_0.js').XLink_1_0;
exports.mappings.Filter_1_0_0 = require('../../bower_components/ogc-schemas/scripts/lib/Filter_1_0_0.js').Filter_1_0_0;
exports.mappings.GML_2_1_2 = require('../../bower_components/ogc-schemas/scripts/lib/GML_2_1_2.js').GML_2_1_2;
exports.mappings.SLD_1_0_0 = require('../../bower_components/ogc-schemas/scripts/lib/SLD_1_0_0.js').SLD_1_0_0;
exports.mappings.OWS_1_1_0 = require('../../bower_components/ogc-schemas/scripts/lib/OWS_1_1_0.js').OWS_1_1_0;
exports.mappings.Filter_1_1_0 = require('../../bower_components/ogc-schemas/scripts/lib/Filter_1_1_0.js').Filter_1_1_0;
exports.mappings.OWS_1_0_0 = require('../../bower_components/ogc-schemas/scripts/lib/OWS_1_0_0.js').OWS_1_0_0;
exports.mappings.SMIL_2_0 = require('../../bower_components/ogc-schemas/scripts/lib/SMIL_2_0.js').SMIL_2_0;
exports.mappings.SMIL_2_0_Language = require('../../bower_components/ogc-schemas/scripts/lib/SMIL_2_0_Language.js').SMIL_2_0_Language;
exports.mappings.GML_3_1_1 = require('../../bower_components/ogc-schemas/scripts/lib/GML_3_1_1.js').GML_3_1_1;
exports.mappings.WFS_1_1_0 = require('../../bower_components/ogc-schemas/scripts/lib/WFS_1_1_0.js').WFS_1_1_0;
exports.mappings.WPS_1_0_0 = require('../../bower_components/ogc-schemas/scripts/lib/WPS_1_0_0.js').WPS_1_0_0;
exports.mappings.XSD_1_0 = require('../../bower_components/w3c-schemas/scripts/lib/XSD_1_0.js').XSD_1_0;

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
