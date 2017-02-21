(function() {
  var module = angular.module('loom_media_service', []);
  var service_ = null;
  var mediaHandlers_ = null;
  var q_ = null;
  var noembedProviders_ = null;

  module.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      new RegExp(/https?:\/\/.*\.flickr\.com\/photos\/.*/),
      new RegExp(/https?:\/\/flic\.kr\/p\/.*/),
      new RegExp(/https?:\/\/instagram\.com\/p\/.*/),
      new RegExp(/https?:\/\/instagr\.am\/p\/.*/),
      new RegExp(/https?:\/\/vine\.co\/v\/.*/),
      new RegExp(/https?:\/\/(?:www\.)?vimeo\.com\/.+/),
      new RegExp(/https?:\/\/((?:www\.)|(?:pic\.)?)twitter\.com\/.*/),
      new RegExp(/https?:\/\/(?:w{3}\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com).+/im),
      new RegExp(/https?:\/\/(w{3}\.)?soundcloud\.com\/.+/im),
      new RegExp(/https?:\/\/(?:((?:m)\.)|((?:www)\.)|((?:i)\.))?imgur\.com\/?.+/im)
    ]);

  });

  module.provider('mediaService', function() {

    this.$get = function($rootScope, $http, $q) {
      http_ = $http;
      q_ = $q;
      service_ = this;

      http_.jsonp('https://noembed.com/providers?callback=JSON_CALLBACK', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(result) {
        noembedProviders_ = result;
      });

      mediaHandlers_ = service_.configureDefaultHandlers();

      return service_;
    };

    this.isNOEmbedProvided = function(url) {
      for (var iProvider = 0; iProvider < noembedProviders_.length; iProvider += 1) {
        var provider = noembedProviders_[iProvider];
        for (var iUrlScheme = 0; iUrlScheme < provider.patterns.length; iUrlScheme += 1) {
          var regExp = new RegExp(provider.patterns[iUrlScheme], 'i');
          if (url.match(regExp) !== null) {
            return true;
          }
        }
      }
      return false;
    };

    this.configureDefaultHandlers = function() {

      var defaultHandlers = [
        //{name: 'youtube', regex: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])/i, callback: embed_youtube},
        {name: 'imgur', regex: /(https?:\/\/(\w+\.)?imgur\.com)/i, callback: embed_imgur}
      ];

      return defaultHandlers;
    };

    this.isUrl = function(str) {
      if (!/^(f|ht)tps?:\/\//i.test(str)) {
        return false;
      }
      return true;
    };

    this.getEmbedContent = function(url, embed_params) {

      var unsafeReturn = '<a href="' + url + '"> Unable to Embed Content </a>';

      //Check to see if we have a specialized handler first for this site
      for (var iHandler = 0; iHandler < mediaHandlers_.length; iHandler += 1) {
        var testHandler = mediaHandlers_[iHandler];
        if (testHandler.regex.test(url)) {
          return testHandler.callback(url, embed_params);
        }
      }

      //Check and see if the embed content is handled through the noembed service
      if (service_.isNOEmbedProvided(url) !== null) {
        return noembed_handler(url, embed_params);
      }

      //Unable to embed allowed content. Return a link to content.
      return unsafeReturn;
    };

    //Handler callbacks
    function getNOEmbedRequestUrl(url, params) {
      var api_url = 'https://noembed.com/embed?url=' + url + '&callback=JSON_CALLBACK',
          qs = '',
          i;

      for (i in params) {
        if (params[i] !== null) {
          qs += '&' + encodeURIComponent(i) + '=' + params[i];
        }
      }

      api_url += qs;

      return api_url;
    }

    function noembed_handler(url, embed_params) {

      var response = q_.defer();

      var request_url = getNOEmbedRequestUrl(url, embed_params);

      http_.jsonp(request_url, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(result) {
        response.resolve(result.html);
      });

      return response.promise;

    }

    function embed_imgur(url, embed_params) {

      var response = q_.defer();

      var regex = /(https?:\/\/(\w+\.)?imgur\.com)/ig;

      var matches = url.match(regex);

      var embed = '';
      if (matches.length > 1) {
        //dealing with a basic image link from something like i.imgur.blah.png
        embed = '<iframe src="' + url + '" width="' + embed_params.maxwidth + '" height="' + embed_params.maxheight + '"></iframe>';
      } else {
        //dealing with link to post or album
        var id_regex = /https?:\/\/imgur\.com\/(?:\w+)\/?(.*?)(?:[#\/].*|$)/i;
        embed = url.replace(id_regex,
            '<blockquote class="imgur-embed-pub" lang="en" data-id="a/$1"></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>');
      }

      response.resolve(embed);
      return response.promise;

    }

  });

})();

(function() {
    'use strict';

    var module = angular.module('storytools.core.pins', [
    ]);

    var pins = storytools.core.maps.pins;
    var stutils = storytools.core.time.utils;
    var rootScope_ = null;

    function StoryPinLayerManager($rootScope) {
        this.storyPins = [];
        this.map = null;
        rootScope_ = $rootScope;
    }
    StoryPinLayerManager.prototype.autoDisplayPins = function (range) {
        var pinsToCheck = this.storyPins.filter(function (pin) {
            return pin.get('auto_show');
        });

        for (var iPin = 0; iPin < pinsToCheck.length; iPin += 1) {
            var pin = pinsToCheck[iPin];
            var pinRange = stutils.createRange(pin.start_time, pin.end_time);
            if (pinRange.intersects(range)) {
                rootScope_.$broadcast('showPin', pin);
            } else {
                rootScope_.$broadcast('hidePinOverlay', pin);
            }
        }
    };
    StoryPinLayerManager.prototype.pinsChanged = function(pins, action) {
        var i;
        if (action == 'delete') {
            for (i = 0; i < pins.length; i++) {
                var pin = pins[i];
                for (var j = 0, jj = this.storyPins.length; j < jj; j++) {
                    if (this.storyPins[j].id == pin.id) {
                        this.storyPins.splice(j, 1);
                        break;
                    }
                }
            }
        } else if (action == 'add') {
            for (i = 0; i < pins.length; i++) {
                this.storyPins.push(pins[i]);
            }
        } else if (action == 'change') {
            // provided edits could be used to optimize below
        } else {
            throw new Error('action? :' + action);
        }
        // @todo optimize by looking at changes
        var times = this.storyPins.map(function(p) {
            if (p.start_time > p.end_time) {
                return storytools.core.utils.createRange(p.end_time, p.start_time);
            } else {
                return storytools.core.utils.createRange(p.start_time, p.end_time);
            }
        });
        this.map.storyPinsLayer.set('times', times);
        this.map.storyPinsLayer.set('features', this.storyPins);
    };
    StoryPinLayerManager.prototype.loadFromGeoJSON = function(geojson, projection, overwrite) {

        if (overwrite){
            this.storyPins = [];
        }

        if (geojson && geojson.features) {
            var loaded = pins.loadFromGeoJSON(geojson, projection);
            this.pinsChanged(loaded, 'add', true);
        }
    };

    module.service('StoryPinLayerManager', StoryPinLayerManager);

    module.constant('StoryPin', pins.StoryPin);

    // @todo naive implementation on local storage for now
    module.service('stAnnotationsStore', function(StoryPinLayerManager) {
        function path(mapid) {
            return '/maps/' + mapid + '/annotations';
        }
        function get(mapid) {
            var saved = localStorage.getItem(path(mapid));
            saved = (saved === null) ? [] : JSON.parse(saved);
            // TODO is this still needed?
            /*saved.forEach(function(s) {
                s.the_geom = format.readGeometry(s.the_geom);
            });*/
            return saved;
        }
        function set(mapid, annotations) {
            // TODO is this still needed?
            /*annotations.forEach(function(s) {
                if (s.the_geom && !angular.isString(s.the_geom)) {
                    s.the_geom = format.writeGeometry(s.the_geom);
                }
            });*/
            localStorage.setItem(path(mapid),
                new ol.format.GeoJSON().writeFeatures(annotations,
                    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'})
            );
        }
        return {
            loadAnnotations: function(mapid, projection) {
                return StoryPinLayerManager.loadFromGeoJSON(get(mapid), projection);
            },
            deleteAnnotations: function(annotations) {
                var saved = get();
                var toDelete = annotations.map(function(d) {
                    return d.id;
                });
                saved = saved.filter(function(s) {
                    return toDelete.indexOf(s.id) < 0;
                });
                set(saved);
            },
            saveAnnotations: function(mapid, annotations) {
                var saved = get();
                var maxId = 0;
                saved.forEach(function(s) {
                    maxId = Math.max(maxId, s.id);
                });
                var clones = [];
                annotations.forEach(function(a) {
                    if (typeof a.id == 'undefined') {
                        a.id = ++maxId;
                    }
                    var clone = a.clone();
                    if (a.get('start_time') !== undefined) {
                        clone.set('start_time', a.get('start_time')/1000);
                    }
                    if (a.get('end_time') !== undefined) {
                        clone.set('end_time', a.get('end_time')/1000);
                    }
                    clones.push(clone);
                });
                set(mapid, clones);
            }
        };
    });

})();
