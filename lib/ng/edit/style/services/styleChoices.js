(function() {
    'use strict';

    var module = angular.module('storytools.edit.style.styleChoices', []);

    module.factory('stStyleChoices', function() {
        return {
            symbolizers: [
                'circle', 'square', 'triangle', 'star', 'cross', 'x'
            ],
            rotationUnits: [
                'degrees', 'radians'
            ],
            strokeStyle: [
                'solid', 'dashed', 'dotted'
            ],
            fontFamily: [
                'serif', 'sans-serif', 'cursive', 'monospace'
            ],
            colorRamps: [
                {
                    0: '#fff7ec',
                    1: '#7f0000'
                },
                {
                    0: '#fff7fb',
                    1: '#023858'
                },
                {
                    0: '#ffffe5',
                    1: '#004529'
                },
                {
                    0: '#ffffff',
                    1: '#000000'
                },
                {
                    0: '#ffffe5',
                    1: '#662506'
                },
                {
                    0: '#fff7f3',
                    1: '#49006a'
                },
                {
                    0: '#f7fb77',
                    1: '#08306b'
                }
            ],
            // @todo build these statically ahead of time using color-scheme-js
            colorPalettes: [
                {
                    name: 'Basic',
                    vals: ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6']
                },
                {
                    name: 'Light',
                    vals: ['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6','#ffffcc','#e5d8bd','#fddaec','#f2f2f2']
                },
                {
                    name: 'Dark',
                    vals: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999']
                },
                {
                    name: 'Pastel',
                    vals: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9']
                }
            ],
            classMethods: [
                'Natural Breaks',
                'Equal Interval',
                'Quantile'/*,
                 'Geometric Interval',
                 'Standard Deviation'*/
            ],
            getPalette: function(name) {
                var found = this.colorPalettes.filter(function(p) {
                    return p.name === name;
                });
                return found.length ? found[0] : null;
            }
        };
    });

    module.factory('stRecentChoices', function() {
        return {
            icons: new RecentChoices('icons', 24)
        };
    });

    function RecentChoices(name, max) {
        this._max = max;
        this._key = 'stRecentChoices-' + name;
        var saved = localStorage.getItem(this._key);
        this.recent = saved ? JSON.parse(saved) : [];
    }

    RecentChoices.prototype.clear = function() {
        this.recent = [];
        localStorage.setItem(this._key, JSON.stringify(this.recent));
    };

    RecentChoices.prototype.add = function(choice) {
        if (this.recent.indexOf(choice) === -1) {
            this.recent.push(choice);
            if (this.recent.length > this._max) {
                this.recent.shift();
            }
            localStorage.setItem(this._key, JSON.stringify(this.recent));
        }
    };

})();
