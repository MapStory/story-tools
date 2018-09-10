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
    const iconCommonsHost = $injector.has("iconCommonsHost") ? $injector.get("iconCommonsHost") : "";
    const tagEndpoint = iconCommonsHost + "/icons/icon";
    function fixHrefs(stuff) {
      const toFix = stuff.icons || stuff;
      for (var i = 0, ii = toFix.length; i < ii; i++) {
        toFix[i].href = iconCommonsHost + toFix[i].href;
      }
      return stuff;
    }
    return {
      tagEndpoint: tagEndpoint,
      search: () => {
        this.modal = $uibModal.open({
          size: "lg",
          controller: "iconCommonsController",
          templateUrl: "style/widgets/icon-commons-search.html"
        });
        return this.modal ? this.modal.result : null;
      },
      getCollections: () => (
        fetch(iconCommonsHost + "/icons/collections").
          then(rawResponse => (rawResponse.json())).
          then(data => (fixHrefs(data)))
      ),
      getMore: collection => {
        let href = collection.href;
        if (href.indexOf(iconCommonsHost) !== 0) {
          href = iconCommonsHost + href;
        }
        return fetch(href, {
            body: JSON.stringify({
              page: collection._nextPage
            })
          }).then(rawData => (rawData.json())).then(data => (fixHrefs(data)));
      },
      getCollectionIcons: collection => {
        const params = {};
        if (collection._nextPage) {
          params.page = collection._nextPage;
        }
        return fetch(iconCommonsHost + collection.href, {
            body: JSON.stringify(params)
          }).then(rawData => (rawData.json())).then(data => (fixHrefs(data)));
      },
      getByTag: tag => {
        let tagQuery = '';
        if (tag) {
          tagQuery = `?tag=${tag}`;
        }
        return fetch(`${tagEndpoint}${tagQuery}`).then(rawData => (rawData.json())).then(data => (fixHrefs(data)));
      },
      getAll: () => (
        fetch(tagEndpoint).then(rawData => (rawData.json())).then(data => (fixHrefs(data)))
      ),
      getTags: query => (
        fetch(iconCommonsHost + "/icons/search/tags", {
            body: JSON.stringify({
              query: query
            })
          }).then(rawResponse => (rawResponse.json())).then(response => (response.tags))
      )
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
      iconCommonsSearch.getMore($scope.icons).then(data => {
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
      iconCommonsSearch.getByTag(tag).then(data => {
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
      iconCommonsSearch.getCollectionIcons(collection).then(data => {
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
    iconCommonsSearch.getCollections().then(response => {
      $scope.collections = response.collections;
    });
    $scope.$watch('_typeAhead', function(newVal) {
      if (newVal === '' || newVal === undefined) {
        tagCollection._icons = [];
        iconCommonsSearch.getAll().then(function(data) {
          handleCollections(tagCollection, data);
          $scope.$apply();
        });
      } else {
        $scope.tagSelect(newVal);
      }
    });
  });
})();
