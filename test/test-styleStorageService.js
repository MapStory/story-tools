require('../lib/ng/edit/style/services/styleStorageService.js');

describe('styleStorageService', function() {

  beforeEach(function() {
      // window.angular.mock.module is work around browserify conflict
      window.angular.mock.module('storytools.edit.style.styleStorageService');

      inject(function(stStorageService) {
          this.stStorageService = stStorageService;
      });
  });

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

    it('should create a temporary store for the style if a chapter config does not exist', inject(function(stStorageService) {
        window.config = {
          chapter_index: 0,
        }
        stStorageService.saveStyle(layer);
        expect(window.config.stylestore[0]['testLayer']).toBe(layer.get('metadata')['style']);
    }));

    it('should overwrite a temporary store if one already exists', inject(function(stStorageService) {
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
    }));
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

    it('should return the saved style from the temporary store if it exists', inject(function(stStorageService) {
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
    }));

    it('should return the saved style from the layer metadata if it exists', inject(function(stStorageService) {
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
    }));
  });
});
