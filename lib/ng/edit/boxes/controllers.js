(function() {
    'use strict';

    var module = angular.module('storytools.edit.boxes.controllers', []);

    module.controller('boxesEditorController', function() {
        var lastVersion = null;
        this.boxes = [{
                title: 'Default'
            }];
        this.currentBox = {};
        this.editingBox = null;
        this.editBox = function(box) {
            lastVersion = angular.copy(box);
            this.editingBox = box;
        };
        this.newStoryBox = function() {
            this.editingBox = {
                isNew : true
            };
            lastVersion = null;
        };
        this.deleteBox = function(box) {
            alert('implement me!');
        };
        this.acceptEdit = function() {
            if (this.editingBox.isNew) {
                this.boxes.push(this.editingBox);
            }
            lastVersion = null;
            this.editingBox = null;
        };
        this.cancelEdit = function() {
            if (lastVersion) {
                angular.copy(lastVersion, this.editingBox);
            }
            lastVersion = null;
            this.editingBox = null;
        };
    });

    module.controller('boxEditorController', function($scope) {

    });
})();
