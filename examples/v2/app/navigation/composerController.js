function composerController($scope, $log, $compile, $http, $injector, MapManager, TimeControlsManager,
                                                 styleUpdater, $location) {
    $scope.mapManager = MapManager;
    $scope.timeControlsManager = $injector.instantiate(TimeControlsManager);
    $scope.playbackOptions = {
        mode: 'instant',
        fixed: false
    };

    $scope.saveMap = function() {
        MapManager.saveMap();
    };

    $scope.newMap = function() {
        $location.path('/new');
    };
    $scope.styleChanged = function(layer) {
        layer.on('change:type', function(evt) {
            styleUpdater.updateStyle(evt.target);
        });
        styleUpdater.updateStyle(layer);
    };
    $scope.showLoadMapDialog = function() {
        var promise = loadMapDialog.show();
        promise.then(function(result) {
            if (result.mapstoryMapId) {
                $location.path('/maps/' + result.mapstoryMapId + "/data/");
            } else if (result.localMapId) {
                $location.path('/local/' + result.localMapId);
            }
        });
    };

    $scope.togglePreviewMode = function() {
      if ($scope.mode && $scope.mode.preview === true) {
        $scope.mapWidth = '100%'
      } else {
        $scope.mapWidth = '70%'
      }
      setTimeout(function() {
        window.storyMap.getMap().updateSize();
      });
    }

    // strip features from properties to avoid circular dependencies in debug
    $scope.layerProperties = function(lyr) {
        var props = lyr.getProperties();
        var features = delete props.features;
        props.featureCount = (features || []).length;
        return props;
    };


    var values = {annotations: [], boxes: [], data: []};

    $scope.nextChapter = function(){
        var nextChapter = Number(MapManager.storyChapter) + 1;
        if(nextChapter <= MapManager.chapterCount) {
            $log.info("Going to Chapter ", nextChapter);
            $scope.timeControlsManager.timeControls.update(values);
            $location.path('/chapter/' + nextChapter);
        }else{
            $location.path('');
        }
    };

    $scope.previousChapter = function(){
        var previousChapter = Number(MapManager.storyChapter) - 1;
        if(previousChapter > 0) {
            $log.info("Going to the Chapter ", previousChapter);
            $scope.timeControlsManager.timeControls.update(values);
            $location.path('/chapter/' + previousChapter);
        }else{
            $location.path('');
        }
    };
}

module.exports = composerController;
