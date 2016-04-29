(function() {
    'use strict';

    var module = angular.module('storytools.core.boxes', [
    ]);

    var boxes = storytools.core.maps.boxes;

    function StoryBoxLayerManager() {
        this.storyBoxes = [];
        this.map = null;
    }
    StoryBoxLayerManager.prototype.boxesChanged = function(boxes, action) {
        var i;
        if (action == 'delete') {
            for (i = 0; i < boxes.length; i++) {
                var box = boxes[i];
                for (var j = 0, jj = this.storyBoxes.length; j < jj; j++) {
                    if (this.storyBoxes[j].id == box.id) {
                        this.storyBoxes.splice(j, 1);
                        break;
                    }
                }
            }
        } else if (action == 'add') {
            for (i = 0; i < boxes.length; i++) {
                this.storyBoxes.push(boxes[i]);
            }
        } else if (action == 'change') {
            // provided edits could be used to optimize below
        } else {
            throw new Error('action? :' + action);
        }
        // @todo optimize by looking at changes
        var times = this.storyBoxes.map(function(p) {
            return p.range;
        });
        this.map.storyBoxesLayer.set('times', times);
        this.map.storyBoxesLayer.set('features', this.storyBoxes);
    };
    StoryBoxLayerManager.prototype.loadFromGeoJSON = function(geojson, projection) {

        if (geojson && geojson.features) {
            var loaded = boxes.loadFromGeoJSON(geojson, projection);
            this.boxesChanged(loaded, 'add', true);
        }
    };

    module.service('StoryBoxLayerManager', StoryBoxLayerManager);

    module.constant('StoryBox', boxes.Box);

})();
