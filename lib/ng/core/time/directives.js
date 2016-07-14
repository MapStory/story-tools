(function () {
  'use strict';

  /**
   * @namespace storytools.core.time.directives
   */
  var module = angular.module('storytools.core.time.directives', []);

  /**
   * @ngdoc directive
   * @name stPlaybackControls
   * @memberOf storytools.core.time.directives
   * @description
   * Directive that presents playback controls to manipulate the provided
   * TimeController instance.
   *
   * @param {TimeController} time-controls attribute
   */
  module.directive('stPlaybackControls', function () {
    return {
      restrict: 'E',
      templateUrl: 'time/playback-controls.html',
      scope: {
        timeControls: '='
      },
      link: function (scope, elem) {
        scope.playbackState = "Play";
        scope.loopText = "Enable Loop";
        scope.loop = false;
        scope.showTimeLine = false;
        scope.next = function () {
          scope.timeControls.next();
        };
        scope.prev = function () {
          scope.timeControls.prev();
        };
        scope.$watch('timeControls', function (neu, old) {
          if (neu !== old) {
            neu.on('stateChange', function () {
              var started = scope.timeControls.isStarted();
              scope.started = started;
              scope.playbackState = started ? "Pause" : "Play";
              scope.$apply();
            });
            neu.on('rangeChange', function (range) {
              scope.currentRange = range;
              scope.$apply();
            });
          }
        });
        scope.play = function () {
          var tc = scope.timeControls;
          var started = tc.isStarted();
          if (started) {
            tc.stop();
          } else {
            tc.start();
          }
        };

        /**
         * Check if window is in full screen mode.
         * @return {Boolean} full screen mode
         */
        scope.isInFullScreen = function (doc) {


          if (doc.fullScreenElement !== undefined) {
            return !!doc.fullScreenElement;
          }


          if (doc.mozFullScreen !== undefined) {
            return !!doc.mozFullScreen;
          }


          if (doc.webkitIsFullScreen !== undefined) {
            return !!doc.webkitIsFullScreen;
          }


          if (window.fullScreen !== undefined) {
            return !!window.fullScreen;
          }


          if (window.navigator.standalone !== undefined) {
            return !!window.navigator.standalone;
          }
        };

        scope.toggleFullScreen = function () {
          var elem = window.parent.document.getElementById('embedded_map');

          if (!this.isInFullScreen(document) && !this.isInFullScreen(parent.document)) {
            if (!document.webkitFullScreen || !document.mozFullScreen || !document.msFullscreenElement || !document.fullscreenElement) {
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
              } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
              } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            }
          } else {
            if (document.mozCancelFullScreen) {
              parent.document.mozCancelFullScreen();
              document.mozCancelFullScreen();
            } else {
              parent.document.webkitCancelFullScreen();
              document.webkitCancelFullScreen();
            }
          }
        };

        scope.toggleLoop = function () {
          var tc = scope.timeControls;
          scope.loop = tc.loop = !tc.loop;
          scope.loopText = tc.loop ? 'Disable Loop' : 'Enable Loop';
        };

        scope.toggleTimeLine = function () {
          var tc = scope.timeControls;
          scope.showTimeLine = tc.showTimeLine = !tc.showTimeLine;
          var element = $('#timeline');

          if (tc.showTimeLine) {
            element.show("slow");

          } else {
            element.hide("slow");
          }
        };
      }
    };
  });

  /**
   * @ngdoc directive
   * @name stPlaybackSettings
   * @memberOf storytools.core.time.directives
   * @description
   * Directive that presents playback settings that manipulate the provided
   * TimeController instance.
   *
   * @param {TimeController} time-controls attribute
   * @param {object} playbackOptions (will go away)
   */
  module.directive('stPlaybackSettings', function () {
    return {
      restrict: 'E',
      templateUrl: 'time/playback-settings.html',
      scope: {
        timeControls: '=',
        // @todo remove once timeControls properly exposes access to this
        playbackOptions: '='
      },
      link: function (scope, elem) {
        scope.optionsChanged = function () {
          if (scope.timeControls) {
            scope.timeControls.update(scope.playbackOptions);
          }
        };
      }
    };
  });
})();