var url = require('url');
var proxy = require('proxy-middleware');
var connect = require('gulp-connect');

exports.run = function() {
    connect.server({
        root: ['.', 'examples'],
        port: 8001,
        livereload: true,
        middleware: function(connect, o) {
            var fixedProxy = (function() {
                var options = url.parse('http://mapstory.org/geoserver');
                options.route = '/geoserver';
                return proxy(options);
            })();
            var fixedProxyMaps = (function() {
                var options = url.parse('http://mapstory.org/maps');
                options.route = '/maps';
                return proxy(options);
            })();
            var dynamicProxy = function(req, res, next) {
                var parts = url.parse(req.url);
                if (parts.pathname === '/proxy') {
                    var target = parts.search.replace('?url=', '');
                    var options = url.parse(target);
                    req.url = options.path;
                    return proxy(options)(req, res, next);
                }
                return next();
            };
            return [fixedProxy, fixedProxyMaps, dynamicProxy];
        }
    });
};