(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.iconCommons', []);

    module.factory('iconCommons', function($q, stSvgIcon, stRecentChoices) {
        return {
            defaults: function() {
                return $q.all(stRecentChoices.icons.recent.map(function(uri) {
                    return stSvgIcon.getImage(uri);
                }));
            }
        };
    });

    module.factory('iconCommonsSearch', function($http, $modal, $injector, $location) {
        var iconCommonsHost = $injector.has('iconCommonsHost') ?
            $injector.get('iconCommonsHost') : $location.protocol() + '://' + $location.host();
        function fixHrefs(stuff) {
            var toFix = stuff.icons || stuff;
            for (var i = 0, ii = toFix.length; i < ii; i++) {
                toFix[i].href = iconCommonsHost + toFix[i].href;
            }
            return stuff;
        }
        return {
            tagEndpoint: iconCommonsHost + '/icons/icon',
            search: function() {
                this.modal = $modal.open({
                    size: 'lg',
                    controller: 'iconCommonsController',
                    templateUrl: 'style/widgets/icon-commons-search.html'
                });
                return this.modal ? this.modal.result : null;
            },
            getCollections: function() {
                return $http.get(iconCommonsHost + '/icons/collections').success(function(data) {
                    return fixHrefs(data);
                });
            },
            getMore: function(collection) {
                var href = collection.href;
                if (href.indexOf(iconCommonsHost) !== 0) {
                    href = iconCommonsHost + href;
                }
                return $http.get(href, {
                    params: {
                        page: collection._nextPage
                    }
                }).success(function(data) {
                    return fixHrefs(data);
                });
            },
            getCollectionIcons: function(collection) {
                var params = {};
                if (collection._nextPage) {
                    params.page = collection._nextPage;
                }
                return $http.get(iconCommonsHost + collection.href, {
                    params: params
                }).success(function(data) {
                    return fixHrefs(data);
                });
            },
            getByTag: function(tag) {
                return $http.get(this.tagEndpoint, {
                    params: {
                        tag: tag
                    }
                }).success(function(data) {
                    return fixHrefs(data);
                });
            },
            getTags: function(q) {
                return $http.get(iconCommonsHost + '/icons/search/tags', {
                    params: {
                        query: q
                    }
                }).then(function(response) {
                    return response.data.tags;
                });
            }
        };
    });

    module.controller('iconCommonsController', function($scope, iconCommonsSearch, stRecentChoices) {
        var tagCollection = {
            href: iconCommonsSearch.tagEndpoint
        }, collection = {
        };
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
            iconCommonsSearch.modal.close($scope.selectedIcon);
        };
        $scope.dismiss = function() {
            iconCommonsSearch.modal.dismiss();
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
            return icon === $scope.selectedIcon ? 'active' : null;
        };
        $scope.getTags = iconCommonsSearch.getTags;
        iconCommonsSearch.getCollections().then(function(response) {
            $scope.collections = response.data.collections;
        });
    });
})();