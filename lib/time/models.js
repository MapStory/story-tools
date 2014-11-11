var utils = require('./utils');
var BoxModel = require('./boxes').BoxModel;

/**
 * @todo
 */
exports.TimeModel = function(options, boxes, annotations) {
    
    var boxModel = new BoxModel(boxes),
        annotations;

    this.annotations = annotations;
    this.fixed = false;
    this.mode = 'range';

    function init(opts) {
        if (opts.hasOwnProperty('fixed')) {
            this.fixed = opts.fixed;
        }
        if (opts.hasOwnProperty('mode')) {
            this.mode = opts.mode;
        }
    }

    init(options);
    this.getRange = function() {
        return boxModel.getRange();
    };
    this.getTotalRange = function() {
        // @todo need to access layers and cached dimension data
        //       and consider annotations?
        throw Error('not implemented');
    };
    this.update = init;
    this.getSteps = function() {
        return boxModel.getSteps();
    };
    this.getIndex = function(instant) {
        return boxModel.getIndex(instant);
    };
    this.getRangeAt = function(i, j) {
        return boxModel.getRangeAt(i, j);
    };
};
