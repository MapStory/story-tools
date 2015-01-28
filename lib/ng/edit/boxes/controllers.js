(function() {
    'use strict';

    var module = angular.module('storytools.edit.boxes.controllers', []);

    module.controller('boxEditorController',
        function($scope) {
            this.boxes = [ {
                title: 'Default'
            }];
            this.currentBox = {};
            this.editingBox = null;
            this.editBox = function(box) {
                this.editingBox = box;
            };
            this.newStoryBox = function() {
                this.editingBox = {};
            };
            this.deleteBox = function(box) {
                alert('implement me!');
            };
        });
})();
