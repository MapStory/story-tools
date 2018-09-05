(function() {
  "use strict";

  var module = angular.module(
    "storytools.edit.style.layerClassificationService",
    ["ui.bootstrap"]
  );

  module.factory("stLayerClassificationService", function(
    $uibModal,
    $sce
  ) {
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = (cookies[i]).trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    return {
      classify: function(layer, attribute, method, numClasses) {
        if (!this.cache) {
          this.cache = {};
        }
        if (attribute === null || method === null) {
          return Promise.reject("Not enough info to perform WPS request.");
        }
        var key =
          layer.get("id") + "|" + attribute + "|" + method + "|" + numClasses;
        if (this.cache[key]) {
          return Promise.resolve(this.cache[key]);
        }
        var xml,
          service = this;
        var wps = new storytools.edit.WPSClassify.WPSClassify();
        var url = layer.get("path") + "wps";
        if (method === "unique") {
          xml = wps.getUniqueValues(
            {
              featureNS: layer.get("featureNS"),
              typeName: layer.get("typeName"),
              featurePrefix: layer.get("featurePrefix"),
              attribute: attribute
            },
            true
          );
          return fetch(url, {
            method: "POST",
            body: xml,
            credentials: 'same-origin',
            headers: {
              "Content-Type": "application/xml",
              "X-CSRFToken": csrftoken,
              "Accept": "application/json"
            }
          }).then(rawResult => {
            return rawResult.json().then(result => {
              const results = [];
              if (result && result.features) {
                for (let i = 0, ii = Math.min(result.features.length, numClasses); i < ii; ++i) {
                  const feature = result.features[i];
                  results.push({
                    name: feature.properties.value,
                    title: feature.properties.value,
                    value: feature.properties.value
                  });
                }
              }
              service.cache[key] = results;
              return results;
            });
          }, err => {
            console.error(err);
          });
        } else {
          var wpsMethod;
          if (method === "Natural Breaks") {
            wpsMethod = "NATURAL_BREAKS";
          } else if (method === "Equal Interval") {
            wpsMethod = "EQUAL_INTERVAL";
          } else if (method === "Quantile") {
            wpsMethod = "QUANTILE";
          }
          // this should not happen since we only have methods in the UI that we support
          if (wpsMethod !== undefined) {
            xml = wps.classifyVector(
              {
                featureNS: layer.get("featureNS"),
                typeName: layer.get("typeName"),
                featurePrefix: layer.get("featurePrefix"),
                attribute: attribute,
                numClasses: numClasses,
                method: wpsMethod
              },
              true
            );

            return fetch(url, {
              method: "POST",
              body: xml,
              credentials: 'same-origin',
              headers: {
                "Content-Type": "application/xml",
                "X-CSRFToken": csrftoken,
              }
            }).then(rawResult => {
              return rawResult.text().then(result => {
                const response = wps.parseResult(result);
                if (response.success === true) {
                  service.cache[key] = response.rules;
                  return response.rules;
                } else {
                  $uibModal.open({
                    templateUrl: "/lib/templates/core/error-dialog.html",
                    controller: function($scope) {
                      $scope.title = "Error";
                      $scope.msg = $sce.trustAsHtml(
                        "An error occurred when communicating with the classification " +
                        "service: <br/>" +
                        response.msg
                      );
                    }
                  });
                  console.warn(response.msg);
                  return [];
                }
              })
            }, err => {
              console.error(err);
            });
          }
        }
      }
    };
  });
})();
