(function() {
  "use strict";

  var module = angular.module("storytools.edit.style.iconCommons", [
    "ui.bootstrap"
  ]);

  module.factory("iconCommons", function(stSvgIcon, stRecentChoices) {
    return {
      defaults: function() {
        return Promise.all(
          stRecentChoices.icons.recent.map(function(uri) {
            return stSvgIcon.getImage(uri);
          })
        );
      }
    };
  });

  module.factory("iconCommonsSearch", function($uibModal, $injector) {
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
        return fetch(iconCommonsHost + "/icons/collections")
          .then(rawResponse => {
            return rawResponse.json().then(data => {
              return fixHrefs(data);
            });
          });
      },
      getMore: function(collection) {
        var href = collection.href;
        if (href.indexOf(iconCommonsHost) !== 0) {
          href = iconCommonsHost + href;
        }
        return fetch(href, {
            body: JSON.stringify({
              page: collection._nextPage
            })
          })
          .then(rawData => {
            return rawData.json().then(data => {
              return fixHrefs(data);
            });
          });
      },
      getCollectionIcons: function(collection) {
        var params = {};
        if (collection._nextPage) {
          params.page = collection._nextPage;
        }
        return fetch(iconCommonsHost + collection.href, {
            body: JSON.stringify(params)
          })
          .then(rawData => {
            console.log('--------------------------', rawData);
            return rawData.json().then(data => {
              return fixHrefs(data);
            });
          });
      },
      getByTag: function(tag) {
        let tagQuery = '';
        if (tag) {
          tagQuery = `?tag=${tag}`;
        }
        return fetch(`${this.tagEndpoint}${tagQuery}`)
          .then(rawData => {
            console.log("-*-*--*-*-*-*-*-*-*-*-*-", rawData);
            return rawData.json().then(data => {
              return fixHrefs(data);
            });
          });
      },
      getAll: function() {
        return fetch(this.tagEndpoint)
          .then(rawData => {
            return rawData.json().then(data => {
              return fixHrefs(data);
            });
          });

      },
      getTags: function(q) {
        return fetch(iconCommonsHost + "/icons/search/tags", {
            body: JSON.stringify({
              query: q
            })
          })
          .then(rawResponse => {
            return rawResponse.json().then(response => {
              return response.tags;
            });
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
      var icons = response.icons;
      if (collection._icons) {
        collection._icons = collection._icons.concat(icons);
      } else {
        collection._icons = icons;
      }
      collection._more = response.page < response.pages;
      collection._nextPage = response.page + 1;
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
      $scope.collections = response.collections;
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
