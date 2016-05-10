var utils = require('./utils');
var BoxModel = require('./boxes').BoxModel;

/**
 * @todo document me
 */
exports.TimeModel = function(options, boxes, annotations) {
    
    var events = new utils.Events(),
        boxModel = new BoxModel(boxes);

    this.annotations = annotations;
    this.boxes = boxes;
    this.boxy = options.boxy;
    this.storyLayers = [];
    this.fixed = false;
    this.mode = 'instant';
    this.interval = 1000;

    function init(opts) {
        if (opts.hasOwnProperty('fixed')) {
            this.fixed = opts.fixed;
        }

        if (opts.hasOwnProperty('speed') && opts.speed !== undefined) {
            this.interval = opts.speed;
        }

        if (opts.hasOwnProperty('mode') && opts.mode !== undefined) {
            this.mode = opts.mode;
        }
        if (opts.hasOwnProperty('annotations')) {
            this.annotations.update(opts.annotations);
        }
        if (opts.hasOwnProperty('boxes')) {
            this.boxy.update(opts.boxes);
        }

        if (opts.hasOwnProperty('storyLayers')) {
            this.storyLayers = opts.storyLayers;
        }

        // @todo is the best name for this
        if (opts.hasOwnProperty('data')) {
            boxModel.setRange(opts.data);
        }
    }

    init.call(this, options);
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
