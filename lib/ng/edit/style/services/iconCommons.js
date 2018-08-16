(function() {
  "use strict";

  var module = angular.module("storytools.edit.style.iconCommons", [
    "ui.bootstrap"
  ]);

  module.factory("iconCommons", function($q, stSvgIcon, stRecentChoices) {
    return {
      defaults: function() {
        return $q.all(
          stRecentChoices.icons.recent.map(function(uri) {
            return stSvgIcon.getImage(uri);
          })
        );
      }
    };
  });

  module.factory("iconCommonsSearch", function($http, $uibModal, $injector) {
    var iconCommonsHost = $injector.has("iconCommonsHost") ? $injector.get("iconCommonsHost") : "";
    function fixHrefs(stuff) {
      var toFix = stuff.icons || stuff;
      for (var i = 0, ii = toFix.length; i < ii; i++) {
        toFix[i].href = iconCommonsHost + toFix[i].href;
      }
      return stuff;
    }
    return {
      tagEndpoint: iconCommonsHost + "/icons/icon",
      search: () => {
        this.modal = $uibModal.open({
          size: "lg",
          controller: "iconCommonsController",
          templateUrl: "style/widgets/icon-commons-search.html"
        });
        return this.modal ? this.modal.result : null;
      },
      getCollections: function() {
        return $http
          .get(iconCommonsHost + "/icons/collections")
          .then(function(data) {
            return fixHrefs(data);
          });
      },
      getMore: function(collection) {
        var href = collection.href;
        if (href.indexOf(iconCommonsHost) !== 0) {
          href = iconCommonsHost + href;
        }
        return $http
          .get(href, {
            params: {
              page: collection._nextPage
            }
          })
          .then(function(data) {
            return fixHrefs(data);
          });
      },
      getCollectionIcons: function(collection) {
        var params = {};
        if (collection._nextPage) {
          params.page = collection._nextPage;
        }
        return $http
          .get(iconCommonsHost + collection.href, {
            params: params
          })
          .then(function(data) {
            return fixHrefs(data);
          });
      },
      getByTag: function(tag) {
        return $http
          .get(this.tagEndpoint, {
            params: {
              tag: tag
            }
          })
          .then(function(data) {
            return fixHrefs(data);
          });
      },
      getAll: function() {
        return $http
          .get(this.tagEndpoint)
          .then(function(data) {
            return fixHrefs(data);
          });

      },
      getTags: function(q) {
        return $http
          .get(iconCommonsHost + "/icons/search/tags", {
            params: {
              query: q
            }
          })
          .then(function(response) {
            return response.data.tags;
          });
      }
    };
  });

  module.controller("iconCommonsController", function(
    $scope,
    $uibModalInstance,
    iconCommonsSearch,
    stRecentChoices
  ) {
    var tagCollection = {
        href: iconCommonsSearch.tagEndpoint
      },
      collection = {};
    function handleCollections(collection, response) {
      var icons = response.data.icons;
      if (collection._icons) {
        collection._icons = collection._icons.concat(icons);
      } else {
        collection._icons = icons;
      }
      collection._more = response.data.page < response.data.pages;
      collection._nextPage = response.data.page + 1;
      $scope.icons = collection;
    }
    $scope.loadMore = function() {
      iconCommonsSearch.getMore($scope.icons).then(function(data) {
        handleCollections($scope.icons, data);
      });
    };
    $scope.close = function() {
      stRecentChoices.icons.add($scope.selectedIcon.href);
      $uibModalInstance.close($scope.selectedIcon);
    };
    $scope.dismiss = function() {
      $uibModalInstance.dismiss();
    };
    $scope.tagSelect = function(tag) {
      tagCollection._icons = [];
      iconCommonsSearch.getByTag(tag).then(function(data) {
        handleCollections(tagCollection, data);
      });
    };
    $scope.viewCollections = function() {
      $scope.icons = collection;
    };
    $scope.viewTags = function() {
      $scope.icons = tagCollection;
    };
    $scope.collectionSelect = function(collection) {
      collection._icons = [];
      iconCommonsSearch.getCollectionIcons(collection).then(function(data) {
        handleCollections(collection, data);
      });
    };
    $scope.iconSelected = function(icon, done) {
      $scope.selectedIcon = icon;
      if (done) {
        $scope.close();
      }
    };
    $scope.selectedClass = function(icon) {
      return icon === $scope.selectedIcon ? "active" : null;
    };
    $scope.getTags = iconCommonsSearch.getTags;
    iconCommonsSearch.getCollections().then(function(response) {
      $scope.collections = response.data.collections;
    });
    $scope.$watch('_typeAhead', function(newVal) {
      if (newVal === '') {
        tagCollection._icons = [];
        iconCommonsSearch.getAll().then(function(data) {
          handleCollections(tagCollection, data);
        });
      } else {
        $scope.tagSelect(newVal);
      }
    });
  });
})();
