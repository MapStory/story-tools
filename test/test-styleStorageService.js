require('../lib/edit/style/styleStorageService.js');

var styleStorageService = require('../lib/edit/style/styleStorageService.js').styleStorageService;
var stStorageService = styleStorageService();

describe('styleStorageService', function() {

  describe('saveStyle()', function() {

    beforeEach(function() {
       layer = new ol.layer.Vector({
         source: new ol.source.Vector(),
         metadata: {
           name: 'testLayer',
           style: 'testStyle'
         }
       });
    });

    it('should create a temporary store for the style if a chapter config does not exist', function() {
        window.config = {
          chapter_index: 0,
        }
        stStorageService.saveStyle(layer);
        expect(window.config.stylestore[0]['testLayer']).toBe(layer.get('metadata')['style']);
    });

    it('should overwrite a temporary store if one already exists', function() {
        window.config = {
          chapter_index: 0,
          stylestore: {
            0: {
              testLayer: 'oldstyle'
            }
          }
        };
        expect(window.config.stylestore[0]['testLayer']).toBe('oldstyle');
        stStorageService.saveStyle(layer);
        expect(window.config.stylestore[0]['testLayer']).toBe(layer.get('metadata')['style']);
    });
  });

  describe('getSavedStyle()', function() {

    beforeEach(function() {
       layer = new ol.layer.Vector({
         source: new ol.source.Vector(),
         metadata: {
           name: 'testLayer',
         }
       });
    });

    it('should return the saved style from the chapter config if it exists', function() {
        window.config = {
          chapter_index: 0,
          chapters: {
            0: {
              map: {
                layers: [
                  {
                    name: 'testLayer',
                    jsonstyle: 'styleTest'
                  }
                ]
              }
            }
          }
        };
        var style = stStorageService.getSavedStyle(layer);
        expect(style).toBe('styleTest');
    });

    it('should return the saved style from the temporary store if it exists', function() {
        window.config = {
          chapter_index: 0,
          stylestore: {
            0: {
              testLayer: 'styleTest'
            }
          }
        };
        var style = stStorageService.getSavedStyle(layer);
        expect(style).toBe('styleTest');
    });

    it('should return the saved style from the layer metadata if it exists', function() {
        layer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          metadata: {
            name: 'testLayer',
            jsonstyle: 'styleTest'
          }
        });

        window.config = {
          chapter_index: 0,
        };
        var style = stStorageService.getSavedStyle(layer);
        expect(style).toBe('styleTest');
    });
  });
});
