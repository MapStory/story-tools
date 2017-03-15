!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.owsjs=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//'use strict';
exports.Jsonix = require('../../bower_components/jsonix/dist/Jsonix-all.js').Jsonix;
exports.mappings = {};
exports.mappings.XLink_1_0 = require('../../bower_components/w3c-schemas/scripts/lib/XLink_1_0.js').XLink_1_0;
exports.mappings.Filter_1_0_0 = require('../../bower_components/ogc-schemas/scripts/lib/Filter_1_0_0.js').Filter_1_0_0;
exports.mappings.GML_2_1_2 = require('../../bower_components/ogc-schemas/scripts/lib/GML_2_1_2.js').GML_2_1_2;
exports.mappings.SLD_1_0_0 = require('../../bower_components/ogc-schemas/scripts/lib/SLD_1_0_0.js').SLD_1_0_0;
exports.mappings.OWS_1_1_0 = require('../../bower_components/ogc-schemas/scripts/lib/OWS_1_1_0.js').OWS_1_1_0;
exports.mappings.Filter_1_1_0 = require('../../bower_components/ogc-schemas/scripts/lib/Filter_1_1_0.js').Filter_1_1_0;
exports.mappings.OWS_1_0_0 = require('../../bower_components/ogc-schemas/scripts/lib/OWS_1_0_0.js').OWS_1_0_0;
exports.mappings.SMIL_2_0 = require('../../bower_components/ogc-schemas/scripts/lib/SMIL_2_0.js').SMIL_2_0;
exports.mappings.SMIL_2_0_Language = require('../../bower_components/ogc-schemas/scripts/lib/SMIL_2_0_Language.js').SMIL_2_0_Language;
exports.mappings.GML_3_1_1 = require('../../bower_components/ogc-schemas/scripts/lib/GML_3_1_1.js').GML_3_1_1;
exports.mappings.WFS_1_1_0 = require('../../bower_components/ogc-schemas/scripts/lib/WFS_1_1_0.js').WFS_1_1_0;
exports.mappings.WPS_1_0_0 = require('../../bower_components/ogc-schemas/scripts/lib/WPS_1_0_0.js').WPS_1_0_0;
exports.mappings.XSD_1_0 = require('../../bower_components/w3c-schemas/scripts/lib/XSD_1_0.js').XSD_1_0;
exports.mappings.WMSC_1_1_1 = require('../../bower_components/ogc-schemas/scripts/lib/WMSC_1_1_1.js').WMSC_1_1_1;
exports.mappings.WMS_1_3_0 = require('../../bower_components/ogc-schemas/scripts/lib/WMS_1_3_0.js').WMS_1_3_0;
exports.mappings.WMS_1_3_0_Exceptions = require('../../bower_components/ogc-schemas/scripts/lib/WMS_1_3_0_Exceptions.js').WMS_1_3_0_Exceptions;

// modify the JSONIX mapping to add the GeoServer specific VendorOption
exports.mappings.SLD_1_0_0.tis.push({
    ln: 'VendorOption',
    ps: [{
        n: 'name',
        an: {
            lp: 'name'
        },
            t: 'a'
        }, {
            n: 'content',
            t: 'v'
        }
    ]
});

for (var i=0, ii=exports.mappings.SLD_1_0_0.tis.length; i<ii; i++) {
    if (exports.mappings.SLD_1_0_0.tis[i].ln === 'TextSymbolizer') {
        exports.mappings.SLD_1_0_0.tis[i].ps.push({
            n: 'vendorOption',
            en: 'VendorOption',
            col: true,
            ti: '.VendorOption'
        });
    }
}
// end of modification

},{"../../bower_components/jsonix/dist/Jsonix-all.js":2,"../../bower_components/ogc-schemas/scripts/lib/Filter_1_0_0.js":3,"../../bower_components/ogc-schemas/scripts/lib/Filter_1_1_0.js":4,"../../bower_components/ogc-schemas/scripts/lib/GML_2_1_2.js":5,"../../bower_components/ogc-schemas/scripts/lib/GML_3_1_1.js":6,"../../bower_components/ogc-schemas/scripts/lib/OWS_1_0_0.js":7,"../../bower_components/ogc-schemas/scripts/lib/OWS_1_1_0.js":8,"../../bower_components/ogc-schemas/scripts/lib/SLD_1_0_0.js":9,"../../bower_components/ogc-schemas/scripts/lib/SMIL_2_0.js":10,"../../bower_components/ogc-schemas/scripts/lib/SMIL_2_0_Language.js":11,"../../bower_components/ogc-schemas/scripts/lib/WFS_1_1_0.js":12,"../../bower_components/ogc-schemas/scripts/lib/WMSC_1_1_1.js":13,"../../bower_components/ogc-schemas/scripts/lib/WMS_1_3_0.js":14,"../../bower_components/ogc-schemas/scripts/lib/WMS_1_3_0_Exceptions.js":15,"../../bower_components/ogc-schemas/scripts/lib/WPS_1_0_0.js":16,"../../bower_components/w3c-schemas/scripts/lib/XLink_1_0.js":17,"../../bower_components/w3c-schemas/scripts/lib/XSD_1_0.js":18}],2:[function(require,module,exports){
/*global window */
var _jsonix_factory = function(_jsonix_xmldom, _jsonix_xmlhttprequest, _jsonix_fs)
{
	// Complete Jsonix script is included below 
var Jsonix = {
	singleFile : true
};
Jsonix.Util = {};

Jsonix.Util.extend = function(destination, source) {
	var property, value, sourceIsEvt;
	destination = destination || {};
	if (source) {
		/*jslint forin: true */
		for (property in source) {
			value = source[property];
			if (value !== undefined) {
				destination[property] = value;
			}
		}

		/**
		 * IE doesn't include the toString property when iterating over an
		 * object's properties with the for(property in object) syntax.
		 * Explicitly check if the source has its own toString property.
		 */

		/*
		 * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
		 * prototype object" when calling hawOwnProperty if the source object is
		 * an instance of window.Event.
		 */

		// REWORK
		// Node.js
		sourceIsEvt = typeof window !== 'undefined' && window !== null && typeof window.Event === "function" && source instanceof window.Event;

		if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
			destination.toString = source.toString;
		}
	}
	return destination;
};
Jsonix.Class = function() {
	var Class = function() {
		this.initialize.apply(this, arguments);
	};
        var extended = {};
	var empty = function() {
	};
	var parent, initialize, Type;
	for (var i = 0, len = arguments.length; i < len; ++i) {
		Type = arguments[i];
		if (typeof Type == "function") {
			// make the class passed as the first argument the superclass
			if (i === 0 && len > 1) {
				initialize = Type.prototype.initialize;
				// replace the initialize method with an empty function,
				// because we do not want to create a real instance here
				Type.prototype.initialize = empty;
				// the line below makes sure that the new class has a
				// superclass
				extended = new Type();
				// restore the original initialize method
				if (initialize === undefined) {
					delete Type.prototype.initialize;
				} else {
					Type.prototype.initialize = initialize;
				}
			}
			// get the prototype of the superclass
			parent = Type.prototype;
		} else {
			// in this case we're extending with the prototype
			parent = Type;
		}
		Jsonix.Util.extend(extended, parent);
	}
	Class.prototype = extended;
	return Class;
};

Jsonix.XML = {
		XMLNS_NS : 'http://www.w3.org/2000/xmlns/',
		XMLNS_P : 'xmlns'
		
};


Jsonix.DOM = {
	createDocument : function() {
		// REWORK
		// Node.js
		if (typeof _jsonix_xmldom !== 'undefined')
		{
			return new (_jsonix_xmldom.DOMImplementation)().createDocument();
		} else if (typeof document !== 'undefined' && Jsonix.Util.Type.exists(document.implementation) && Jsonix.Util.Type.isFunction(document.implementation.createDocument)) {
			return document.implementation.createDocument('', '', null);
		} else if (typeof ActiveXObject !== 'undefined') {
			return new ActiveXObject('MSXML2.DOMDocument');
		} else {
			throw new Error('Error created the DOM document.');
		}
	},
	serialize : function(node) {
		Jsonix.Util.Ensure.ensureExists(node);
		// REWORK
		// Node.js
		if (typeof _jsonix_xmldom !== 'undefined')
		{
			return (new (_jsonix_xmldom).XMLSerializer()).serializeToString(node);
		} else if (Jsonix.Util.Type.exists(XMLSerializer)) {
			return (new XMLSerializer()).serializeToString(node);
		} else if (Jsonix.Util.Type.exists(node.xml)) {
			return node.xml;
		} else {
			throw new Error('Could not serialize the node, neither XMLSerializer nor the [xml] property were found.');
		}
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureExists(text);
		if (typeof _jsonix_xmldom !== 'undefined')
		{
			return (new (_jsonix_xmldom).DOMParser()).parseFromString(text, 'application/xml');
		} else if (typeof DOMParser != 'undefined') {
			return (new DOMParser()).parseFromString(text, 'application/xml');
		} else if (typeof ActiveXObject != 'undefined') {
			var doc = Jsonix.DOM.createDocument('', '');
			doc.loadXML(text);
			return doc;
		} else {
			var url = 'data:text/xml;charset=utf-8,' + encodeURIComponent(text);
			var request = new XMLHttpRequest();
			request.open('GET', url, false);
			if (request.overrideMimeType) {
				request.overrideMimeType("text/xml");
			}
			request.send(null);
			return request.responseXML;
		}
	},
	load : function(url, callback, options) {

		var request = Jsonix.Request.INSTANCE;

		request.issue(
						url,
						function(transport) {
							var result;
							if (Jsonix.Util.Type.exists(transport.responseXML) && Jsonix.Util.Type.exists(transport.responseXML.documentElement)) {
								result = transport.responseXML;
							} else if (Jsonix.Util.Type.isString(transport.responseText)) {
								result = Jsonix.DOM.parse(transport.responseText);
							} else {
								throw new Error('Response does not have valid [responseXML] or [responseText].');
							}
							callback(result);

						}, function(transport) {
							throw new Error('Could not retrieve XML from URL [' + url	+ '].');

						}, options);
	},
	xlinkFixRequired : null,
	isXlinkFixRequired : function ()
	{
		if (Jsonix.DOM.xlinkFixRequired === null)
		{
			if (typeof navigator === 'undefined')
			{
				Jsonix.DOM.xlinkFixRequired = false;
			}
			else if (!!navigator.userAgent && (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)))
			{
				var doc = Jsonix.DOM.createDocument();
				var el = doc.createElement('test');
				el.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'urn:test');
				doc.appendChild(el);
				var testString = Jsonix.DOM.serialize(doc);
				Jsonix.DOM.xlinkFixRequired = (testString.indexOf('xmlns:xlink') === -1);
			}
			else
			{
				Jsonix.DOM.xlinkFixRequired = false;
			}
		}
		return Jsonix.DOM.xlinkFixRequired;
	}
};
Jsonix.Request = Jsonix
		.Class({
			// REWORK
			factories : [ function() {
				return new XMLHttpRequest();
			}, function() {
				return new ActiveXObject('Msxml2.XMLHTTP');
			}, function() {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}, function() {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}, function() {
				return new ActiveXObject('Microsoft.XMLHTTP');
			}, function() {
				// Node.js
				if (typeof _jsonix_xmlhttprequest !== 'undefined')
				{
					var XMLHttpRequest = _jsonix_xmlhttprequest.XMLHttpRequest;
					return new XMLHttpRequest();
				}
				else
				{
					return null;
				}
			}],
			initialize : function() {
			},
			issue : function(url, onSuccess, onFailure, options) {
				Jsonix.Util.Ensure.ensureString(url);
				if (Jsonix.Util.Type.exists(onSuccess)) {
					Jsonix.Util.Ensure.ensureFunction(onSuccess);
				} else {
					onSuccess = function() {
					};
				}
				if (Jsonix.Util.Type.exists(onFailure)) {
					Jsonix.Util.Ensure.ensureFunction(onFailure);
				} else {
					onFailure = function() {
					};
				}
				if (Jsonix.Util.Type.exists(options)) {
					Jsonix.Util.Ensure.ensureObject(options);
				} else {
					options = {};
				}

				var transport = this.createTransport();

				var method = Jsonix.Util.Type.isString(options.method) ? options.method
						: 'GET';
				var async = Jsonix.Util.Type.isBoolean(options.async) ? options.async
						: true;
				var proxy = Jsonix.Util.Type.isString(options.proxy) ? options.proxy
						: Jsonix.Request.PROXY;

				var user = Jsonix.Util.Type.isString(options.user) ? options.user
						: null;
				var password = Jsonix.Util.Type.isString(options.password) ? options.password
						: null;

				if (Jsonix.Util.Type.isString(proxy) && (url.indexOf("http") === 0)) {
					url = proxy + encodeURIComponent(url);
				}

				if (Jsonix.Util.Type.isString(user)) {
					transport.open(method, url, async, user, password);
				} else {
					transport.open(method, url, async);
				}

				if (Jsonix.Util.Type.isObject(options.headers)) {

					for ( var header in options.headers) {
						if (options.headers.hasOwnProperty(header)) {
							transport.setRequestHeader(header,
									options.headers[header]);
						}
					}
				}

				var data = Jsonix.Util.Type.exists(options.data) ? options.data
						: null;
				if (!async) {
					transport.send(data);
					this.handleTransport(transport, onSuccess, onFailure);
				} else {
					var that = this;
					if (typeof window !== 'undefined') {

						transport.onreadystatechange = function() {
							that.handleTransport(transport, onSuccess,
									onFailure);
						};

						window.setTimeout(function() {
							transport.send(data);
						}, 0);
					} else {

						transport.onreadystatechange = function() {
							that.handleTransport(transport, onSuccess, onFailure);
						};
						console.log('Sending.');
						transport.send(data);
					}
				}
				return transport;

			},
			handleTransport : function(transport, onSuccess, onFailure) {
				if (transport.readyState == 4) {
					if (!transport.status || (transport.status >= 200 && transport.status < 300)) {
						onSuccess(transport);
					}
					if (transport.status && (transport.status < 200 || transport.status >= 300)) {
						onFailure(transport);
					}
				}
			},
			createTransport : function() {
				for ( var index = 0, length = this.factories.length; index < length; index++) {
					try {
						var transport = this.factories[index]();
						if (transport !== null) {
							return transport;
						}
					} catch (e) {
						// TODO log
					}
				}
				throw new Error('Could not create XML HTTP transport.');
			},
			CLASS_NAME : 'Jsonix.Request'
		});
Jsonix.Request.INSTANCE = new Jsonix.Request();
Jsonix.Request.PROXY = null;
Jsonix.Schema = {};
Jsonix.Model = {};
Jsonix.Util.Type = {
	exists : function(value) {
		return (typeof value !== 'undefined' && value !== null);
	},
	isString : function(value) {
		return typeof value === 'string';
	},
	isBoolean : function(value) {
		return typeof value === 'boolean';
	},
	isObject : function(value) {
		return typeof value === 'object';
	},
	isFunction : function(value) {
		return typeof value === 'function';
	},
	isNumber : function(value) {
		return (typeof value === 'number') && !isNaN(value);
	},
	isNumberOrNaN : function(value) {
		return (value === +value) || (Object.prototype.toString.call(value) === '[object Number]');
	},
	isNaN : function(value) {
		return Jsonix.Util.Type.isNumberOrNaN(value) && isNaN(value);
	},
	isArray : function(value) {
		// return value instanceof Array;
		return !!(value && value.concat && value.unshift && !value.callee);
	},
	isDate : function(value) {
		return !!(value && value.getTimezoneOffset && value.setUTCFullYear);
	},
	isRegExp : function(value) {
		return !!(value && value.test && value.exec && (value.ignoreCase || value.ignoreCase === false));
	},
	isEqual : function(a, b, report) {
		var doReport = Jsonix.Util.Type.isFunction(report);
		// TODO rework
		var _range = function(start, stop, step) {
			var args = slice.call(arguments);
			var solo = args.length <= 1;
			var start_ = solo ? 0 : args[0];
			var stop_ = solo ? args[0] : args[1];
			var step_ = args[2] || 1;
			var len = Math.max(Math.ceil((stop_ - start_) / step_), 0);
			var idx = 0;
			var range = new Array(len);
			while (idx < len) {
				range[idx++] = start_;
				start_ += step_;
			}
			return range;
		};

		var _keys = Object.keys || function(obj) {
			if (Jsonix.Util.Type.isArray(obj)) {
				return _range(0, obj.length);
			}
			var keys = [];
			for ( var key in obj) {
				if (obj.hasOwnProperty(key)) {
					keys[keys.length] = key;
				}
			}
			return keys;
		};

		// Check object identity.
		if (a === b) {
			return true;
		}

		// Check if both are NaNs
		if (Jsonix.Util.Type.isNaN(a) && Jsonix.Util.Type.isNaN(b)) {
			return true;
		}
		// Different types?
		var atype = typeof a;
		var btype = typeof b;
		if (atype != btype) {
			if (doReport) {
				report('Types differ [' + atype + '], [' + btype + '].');
			}
			return false;
		}
		// Basic equality test (watch out for coercions).
		if (a == b) {
			return true;
		}
		// One is falsy and the other truthy.
		if ((!a && b) || (a && !b)) {
			if (doReport) {
				report('One is falsy, the other is truthy.');
			}
			return false;
		}
		// Check dates' integer values.
		if (Jsonix.Util.Type.isDate(a) && Jsonix.Util.Type.isDate(b)) {
			return a.getTime() === b.getTime();
		}
		// Both are NaN?
		if (Jsonix.Util.Type.isNaN(a) && Jsonix.Util.Type.isNaN(b)) {
			return false;
		}
		// Compare regular expressions.
		if (Jsonix.Util.Type.isRegExp(a) && Jsonix.Util.Type.isRegExp(b)) {
			return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
		}
		// If a is not an object by this point, we can't handle it.
		if (atype !== 'object') {
			return false;
		}
		// Check for different array lengths before comparing contents.
		if (a.length && (a.length !== b.length)) {
			if (doReport) {
					report('Lengths differ.');
					report('A.length=' + a.length);
					report('B.length=' + b.length);
			}
			return false;
		}
		// Nothing else worked, deep compare the contents.
		var aKeys = _keys(a);
		var bKeys = _keys(b);
		// Different object sizes?
		if (aKeys.length != bKeys.length) {
			if (doReport) {
				report('Different number of properties [' + aKeys.length + '], [' + bKeys.length + '].');
			}
			for ( var andex = 0; andex < aKeys.length; andex++) {
				if (doReport) {
					report('A [' + aKeys[andex] + ']=' + a[aKeys[andex]]);
				}
			}
			for ( var bndex = 0; bndex < bKeys.length; bndex++) {
				if (doReport) {
					report('B [' + bKeys[bndex] + ']=' + b[bKeys[bndex]]);
				}
			}
			return false;
		}
		// Recursive comparison of contents.
		for (var kndex = 0; kndex < aKeys.length; kndex++) {
			var key = aKeys[kndex];
			if (!(key in b) || !Jsonix.Util.Type.isEqual(a[key], b[key], report)) {
				if (doReport) {
					report('One of the properties differ.');
					report('Key: [' + key + '].');
					report('Left: [' + a[key] + '].');
					report('Right: [' + b[key] + '].');
				}
				return false;
			}
		}
		return true;
	},
	cloneObject : function (source, target)
	{
		target = target || {};
		for (var p in source)
		{
			if (source.hasOwnProperty(p))
			{
				target[p] = source[p];
			}
		}
		return target;
	}
};
Jsonix.Util.NumberUtils = {
	isInteger : function(value) {
		return Jsonix.Util.Type.isNumber(value) && ((value % 1) === 0);
	}
};
Jsonix.Util.StringUtils = {
	trim : (!!String.prototype.trim) ?
	function(str) {
		Jsonix.Util.Ensure.ensureString(str);
		return str.trim();
	} :
	function(str) {
		Jsonix.Util.Ensure.ensureString(str);
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},
	/* isEmpty : function(str) {
		var wcm = Jsonix.Util.StringUtils.whitespaceCharactersMap;
		for (var index = 0; index < str.length; index++)
		{
			if (!wcm[str[index]])
			{
				return false;
			}
		}
		return true;
	}, */
	isEmpty : function(str) {
		var length = str.length;
		if (!length) {
			return true;
		}
		for (var index = 0; index < length; index++)
		{
			var c = str[index];
			if (c === ' ')
			{
				// skip
			}
			else if (c > '\u000D' && c < '\u0085')
			{
				return false;
			}
			else if (c < '\u00A0')
			{
				if (c < '\u0009')
				{
					return false;
				}
				else if (c > '\u0085')
				{
					return false;
				}
			}
			else if (c > '\u00A0')
			{
				if (c < '\u2028')
				{
					if (c < '\u180E')
					{
						if (c < '\u1680')
						{
							return false;
						}
						else if(c > '\u1680')
						{
							return false;
						}
					}
					else if (c > '\u180E')
					{
						if (c < '\u2000')
						{
							return false;
						}
						else if (c > '\u200A')
						{
							return false;
						}
					}
				}
				else if (c > '\u2029')
				{
					if (c < '\u205F')
					{
						if (c < '\u202F')
						{
							return false;
						}
						else if (c > '\u202F')
						{
							return false;
						}
					}
					else if (c > '\u205F')
					{
						if (c < '\u3000')
						{
							return false;
						}
						else if (c > '\u3000')
						{
							return false;
						}
					}
				}
			}
		}
		return true;
	},
	isNotBlank : function(str) {
		return Jsonix.Util.Type.isString(str) && !Jsonix.Util.StringUtils.isEmpty(str);
	},
	whitespaceCharacters: '\u0009\u000A\u000B\u000C\u000D \u0085\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000',
	whitespaceCharactersMap: {
		'\u0009' : true,
		'\u000A' : true,
		'\u000B' : true,
		'\u000C' : true,
		'\u000D' : true,
		' ' : true,
		'\u0085' : true,
		'\u00A0' : true,
		'\u1680' : true,
		'\u180E' : true,
		'\u2000' : true,
		'\u2001' : true,
		'\u2002' : true,
		'\u2003' : true,
		'\u2004' : true,
		'\u2005' : true,
		'\u2006' : true,
		'\u2007' : true,
		'\u2008' : true,
		'\u2009' : true,
		'\u200A' : true,
		'\u2028' : true,
		'\u2029' : true,
		'\u202F' : true,
		'\u205F' : true,
		'\u3000' : true
	},
	splitBySeparatorChars : function(str, separatorChars) {
		Jsonix.Util.Ensure.ensureString(str);
		Jsonix.Util.Ensure.ensureString(separatorChars);
		var len = str.length;
		if (len === 0) {
			return [];
		}
		if (separatorChars.length === 1)
		{
			return str.split(separatorChars);
		}
		else
		{
			var list = [];
			var sizePlus1 = 1;
			var i = 0;
			var start = 0;
			var match = false;
			var lastMatch = false;
			var max = -1;
			var preserveAllTokens = false;
			// standard case
				while (i < len) {
						if (separatorChars.indexOf(str.charAt(i)) >= 0) {
								if (match || preserveAllTokens) {
										lastMatch = true;
										if (sizePlus1++ == max) {
												i = len;
												lastMatch = false;
										}
										list.push(str.substring(start, i));
										match = false;
								}
								start = ++i;
								continue;
						}
						lastMatch = false;
						match = true;
						i++;
				}
				if (match || (preserveAllTokens && lastMatch)) {
					list.push(str.substring(start, i));
			}
			return list;
		}
	}
};
Jsonix.Util.Ensure = {
	ensureBoolean : function(value) {
		if (!Jsonix.Util.Type.isBoolean(value)) {
			throw new Error('Argument [' + value + '] must be a boolean.');
		}
	},
	ensureString : function(value) {
		if (!Jsonix.Util.Type.isString(value)) {
			throw new Error('Argument [' + value + '] must be a string.');
		}
	},
	ensureNumber : function(value) {
		if (!Jsonix.Util.Type.isNumber(value)) {
			throw new Error('Argument [' + value + '] must be a number.');
		}
	},
	ensureNumberOrNaN : function(value) {
		if (!Jsonix.Util.Type.isNumberOrNaN(value)) {
			throw new Error('Argument [' + value + '] must be a number or NaN.');
		}
	},
	ensureInteger : function(value) {
		if (!Jsonix.Util.Type.isNumber(value)) {
			throw new Error('Argument must be an integer, but it is not a number.');
		} else if (!Jsonix.Util.NumberUtils.isInteger(value)) {
			throw new Error('Argument [' + value + '] must be an integer.');
		}
	},
	ensureDate : function(value) {
		if (!(value instanceof Date)) {
			throw new Error('Argument [' + value + '] must be a date.');
		}
	},
	ensureObject : function(value) {
		if (!Jsonix.Util.Type.isObject(value)) {
			throw new Error('Argument [' + value + '] must be an object.');
		}
	},
	ensureArray : function(value) {
		if (!Jsonix.Util.Type.isArray(value)) {
			throw new Error('Argument [' + value + '] must be an array.');
		}
	},
	ensureFunction : function(value) {
		if (!Jsonix.Util.Type.isFunction(value)) {
			throw new Error('Argument [' + value + '] must be a function.');
		}
	},
	ensureExists : function(value) {
		if (!Jsonix.Util.Type.exists(value)) {
			throw new Error('Argument [' + value + '] does not exist.');
		}
	}
};
Jsonix.XML.QName = Jsonix.Class({
	key : null,
	namespaceURI : null,
	localPart : null,
	prefix : null,
	string : null,
	initialize : function(one, two, three) {
		var namespaceURI;
		var localPart;
		var prefix;
		var key;
		var string;

		if (!Jsonix.Util.Type.exists(two)) {
			namespaceURI = '';
			localPart = one;
			prefix = '';
		} else if (!Jsonix.Util.Type.exists(three)) {
			namespaceURI = Jsonix.Util.Type.exists(one) ? one : '';
			localPart = two;
			var colonPosition = two.indexOf(':');
			if (colonPosition > 0 && colonPosition < two.length) {
				prefix = two.substring(0, colonPosition);
				localPart = two.substring(colonPosition + 1);
			} else {
				prefix = '';
				localPart = two;
			}
		} else {
			namespaceURI = Jsonix.Util.Type.exists(one) ? one : '';
			localPart = two;
			prefix = Jsonix.Util.Type.exists(three) ? three : '';
		}
		this.namespaceURI = namespaceURI;
		this.localPart = localPart;
		this.prefix = prefix;

		this.key = (namespaceURI !== '' ? ('{' + namespaceURI + '}') : '') + localPart;
		this.string = (namespaceURI !== '' ? ('{' + namespaceURI + '}') : '') + (prefix !== '' ? (prefix + ':') : '') + localPart;
	},
	toString : function() {
		return this.string;
	},
	clone : function() {
		return new Jsonix.XML.QName(this.namespaceURI, this.localPart, this.prefix);
	},
	equals : function(that) {
		if (!that) {
			return false;
		} else {
			return (this.namespaceURI == that.namespaceURI) && (this.localPart == that.localPart);
		}

	},
	CLASS_NAME : "Jsonix.XML.QName"
});
Jsonix.XML.QName.fromString = function(qNameAsString) {
	var leftBracket = qNameAsString.indexOf('{');
	var rightBracket = qNameAsString.lastIndexOf('}');
	var namespaceURI;
	var prefixedName;
	if ((leftBracket === 0) && (rightBracket > 0) && (rightBracket < qNameAsString.length)) {
		namespaceURI = qNameAsString.substring(1, rightBracket);
		prefixedName = qNameAsString.substring(rightBracket + 1);
	} else {
		namespaceURI = '';
		prefixedName = qNameAsString;
	}
	var colonPosition = prefixedName.indexOf(':');
	var prefix;
	var localPart;
	if (colonPosition > 0 && colonPosition < prefixedName.length) {
		prefix = prefixedName.substring(0, colonPosition);
		localPart = prefixedName.substring(colonPosition + 1);
	} else {
		prefix = '';
		localPart = prefixedName;
	}
	return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};
Jsonix.XML.QName.fromObject = function(object) {
	Jsonix.Util.Ensure.ensureObject(object);
	if (object instanceof Jsonix.XML.QName || (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === 'Jsonix.XML.QName')) {
		return object;
	}
	var localPart = object.localPart||object.lp||null;
	Jsonix.Util.Ensure.ensureString(localPart);
	var namespaceURI = object.namespaceURI||object.ns||'';
	var prefix = object.prefix||object.p||'';
	return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};
Jsonix.XML.QName.key = function(namespaceURI, localPart) {
	Jsonix.Util.Ensure.ensureString(localPart);
	if (namespaceURI) {
		var colonPosition = localPart.indexOf(':');
		if (colonPosition > 0 && colonPosition < localPart.length) {
			localName = localPart.substring(colonPosition + 1);
		} else {
			localName = localPart;
		}
		return '{' + namespaceURI + '}' + localName;
	} else {
		return localPart;
	}
};
Jsonix.XML.Calendar = Jsonix.Class({
	year : NaN,
	month : NaN,
	day : NaN,
	hour : NaN,
	minute : NaN,
	second : NaN,
	fractionalSecond : NaN,
	timezone : NaN,
	initialize : function(data) {
		Jsonix.Util.Ensure.ensureObject(data);
		// Year
		if (Jsonix.Util.Type.exists(data.year)) {
			Jsonix.Util.Ensure.ensureInteger(data.year);
			if (data.year >= -9999 && data.year <= 9999) {
				this.year = data.year;
			} else {
				throw new Error('Invalid year [' + data.year + '].');
			}

		} else {
			this.year = NaN;
		}
		// Month
		if (Jsonix.Util.Type.exists(data.month)) {
			Jsonix.Util.Ensure.ensureInteger(data.month);
			if (data.month >= 1 && data.month <= 12) {
				this.month = data.month;
			} else {
				throw new Error('Invalid month [' + data.month + '].');
			}

		} else {
			this.month = NaN;
		}
		// Day
		if (Jsonix.Util.Type.exists(data.day)) {
			Jsonix.Util.Ensure.ensureInteger(data.day);
			if (data.day >= 1 && data.day <= 31) {
				this.day = data.day;
			} else {
				throw new Error('Invalid day [' + data.day + '].');
			}

		} else {
			this.day = NaN;
		}
		// Hour
		if (Jsonix.Util.Type.exists(data.hour)) {
			Jsonix.Util.Ensure.ensureInteger(data.hour);
			if (data.hour >= 0 && data.hour <= 23) {
				this.hour = data.hour;
			} else {
				throw new Error('Invalid hour [' + data.hour + '].');
			}

		} else {
			this.hour = NaN;
		}
		// Minute
		if (Jsonix.Util.Type.exists(data.minute)) {
			Jsonix.Util.Ensure.ensureInteger(data.minute);
			if (data.minute >= 0 && data.minute <= 59) {
				this.minute = data.minute;
			} else {
				throw new Error('Invalid minute [' + data.minute + '].');
			}

		} else {
			this.minute = NaN;
		}
		// Second
		if (Jsonix.Util.Type.exists(data.second)) {
			Jsonix.Util.Ensure.ensureInteger(data.second);
			if (data.second >= 0 && data.second <= 59) {
				this.second = data.second;
			} else {
				throw new Error('Invalid second [' + data.second + '].');
			}

		} else {
			this.second = NaN;
		}
		// Fractional second
		if (Jsonix.Util.Type.exists(data.fractionalSecond)) {
			Jsonix.Util.Ensure.ensureNumber(data.fractionalSecond);
			if (data.fractionalSecond >= 0 && data.fractionalSecond < 1) {
				this.fractionalSecond = data.fractionalSecond;
			} else {
				throw new Error('Invalid fractional second [' + data.fractionalSecond + '].');
			}

		} else {
			this.fractionalSecond = NaN;
		}
		// Timezone
		if (Jsonix.Util.Type.exists(data.timezone)) {
			if (Jsonix.Util.Type.isNaN(data.timezone)) {
				this.timezone = NaN;
			} else {
				Jsonix.Util.Ensure.ensureInteger(data.timezone);
				if (data.timezone >= -1440 && data.timezone < 1440) {
					this.timezone = data.timezone;
				} else {
					throw new Error('Invalid timezone [' + data.timezone + '].');
				}
			}
		} else {
			this.timezone = NaN;
		}
	},
	CLASS_NAME : "Jsonix.XML.Calendar"
});
Jsonix.XML.Calendar.fromObject = function(object) {
	Jsonix.Util.Ensure.ensureObject(object);
	if (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === 'Jsonix.XML.Calendar') {
		return object;
	}
	return new Jsonix.XML.Calendar(object);
};
Jsonix.XML.Input = Jsonix.Class({
	root : null,
	node : null,
	attributes : null,
	eventType : null,
	pns : null,
	initialize : function(node) {
		Jsonix.Util.Ensure.ensureExists(node);
		this.root = node;
		var rootPnsItem =
		{
			'' : ''
		};
		rootPnsItem[Jsonix.XML.XMLNS_P] = Jsonix.XML.XMLNS_NS;
		this.pns = [rootPnsItem];
	},
	hasNext : function() {
		// No current node, we've not started yet
		if (this.node === null) {
			return true;
		} else if (this.node === this.root) {
			var nodeType = this.node.nodeType;
			// Root node is document, last event type is END_DOCUMENT
			if (nodeType === 9 && this.eventType === 8) {
				return false;
			}
			// Root node is element, last event type is END_ELEMENT
			else if (nodeType === 1 && this.eventType === 2) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	},
	next : function() {
		if (this.eventType === null) {
			return this.enter(this.root);
		}
		// START_DOCUMENT
		if (this.eventType === 7) {
			var documentElement = this.node.documentElement;
			if (documentElement) {
				return this.enter(documentElement);
			} else {
				return this.leave(this.node);
			}
		} else if (this.eventType === 1) {
			var firstChild = this.node.firstChild;
			if (firstChild) {
				return this.enter(firstChild);
			} else {
				return this.leave(this.node);
			}
		} else if (this.eventType === 2) {
			var nextSibling = this.node.nextSibling;
			if (nextSibling) {
				return this.enter(nextSibling);
			} else {
				return this.leave(this.node);
			}
		} else {
			return this.leave(this.node);
		}
	},
	enter : function(node) {
		var nodeType = node.nodeType;
		this.node = node;
		this.attributes = null;
		// Document node
		if (nodeType === 1) {
			// START_ELEMENT
			this.eventType = 1;
			this.pushNS(node);
			return this.eventType;
		} else if (nodeType === 2) {
			// ATTRIBUTE
			this.eventType = 10;
			return this.eventType;
		} else if (nodeType === 3) {
			var nodeValue = node.nodeValue;
			if (Jsonix.Util.StringUtils.isEmpty(nodeValue)) {
				// SPACE
				this.eventType = 6;
			} else {
				// CHARACTERS
				this.eventType = 4;
			}
			return this.eventType;
		} else if (nodeType === 4) {
			// CDATA
			this.eventType = 12;
			return this.eventType;
		} else if (nodeType === 5) {
			// ENTITY_REFERENCE_NODE = 5
			// ENTITY_REFERENCE
			this.eventType = 9;
			return this.eventType;
		} else if (nodeType === 6) {
			// ENTITY_DECLARATION
			this.eventType = 15;
			return this.eventType;
		} else if (nodeType === 7) {
			// PROCESSING_INSTRUCTION
			this.eventType = 3;
			return this.eventType;
		} else if (nodeType === 8) {
			// COMMENT
			this.eventType = 5;
			return this.eventType;
		} else if (nodeType === 9) {
			// START_DOCUMENT
			this.eventType = 7;
			return this.eventType;
		} else if (nodeType === 10) {
			// DTD
			this.eventType = 12;
			return this.eventType;
		} else if (nodeType === 12) {
			// NOTATION_DECLARATION
			this.eventType = 14;
			return this.eventType;
		} else {
			// DOCUMENT_FRAGMENT_NODE = 11
			throw new Error("Node type [" + nodeType + '] is not supported.');
		}
	},
	leave : function(node) {
		if (node.nodeType === 9) {
			if (this.eventType == 8) {
				throw new Error("Invalid state.");
			} else {
				this.node = node;
				this.attributes = null;
				// END_ELEMENT
				this.eventType = 8;
				return this.eventType;
			}
		} else if (node.nodeType === 1) {
			if (this.eventType == 2) {
				var nextSibling = node.nextSibling;
				if (nextSibling) {
					return this.enter(nextSibling);
				}
			} else {
				this.node = node;
				this.attributes = null;
				// END_ELEMENT
				this.eventType = 2;
				this.popNS();
				return this.eventType;
			}
		}

		var nextSibling1 = node.nextSibling;
		if (nextSibling1) {
			return this.enter(nextSibling1);
		} else {
			var parentNode = node.parentNode;
			this.node = parentNode;
			this.attributes = null;
			if (parentNode.nodeType === 9) {
				this.eventType = 8;
			} else {
				this.eventType = 2;
			}
			return this.eventType;
		}
	},
	getName : function() {
		var node = this.node;
		if (Jsonix.Util.Type.isString(node.nodeName)) {
			if (Jsonix.Util.Type.isString(node.namespaceURI)) {
				return new Jsonix.XML.QName(node.namespaceURI, node.nodeName);
			} else {
				return new Jsonix.XML.QName(node.nodeName);
			}
		} else {
			return null;
		}
	},
	getNameKey : function() {
		var node = this.node;
		if (Jsonix.Util.Type.isString(node.nodeName)) {
			return Jsonix.XML.QName.key(node.namespaceURI, node.nodeName);
		} else {
			return null;
		}
	},
	getText : function() {
		return this.node.nodeValue;
	},
	nextTag : function() {
		var et = this.next();
		// TODO isWhiteSpace
		while (et === 7 || et === 4 || et === 12 || et === 6 || et === 3 || et === 5) {
			et = this.next();
		}
		if (et !== 1 && et !== 2) {
			// TODO location
			throw new Error('Expected start or end tag.');
		}
		return et;
	},
	skipElement : function() {
		if (this.eventType !== Jsonix.XML.Input.START_ELEMENT) {
			throw new Error("Parser must be on START_ELEMENT to skip element.");
		}
		var numberOfOpenTags = 1;
		var et;
		do {
			et = this.nextTag();
		    numberOfOpenTags += (et === Jsonix.XML.Input.START_ELEMENT) ? 1 : -1;
		  } while (numberOfOpenTags > 0);
		return et;
	},	
	getElementText : function() {
		if (this.eventType != 1) {
			throw new Error("Parser must be on START_ELEMENT to read next text.");
		}
		var et = this.next();
		var content = '';
		while (et !== 2) {
			if (et === 4 || et === 12 || et === 6 || et === 9) {
				content = content + this.getText();
			} else if (et === 3 || et === 5) {
				// Skip PI or comment
			} else if (et === 8) {
				// End document
				throw new Error("Unexpected end of document when reading element text content.");
			} else if (et === 1) {
				// End element
				// TODO location
				throw new Error("Element text content may not contain START_ELEMENT.");
			} else {
				// TODO location
				throw new Error("Unexpected event type [" + et + "].");
			}
			et = this.next();
		}
		return content;
	},
	getAttributeCount : function() {
		var attributes;
		if (this.attributes) {
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE.");
		}
		return attributes.length;
	},
	getAttributeName : function(index) {
		var attributes;
		if (this.attributes) {
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Attribute name can only be retrieved for START_ELEMENT or ATTRIBUTE.");
		}
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];
		
		
		if (Jsonix.Util.Type.isString(attribute.namespaceURI)) {
			return new Jsonix.XML.QName(attribute.namespaceURI, attribute.nodeName);
		} else {
			return new Jsonix.XML.QName(attribute.nodeName);
		}
	},
	getAttributeNameKey : function(index) {
		var attributes;
		if (this.attributes) {
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Attribute name key can only be retrieved for START_ELEMENT or ATTRIBUTE.");
		}
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];

		return Jsonix.XML.QName.key(attribute.namespaceURI, attribute.nodeName);
	},
	getAttributeValue : function(index) {
		var attributes;
		if (this.attributes)
		{
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Attribute value can only be retrieved for START_ELEMENT or ATTRIBUTE.");
		}
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];
		return attribute.value;
	},
	getElement : function() {
		if (this.eventType === 1 || this.eventType === 2) {
			// Go to the END_ELEMENT
			this.eventType = 2;
			return this.node;
		} else {
			throw new Error("Parser must be on START_ELEMENT or END_ELEMENT to return current element.");
		}
	},
	pushNS : function (node) {
		var pindex = this.pns.length - 1;
		var parentPnsItem = this.pns[pindex];
		var pnsItem = Jsonix.Util.Type.isObject(parentPnsItem) ? pindex : parentPnsItem;
		this.pns.push(pnsItem);
		pindex++;
		var reference = true;
		if (node.attributes)
		{
			var attributes = node.attributes;
			var alength = attributes.length;
			if (alength > 0)
			{
				// If given node has attributes
				for (var aindex = 0; aindex < alength; aindex++)
				{
					var attribute = attributes[aindex];
					var attributeName = attribute.nodeName;
					var p = null;
					var ns = null;
					var isNS = false;
					if (attributeName === 'xmlns')
					{
						p = '';
						ns = attribute.value;
						isNS = true;
					}
					else if (attributeName.substring(0, 6) === 'xmlns:')
					{
						p = attributeName.substring(6);
						ns = attribute.value;
						isNS = true;
					}
					// Attribute is a namespace declaration
					if (isNS)
					{
						if (reference)
						{
							pnsItem = Jsonix.Util.Type.cloneObject(this.pns[pnsItem], {});
							this.pns[pindex] = pnsItem;
							reference = false;
						}
						pnsItem[p] = ns;
					}
				}
			}
		}		
	},
	popNS : function () {
		this.pns.pop();
	},
	getNamespaceURI : function (p) {
		var pindex = this.pns.length - 1;
		var pnsItem = this.pns[pindex];
		pnsItem = Jsonix.Util.Type.isObject(pnsItem) ? pnsItem : this.pns[pnsItem];
		return pnsItem[p];
	},
	CLASS_NAME : "Jsonix.XML.Input"

});

Jsonix.XML.Input.START_ELEMENT = 1;
Jsonix.XML.Input.END_ELEMENT = 2;
Jsonix.XML.Input.PROCESSING_INSTRUCTION = 3;
Jsonix.XML.Input.CHARACTERS = 4;
Jsonix.XML.Input.COMMENT = 5;
Jsonix.XML.Input.SPACE = 6;
Jsonix.XML.Input.START_DOCUMENT = 7;
Jsonix.XML.Input.END_DOCUMENT = 8;
Jsonix.XML.Input.ENTITY_REFERENCE = 9;
Jsonix.XML.Input.ATTRIBUTE = 10;
Jsonix.XML.Input.DTD = 11;
Jsonix.XML.Input.CDATA = 12;
Jsonix.XML.Input.NAMESPACE = 13;
Jsonix.XML.Input.NOTATION_DECLARATION = 14;
Jsonix.XML.Input.ENTITY_DECLARATION = 15;

Jsonix.XML.Output = Jsonix.Class({
	document : null,
	documentElement : null,
	node : null,
	nodes : null,
	nsp : null,
	pns : null,
	namespacePrefixIndex : 0,
	xmldom : null,
	initialize : function(options) {
		// REWORK
		if (typeof ActiveXObject !== 'undefined') {
			this.xmldom = new ActiveXObject("Microsoft.XMLDOM");
		} else {
			this.xmldom = null;
		}
		this.nodes = [];
		var rootNspItem =
		{
			'' : ''
		};
		rootNspItem[Jsonix.XML.XMLNS_NS] = Jsonix.XML.XMLNS_P;
		if (Jsonix.Util.Type.isObject(options)) {
			if (Jsonix.Util.Type.isObject(options.namespacePrefixes)) {
				Jsonix.Util.Type.cloneObject(options.namespacePrefixes, rootNspItem);
			}
		}
		this.nsp = [rootNspItem];
		var rootPnsItem =
		{
			'' : ''
		};
		rootPnsItem[Jsonix.XML.XMLNS_P] = Jsonix.XML.XMLNS_NS;
		this.pns = [rootPnsItem];
	},
	destroy : function() {
		this.xmldom = null;
	},
	writeStartDocument : function() {
		// TODO Check
		var doc = Jsonix.DOM.createDocument();
		this.document = doc;
		return this.push(doc);
	},
	writeEndDocument : function() {
		return this.pop();

	},
	writeStartElement : function(name) {
		Jsonix.Util.Ensure.ensureObject(name);
		var localPart = name.localPart || name.lp || null;
		Jsonix.Util.Ensure.ensureString(localPart);
		var ns = name.namespaceURI || name.ns || null;
		var namespaceURI = Jsonix.Util.Type.isString(ns) ? ns : '';

		var p = name.prefix || name.p;
		var prefix = this.getPrefix(namespaceURI, p);

		var qualifiedName = (!prefix ? localPart : prefix + ':' + localPart);

		var element;
		if (Jsonix.Util.Type.isFunction(this.document.createElementNS))	{
			element = this.document.createElementNS(namespaceURI, qualifiedName);
		}
		else if (this.xmldom) {
			element = this.xmldom.createNode(1, qualifiedName, namespaceURI);

		} else {
			throw new Error("Could not create an element node.");
		}
		this.peek().appendChild(element);
		this.push(element);
		this.declareNamespace(namespaceURI, prefix);
		if (this.documentElement === null)
		{
			this.documentElement = element;
			this.declareNamespaces();
		}
		return element;
	},
	writeEndElement : function() {
		return this.pop();
	},
	writeCharacters : function(text) {
		var node;
		if (Jsonix.Util.Type.isFunction(this.document.createTextNode))	{
			node = this.document.createTextNode(text);
		}
		else if (this.xmldom) {
			node = this.xmldom.createTextNode(text);
		} else {
			throw new Error("Could not create a text node.");
		}
		this.peek().appendChild(node);
		return node;

	},
	writeAttribute : function(name, value) {
		Jsonix.Util.Ensure.ensureString(value);
		Jsonix.Util.Ensure.ensureObject(name);
		var localPart = name.localPart || name.lp || null;
		Jsonix.Util.Ensure.ensureString(localPart);
		var ns = name.namespaceURI || name.ns || null;
		var namespaceURI = Jsonix.Util.Type.isString(ns) ? ns : '';
		var p = name.prefix || name.p || null;
		var prefix = this.getPrefix(namespaceURI, p);

		var qualifiedName = (!prefix ? localPart : prefix + ':' + localPart);

		var node = this.peek();

		if (namespaceURI === '') {
			node.setAttribute(qualifiedName, value);
		} else {
			if (node.setAttributeNS) {
				node.setAttributeNS(namespaceURI, qualifiedName, value);
			} else {
				if (this.xmldom) {
					var attribute = this.document.createNode(2, qualifiedName, namespaceURI);
					attribute.nodeValue = value;
					node.setAttributeNode(attribute);
				}
				else if (namespaceURI === Jsonix.XML.XMLNS_NS)
				{
					// XMLNS namespace may be processed unqualified
					node.setAttribute(qualifiedName, value);
				}
				else
				{
					throw new Error("The [setAttributeNS] method is not implemented");
				}
			}
			this.declareNamespace(namespaceURI, prefix);
		}
		
	},
	writeNode : function(node) {
		var importedNode;
		if (Jsonix.Util.Type.exists(this.document.importNode)) {
			importedNode = this.document.importNode(node, true);
		} else {
			importedNode = node;
		}
		this.peek().appendChild(importedNode);
		return importedNode;
	},
	push : function(node) {
		this.nodes.push(node);
		this.pushNS();
		return node;
	},
	peek : function() {
		return this.nodes[this.nodes.length - 1];
	},
	pop : function() {
		this.popNS();
		var result = this.nodes.pop();
		return result;
	},
	pushNS : function ()
	{
		var nindex = this.nsp.length - 1;
		var pindex = this.pns.length - 1;
		var parentNspItem = this.nsp[nindex];
		var parentPnsItem = this.pns[pindex];
		var nspItem = Jsonix.Util.Type.isObject(parentNspItem) ? nindex : parentNspItem;
		var pnsItem = Jsonix.Util.Type.isObject(parentPnsItem) ? pindex : parentPnsItem;
		this.nsp.push(nspItem);
		this.pns.push(pnsItem);
	},
	popNS : function ()
	{
		this.nsp.pop();
		this.pns.pop();
	},
	declareNamespaces : function ()
	{
		var index = this.nsp.length - 1;
		var nspItem = this.nsp[index];
		nspItem = Jsonix.Util.Type.isNumber(nspItem) ? this.nsp[nspItem] : nspItem;
		var ns, p;
		for (ns in nspItem)
		{
			if (nspItem.hasOwnProperty(ns))
			{
				p = nspItem[ns];
				this.declareNamespace(ns, p);
			}
		}
	},
	declareNamespace : function (ns, p)
	{
		var index = this.pns.length - 1;
		var pnsItem = this.pns[index];
		var reference;
		if (Jsonix.Util.Type.isNumber(pnsItem))
		{
			// Resolve the reference
			reference = true;
			pnsItem = this.pns[pnsItem];
		}
		else
		{
			reference = false;
		}
		// If this prefix is mapped to a different namespace and must be redeclared
		if (pnsItem[p] !== ns)
		{
			if (p === '')
			{
				this.writeAttribute({ns : Jsonix.XML.XMLNS_NS, lp : Jsonix.XML.XMLNS_P}, ns);
			}
			else
			{
				this.writeAttribute({ns : Jsonix.XML.XMLNS_NS, lp : p, p : Jsonix.XML.XMLNS_P}, ns);
			}
			if (reference)
			{
				// If this was a reference, clone it and replace the reference
				pnsItem = Jsonix.Util.Type.cloneObject(pnsItem, {});
				this.pns[index] = pnsItem;
			}
			pnsItem[p] = ns;
		}
	},
	getPrefix : function (ns, p)
	{
		var index = this.nsp.length - 1;
		var nspItem = this.nsp[index];
		var reference;
		if (Jsonix.Util.Type.isNumber(nspItem))
		{
			// This is a reference, the item is the index of the parent item
			reference = true;
			nspItem = this.nsp[nspItem];
		}
		else
		{
			reference = false;
		}
		if (Jsonix.Util.Type.isString(p))
		{
			var oldp = nspItem[ns];
			// If prefix is already declared and equals the proposed prefix 
			if (p === oldp)
			{
				// Nothing to do
			}
			else
			{
				// If this was a reference, we have to clone it now
				if (reference)
				{
					nspItem = Jsonix.Util.Type.cloneObject(nspItem, {});
					this.nsp[index] = nspItem;
				}
				nspItem[ns] = p;
			}
		}
		else
		{
			p = nspItem[ns];
			if (!Jsonix.Util.Type.exists(p)) {
				p = 'p' + (this.namespacePrefixIndex++);
				// If this was a reference, we have to clone it now
				if (reference)
				{
					nspItem = Jsonix.Util.Type.cloneObject(nspItem, {});
					this.nsp[index] = nspItem;
				}
				nspItem[ns] = p;
			}
		}
		return p;
	},
	CLASS_NAME : "Jsonix.XML.Output"
});
Jsonix.Model.TypeInfo = Jsonix.Class({
	name : null,
	initialize : function() {
	},
	CLASS_NAME : 'Jsonix.Model.TypeInfo'
});
Jsonix.Model.Adapter = Jsonix.Class({
	initialize : function() {
	},
	unmarshal: function(typeInfo, context, input, scope)
	{
		return typeInfo.unmarshal(context, input, scope);
	},
	marshal: function(typeInfo, value, context, output, scope)
	{
		typeInfo.marshal(value, context, output, scope);
	},	
	CLASS_NAME : "Jsonix.Model.Adapter"
});
Jsonix.Model.Adapter.INSTANCE = new Jsonix.Model.Adapter();
// TODO is this correct?
Jsonix.Model.Adapter.getAdapter = function (elementInfo)
{
	Jsonix.Util.Ensure.ensureObject(elementInfo);
	return Jsonix.Util.Type.exists(elementInfo.adapter) ? elementInfo.adapter : Jsonix.Model.Adapter.INSTANCE;
};
Jsonix.Model.ClassInfo = Jsonix
		.Class(Jsonix.Model.TypeInfo, {
			name : null,
			baseTypeInfo : null,
			instanceFactory : null,
			properties : null,
			structure : null,
			defaultElementNamespaceURI : '',
			defaultAttributeNamespaceURI : '',
			built : false,
			initialize : function(mapping) {
				Jsonix.Model.TypeInfo.prototype.initialize.apply(this, []);
				Jsonix.Util.Ensure.ensureObject(mapping);
				var n = mapping.name||mapping.n||undefined;
				Jsonix.Util.Ensure.ensureString(n);
				this.name = n;
				
				var dens = mapping.defaultElementNamespaceURI||mapping.dens||'';
				this.defaultElementNamespaceURI = dens;

				var dans = mapping.defaultAttributeNamespaceURI||mapping.dans||'';
				this.defaultAttributeNamespaceURI = dans;
				
				var bti = mapping.baseTypeInfo||mapping.bti||null;
				this.baseTypeInfo = bti;
				
				var inF = mapping.instanceFactory||mapping.inF||undefined;
				if (Jsonix.Util.Type.exists(inF)) {
					// TODO: should we support instanceFactory as functions?
					// For the pure JSON configuration?
					Jsonix.Util.Ensure.ensureFunction(inF);
					this.instanceFactory = inF;
				}
				
				this.properties = [];
				var ps = mapping.propertyInfos||mapping.ps||[];
				Jsonix.Util.Ensure.ensureArray(ps);
				for ( var index = 0; index < ps.length; index++) {
					this.p(ps[index]);
				}
			},
			// Obsolete
			destroy : function() {
			},
			build : function(context, module) {
				if (!this.built) {
					this.baseTypeInfo = context.resolveTypeInfo(this.baseTypeInfo, module);
					if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
						this.baseTypeInfo.build(context, module);
					}

					// Build properties in this context
					for ( var index = 0; index < this.properties.length; index++) {
						var propertyInfo = this.properties[index];
						propertyInfo.build(context, module);
					}

					// Build the structure
					var structure = {
						elements : null,
						attributes : {},
						anyAttribute : null,
						value : null,
						any : null
					};
					this.buildStructure(context, structure);
					this.structure = structure;
				}
			},
			buildStructure : function(context, structure) {
				if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
					this.baseTypeInfo.buildStructure(context, structure);
				}
				for ( var index = 0; index < this.properties.length; index++) {
					var propertyInfo = this.properties[index];
					propertyInfo.buildStructure(context, structure);
				}
			},
			unmarshal : function(context, input) {
				this.build(context);
				var result;
				
				if (this.instanceFactory) {
					result = new this.instanceFactory();
				}
				else
				{
					result = { TYPE_NAME : this.name }; 
				}
				
				if (input.eventType !== 1) {
					throw new Error("Parser must be on START_ELEMENT to read a class info.");
				}

				// Read attributes
				if (Jsonix.Util.Type.exists(this.structure.attributes)) {
					var attributeCount = input.getAttributeCount();
					if (attributeCount !== 0) {
						for ( var index = 0; index < attributeCount; index++) {
							var attributeNameKey = input
									.getAttributeNameKey(index);
							if (Jsonix.Util.Type
									.exists(this.structure.attributes[attributeNameKey])) {
								var attributeValue = input
										.getAttributeValue(index);
								if (Jsonix.Util.Type.isString(attributeValue)) {
									var attributePropertyInfo = this.structure.attributes[attributeNameKey];
									this.unmarshalPropertyValue(context, input,
											attributePropertyInfo, result,
											attributeValue);
								}
							}
						}
					}
				}
				// Read any attribute
				if (Jsonix.Util.Type.exists(this.structure.anyAttribute)) {
					var propertyInfo = this.structure.anyAttribute;
					this
							.unmarshalProperty(context, input, propertyInfo,
									result);
				}
				// Read elements
				if (Jsonix.Util.Type.exists(this.structure.elements)) {

					var et = input.next();
					while (et !== Jsonix.XML.Input.END_ELEMENT) {
						if (et === Jsonix.XML.Input.START_ELEMENT) {
							// New sub-element starts
							var elementNameKey = input.getNameKey();
							if (Jsonix.Util.Type
									.exists(this.structure.elements[elementNameKey])) {
								var elementPropertyInfo = this.structure.elements[elementNameKey];
								this.unmarshalProperty(context, input,
										elementPropertyInfo, result);
							} else if (Jsonix.Util.Type
									.exists(this.structure.any)) {
								// TODO Refactor

								var anyPropertyInfo = this.structure.any;
								this.unmarshalProperty(context, input,
										anyPropertyInfo, result);
							} else {
								// TODO optionally report a validation error that the element is not expected
								et = input.skipElement();
							}
						} else if ((et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE) && Jsonix.Util.Type.exists(this.structure.mixed)) {
							// Characters and structure has a mixed property
							var mixedPropertyInfo = this.structure.mixed;
							this.unmarshalProperty(context, input,
									mixedPropertyInfo, result);
						} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT	|| et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
							// Ignore
						} else {
							throw new Error("Illegal state: unexpected event type [" + et	+ "].");
						}
						et = input.next();
					}
				} else if (Jsonix.Util.Type.exists(this.structure.value)) {
					var valuePropertyInfo = this.structure.value;
					this.unmarshalProperty(context, input, valuePropertyInfo,
							result);
				} else {
					// Just skip everything
					input.nextTag();
				}
				if (input.eventType !== 2) {
					throw new Error("Illegal state: must be END_ELEMENT.");
				}
				return result;
			},
			unmarshalProperty : function(context, input, propertyInfo, result) {
				var propertyValue = propertyInfo
						.unmarshal(context, input, this);
				propertyInfo.setProperty(result, propertyValue);
			},
			unmarshalPropertyValue : function(context, input, propertyInfo,
					result, value) {
				var propertyValue = propertyInfo.unmarshalValue(value, context, input, this);
				propertyInfo.setProperty(result, propertyValue);
			},
			marshal : function(value, context, output) {
				// TODO This must be reworked
				if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
					this.baseTypeInfo.marshal(value, context, output);
				}
				for ( var index = 0; index < this.properties.length; index++) {
					var propertyInfo = this.properties[index];
					var propertyValue = value[propertyInfo.name];
					if (Jsonix.Util.Type.exists(propertyValue)) {
						propertyInfo.marshal(propertyValue, context, output, this);
					}
				}
			},
			isInstance : function(value, context, scope) {
				if (this.instanceFactory) {
					return value instanceof this.instanceFactory;
				}
				else {
					return Jsonix.Util.Type.isObject(value) && Jsonix.Util.Type.isString(value.TYPE_NAME) && value.TYPE_NAME === this.name;
				}
			},

			// Obsolete, left for backwards compatibility
			b : function(baseTypeInfo) {
				Jsonix.Util.Ensure.ensureObject(baseTypeInfo);
				this.baseTypeInfo = baseTypeInfo;
				return this;
			},
			// Obsolete, left for backwards compatibility
			ps : function() {
				return this;
			},
			p : function(property) {
				Jsonix.Util.Ensure.ensureObject(property);
				// If property is an instance of the property class
				if (property instanceof Jsonix.Model.PropertyInfo) {
					this.addProperty(property);
				}
				// Else create it via generic mapping configuration
				else {
					var type = property.type||property.t||'element';
					// Locate the creator function
					if (Jsonix.Util.Type
							.isFunction(this.propertyInfoCreators[type])) {
						var propertyInfoCreator = this.propertyInfoCreators[type];
						// Call the creator function
						propertyInfoCreator.call(this, property);
					} else {
						throw new Error("Unknown property info type [" + type + "].");
					}
				}
			},
			aa : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new Jsonix.Model.AnyAttributePropertyInfo(
								mapping));
			},
			ae : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new Jsonix.Model.AnyElementPropertyInfo(
								mapping));
			},
			a : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this.addProperty(new Jsonix.Model.AttributePropertyInfo(
						mapping));
			},
			em : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new Jsonix.Model.ElementMapPropertyInfo(
								mapping));
			},
			e : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this.addProperty(new Jsonix.Model.ElementPropertyInfo(
						mapping));
			},
			es : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this.addProperty(new Jsonix.Model.ElementsPropertyInfo(
						mapping));
			},
			er : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new Jsonix.Model.ElementRefPropertyInfo(
								mapping));
			},
			ers : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this
						.addProperty(new Jsonix.Model.ElementRefsPropertyInfo(
								mapping));
			},
			v : function(mapping) {
				this.addDefaultNamespaces(mapping);
				return this.addProperty(new Jsonix.Model.ValuePropertyInfo(
						mapping));
			},
			addDefaultNamespaces : function(mapping) {
				if (Jsonix.Util.Type.isObject(mapping)) {
					if (!Jsonix.Util.Type
							.isString(mapping.defaultElementNamespaceURI)) {
						mapping.defaultElementNamespaceURI = this.defaultElementNamespaceURI;
					}
					if (!Jsonix.Util.Type
							.isString(mapping.defaultAttributeNamespaceURI)) {
						mapping.defaultAttributeNamespaceURI = this.defaultAttributeNamespaceURI;
					}
				}
			},
			addProperty : function(property) {
				this.properties.push(property);
				return this;
			},
			CLASS_NAME : 'Jsonix.Model.ClassInfo'
		});
Jsonix.Model.ClassInfo.prototype.propertyInfoCreators = {
	"aa" : Jsonix.Model.ClassInfo.prototype.aa,
	"anyAttribute" : Jsonix.Model.ClassInfo.prototype.aa,
	"ae" : Jsonix.Model.ClassInfo.prototype.ae,
	"anyElement" : Jsonix.Model.ClassInfo.prototype.ae,
	"a" : Jsonix.Model.ClassInfo.prototype.a,
	"attribute" : Jsonix.Model.ClassInfo.prototype.a,
	"em" : Jsonix.Model.ClassInfo.prototype.em,
	"elementMap" : Jsonix.Model.ClassInfo.prototype.em,
	"e" : Jsonix.Model.ClassInfo.prototype.e,
	"element" : Jsonix.Model.ClassInfo.prototype.e,
	"es" : Jsonix.Model.ClassInfo.prototype.es,
	"elements" : Jsonix.Model.ClassInfo.prototype.es,
	"er" : Jsonix.Model.ClassInfo.prototype.er,
	"elementRef" : Jsonix.Model.ClassInfo.prototype.er,
	"ers" : Jsonix.Model.ClassInfo.prototype.ers,
	"elementRefs" : Jsonix.Model.ClassInfo.prototype.ers,
	"v" : Jsonix.Model.ClassInfo.prototype.v,
	"value" : Jsonix.Model.ClassInfo.prototype.v
};
Jsonix.Model.EnumLeafInfo = Jsonix.Class(Jsonix.Model.TypeInfo, {
	name : null,
	baseTypeInfo : 'String',
	entries : null,
	keys : null,
	values : null,
	built : false,
	initialize : function(mapping) {
		Jsonix.Model.TypeInfo.prototype.initialize.apply(this, []);
		Jsonix.Util.Ensure.ensureObject(mapping);
		
		var n = mapping.name||mapping.n||undefined;
		Jsonix.Util.Ensure.ensureString(n);
		this.name = n;
		
		var bti = mapping.baseTypeInfo||mapping.bti||'String';
		this.baseTypeInfo = bti;
		
		var vs = mapping.values||mapping.vs||undefined;
		Jsonix.Util.Ensure.ensureExists(vs);
		if (!(Jsonix.Util.Type.isObject(vs) || Jsonix.Util.Type.isArray(vs))) {
			throw new Error('Enum values must be either an array or an object.');
		}
		else
		{
			this.entries = vs;
		}		
	},
	build : function(context, module) {
		if (!this.built) {
			this.baseTypeInfo = context.resolveTypeInfo(this.baseTypeInfo, module);
			this.baseTypeInfo.build(context, module);
			var items = this.entries;
			var entries = {};
			var keys = [];
			var values = [];
			var index = 0;
			var key;
			var value;
			// If values is an array, process individual items
			if (Jsonix.Util.Type.isArray(items))
			{
				// Build properties in this context
				for (index = 0; index < items.length; index++) {
					value = items[index];
					if (Jsonix.Util.Type.isString(value)) {
						key = value;
						if (!(Jsonix.Util.Type.isFunction(this.baseTypeInfo.parse)))
						{
							throw new Error('Enum value is provided as string but the base type ['+this.baseTypeInfo.name+'] of the enum info [' + this.name + '] does not implement the parse method.');
						}
						// Using null as input since input is not available
						value = this.baseTypeInfo.parse(value, context, null, this);
					}
					else
					{
						if (this.baseTypeInfo.isInstance(value, context, this))
						{
							if (!(Jsonix.Util.Type.isFunction(this.baseTypeInfo.print)))
							{
								throw new Error('The base type ['+this.baseTypeInfo.name+'] of the enum info [' + this.name + '] does not implement the print method, unable to produce the enum key as string.');
							}
							// Using null as output since output is not available at this moment
							key = this.baseTypeInfo.print(value, context, null, this);
						}
						else
						{
							throw new Error('Enum value [' + value + '] is not an instance of the enum base type [' + this.baseTypeInfo.name + '].');
						}
					}
					entries[key] = value;
					keys[index] = key;
					values[index] = value;
				}
			}
			else if (Jsonix.Util.Type.isObject(items))
			{
				for (key in items) {
					if (items.hasOwnProperty(key)) {
						value = items[key];
						if (Jsonix.Util.Type.isString(value)) {
							if (!(Jsonix.Util.Type.isFunction(this.baseTypeInfo.parse)))
							{
								throw new Error('Enum value is provided as string but the base type ['+this.baseTypeInfo.name+'] of the enum info [' + this.name + '] does not implement the parse method.');
							}
							// Using null as input since input is not available
							value = this.baseTypeInfo.parse(value, context, null, this);
						}
						else
						{
							if (!this.baseTypeInfo.isInstance(value, context, this))
							{
								throw new Error('Enum value [' + value + '] is not an instance of the enum base type [' + this.baseTypeInfo.name + '].');
							}
						}
						entries[key] = value;
						keys[index] = key;
						values[index] = value;
						index++;
					}
				}
			}
			else {
				throw new Error('Enum values must be either an array or an object.');
			}
			this.entries = entries;
			this.keys = keys;
			this.values = values;
			this.built = true;
		}
	},
	unmarshal : function(context, input, scope) {
		var text = input.getElementText();
		if (Jsonix.Util.StringUtils.isNotBlank(text)) {
			return this.parse(text, context, input, scope);
		} else {
			return null;
		}
	},
	marshal : function(value, context, output, scope) {
		if (Jsonix.Util.Type.exists(value)) {
			output.writeCharacters(this.reprint(value, context, output, scope));
		}
	},
	reprint : function(value, context, output, scope) {
		if (Jsonix.Util.Type.isString(value) && !this.isInstance(value, context, scope)) {
			// Using null as input since input is not available
			return this.print(this.parse(value, context, null, scope), context, output, scope);
		} else {
			return this.print(value, context, output, scope);
		}
	},
	print : function(value, context, output, scope) {
		for (var index = 0; index < this.values.length; index++)
		{
			if (this.values[index] === value)
			{
				return this.keys[index];
			}
		}
		throw new Error('Value [' + value + '] is invalid for the enum type [' + this.name + '].');
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		if (this.entries.hasOwnProperty(text))
		{
			return this.entries[text];
		}
		else
		{
			throw new Error('Value [' + text + '] is invalid for the enum type [' + this.name + '].');
		}
	},
	isInstance : function(value, context, scope) {
		for (var index = 0; index < this.values.length; index++)
		{
			if (this.values[index] === value)
			{
				return true;
			}
		}
		return false;
	},
	CLASS_NAME : 'Jsonix.Model.EnumLeafInfo'
});
Jsonix.Model.ElementInfo = Jsonix.Class({
	elementName : null,
	typeInfo : null,
	substitutionHead : null,
	scope : null,
	built : false,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		
		var dens = mapping.defaultElementNamespaceURI||mapping.dens||'';
		this.defaultElementNamespaceURI = dens;
		
		var en = mapping.elementName || mapping.en||undefined;
		if (Jsonix.Util.Type.isObject(en)) {
			this.elementName = Jsonix.XML.QName.fromObject(en);
		} else {
			Jsonix.Util.Ensure.ensureString(en);
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
		}
		
		var ti = mapping.typeInfo||mapping.ti||'String';
		this.typeInfo = ti;
		
		var sh = mapping.substitutionHead||mapping.sh||null;
		this.substitutionHead = sh;
		
		var sc = mapping.scope||mapping.sc||null;
		this.scope = sc;
	},
	build : function(context, module) {
		// If element info is not yet built
		if (!this.built) {
			this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
			this.scope = context.resolveTypeInfo(this.scope, module);
			this.built = true;
		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementInfo'
});
Jsonix.Model.PropertyInfo = Jsonix
		.Class({
			name : null,
			collection : false,
			defaultElementNamespaceURI : '',
			defaultAttributeNamespaceURI : '',
			built : false,
			initialize : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				var n = mapping.name||mapping.n||undefined;
				Jsonix.Util.Ensure.ensureString(n);
				this.name = n;
				var dens = mapping.defaultElementNamespaceURI||mapping.dens||'';
				this.defaultElementNamespaceURI = dens;
				var dans = mapping.defaultAttributeNamespaceURI||mapping.dans||'';
				this.defaultAttributeNamespaceURI = dans;
				var col = mapping.collection||mapping.col||false;
				this.collection = col;
			},
			build : function(context, module) {
				if (!this.built) {
					this.doBuild(context, module);
					this.built = true;
				}
			},
			doBuild : function(context, module) {
				throw new Error("Abstract method [doBuild].");
			},
			buildStructure : function(context, structure) {
				throw new Error("Abstract method [buildStructure].");
			},
			setProperty : function(object, value) {
				if (Jsonix.Util.Type.exists(value)) {
					if (this.collection) {
						Jsonix.Util.Ensure.ensureArray(value,
								'Collection property requires an array value.');
						if (!Jsonix.Util.Type.exists(object[this.name])) {
							object[this.name] = [];
						}
						for ( var index = 0; index < value.length; index++) {
							object[this.name].push(value[index]);
						}

					} else {
						object[this.name] = value;
					}
				}
			},
			CLASS_NAME : 'Jsonix.Model.PropertyInfo'
		});
Jsonix.Model.AnyAttributePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
	},
	unmarshal : function(context, input, scope) {
		var attributeCount = input.getAttributeCount();
		if (attributeCount === 0) {
			return null;
		} else {
			var result = {};
			for ( var index = 0; index < attributeCount; index++) {
				var attributeNameKey = input.getAttributeNameKey(index);
				var attributeValue = input.getAttributeValue(index);
				if (Jsonix.Util.Type.isString(attributeValue)) {
					result[attributeNameKey] = attributeValue;
				}
			}
			return result;
		}
	},
	marshal : function(value, context, output, scope) {
		if (!Jsonix.Util.Type.isObject(value)) {
			// Nothing to do
			return;
		}
		for ( var attributeName in value) {
			if (value.hasOwnProperty(attributeName)) {
				var attributeValue = value[attributeName];
				if (Jsonix.Util.Type.isString(attributeValue)) {
					output.writeAttribute(Jsonix.XML.QName.fromString(attributeName), attributeValue);
				}
			}
		}

	},
	doBuild : function(context, module)	{
		// Nothing to do
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		// if (Jsonix.Util.Type.exists(structure.anyAttribute))
		// {
		// // TODO better exception
		// throw new Error("The structure already defines an any attribute
		// property.");
		// } else
		// {
		structure.anyAttribute = this;
		// }
	},
	CLASS_NAME : 'Jsonix.Model.AnyAttributePropertyInfo'
});

Jsonix.Model.SingleTypePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo,
		{
			typeInfo : 'String',
			initialize : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				Jsonix.Model.PropertyInfo.prototype.initialize.apply(this,
						[ mapping ]);
				var ti = mapping.typeInfo || mapping.ti || 'String';
				this.typeInfo = ti;
			},
			doBuild : function(context, module) {
				this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
			},
			unmarshalValue : function(value, context, input, scope) {
				return this.parse(value, context, input, scope);
			},
			parse : function(value, context, input, scope) {
				return this.typeInfo.parse(value, context, input, scope);
			},
			print : function(value, context, output, scope) {
				return this.typeInfo.reprint(value, context, output, scope);
			},
			CLASS_NAME : 'Jsonix.Model.SingleTypePropertyInfo'
		});

Jsonix.Model.AttributePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
	attributeName : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var an = mapping.attributeName||mapping.an||undefined;
		if (Jsonix.Util.Type.isObject(an)) {
			this.attributeName = Jsonix.XML.QName.fromObject(an);
		} else if (Jsonix.Util.Type.isString(an)) {
			this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, an);
		} else {
			this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, this.name);
		}
	},
	unmarshal : function(context, input, scope) {
		var attributeCount = input.getAttributeCount();
		var result = null;
		for ( var index = 0; index < attributeCount; index++) {
			var attributeNameKey = input.getAttributeNameKey(index);
			if (this.attributeName.key === attributeNameKey) {
				var attributeValue = input.getAttributeValue(index);
				if (Jsonix.Util.Type.isString(attributeValue)) {
					result = this.unmarshalValue(attributeValue, context, input, scope);
				}
			}
		}
		return result;
	},
	marshal : function(value, context, output, scope) {
		if (Jsonix.Util.Type.exists(value)) {
			output.writeAttribute(this.attributeName, this.print(value, context, output, scope));
		}

	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		Jsonix.Util.Ensure.ensureObject(structure.attributes);
		var key = this.attributeName.key;
		// if (Jsonix.Util.Type.exists(structure.attributes[key])) {
		// // TODO better exception
		// throw new Error("The structure already defines an attribute for the key
		// ["
		// + key + "].");
		// } else
		// {
		structure.attributes[key] = this;
		// }
	},
	CLASS_NAME : 'Jsonix.Model.AttributePropertyInfo'
});

Jsonix.Model.ValuePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ mapping ]);
	},
	unmarshal : function(context, input, scope) {
		var text = input.getElementText();
		if (Jsonix.Util.StringUtils.isNotBlank(text)) {
			return this.unmarshalValue(text, context, input, scope);
		} else {
			return null;
		}
	},
	marshal : function(value, context, output, scope) {
		if (!Jsonix.Util.Type.exists(value)) {
			return;
		}
		output.writeCharacters(this.print(value, context, output, scope));
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		// if (Jsonix.Util.Type.exists(structure.value)) {
		// // TODO better exception
		// throw new Error("The structure already defines a value
		// property.");
		// } else
		if (Jsonix.Util.Type.exists(structure.elements)) {
			// TODO better exception
			throw new Error("The structure already defines element mappings, it cannot define a value property.");
		} else {
			structure.value = this;
		}
	},
	CLASS_NAME : 'Jsonix.Model.ValuePropertyInfo'
});

Jsonix.Model.AbstractElementsPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	wrapperElementName : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var wen = mapping.wrapperElementName||mapping.wen||undefined;
		if (Jsonix.Util.Type.isObject(wen)) {
			this.wrapperElementName = Jsonix.XML.QName.fromObject(wen);
		} else if (Jsonix.Util.Type.isString(wen)) {
			this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, wen);
		} else {
			this.wrapperElementName = null;
		}
	},
	unmarshal : function(context, input, scope) {
		var result = null;
		var that = this;
		var callback = function(value) {
			if (that.collection) {
				if (result === null) {
					result = [];
				}
				result.push(value);

			} else {
				if (result === null) {
					result = value;
				} else {
					// TODO Report validation error
					throw new Error("Value already set.");
				}
			}
		};

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			this.unmarshalWrapperElement(context, input, scope, callback);
		} else {
			this.unmarshalElement(context, input, scope, callback);
		}
		return result;
	},
	unmarshalWrapperElement : function(context, input, scope, callback) {
		var et = input.next();
		while (et !== Jsonix.XML.Input.END_ELEMENT) {
			// New sub-element starts
			if (et === Jsonix.XML.Input.START_ELEMENT) {
				this.unmarshalElement(context, input, scope, callback);
			} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
				// Skip whitespace
			} else {
				// TODO ignore comments, processing
				// instructions
				throw new Error("Illegal state: unexpected event type [" + et + "].");
			}
			et = input.next();
		}
	},
	unmarshalElement : function(context, input, scope, callback) {
		throw new Error("Abstract method [unmarshalElement].");
	},
	marshal : function(value, context, output, scope) {

		if (!Jsonix.Util.Type.exists(value)) {
			// Do nothing
			return;
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeStartElement(this.wrapperElementName);
		}

		if (!this.collection) {
			this.marshalElement(value, context, output, scope);
		} else {
			Jsonix.Util.Ensure.ensureArray(value);
			// TODO Exception if not array
			for ( var index = 0; index < value.length; index++) {
				var item = value[index];
				// TODO Exception if item does not exist
				this.marshalElement(item, context, output, scope);
			}
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeEndElement();
		}
	},
	marshalElement : function(value, context, output, scope) {
		throw new Error("Abstract method [marshalElement].");
	},
	marshalElementTypeInfo : function(elementName, typeInfo,  value, context, output, scope) {
		output.writeStartElement(elementName);
		typeInfo.marshal(value, context, output, scope);
		output.writeEndElement();
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			structure.elements[this.wrapperElementName.key] = this;
		} else {
			this.buildStructureElements(context, structure);
		}
	},
	buildStructureElements : function(context, structure) {
		throw new Error("Abstract method [buildStructureElements].");
	},
	CLASS_NAME : 'Jsonix.Model.AbstractElementsPropertyInfo'
});

Jsonix.Model.ElementPropertyInfo = Jsonix.Class(
		Jsonix.Model.AbstractElementsPropertyInfo, {
			typeInfo : 'String',
			elementName : null,
			initialize : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize
						.apply(this, [ mapping ]);
				var ti = mapping.typeInfo||mapping.ti||'String';
				if (Jsonix.Util.Type.isObject(ti)) {
					this.typeInfo = ti;
				} else {
					Jsonix.Util.Ensure.ensureString(ti);
					this.typeInfo = ti;
				}
				var en = mapping.elementName||mapping.en||undefined;
				if (Jsonix.Util.Type.isObject(en)) {
					this.elementName = Jsonix.XML.QName.fromObject(en);
				} else if (Jsonix.Util.Type.isString(en)) {
					this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
				} else {
					this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
				}
			},
			unmarshalElement : function(context, input, scope, callback) {
				return callback(this.typeInfo.unmarshal(context, input, scope));
			},
			marshalElement : function(value, context, output, scope) {
				this.marshalElementTypeInfo(this.elementName, this.typeInfo, value, context, output, scope);
			},
			doBuild : function(context, module) {
				this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
			},
			buildStructureElements : function(context, structure) {
				structure.elements[this.elementName.key] = this;
			},
			CLASS_NAME : 'Jsonix.Model.ElementPropertyInfo'
		});

Jsonix.Model.ElementsPropertyInfo = Jsonix
		.Class(
				Jsonix.Model.AbstractElementsPropertyInfo,
				{
					elementTypeInfos : null,
					elementTypeInfosMap : null,
					initialize : function(mapping) {
						Jsonix.Util.Ensure.ensureObject(mapping);
						Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize
								.apply(this, [ mapping ]);
						var etis = mapping.elementTypeInfos||mapping.etis||[];
						Jsonix.Util.Ensure.ensureArray(etis);
						this.elementTypeInfos = etis;
					},
					unmarshalElement : function(context, input, scope, callback) {
						// TODO make sure it's the right event type
						var elementNameKey = input.getNameKey();
						var typeInfo = this.elementTypeInfosMap[elementNameKey];
						if (Jsonix.Util.Type.exists(typeInfo)) {
							return callback(typeInfo.unmarshal(context, input, scope));
						}
						// TODO better exception
						throw new Error("Element [" + elementNameKey + "] is not known in this context");
					},
					marshalElement : function(value, context, output, scope) {
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							var typeInfo = elementTypeInfo.typeInfo;
							if (typeInfo.isInstance(value, context, scope)) {
								var elementName = elementTypeInfo.elementName;
								this.marshalElementTypeInfo(elementName, typeInfo, value, context, output, scope);
								return;
							}
						}
						throw new Error("Could not find an element with type info supporting the value ["	+ value + "].");
					},
					doBuild : function(context, module) {
						this.elementTypeInfosMap = {};
						var etiti, etien;
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
							etiti = elementTypeInfo.typeInfo||elementTypeInfo.ti||'String';
							elementTypeInfo.typeInfo = context.resolveTypeInfo(etiti, module);
							etien = elementTypeInfo.elementName||elementTypeInfo.en||undefined;
							if (Jsonix.Util.Type.isObject(etien)) {
								elementTypeInfo.elementName = Jsonix.XML.QName.fromObject(etien);
							} else {
								Jsonix.Util.Ensure.ensureString(etien);
								elementTypeInfo.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, etien);
							}
							this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
						}
					},
					buildStructureElements : function(context, structure) {
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							structure.elements[elementTypeInfo.elementName.key] = this;
						}
					},
					CLASS_NAME : 'Jsonix.Model.ElementsPropertyInfo'
				});

Jsonix.Model.ElementMapPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, {
	elementName : null,
	key : null,
	value : null,
	entryTypeInfo : null,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		// TODO Ensure correct argument
		var k = mapping.key||mapping.k||undefined;
		Jsonix.Util.Ensure.ensureObject(k);
		var v = mapping.value||mapping.v||undefined;
		Jsonix.Util.Ensure.ensureObject(v);
		// TODO Ensure correct argument
		var en = mapping.elementName||mapping.en||undefined;
		if (Jsonix.Util.Type.isObject(en)) {
			this.elementName = Jsonix.XML.QName.fromObject(en);
		} else if (Jsonix.Util.Type.isString(en)) {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
		} else {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
		}
		this.entryTypeInfo = new Jsonix.Model.ClassInfo({
			name: 'Map<' + k.name + ',' + v.name + '>',
			propertyInfos : [ k, v ]
		});

	},
	unmarshalWrapperElement : function(context, input, scope) {
		var result = Jsonix.Model.AbstractElementsPropertyInfo.prototype.unmarshalWrapperElement.apply(this, arguments);
	},
	unmarshal : function(context, input, scope) {
		var result = null;
		var that = this;
		var callback = function(value) {

			if (Jsonix.Util.Type.exists(value)) {
				Jsonix.Util.Ensure.ensureObject(value, 'Map property requires an object.');
				if (!Jsonix.Util.Type.exists(result)) {
					result = {};
				}
				for ( var attributeName in value) {
					if (value.hasOwnProperty(attributeName)) {
						var attributeValue = value[attributeName];
						if (that.collection) {
							if (!Jsonix.Util.Type.exists(result[attributeName])) {
								result[attributeName] = [];
							}
							result[attributeName].push(attributeValue);
						} else {
							if (!Jsonix.Util.Type.exists(result[attributeName])) {
								result[attributeName] = attributeValue;
							} else {
								// TODO Report validation error
								throw new Error("Value was already set.");
							}
						}
					}
				}
			}
		};

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			this.unmarshalWrapperElement(context, input, scope, callback);
		} else {
			this.unmarshalElement(context, input, scope, callback);
		}
		return result;
	},
	unmarshalElement : function(context, input, scope, callback) {
		var entry = this.entryTypeInfo.unmarshal(context, input, scope);
		var result = {};
		if (!!entry[this.key.name]) {
			result[entry[this.key.name]] = entry[this.value.name];
		}
		return callback(result);
	},
	marshal : function(value, context, output, scope) {

		if (!Jsonix.Util.Type.exists(value)) {
			// Do nothing
			return;
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeStartElement(this.wrapperElementName);
		}

		this.marshalElement(value, context, output, scope);

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeEndElement();
		}
	},
	marshalElement : function(value, context, output, scope) {
		if (!!value) {
			for ( var attributeName in value) {
				if (value.hasOwnProperty(attributeName)) {
					var attributeValue = value[attributeName];
					if (!this.collection) {
						var singleEntry = {};
						singleEntry[this.key.name] = attributeName;
						singleEntry[this.value.name] = attributeValue;
						output.writeStartElement(this.elementName);
						this.entryTypeInfo.marshal(singleEntry, context, output, scope);
						output.writeEndElement();

					} else {
						for ( var index = 0; index < attributeValue.length; index++) {
							var collectionEntry = {};
							collectionEntry[this.key.name] = attributeName;
							collectionEntry[this.value.name] = attributeValue[index];
							output.writeStartElement(this.elementName);
							this.entryTypeInfo.marshal(collectionEntry, context, output, scope);
							output.writeEndElement();
						}
					}
				}
			}
		}
	},
	doBuild: function(context, module) {
		this.entryTypeInfo.build(context, module);
		// TODO get property by name
		this.key = this.entryTypeInfo.properties[0]; 
		this.value = this.entryTypeInfo.properties[1];
	},
	buildStructureElements : function(context, structure) {
		structure.elements[this.elementName.key] = this;
	},
	setProperty : function(object, value) {
		if (Jsonix.Util.Type.exists(value)) {
			Jsonix.Util.Ensure.ensureObject(value, 'Map property requires an object.');
			if (!Jsonix.Util.Type.exists(object[this.name])) {
				object[this.name] = {};
			}
			var map = object[this.name];
			for ( var attributeName in value) {
				if (value.hasOwnProperty(attributeName)) {
					var attributeValue = value[attributeName];
					if (this.collection) {
						if (!Jsonix.Util.Type.exists(map[attributeName])) {
							map[attributeName] = [];
						}

						for ( var index = 0; index < attributeValue.length; index++) {
							map[attributeName].push(attributeValue[index]);
						}
					} else {
						map[attributeName] = attributeValue;
					}
				}
			}
		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementMapPropertyInfo'
});

Jsonix.Model.AbstractElementRefsPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	wrapperElementName : null,
	mixed : true,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping, 'Mapping must be an object.');
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var wen = mapping.wrapperElementName||mapping.wen||undefined;
		var mx = mapping.mixed||mapping.mx||true;
		if (Jsonix.Util.Type.isObject(wen)) {
			this.wrapperElementName = Jsonix.XML.QName.fromObject(wen);
		} else if (Jsonix.Util.Type.isString(wen)) {
			this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, wen);
		} else {
			this.wrapperElementName = null;
		}
		this.mixed = mx;
	},
	unmarshal : function(context, input, scope) {
		var et = input.eventType;

		if (et === Jsonix.XML.Input.START_ELEMENT) {
			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				return this.unmarshalWrapperElement(context, input, scope);
			} else {
				return this.unmarshalElement(context, input, scope);
			}
		} else if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
			var value = input.getText();
			if (this.collection) {
				return [ value ];

			} else {
				return value;
			}
		} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
			// Skip whitespace
		} else {
			// TODO better exception
			throw new Error("Illegal state: unexpected event type [" + et + "].");
		}
	},
	unmarshalWrapperElement : function(context, input, scope) {
		var result = null;
		var et = input.next();
		while (et !== Jsonix.XML.Input.END_ELEMENT) {
			if (et === Jsonix.XML.Input.START_ELEMENT) {
				var value = this.unmarshalElement(context, input, scope);
				if (this.collection) {
					if (result === null) {
						result = [];
					}
					for ( var index = 0; index < value.length; index++) {
						result.push(value[index]);
					}

				} else {
					if (result === null) {
						result = value;
					} else {
						// TODO Report validation error
						throw new Error("Value already set.");
					}
				}
			} else
			// Characters
			if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
				var text = input.getText();
				if (this.collection) {
					if (result === null) {
						result = [];
					}
					result.push(text);
				} else {
					if (result === null) {
						result = text;
					} else {
						// TODO Report validation error
						throw new Error("Value already set.");
					}
				}
			} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
				// Skip whitespace
			} else {
				throw new Error("Illegal state: unexpected event type [" + et + "].");
			}
			et = input.next();
		}
		return result;
	},
	unmarshalElement : function(context, input, scope) {
		var name = input.getName();
		var typeInfo = this.getElementTypeInfo(context, name, scope);
		var value = {
			name : name,
			value : typeInfo.unmarshal(context, input, scope)
		};
		if (this.collection) {
			return [ value ];
		} else {
			return value;
		}
	},
	marshal : function(value, context, output, scope) {

		if (Jsonix.Util.Type.exists(value)) {
			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				output.writeStartElement(this.wrapperElementName);
			}

			if (!this.collection) {
				this.marshalItem(value, context, output, scope);
			} else {
				Jsonix.Util.Ensure.ensureArray(value, 'Collection property requires an array value.');
				for ( var index = 0; index < value.length; index++) {
					var item = value[index];
					this.marshalItem(item, context, output, scope);
				}
			}

			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				output.writeEndElement();
			}
		}

	},
	marshalItem : function(value, context, output, scope) {

		if (Jsonix.Util.Type.isString(value)) {
			if (!this.mixed) {
				// TODO
				throw new Error("Property is not mixed, can't handle string values.");
			} else {
				output.writeCharacters(value);
			}
		} else if (Jsonix.Util.Type.isObject(value)) {
			this.marshalElement(value, context, output, scope);

		} else {
			if (this.mixed) {
				throw new Error("Unsupported content type, either objects or strings are supported.");
			} else {
				throw new Error("Unsupported content type, only objects are supported.");
			}
		}

	},
	marshalElement : function(value, context, output, scope) {
		var elementName = Jsonix.XML.QName.fromObject(value.name);
		var typeInfo = this.getElementTypeInfo(context, elementName, scope);
		return this.marshalElementTypeInfo(elementName, typeInfo, value, context, output, scope);
	},
	marshalElementTypeInfo : function(elementName, typeInfo, value, context, output, scope) {
		output.writeStartElement(elementName);
		if (Jsonix.Util.Type.exists(value.value)) {
			typeInfo.marshal(value.value, context, output, scope);
		}
		output.writeEndElement();

	},
	getElementTypeInfo : function(context, elementName, scope) {
		var propertyElementTypeInfo = this.getPropertyElementTypeInfo(elementName);
		if (Jsonix.Util.Type.exists(propertyElementTypeInfo)) {
			return propertyElementTypeInfo.typeInfo;
		} else {
			var contextElementTypeInfo = context.getElementInfo(elementName, scope);
			if (Jsonix.Util.Type.exists(contextElementTypeInfo)) {
				return contextElementTypeInfo.typeInfo;
			} else {
				throw new Error("Element [" + elementName.key + "] is not known in this context.");
			}
		}

	},
	getPropertyElementTypeInfo : function(elementName) {
		throw new Error("Abstract method [getPropertyElementTypeInfo].");
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			structure.elements[this.wrapperElementName.key] = this;
		} else {
			this.buildStructureElements(context, structure);
		}

		// if (Jsonix.Util.Type.exists(structure.elements[key]))
		// {
		// // TODO better exception
		// throw new Error("The structure already defines an element for
		// the key ["
		// + key + "].");
		// } else
		// {
		// structure.elements[key] = this;
		// }

		if (this.mixed && !Jsonix.Util.Type.exists(this.wrapperElementName)) {
			// if (Jsonix.Util.Type.exists(structure.mixed)) {
			// // TODO better exception
			// throw new Error("The structure already defines the mixed
			// property.");
			// } else
			// {
			structure.mixed = this;
			// }
		}
	},
	buildStructureElements : function(context, structure) {
		throw new Error("Abstract method [buildStructureElements].");
	},
	buildStructureElementTypeInfos : function(context, structure, elementTypeInfo) {
		structure.elements[elementTypeInfo.elementName.key] = this;
		var substitutionMembers = context.getSubstitutionMembers(elementTypeInfo.elementName);
		if (Jsonix.Util.Type.isArray(substitutionMembers)) {
			for ( var jndex = 0; jndex < substitutionMembers.length; jndex++) {
				var substitutionElementInfo = substitutionMembers[jndex];
				this.buildStructureElementTypeInfos(context, structure, substitutionElementInfo);
			}

		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementRefPropertyInfo'
});

Jsonix.Model.ElementRefPropertyInfo = Jsonix
		.Class(
				Jsonix.Model.AbstractElementRefsPropertyInfo,
				{
					typeInfo : 'String',
					elementName : null,
					initialize : function(mapping) {
						Jsonix.Util.Ensure.ensureObject(mapping);
						Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize
								.apply(this, [ mapping ]);
						// TODO Ensure correct argument
						var ti = mapping.typeInfo||mapping.ti||'String';
						if (Jsonix.Util.Type.isObject(ti)) {
							this.typeInfo = ti;
						} else {
							Jsonix.Util.Ensure.ensureString(ti);
							this.typeInfo = ti;
						}
						var en = mapping.elementName||mapping.en||undefined;
						if (Jsonix.Util.Type.isObject(en)) {
							this.elementName = Jsonix.XML.QName.fromObject(en);
						} else if (Jsonix.Util.Type.isString(en)) {
							this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
						} else {
							this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
						}
					},
					getPropertyElementTypeInfo : function(elementName) {
						Jsonix.Util.Ensure.ensureObject(elementName);
						var name = Jsonix.XML.QName.fromObject(elementName);

						if (name.key === this.elementName.key) {
							return this;
						} else {
							return null;
						}
					},
					doBuild : function(context, module) {
						this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
					},
					buildStructureElements : function(context, structure) {
						this.buildStructureElementTypeInfos(context, structure,	this);
					},
					CLASS_NAME : 'Jsonix.Model.ElementRefPropertyInfo'
				});

Jsonix.Model.ElementRefsPropertyInfo = Jsonix
		.Class(
				Jsonix.Model.AbstractElementRefsPropertyInfo,
				{
					elementTypeInfos : null,
					elementTypeInfosMap : null,
					initialize : function(mapping) {
						Jsonix.Util.Ensure.ensureObject(mapping);
						Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize
								.apply(this, [ mapping ]);
						// TODO Ensure correct arguments
						var etis = mapping.elementTypeInfos||mapping.etis||[];
						Jsonix.Util.Ensure.ensureArray(etis);
						this.elementTypeInfos = etis;
					},
					getPropertyElementTypeInfo : function(elementName) {
						Jsonix.Util.Ensure.ensureObject(elementName);
						var name = Jsonix.XML.QName.fromObject(elementName);

						var typeInfo = this.elementTypeInfosMap[name.key];
						if (Jsonix.Util.Type.exists(typeInfo)) {
							return {
								elementName : name,
								typeInfo : typeInfo
							};
						} else {
							return null;
						}
					},
					doBuild : function(context, module) {
						this.elementTypeInfosMap = {};
						var etiti, etien;
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
							etiti = elementTypeInfo.typeInfo || elementTypeInfo.ti || 'String';
							elementTypeInfo.typeInfo = context.resolveTypeInfo(etiti, module);
							etien = elementTypeInfo.elementName || elementTypeInfo.en||undefined;
							if (Jsonix.Util.Type.isObject(etien)) {
								elementTypeInfo.elementName = Jsonix.XML.QName.fromObject(etien);
							} else {
								Jsonix.Util.Ensure
										.ensureString(etien);
								elementTypeInfo.elementName = new Jsonix.XML.QName(
										this.defaultElementNamespaceURI,
										etien);
							}
							this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
						}
					},
					buildStructureElements : function(context, structure) {
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							this.buildStructureElementTypeInfos(context, structure, elementTypeInfo);
						}
					},
					CLASS_NAME : 'Jsonix.Model.ElementRefsPropertyInfo'
				});

Jsonix.Model.AnyElementPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	allowDom : true,
	allowTypedObject : true,
	mixed : true,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ mapping ]);
		var dom = mapping.allowDom || mapping.dom || true;
		var typed = mapping.allowTypedObject || mapping.typed || true;
		var mx = mapping.mixed || mapping.mx || true;
		this.allowDom = dom;
		this.allowTypedObject = typed;
		this.mixed = mx;
	},
	unmarshal : function(context, input, scope) {
		var et = input.eventType;

		if (et === Jsonix.XML.Input.START_ELEMENT) {
			return this.unmarshalElement(context, input, scope);
		} else if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
			var value = input.getText();
			if (this.collection) {
				return [ value ];

			} else {
				return value;
			}
		} else if (this.mixed && (et === Jsonix.XML.Input.SPACE)) {
			// Whitespace
			return null;
		} else if (et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
			return null;

		} else {
			// TODO better exception
			throw new Error("Illegal state: unexpected event type [" + et + "].");

		}
	},
	unmarshalElement : function(context, input, scope) {

		var name = input.getName();
		var value;

		if (this.allowTypedObject && Jsonix.Util.Type.exists(context.getElementInfo(name, scope))) {
			// TODO optimize
			var elementDeclaration = context.getElementInfo(name, scope);
			var typeInfo = elementDeclaration.typeInfo;
			var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
			value = {
				name : name,
				value : adapter.unmarshal(typeInfo, context, input, scope)
			};
		} else if (this.allowDom) {
			value = input.getElement();
		} else {
			// TODO better exception
			throw new Error("Element [" + name.toString() + "] is not known in this context and property does not allow DOM.");
		}
		if (this.collection) {
			return [ value ];
		} else {
			return value;
		}
	},
	marshal : function(value, context, output, scope) {
		if (!Jsonix.Util.Type.exists(value)) {
			return;
		}
		if (!this.collection) {
			this.marshalItem(value, context, output, scope);
		} else {
			Jsonix.Util.Ensure.ensureArray(value);
			for ( var index = 0; index < value.length; index++) {
				this.marshalItem(value[index], context, output, scope);
			}
		}
	},
	marshalItem : function(value, context, output, scope) {
		if (this.mixed && Jsonix.Util.Type.isString(value)) {
			// Mixed
			output.writeCharacters(value);
		} else if (this.allowDom && Jsonix.Util.Type.exists(value.nodeType)) {
			// DOM node
			output.writeNode(value);

		} else {
			// Typed object
			var name = Jsonix.XML.QName.fromObject(value.name);
			if (this.allowTypedObject && Jsonix.Util.Type.exists(context.getElementInfo(name, scope))) {
				var elementDeclaration = context.getElementInfo(name, scope);
				var typeInfo = elementDeclaration.typeInfo;
				var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
				output.writeStartElement(name);
				adapter.marshal(typeInfo, value.value, context, output, scope);
				output.writeEndElement();
			} else {
				// TODO better exception
				throw new Error("Element [" + name.toString() + "] is not known in this context");
			}
		}
	},
	doBuild : function(context, module)	{
		// Nothing to do
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if ((this.allowDom || this.allowTypedObject)) {
			// if (Jsonix.Util.Type.exists(structure.any)) {
			// // TODO better exception
			// throw new Error("The structure already defines the any
			// property.");
			// } else
			// {
			structure.any = this;
			// }
		}
		if (this.mixed) {
			// if (Jsonix.Util.Type.exists(structure.mixed)) {
			// // TODO better exception
			// throw new Error("The structure already defines the mixed
			// property.");
			// } else
			// {
			structure.mixed = this;
			// }
		}
	},
	CLASS_NAME : 'Jsonix.Model.AnyElementPropertyInfo'
});

Jsonix.Model.Module = Jsonix
		.Class({
			name : null,
			typeInfos : null,
			elementInfos : null,
			defaultElementNamespaceURI : '',
			defaultAttributeNamespaceURI : '',
			initialize : function(mapping) {
				this.typeInfos = [];
				this.elementInfos = [];
				if (typeof mapping !== 'undefined') {
					Jsonix.Util.Ensure.ensureObject(mapping);
					var n = mapping.name||mapping.n||null;
					this.name = n;
					var dens = mapping.defaultElementNamespaceURI||mapping.dens||'';
					this.defaultElementNamespaceURI = dens;
					var dans = mapping.defaultAttributeNamespaceURI||mapping.dans||'';
					this.defaultAttributeNamespaceURI = dans;
					// Initialize type infos
					var tis = mapping.typeInfos||mapping.tis||[];
					this.initializeTypeInfos(tis);

					// Backwards compatibility: class infos can also be defined
					// as properties of the schema, for instance Schema.MyType
					for ( var typeInfoName in mapping) {
						if (mapping.hasOwnProperty(typeInfoName)) {
							if (mapping[typeInfoName] instanceof Jsonix.Model.ClassInfo) {
								this.typeInfos.push(mapping[typeInfoName]);
							}
						}
					}
					var eis = mapping.elementInfos||mapping.eis||[];
					// Initialize element infos
					this.initializeElementInfos(eis);
				}
			},
			initializeTypeInfos : function(typeInfoMappings) {
				Jsonix.Util.Ensure.ensureArray(typeInfoMappings);
				var index, typeInfoMapping, typeInfo;
				for (index = 0; index < typeInfoMappings.length; index++) {
					typeInfoMapping = typeInfoMappings[index];
					typeInfo = this.createTypeInfo(typeInfoMapping);
					this.typeInfos.push(typeInfo);
				}
			},
			initializeElementInfos : function(elementInfoMappings) {
				Jsonix.Util.Ensure.ensureArray(elementInfoMappings);
				var index, elementInfoMapping, elementInfo;
				for (index = 0; index < elementInfoMappings.length; index++) {
					elementInfoMapping = elementInfoMappings[index];
					elementInfo = this.createElementInfo(elementInfoMapping);
					this.elementInfos.push(elementInfo);
				}
			},
			createTypeInfo : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				var typeInfo;
				// If mapping is already a type info, do nothing
				if (mapping instanceof Jsonix.Model.TypeInfo) {
					typeInfo = mapping;
				}
				// Else create it via generic mapping configuration
				else {
					var type = mapping.type||mapping.t||'classInfo';
					// Locate the creator function
					if (Jsonix.Util.Type
							.isFunction(this.typeInfoCreators[type])) {
						var typeInfoCreator = this.typeInfoCreators[type];
						// Call the creator function
						typeInfo = typeInfoCreator.call(this, mapping);
					} else {
						throw new Error("Unknown type info type [" + type + "].");
					}
				}
				return typeInfo;
			},
			initializeNames : function(mapping) {
				var ln = mapping.localName||mapping.ln||null;
				mapping.localName = ln;
				var n = mapping.name||mapping.n||null;
				mapping.name = n;
				// Calculate both name as well as localName
				// name is provided
				if (Jsonix.Util.Type.isString(mapping.name)) {
					// Nothing to do - only name matters
					
					// Obsolete code below
//					// localName is not provided
//					if (!Jsonix.Util.Type.isString(mapping.localName)) {
//						// But module name is provided
//						if (Jsonix.Util.Type.isString(this.name)) {
//							// If name starts with module name, use second part
//							// as local name
//							if (mapping.name.indexOf(this.name + '.') === 0) {
//								mapping.localName = mapping.name
//										.substring(this.name.length + 1);
//							}
//							// Else use name as local name
//							else {
//								mapping.localName = mapping.name;
//							}
//						}
//						// Module name is not provided, use name as local name
//						else {
//							mapping.localName = mapping.name;
//						}
//					}
					if (mapping.name.length > 0 && mapping.name.charAt(0) === '.' && Jsonix.Util.Type.isString(this.name))
					{
						mapping.name = this.name + mapping.name;
					}
				}
				// name is not provided but local name is provided
				else if (Jsonix.Util.Type.isString(mapping.localName)) {
					// Module name is provided
					if (Jsonix.Util.Type.isString(this.name)) {
						mapping.name = this.name + '.' + mapping.localName;
					}
					// Module name is not provided
					else {
						mapping.name = mapping.localName;
					}
				} else {
					throw new Error("Neither [name/n] nor [localName/ln] was provided for the class info.");
				}
			},
			createClassInfo : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				var dens = mapping.defaultElementNamespaceURI||mapping.dens||this.defaultElementNamespaceURI;
				mapping.defaultElementNamespaceURI = dens;
				var dans = mapping.defaultAttributeNamespaceURI||mapping.dans||this.defaultAttributeNamespaceURI;
				mapping.defaultAttributeNamespaceURI = dans;
				this.initializeNames(mapping);
				// Now both name an local name are initialized
				var classInfo = new Jsonix.Model.ClassInfo(mapping);
				return classInfo;
			},
			createEnumLeafInfo : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				this.initializeNames(mapping);
				// Now both name an local name are initialized
				var enumLeafInfo = new Jsonix.Model.EnumLeafInfo(mapping);
				return enumLeafInfo;
			},
			createList : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				var ti = mapping.baseTypeInfo||mapping.typeInfo||mapping.bti||mapping.ti||'String';
				var tn = mapping.typeName||mapping.tn||null;
				var s = mapping.separator||mapping.sep||' ';
				Jsonix.Util.Ensure.ensureExists(ti);
				return new Jsonix.Schema.XSD.List(ti, tn, s);
			},
			createElementInfo : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				var dens = mapping.defaultElementNamespaceURI||mapping.dens||this.defaultElementNamespaceURI;
				mapping.defaultElementNamespaceURI = dens;
				var en = mapping.elementName||mapping.en||undefined;
				Jsonix.Util.Ensure.ensureExists(en);
				
				var ti = mapping.typeInfo||mapping.ti||'String';
				Jsonix.Util.Ensure.ensureExists(ti);
				
				mapping.typeInfo = ti;
				if (Jsonix.Util.Type.isObject(en)) {
					mapping.elementName = Jsonix.XML.QName.fromObject(en);
				} else if (Jsonix.Util.Type.isString(en)) {
					mapping.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
				} else {
					throw new Error('Element info [' + mapping + '] must provide an element name.');
				}
				
				var sh = mapping.substitutionHead||mapping.sh||null;
				if (Jsonix.Util.Type.exists(sh)) {
					if (Jsonix.Util.Type.isObject(sh)) {
						mapping.substitutionHead = Jsonix.XML.QName.fromObject(sh);
					} else {
						Jsonix.Util.Ensure.ensureString(sh);
						mapping.substitutionHead = new Jsonix.XML.QName(this.defaultElementNamespaceURI, sh);
					}
				}
				
				var elementInfo = new Jsonix.Model.ElementInfo(mapping);
				return elementInfo;
			},
			registerTypeInfos : function(context) {
				for ( var index = 0; index < this.typeInfos.length; index++) {
					var typeInfo = this.typeInfos[index];
					context.registerTypeInfo(typeInfo, this);
				}
			},
			buildTypeInfos : function(context) {
				for ( var index = 0; index < this.typeInfos.length; index++) {
					var typeInfo = this.typeInfos[index];
					typeInfo.build(context, this);
				}
			},
			registerElementInfos : function(context) {
				for ( var index = 0; index < this.elementInfos.length; index++) {
					var elementInfo = this.elementInfos[index];
					context.registerElementInfo(elementInfo, this);
				}
			},
			buildElementInfos : function(context) {
				for ( var index = 0; index < this.elementInfos.length; index++) {
					var elementInfo = this.elementInfos[index];
					elementInfo.build(context, this);
				}
			},
			// Obsolete, retained for backwards compatibility
			cs : function() {
				return this;
			},
			// Obsolete, retained for backwards compatibility
			es : function() {
				return this;
			},
			CLASS_NAME : 'Jsonix.Model.Module'
		});
Jsonix.Model.Module.prototype.typeInfoCreators = {
	"classInfo" : Jsonix.Model.Module.prototype.createClassInfo,
	"c" : Jsonix.Model.Module.prototype.createClassInfo,
	"enumInfo" : Jsonix.Model.Module.prototype.createEnumLeafInfo,
	"enum" : Jsonix.Model.Module.prototype.createEnumLeafInfo,
	"list" : Jsonix.Model.Module.prototype.createList,
	"l" : Jsonix.Model.Module.prototype.createList
};
Jsonix.Schema.XSD = {};
Jsonix.Schema.XSD.NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema';
Jsonix.Schema.XSD.PREFIX = 'xsd';
Jsonix.Schema.XSD.qname = function(localPart) {
	Jsonix.Util.Ensure.ensureString(localPart);
	return new Jsonix.XML.QName(Jsonix.Schema.XSD.NAMESPACE_URI, localPart,
			Jsonix.Schema.XSD.PREFIX);
};

Jsonix.Schema.XSD.AnyType = Jsonix.Class(Jsonix.Model.ClassInfo, {
	typeName : Jsonix.Schema.XSD.qname('anyType'),
	initialize : function() {
		Jsonix.Model.ClassInfo.prototype.initialize.call(this, {
			name : 'AnyType',
			propertyInfos : [ {
				type : 'anyAttribute',
				name : 'attributes'
			}, {
				type : 'anyElement',
				name : 'content',
				collection : true
			} ]
		});
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnyType'
});
Jsonix.Schema.XSD.AnyType.INSTANCE = new Jsonix.Schema.XSD.AnyType();
Jsonix.Schema.XSD.AnySimpleType = Jsonix.Class(Jsonix.Model.TypeInfo, {
	name : 'AnySimpleType',
	typeName : Jsonix.Schema.XSD.qname('anySimpleType'),
	initialize : function() {
		Jsonix.Model.TypeInfo.prototype.initialize.apply(this, []);
	},	
	print : function(value, context, output, scope) {
		throw new Error('Abstract method [print].');
	},
	parse : function(text, context, input, scope) {
		throw new Error('Abstract method [parse].');
	},
	reprint : function(value, context, output, scope) {
		// Only reprint when the value is a string but not an instance
		if (Jsonix.Util.Type.isString(value) && !this.isInstance(value, context, scope)) {
			// Using null as input as input is not available
			return this.print(this.parse(value, context, null, scope), context, output, scope);
		}
		else
		{
			return this.print(value, context, output, scope);
		}
	},
	unmarshal : function(context, input, scope) {
		var text = input.getElementText();
		if (Jsonix.Util.StringUtils.isNotBlank(text)) {
			return this.parse(text, context, input, scope);
		} else {
			return null;
		}
	},
	marshal : function(value, context, output, scope) {
		if (Jsonix.Util.Type.exists(value)) {
			output.writeCharacters(this.reprint(value, context, output, scope));
		}
	},
	build: function(context, module)
	{
		// Nothing to do
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnySimpleType'
});

Jsonix.Schema.XSD.List = Jsonix
		.Class(
				Jsonix.Schema.XSD.AnySimpleType,
				{
					name : null,
					typeName : null,
					typeInfo : null,
					separator : ' ',
					trimmedSeparator : Jsonix.Util.StringUtils.whitespaceCharacters,
					simpleType : true,
					built : false,
					initialize : function(typeInfo, typeName, separator) {
						Jsonix.Util.Ensure.ensureExists(typeInfo);
						// TODO Ensure correct argument
						this.typeInfo = typeInfo;
						if (!Jsonix.Util.Type.exists(this.name)) {
							this.name = typeInfo.name + "*";
						}
						if (Jsonix.Util.Type.exists(typeName)) {
							// TODO Ensure correct argument
							this.typeName = typeName;
						}

						if (Jsonix.Util.Type.isString(separator)) {
							// TODO Ensure correct argument
							this.separator = separator;
						} else {
							this.separator = ' ';
						}

						var trimmedSeparator = Jsonix.Util.StringUtils
								.trim(this.separator);
						if (trimmedSeparator.length === 0) {
							this.trimmedSeparator = Jsonix.Util.StringUtils.whitespaceCharacters;
						} else {
							this.trimmedSeparator = trimmedSeparator;
						}
					},
					build : function(context, module) {
						if (!this.built) {
							this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
							this.built = true;
						}
					},
					print : function(value, context, output, scope) {
						if (!Jsonix.Util.Type.exists(value)) {
							return null;
						}
						// TODO Exception if not an array
						Jsonix.Util.Ensure.ensureArray(value);
						var result = '';
						for ( var index = 0; index < value.length; index++) {
							if (index > 0) {
								result = result + this.separator;
							}
							result = result + this.typeInfo.reprint(value[index], context, output, scope);
						}
						return result;
					},
					parse : function(text, context, input, scope) {
						Jsonix.Util.Ensure.ensureString(text);
						var items = Jsonix.Util.StringUtils
								.splitBySeparatorChars(text,
										this.trimmedSeparator);
						var result = [];
						for ( var index = 0; index < items.length; index++) {
							result.push(this.typeInfo
									.parse(Jsonix.Util.StringUtils.trim(items[index]), context, input, scope));
						}
						return result;
					},
					// TODO isInstance?
					CLASS_NAME : 'Jsonix.Schema.XSD.List'
				});

Jsonix.Schema.XSD.String = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'String',
	typeName : Jsonix.Schema.XSD.qname('string'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureString(value);
		return value;
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		return text;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isString(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.String'
});
Jsonix.Schema.XSD.String.INSTANCE = new Jsonix.Schema.XSD.String();
Jsonix.Schema.XSD.String.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.String.INSTANCE);
Jsonix.Schema.XSD.Strings = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'Strings',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.String.INSTANCE, Jsonix.Schema.XSD.qname('strings'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Strings'
});
Jsonix.Schema.XSD.Strings.INSTANCE = new Jsonix.Schema.XSD.Strings();
Jsonix.Schema.XSD.NormalizedString = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'NormalizedString',
	typeName : Jsonix.Schema.XSD.qname('normalizedString'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NormalizedString'
});
Jsonix.Schema.XSD.NormalizedString.INSTANCE = new Jsonix.Schema.XSD.NormalizedString();
Jsonix.Schema.XSD.NormalizedString.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NormalizedString.INSTANCE);
Jsonix.Schema.XSD.Token = Jsonix.Class(Jsonix.Schema.XSD.NormalizedString, {
	name : 'Token',
	typeName : Jsonix.Schema.XSD.qname('token'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Token'
});
Jsonix.Schema.XSD.Token.INSTANCE = new Jsonix.Schema.XSD.Token();
Jsonix.Schema.XSD.Token.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Token.INSTANCE);
Jsonix.Schema.XSD.Language = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'Language',
	typeName : Jsonix.Schema.XSD.qname('language'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Language'
});
Jsonix.Schema.XSD.Language.INSTANCE = new Jsonix.Schema.XSD.Language();
Jsonix.Schema.XSD.Language.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Language.INSTANCE);
Jsonix.Schema.XSD.Name = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'Name',
	typeName : Jsonix.Schema.XSD.qname('Name'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Name'
});
Jsonix.Schema.XSD.Name.INSTANCE = new Jsonix.Schema.XSD.Name();
Jsonix.Schema.XSD.Name.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Name.INSTANCE);
Jsonix.Schema.XSD.NCName = Jsonix.Class(Jsonix.Schema.XSD.Name, {
	name : 'NCName',
	typeName : Jsonix.Schema.XSD.qname('NCName'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NCName'
});
Jsonix.Schema.XSD.NCName.INSTANCE = new Jsonix.Schema.XSD.NCName();
Jsonix.Schema.XSD.NCName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NCName.INSTANCE);
Jsonix.Schema.XSD.NMToken = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'NMToken',
	typeName : Jsonix.Schema.XSD.qname('NMTOKEN'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NMToken'
});
Jsonix.Schema.XSD.NMToken.INSTANCE = new Jsonix.Schema.XSD.NMToken();
Jsonix.Schema.XSD.NMTokens = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'NMTokens',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.NMToken.INSTANCE, Jsonix.Schema.XSD.qname('NMTOKEN'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NMTokens'
});
Jsonix.Schema.XSD.NMTokens.INSTANCE = new Jsonix.Schema.XSD.NMTokens();
Jsonix.Schema.XSD.Boolean = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Boolean',
	typeName : Jsonix.Schema.XSD.qname('boolean'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureBoolean(value);
		return value ? 'true' : 'false';
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text === 'true' || text === '1') {
			return true;
		} else if (text === 'false' || text === '0') {
			return false;
		} else {
			throw new Error("Either [true], [1], [0] or [false] expected as boolean value.");
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isBoolean(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Boolean'
});
Jsonix.Schema.XSD.Boolean.INSTANCE = new Jsonix.Schema.XSD.Boolean();
Jsonix.Schema.XSD.Boolean.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Boolean.INSTANCE);
Jsonix.Schema.XSD.Base64Binary = Jsonix
		.Class(
				Jsonix.Schema.XSD.AnySimpleType,
				{
					name : 'Base64Binary',
					typeName : Jsonix.Schema.XSD.qname('base64Binary'),
					charToByte : {},
					byteToChar : [],
					initialize : function() {
						Jsonix.Schema.XSD.AnySimpleType.prototype.initialize
								.apply(this);
						// Initialize charToByte and byteToChar table for fast
						// lookups
						var charTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
						for ( var i = 0; i < charTable.length; i++) {
							var _char = charTable.charAt(i);
							var _byte = charTable.charCodeAt(i);
							this.byteToChar[i] = _char;
							this.charToByte[_char] = i;
						}
					},
					print : function(value, context, output, scope) {
						Jsonix.Util.Ensure.ensureArray(value);
						return this.encode(value);
					},

					parse : function(text, context, input, scope) {
						Jsonix.Util.Ensure.ensureString(text);
						return this.decode(text);
					},
					encode : function(uarray) {
						var output = "";
						var byte0;
						var byte1;
						var byte2;
						var char0;
						var char1;
						var char2;
						var char3;
						var i = 0;
						var j = 0;
						var length = uarray.length;

						for (i = 0; i < length; i += 3) {
							byte0 = uarray[i] & 0xFF;
							char0 = this.byteToChar[byte0 >> 2];

							if (i + 1 < length) {
								byte1 = uarray[i + 1] & 0xFF;
								char1 = this.byteToChar[((byte0 & 0x03) << 4)
										| (byte1 >> 4)];
								if (i + 2 < length) {
									byte2 = uarray[i + 2] & 0xFF;
									char2 = this.byteToChar[((byte1 & 0x0F) << 2)
											| (byte2 >> 6)];
									char3 = this.byteToChar[byte2 & 0x3F];
								} else {
									char2 = this.byteToChar[(byte1 & 0x0F) << 2];
									char3 = "=";
								}
							} else {
								char1 = this.byteToChar[(byte0 & 0x03) << 4];
								char2 = "=";
								char3 = "=";
							}
							output = output + char0 + char1 + char2 + char3;
						}
						return output;
					},
					decode : function(text) {

						input = text.replace(/[^A-Za-z0-9\+\/\=]/g, "");

						var length = (input.length / 4) * 3;
						if (input.charAt(input.length - 1) === "=") {
							length--;
						}
						if (input.charAt(input.length - 2) === "=") {
							length--;
						}

						var uarray = new Array(length);

						var byte0;
						var byte1;
						var byte2;
						var char0;
						var char1;
						var char2;
						var char3;
						var i = 0;
						var j = 0;

						for (i = 0; i < length; i += 3) {
							// get the 3 octects in 4 ascii chars
							char0 = this.charToByte[input.charAt(j++)];
							char1 = this.charToByte[input.charAt(j++)];
							char2 = this.charToByte[input.charAt(j++)];
							char3 = this.charToByte[input.charAt(j++)];

							byte0 = (char0 << 2) | (char1 >> 4);
							byte1 = ((char1 & 0x0F) << 4) | (char2 >> 2);
							byte2 = ((char2 & 0x03) << 6) | char3;

							uarray[i] = byte0;
							if (char2 != 64) {
								uarray[i + 1] = byte1;
							}
							if (char3 != 64) {
								uarray[i + 2] = byte2;
							}
						}
						return uarray;
					},
					isInstance : function(value, context, scope) {
						return Jsonix.Util.Type.isArray(value);
					},
					CLASS_NAME : 'Jsonix.Schema.XSD.Base64Binary'
				});
Jsonix.Schema.XSD.Base64Binary.INSTANCE = new Jsonix.Schema.XSD.Base64Binary();
Jsonix.Schema.XSD.Base64Binary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Base64Binary.INSTANCE);
Jsonix.Schema.XSD.HexBinary = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'HexBinary',
	typeName : Jsonix.Schema.XSD.qname('hexBinary'),
	charToQuartet : {},
	byteToDuplet : [],
	initialize : function() {
		Jsonix.Schema.XSD.AnySimpleType.prototype.initialize.apply(this);
		var charTableUpperCase = "0123456789ABCDEF";
		var charTableLowerCase = charTableUpperCase.toLowerCase();
		var i;
		for (i = 0; i < 16; i++) {
			this.charToQuartet[charTableUpperCase.charAt(i)] = i;
			if (i >= 0xA) {
				this.charToQuartet[charTableLowerCase.charAt(i)] = i;
			}
		}
		for (i = 0; i < 256; i++) {
			this.byteToDuplet[i] =
			//
			charTableUpperCase[i >> 4] + charTableUpperCase[i & 0xF];
		}
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureArray(value);
		return this.encode(value);
	},

	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		return this.decode(text);
	},
	encode : function(uarray) {
		var output = "";
		for ( var i = 0; i < uarray.length; i++) {
			output = output + this.byteToDuplet[uarray[i] & 0xFF];
		}
		return output;
	},
	decode : function(text) {
		var input = text.replace(/[^A-Fa-f0-9]/g, "");
		// Round by two
		var length = input.length >> 1;
		var uarray = new Array(length);
		for ( var i = 0; i < length; i++) {
			var char0 = input.charAt(2 * i);
			var char1 = input.charAt(2 * i + 1);
			uarray[i] = this.charToQuartet[char0] << 4
					| this.charToQuartet[char1];
		}
		return uarray;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isArray(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.HexBinary'
});
Jsonix.Schema.XSD.HexBinary.INSTANCE = new Jsonix.Schema.XSD.HexBinary();
Jsonix.Schema.XSD.HexBinary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.HexBinary.INSTANCE);
Jsonix.Schema.XSD.Number = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Number',
	typeName : Jsonix.Schema.XSD.qname('number'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureNumberOrNaN(value);
		if (Jsonix.Util.Type.isNaN(value)) {
			return 'NaN';
		} else if (value === Infinity) {
			return 'INF';
		} else if (value === -Infinity) {
			return '-INF';
		} else {
			var text = String(value);
			return text;
		}
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text === '-INF') {
			return -Infinity;
		} else if (text === 'INF') {
			return Infinity;
		} else if (text === 'NaN') {
			return NaN;
		} else {
			var value = Number(text);
			Jsonix.Util.Ensure.ensureNumber(value);
			return value;
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isNumberOrNaN(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Number'
});
Jsonix.Schema.XSD.Number.INSTANCE = new Jsonix.Schema.XSD.Number();
Jsonix.Schema.XSD.Number.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Number.INSTANCE);
Jsonix.Schema.XSD.Float = Jsonix.Class(Jsonix.Schema.XSD.Number, {
	name : 'Float',
	typeName : Jsonix.Schema.XSD.qname('float'),
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || (Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE);
	},
	MIN_VALUE : -3.4028235e+38,
	MAX_VALUE : 3.4028235e+38,
	CLASS_NAME : 'Jsonix.Schema.XSD.Float'
});
Jsonix.Schema.XSD.Float.INSTANCE = new Jsonix.Schema.XSD.Float();
Jsonix.Schema.XSD.Float.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Float.INSTANCE);
Jsonix.Schema.XSD.Decimal = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Decimal',
	typeName : Jsonix.Schema.XSD.qname('decimal'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureNumber(value);
		var text = String(value);
		return text;
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		var value = Number(text);
		Jsonix.Util.Ensure.ensureNumber(value);
		return value;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isNumber(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Decimal'
});
Jsonix.Schema.XSD.Decimal.INSTANCE = new Jsonix.Schema.XSD.Decimal();
Jsonix.Schema.XSD.Decimal.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Decimal.INSTANCE);
Jsonix.Schema.XSD.Integer = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Integer',
	typeName : Jsonix.Schema.XSD.qname('integer'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureInteger(value);
		var text = String(value);
		return text;
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		var value = Number(text);
		Jsonix.Util.Ensure.ensureInteger(value);
		return value;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.NumberUtils.isInteger(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE;
	},
	MIN_VALUE : -9223372036854775808,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.Integer'
});
Jsonix.Schema.XSD.Integer.INSTANCE = new Jsonix.Schema.XSD.Integer();
Jsonix.Schema.XSD.Integer.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Integer.INSTANCE);
Jsonix.Schema.XSD.NonPositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'NonPositiveInteger',
	typeName : Jsonix.Schema.XSD.qname('nonPositiveInteger'),
	MIN_VALUE: -9223372036854775808,
	MAX_VALUE: 0,
	CLASS_NAME : 'Jsonix.Schema.XSD.NonPositiveInteger'
});
Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE = new Jsonix.Schema.XSD.NonPositiveInteger();
Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE);
Jsonix.Schema.XSD.NegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.NonPositiveInteger, {
	name : 'NegativeInteger',
	typeName : Jsonix.Schema.XSD.qname('negativeInteger'),
	MIN_VALUE: -9223372036854775808,
	MAX_VALUE: -1,
	CLASS_NAME : 'Jsonix.Schema.XSD.NegativeInteger'
});
Jsonix.Schema.XSD.NegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NegativeInteger();
Jsonix.Schema.XSD.NegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NegativeInteger.INSTANCE);
Jsonix.Schema.XSD.Long = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'Long',
	typeName : Jsonix.Schema.XSD.qname('long'),
	MIN_VALUE : -9223372036854775808,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.Long'
});
Jsonix.Schema.XSD.Long.INSTANCE = new Jsonix.Schema.XSD.Long();
Jsonix.Schema.XSD.Long.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Long.INSTANCE);
Jsonix.Schema.XSD.Int = Jsonix.Class(Jsonix.Schema.XSD.Long, {
	name : 'Int',
	typeName : Jsonix.Schema.XSD.qname('int'),
	MIN_VALUE : -2147483648,
	MAX_VALUE : 2147483647,
	CLASS_NAME : 'Jsonix.Schema.XSD.Int'
});
Jsonix.Schema.XSD.Int.INSTANCE = new Jsonix.Schema.XSD.Int();
Jsonix.Schema.XSD.Int.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Int.INSTANCE);
Jsonix.Schema.XSD.Short = Jsonix.Class(Jsonix.Schema.XSD.Int, {
	name : 'Short',
	typeName : Jsonix.Schema.XSD.qname('short'),
	MIN_VALUE : -32768,
	MAX_VALUE : 32767,
	CLASS_NAME : 'Jsonix.Schema.XSD.Short'
});
Jsonix.Schema.XSD.Short.INSTANCE = new Jsonix.Schema.XSD.Short();
Jsonix.Schema.XSD.Short.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Short.INSTANCE);
Jsonix.Schema.XSD.Byte = Jsonix.Class(Jsonix.Schema.XSD.Short, {
	name : 'Byte',
	typeName : Jsonix.Schema.XSD.qname('byte'),
	MIN_VALUE : -128,
	MAX_VALUE : 127,
	CLASS_NAME : 'Jsonix.Schema.XSD.Byte'
});
Jsonix.Schema.XSD.Byte.INSTANCE = new Jsonix.Schema.XSD.Byte();
Jsonix.Schema.XSD.Byte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Byte.INSTANCE);
Jsonix.Schema.XSD.NonNegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'NonNegativeInteger',
	typeName : Jsonix.Schema.XSD.qname('nonNegativeInteger'),
	MIN_VALUE: 0,
	MAX_VALUE: 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.NonNegativeInteger'
});
Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NonNegativeInteger();
Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE);
Jsonix.Schema.XSD.UnsignedLong = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
	name : 'UnsignedLong',
	typeName : Jsonix.Schema.XSD.qname('unsignedLong'),
	MIN_VALUE : 0,
	MAX_VALUE : 18446744073709551615,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedLong'
});
Jsonix.Schema.XSD.UnsignedLong.INSTANCE = new Jsonix.Schema.XSD.UnsignedLong();
Jsonix.Schema.XSD.UnsignedLong.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedLong.INSTANCE);
Jsonix.Schema.XSD.UnsignedInt = Jsonix.Class(Jsonix.Schema.XSD.UnsignedLong, {
	name : 'UnsignedInt',
	typeName : Jsonix.Schema.XSD.qname('unsignedInt'),
	MIN_VALUE : 0,
	MAX_VALUE : 4294967295,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedInt'
});
Jsonix.Schema.XSD.UnsignedInt.INSTANCE = new Jsonix.Schema.XSD.UnsignedInt();
Jsonix.Schema.XSD.UnsignedInt.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedInt.INSTANCE);
Jsonix.Schema.XSD.UnsignedShort = Jsonix.Class(Jsonix.Schema.XSD.UnsignedInt, {
	name : 'UnsignedShort',
	typeName : Jsonix.Schema.XSD.qname('unsignedShort'),
	MIN_VALUE : 0,
	MAX_VALUE : 65535,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedShort'
});
Jsonix.Schema.XSD.UnsignedShort.INSTANCE = new Jsonix.Schema.XSD.UnsignedShort();
Jsonix.Schema.XSD.UnsignedShort.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedShort.INSTANCE);
Jsonix.Schema.XSD.UnsignedByte = Jsonix.Class(Jsonix.Schema.XSD.UnsignedShort, {
	name : 'UnsignedByte',
	typeName : Jsonix.Schema.XSD.qname('unsignedByte'),
	MIN_VALUE : 0,
	MAX_VALUE : 255,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedByte'
});
Jsonix.Schema.XSD.UnsignedByte.INSTANCE = new Jsonix.Schema.XSD.UnsignedByte();
Jsonix.Schema.XSD.UnsignedByte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedByte.INSTANCE);
Jsonix.Schema.XSD.PositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
	name : 'PositiveInteger',
	typeName : Jsonix.Schema.XSD.qname('positiveInteger'),
	MIN_VALUE : 1,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.PositiveInteger'
});
Jsonix.Schema.XSD.PositiveInteger.INSTANCE = new Jsonix.Schema.XSD.PositiveInteger();
Jsonix.Schema.XSD.PositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.PositiveInteger.INSTANCE);
Jsonix.Schema.XSD.Double = Jsonix.Class(Jsonix.Schema.XSD.Number, {
	name : 'Double',
	typeName : Jsonix.Schema.XSD.qname('double'),
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || (Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE);
	},
	MIN_VALUE : -1.7976931348623157e+308,
	MAX_VALUE : 1.7976931348623157e+308,
	CLASS_NAME : 'Jsonix.Schema.XSD.Double'
});
Jsonix.Schema.XSD.Double.INSTANCE = new Jsonix.Schema.XSD.Double();
Jsonix.Schema.XSD.Double.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Double.INSTANCE);
Jsonix.Schema.XSD.AnyURI = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'AnyURI',
	typeName : Jsonix.Schema.XSD.qname('anyURI'),
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureString(value);
		return value;
	},
	parse : function(text, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(text);
		return text;
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isString(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnyURI'
});
Jsonix.Schema.XSD.AnyURI.INSTANCE = new Jsonix.Schema.XSD.AnyURI();
Jsonix.Schema.XSD.AnyURI.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.AnyURI.INSTANCE);
Jsonix.Schema.XSD.QName = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'QName',
	typeName : Jsonix.Schema.XSD.qname('QName'),
	print : function(value, context, output, scope) {
		var qName = Jsonix.XML.QName.fromObject(value);
		var prefix;
		var localPart = qName.localPart;
		if (output) {
			// If QName does not provide the prefix, let it be generated
			prefix = output.getPrefix(qName.namespaceURI, qName.prefix||null);
			output.declareNamespace(qName.namespaceURI, prefix);
		} else {
			prefix = qName.prefix;
		}
		return !prefix ? localPart : (prefix + ':' + localPart);
	},
	parse : function(value, context, input, scope) {
		Jsonix.Util.Ensure.ensureString(value);
		value = Jsonix.Util.StringUtils.trim(value);
		var prefix;
		var localPart;
		var colonPosition = value.indexOf(':');
		if (colonPosition === -1) {
			prefix = '';
			localPart = value;
		} else if (colonPosition > 0 && colonPosition < (value.length - 1)) {
			prefix = value.substring(0, colonPosition);
			localPart = value.substring(colonPosition + 1);
		} else {
			throw new Error('Invalid QName [' + value + '].');
		}
		var namespaceContext = input || context || null;
		if (!namespaceContext)
		{
			return value;
		}
		else
		{
			var namespaceURI = namespaceContext.getNamespaceURI(prefix);
			if (Jsonix.Util.Type.isString(namespaceURI))
			{
				return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
			}
			else
			{
				throw new Error('Prefix [' + prefix + '] of the QName [' + value + '] is not bound in this context.');
			}
		}
	},
	isInstance : function(value, context, scope) {
		return (value instanceof Jsonix.XML.QName) || (Jsonix.Util.Type.isObject(value) && Jsonix.Util.Type.isString(value.localPart || value.lp));
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.QName'
});
Jsonix.Schema.XSD.QName.INSTANCE = new Jsonix.Schema.XSD.QName();
Jsonix.Schema.XSD.QName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.QName.INSTANCE);
Jsonix.Schema.XSD.Calendar = Jsonix
		.Class(
				Jsonix.Schema.XSD.AnySimpleType,
				{
					name : 'Calendar',
					typeName : Jsonix.Schema.XSD.qname('calendar'),
					parse : function(text, context, input, scope) {
						Jsonix.Util.Ensure.ensureString(text);
						var negative = (text.charAt(0) === '-');
						var sign = negative ? -1 : 1;
						var data = negative ? text.substring(1) : text;

						// Detect pattern

						var result;
						if (data.length >= 19 && data.charAt(4) === '-' && data.charAt(7) === '-' && data.charAt(10) === 'T' && data.charAt(13) === ':' && data.charAt(16) === ':') {
							return this.parseDateTime(text);
						} else if (data.length >= 10 && data.charAt(4) === '-' && data.charAt(7) === '-') {
							return this.parseDate(text);
						} else if (data.length >= 8 && data.charAt(2) === ':' && data.charAt(5) === ':') {
							return this.parseTime(text);
						} else {
							throw new Error('Value [' + text + '] does not match dateTime, date or time patterns.');
						}
					},
					parseDateTime : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						var negative = (text.charAt(0) === '-');
						var sign = negative ? -1 : 1;

						var dateTimeWithTimeZone = negative ? text.substring(1) : text;

						if (dateTimeWithTimeZone.length < 19 || dateTimeWithTimeZone.charAt(4) !== '-' || dateTimeWithTimeZone.charAt(7) !== '-' || dateTimeWithTimeZone.charAt(10) !== 'T' || dateTimeWithTimeZone.charAt(13) !== ':' || dateTimeWithTimeZone.charAt(16) !== ':') {
							throw new Error('Date time string [' + dateTimeWithTimeZone + '] must be a string in format [\'-\'? yyyy \'-\' mm \'-\' dd \'T\' hh \':\' mm \':\' ss (\'.\' s+)? (zzzzzz)?].');
						}

						var timeZoneIndex;
						var plusIndex = dateTimeWithTimeZone.indexOf('+', 19);
						if (plusIndex >= 0) {
							timeZoneIndex = plusIndex;
						} else {
							var minusIndex = dateTimeWithTimeZone.indexOf('-', 19);
							if (minusIndex >= 0) {
								timeZoneIndex = minusIndex;
							} else {
								var zIndex = dateTimeWithTimeZone.indexOf('Z', 19);
								if (zIndex >= 0) {
									timeZoneIndex = zIndex;
								} else {
									timeZoneIndex = dateTimeWithTimeZone.length;
								}
							}
						}

						var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < dateTimeWithTimeZone.length;

						var dateString = dateTimeWithTimeZone.substring(0, 10);
						var timeString = validTimeZoneIndex ? dateTimeWithTimeZone.substring(11, timeZoneIndex) : dateTimeWithTimeZone.substring(11);
						var timeZoneString = validTimeZoneIndex ? dateTimeWithTimeZone.substring(timeZoneIndex) : '';
						var date = this.parseDateString(dateString);
						var time = this.parseTimeString(timeString);
						var timezone = this.parseTimeZoneString(timeZoneString);

						return Jsonix.XML.Calendar.fromObject({
							year : sign * date.year,
							month : date.month,
							day : date.day,
							hour : time.hour,
							minute : time.minute,
							second : time.second,
							fractionalSecond : time.fractionalSecond,
							timezone : timezone
						});

					},
					parseDate : function(text) {
						Jsonix.Util.Ensure.ensureString(text);

						var negative = (text.charAt(0) === '-');
						var sign = negative ? -1 : 1;

						var dateWithTimeZone = negative ? text.substring(1) : text;

						var timeZoneIndex;
						var plusIndex = dateWithTimeZone.indexOf('+', 10);
						if (plusIndex >= 0) {
							timeZoneIndex = plusIndex;
						} else {
							var minusIndex = dateWithTimeZone.indexOf('-', 10);
							if (minusIndex >= 0) {
								timeZoneIndex = minusIndex;
							} else {
								var zIndex = dateWithTimeZone.indexOf('Z', 10);
								if (zIndex >= 0) {
									timeZoneIndex = zIndex;
								} else {
									timeZoneIndex = dateWithTimeZone.length;
								}
							}
						}
						var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < dateWithTimeZone.length;
						var dateString = validTimeZoneIndex ? dateWithTimeZone.substring(0, timeZoneIndex) : dateWithTimeZone;

						var date = this.parseDateString(dateString);
						var timeZoneString = validTimeZoneIndex ? text.substring(timeZoneIndex) : '';
						var timezone = this.parseTimeZoneString(timeZoneString);

						return Jsonix.XML.Calendar.fromObject({
							year : sign * date.year,
							month : date.month,
							day : date.day,
							timezone : timezone
						});

					},
					parseTime : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						var timeZoneIndex;
						var plusIndex = text.indexOf('+', 7);
						if (plusIndex >= 0) {
							timeZoneIndex = plusIndex;
						} else {
							var minusIndex = text.indexOf('-', 7);
							if (minusIndex >= 0) {
								timeZoneIndex = minusIndex;
							} else {
								var zIndex = text.indexOf('Z', 7);
								if (zIndex >= 0) {
									timeZoneIndex = zIndex;
								} else {
									timeZoneIndex = text.length;
								}
							}
						}

						var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < text.length;
						var timeString = validTimeZoneIndex ? text.substring(0, timeZoneIndex) : text;

						var time = this.parseTimeString(timeString);
						var timeZoneString = validTimeZoneIndex ? text.substring(timeZoneIndex) : '';
						var timezone = this.parseTimeZoneString(timeZoneString);

						return Jsonix.XML.Calendar.fromObject({
							hour : time.hour,
							minute : time.minute,
							second : time.second,
							fractionalSecond : time.fractionalSecond,
							timezone : timezone
						});

					},
					parseDateString : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 10) {
							throw new Error('Date string [' + text + '] must be 10 characters long.');
						}

						if (text.charAt(4) !== '-' || text.charAt(7) !== '-') {
							throw new Error('Date string [' + text + '] must be a string in format [yyyy \'-\' mm \'-\' ss ].');
						}

						var year = this.parseYear(text.substring(0, 4));
						var month = this.parseMonth(text.substring(5, 7));
						var day = this.parseDay(text.substring(8, 10));

						return {
							year : year,
							month : month,
							day : day
						};
					},
					parseTimeString : function(timeString) {
						Jsonix.Util.Ensure.ensureString(timeString);
						if (timeString.length < 8 || timeString.charAt(2) !== ':' || timeString.charAt(5) !== ':') {
							throw new Error('Time string [' + timeString + '] must be a string in format [hh \':\' mm \':\' ss (\'.\' s+)?].');
						}
						var hourString = timeString.substring(0, 2);
						var minuteString = timeString.substring(3, 5);
						var secondString = timeString.substring(6, 8);
						var fractionalSecondString = timeString.length >= 9 ? timeString.substring(8) : '';
						var hour = this.parseHour(hourString);
						var minute = this.parseHour(minuteString);
						var second = this.parseSecond(secondString);
						var fractionalSecond = this.parseFractionalSecond(fractionalSecondString);
						return {
							hour : hour,
							minute : minute,
							second : second,
							fractionalSecond : fractionalSecond
						};

					},
					parseTimeZoneString : function(text) {
						// (('+' | '-') hh ':' mm) | 'Z'
						Jsonix.Util.Ensure.ensureString(text);
						if (text === '') {
							return NaN;
						} else if (text === 'Z') {
							return 0;
						} else {
							if (text.length !== 6) {
								throw new Error('Time zone must be an empty string, \'Z\' or a string in format [(\'+\' | \'-\') hh \':\' mm].');
							}
							var signString = text.charAt(0);
							var sign;
							if (signString === '+') {
								sign = 1;
							} else if (signString === '-') {
								sign = -1;
							} else {
								throw new Error('First character of the time zone [' + text + '] must be \'+\' or \'-\'.');
							}
							var hour = this.parseHour(text.substring(1, 3));
							var minute = this.parseMinute(text.substring(4, 6));
							return -1 * sign * (hour * 60 + minute);
						}

					},
					parseYear : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 4) {
							throw new Error('Year [' + text + '] must be a four-digit number.');
						}
						var year = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(year);
						return year;
					},
					parseMonth : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Month [' + text + '] must be a two-digit number.');
						}
						var month = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(month);
						return month;
					},
					parseDay : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Day [' + text + '] must be a two-digit number.');
						}
						var day = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(day);
						return day;
					},
					parseHour : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Hour [' + text + '] must be a two-digit number.');
						}
						var hour = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(hour);
						return hour;
					},
					parseMinute : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Minute [' + text + '] must be a two-digit number.');
						}
						var minute = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(minute);
						return minute;
					},
					parseSecond : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Second [' + text + '] must be a two-digit number.');
						}
						var second = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureNumber(second);
						return second;
					},
					parseFractionalSecond : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text === '') {
							return 0;
						} else {
							var fractionalSecond = Number(text);
							// TODO message
							Jsonix.Util.Ensure.ensureNumber(fractionalSecond);
							return fractionalSecond;
						}
					},
					print : function(value, context, output, scope) {
						Jsonix.Util.Ensure.ensureObject(value);
						if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day) && Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils
								.isInteger(value.second)) {
							return this.printDateTime(value);
						} else if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) {
							return this.printDate(value);
						} else if (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second)) {
							return this.printTime(value);
						} else {
							throw new Error('Value [' + value + '] is not recognized as dateTime, date or time.');
						}
					},
					printDateTime : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureInteger(value.year);
						Jsonix.Util.Ensure.ensureInteger(value.month);
						Jsonix.Util.Ensure.ensureInteger(value.day);
						Jsonix.Util.Ensure.ensureInteger(value.hour);
						Jsonix.Util.Ensure.ensureInteger(value.minute);
						Jsonix.Util.Ensure.ensureNumber(value.second);
						if (Jsonix.Util.Type.exists(value.fractionalString)) {
							Jsonix.Util.Ensure.ensureNumber(value.fractionalString);
						}
						if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
							Jsonix.Util.Ensure.ensureInteger(value.timezone);
						}
						var result = this.printDateString(value);
						result = result + 'T';
						result = result + this.printTimeString(value);
						if (Jsonix.Util.Type.exists(value.timezone)) {
							result = result + this.printTimeZoneString(value.timezone);
						}
						return result;
					},
					printDate : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureNumber(value.year);
						Jsonix.Util.Ensure.ensureNumber(value.month);
						Jsonix.Util.Ensure.ensureNumber(value.day);
						if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
							Jsonix.Util.Ensure.ensureInteger(value.timezone);
						}
						var result = this.printDateString(value);
						if (Jsonix.Util.Type.exists(value.timezone)) {
							result = result + this.printTimeZoneString(value.timezone);
						}
						return result;
					},
					printTime : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureNumber(value.hour);
						Jsonix.Util.Ensure.ensureNumber(value.minute);
						Jsonix.Util.Ensure.ensureNumber(value.second);
						if (Jsonix.Util.Type.exists(value.fractionalString)) {
							Jsonix.Util.Ensure.ensureNumber(value.fractionalString);
						}
						if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
							Jsonix.Util.Ensure.ensureInteger(value.timezone);
						}

						var result = this.printTimeString(value);
						if (Jsonix.Util.Type.exists(value.timezone)) {
							result = result + this.printTimeZoneString(value.timezone);
						}
						return result;
					},
					printDateString : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureInteger(value.year);
						Jsonix.Util.Ensure.ensureInteger(value.month);
						Jsonix.Util.Ensure.ensureInteger(value.day);
						return (value.year < 0 ? ('-' + this.printYear(-value.year)) : this.printYear(value.year)) + '-' + this.printMonth(value.month) + '-' + this.printDay(value.day);
					},
					printTimeString : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureInteger(value.hour);
						Jsonix.Util.Ensure.ensureInteger(value.minute);
						Jsonix.Util.Ensure.ensureInteger(value.second);
						if (Jsonix.Util.Type.exists(value.fractionalSecond)) {
							Jsonix.Util.Ensure.ensureNumber(value.fractionalSecond);
						}
						var result = this.printHour(value.hour);
						result = result + ':';
						result = result + this.printMinute(value.minute);
						result = result + ':';
						result = result + this.printSecond(value.second);
						if (Jsonix.Util.Type.exists(value.fractionalSecond)) {
							result = result + this.printFractionalSecond(value.fractionalSecond);
						}
						return result;
					},
					printTimeZoneString : function(value) {
						if (!Jsonix.Util.Type.exists(value) || Jsonix.Util.Type.isNaN(value)) {
							return '';
						} else {
							Jsonix.Util.Ensure.ensureInteger(value);

							var sign = value < 0 ? -1 : (value > 0 ? 1 : 0);
							var data = value * sign;
							var minute = data % 60;
							var hour = Math.floor(data / 60);

							var result;
							if (sign === 0) {
								return 'Z';
							} else {
								if (sign > 0) {
									result = '-';
								} else if (sign < 0) {
									result = '+';
								}
								result = result + this.printHour(hour);
								result = result + ':';
								result = result + this.printMinute(minute);
								return result;
							}
						}
					},
					printYear : function(value) {
						return this.printInteger(value, 4);
					},
					printMonth : function(value) {
						return this.printInteger(value, 2);
					},
					printDay : function(value) {
						return this.printInteger(value, 2);
					},
					printHour : function(value) {
						return this.printInteger(value, 2);
					},
					printMinute : function(value) {
						return this.printInteger(value, 2);
					},
					printSecond : function(value) {
						return this.printInteger(value, 2);
					},
					printFractionalSecond : function(value) {
						Jsonix.Util.Ensure.ensureNumber(value);
						if (value < 0 || value >= 1) {
							throw new Error('Fractional second [' + value + '] must be between 0 and 1.');
						} else if (value === 0) {
							return '';
						} else {
							var string = String(value);
							var dotIndex = string.indexOf('.');
							if (dotIndex < 0) {
								return '';
							} else {
								return string.substring(dotIndex);
							}
						}
					},
					printInteger : function(value, length) {
						Jsonix.Util.Ensure.ensureInteger(value);
						Jsonix.Util.Ensure.ensureInteger(length);
						if (length <= 0) {
							throw new Error('Length [' + value + '] must be positive.');
						}
						if (value < 0) {
							throw new Error('Value [' + value + '] must not be negative.');
						}
						if (value >= Math.pow(10, length)) {
							throw new Error('Value [' + value + '] must be less than [' + Math.pow(10, length) + '].');
						}
						var result = String(value);
						for ( var i = result.length; i < length; i++) {
							result = '0' + result;
						}
						return result;
					},
					isInstance : function(value, context, scope) {
						return Jsonix.Util.Type.isObject(value) && ((Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) || (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils
								.isInteger(value.second)));
					},
					CLASS_NAME : 'Jsonix.Schema.XSD.Calendar'
				});
Jsonix.Schema.XSD.Calendar.INSTANCE = new Jsonix.Schema.XSD.Calendar();
Jsonix.Schema.XSD.Calendar.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Calendar.INSTANCE);
Jsonix.Schema.XSD.Duration = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Duration',
	typeName : Jsonix.Schema.XSD.qname('duration'),
	CLASS_NAME : 'Jsonix.Schema.XSD.Duration'
});
Jsonix.Schema.XSD.Duration.INSTANCE = new Jsonix.Schema.XSD.Duration();
Jsonix.Schema.XSD.Duration.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Duration.INSTANCE);
Jsonix.Schema.XSD.DateTime = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'DateTime',
	typeName : Jsonix.Schema.XSD.qname('dateTime'),
	parse : function(value, context, input, scope) {
		var calendar = this.parseDateTime(value);
		var date = new Date();
		date.setFullYear(calendar.year);
		date.setMonth(calendar.month - 1);
		date.setDate(calendar.day);
		date.setHours(calendar.hour);
		date.setMinutes(calendar.minute);
		date.setSeconds(calendar.second);
		if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
			date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
		}
		var timezoneOffset;
		var unknownTimezone;
		var localTimezoneOffset = date.getTimezoneOffset();
		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone))
		{
			timezoneOffset = calendar.timezone;
			unknownTimezone = false;
		}
		else
		{
			// Unknown timezone
			timezoneOffset = localTimezoneOffset;
			unknownTimezone = true;
		}
		//
		var result = new Date(date.getTime() + (60000 * (timezoneOffset - localTimezoneOffset)));
		if (unknownTimezone)
		{
			// null denotes "unknown timezone"
			result.originalTimezoneOffset = null;
		}
		else
		{
			result.originalTimezoneOffset = timezoneOffset;
		}
		return result;
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureDate(value);
		var timezoneOffset;
		var localTimezoneOffset = value.getTimezoneOffset();
		var correctedValue;
		// If original time zone was unknown, print the given value without
		// the timezone
		if (value.originalTimezoneOffset === null)
		{
			return this.printDateTime(new Jsonix.XML.Calendar({
				year : value.getFullYear(),
				month : value.getMonth() + 1,
				day : value.getDate(),
				hour : value.getHours(),
				minute : value.getMinutes(),
				second : value.getSeconds(),
				fractionalSecond : (value.getMilliseconds() / 1000)
			}));
		}
		else
		{
			// If original timezone was known, correct and print the value with the timezone
			if (Jsonix.Util.NumberUtils.isInteger(value.originalTimezoneOffset))
			{
				timezoneOffset = value.originalTimezoneOffset;
				correctedValue = new Date(value.getTime() - (60000 * (timezoneOffset - localTimezoneOffset)));
			}
			// If original timezone was not specified, do not correct and use the local time zone
			else
			{
				timezoneOffset = localTimezoneOffset;
				correctedValue = value;
			}
			return this.printDateTime(new Jsonix.XML.Calendar({
				year : correctedValue.getFullYear(),
				month : correctedValue.getMonth() + 1,
				day : correctedValue.getDate(),
				hour : correctedValue.getHours(),
				minute : correctedValue.getMinutes(),
				second : correctedValue.getSeconds(),
				fractionalSecond : (correctedValue.getMilliseconds() / 1000),
				timezone: timezoneOffset
			}));
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isDate(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.DateTime'
});
Jsonix.Schema.XSD.DateTime.INSTANCE = new Jsonix.Schema.XSD.DateTime();
Jsonix.Schema.XSD.DateTime.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.DateTime.INSTANCE);

Jsonix.Schema.XSD.Time = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'Time',
	typeName : Jsonix.Schema.XSD.qname('time'),
	parse : function(value, context, input, scope) {
		var calendar = this.parseTime(value);
		var date = new Date();
		date.setFullYear(1970);
		date.setMonth(0);
		date.setDate(1);
		date.setHours(calendar.hour);
		date.setMinutes(calendar.minute);
		date.setSeconds(calendar.second);
		if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
			date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
		}
		var timezoneOffset;
		var unknownTimezone;
		var localTimezoneOffset = date.getTimezoneOffset();
		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone))
		{
			timezoneOffset = calendar.timezone;
			unknownTimezone = false;
		}
		else
		{
			// Unknown timezone
			timezoneOffset = localTimezoneOffset;
			unknownTimezone = true;
		}
		//
		var result = new Date(date.getTime() + (60000 * (timezoneOffset - localTimezoneOffset)));
		if (unknownTimezone)
		{
			// null denotes "unknown timezone"
			result.originalTimezoneOffset = null;
		}
		else
		{
			result.originalTimezoneOffset = timezoneOffset;
		}
		return result;
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureDate(value);
		var time = value.getTime();
		if (time <= -86400000 && time >= 86400000) {
			throw new Error('Invalid time [' + value + '].');
		}
		// Original timezone was unknown, just use current time, no timezone
		if (value.originalTimezoneOffset === null)
		{
			return this.printTime(new Jsonix.XML.Calendar({
				hour : value.getHours(),
				minute : value.getMinutes(),
				second : value.getSeconds(),
				fractionalSecond : (value.getMilliseconds() / 1000)
			}));
		}
		else
		{
			var correctedValue;
			var timezoneOffset;
			var localTimezoneOffset = value.getTimezoneOffset();
			if (Jsonix.Util.NumberUtils.isInteger(value.originalTimezoneOffset))
			{
				timezoneOffset = value.originalTimezoneOffset;
				correctedValue = new Date(value.getTime() - (60000 * (timezoneOffset - localTimezoneOffset)));
			}
			else
			{
				timezoneOffset = localTimezoneOffset;
				correctedValue = value;
			}
			var correctedTime = correctedValue.getTime();
			if (correctedTime >= 0) {
				return this.printTime(new Jsonix.XML.Calendar({
					hour : correctedValue.getHours(),
					minute : correctedValue.getMinutes(),
					second : correctedValue.getSeconds(),
					fractionalSecond : (correctedValue.getMilliseconds() / 1000),
					timezone: timezoneOffset
				}));
			} else {
				var timezoneOffsetHours = Math.ceil(-correctedTime / 3600000);
				return this.printTime(new Jsonix.XML.Calendar({
					hour : (correctedValue.getHours() + timezoneOffsetHours + timezoneOffset / 60 ) % 24,
					minute : correctedValue.getMinutes(),
					second : correctedValue.getSeconds(),
					fractionalSecond : (correctedValue.getMilliseconds() / 1000),
					timezone : - timezoneOffsetHours * 60
				}));
			}
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isDate(value) && value.getTime() > -86400000 && value.getTime() < 86400000;
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Time'
});
Jsonix.Schema.XSD.Time.INSTANCE = new Jsonix.Schema.XSD.Time();
Jsonix.Schema.XSD.Time.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Time.INSTANCE);
Jsonix.Schema.XSD.Date = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'Date',
	typeName : Jsonix.Schema.XSD.qname('date'),
	parse : function(value, context, input, scope) {
		var calendar = this.parseDate(value);
		var date = new Date();
		date.setFullYear(calendar.year);
		date.setMonth(calendar.month - 1);
		date.setDate(calendar.day);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
			date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
		}
		var timezoneOffset;
		var unknownTimezone;
		var localTimezoneOffset = date.getTimezoneOffset();
		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone))
		{
			timezoneOffset = calendar.timezone;
			unknownTimezone = false;
		}
		else
		{
			// Unknown timezone
			timezoneOffset = localTimezoneOffset;
			unknownTimezone = true;
		}
		//
		var result = new Date(date.getTime() + (60000 * (timezoneOffset - localTimezoneOffset)));
		if (unknownTimezone)
		{
			// null denotes "unknown timezone"
			result.originalTimezoneOffset = null;
		}
		else
		{
			result.originalTimezoneOffset = timezoneOffset;
		}
		return result;
	},
	print : function(value, context, output, scope) {
		Jsonix.Util.Ensure.ensureDate(value);
		var localDate = new Date(value.getTime());
		localDate.setHours(0);
		localDate.setMinutes(0);
		localDate.setSeconds(0);
		localDate.setMilliseconds(0);
		
		// Original timezone is unknown
		if (value.originalTimezoneOffset === null)
		{
			return this.printDate(new Jsonix.XML.Calendar({
				year : value.getFullYear(),
				month : value.getMonth() + 1,
				day : value.getDate()
			}));
		}
		else
		{
			// If original timezone was known, correct and print the value with the timezone
			if (Jsonix.Util.NumberUtils.isInteger(value.originalTimezoneOffset))
			{
				var correctedValue = new Date(value.getTime() - (60000 * (value.originalTimezoneOffset - value.getTimezoneOffset())));
				return this.printDate(new Jsonix.XML.Calendar({
					year : correctedValue.getFullYear(),
					month : correctedValue.getMonth() + 1,
					day : correctedValue.getDate(),
					timezone : value.originalTimezoneOffset
				}));
			}
			// If original timezone was not specified, do not correct and use the local time zone
			else
			{
				// We assume that the difference between the date value and local midnight
				// should be interpreted as a timezone offset.
				// In case there's no difference, we assume default/unknown timezone
				var localTimezoneOffset = value.getTime() - localDate.getTime();
				if (localTimezoneOffset === 0) {
					return this.printDate(new Jsonix.XML.Calendar({
						year : value.getFullYear(),
						month : value.getMonth() + 1,
						day : value.getDate()
					}));
				} else {
					var timezoneOffset = localTimezoneOffset + (60000 * value.getTimezoneOffset());
					if (timezoneOffset <= 43200000) {
						return this.printDate(new Jsonix.XML.Calendar({
							year : value.getFullYear(),
							month : value.getMonth() + 1,
							day : value.getDate(),
							timezone : Math.floor(timezoneOffset / 60000)
						}));
					} else {
						var nextDay = new Date(value.getTime() + 86400000);
						return this.printDate(new Jsonix.XML.Calendar({
							year : nextDay.getFullYear(),
							month : nextDay.getMonth() + 1,
							day : nextDay.getDate(),
							timezone : (Math.floor(timezoneOffset / 60000) - 1440)
						}));
					}
				}
			}
		}
	},
	isInstance : function(value, context, scope) {
		return Jsonix.Util.Type.isDate(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Date'
});
Jsonix.Schema.XSD.Date.INSTANCE = new Jsonix.Schema.XSD.Date();
Jsonix.Schema.XSD.Date.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Date.INSTANCE);
Jsonix.Schema.XSD.GYearMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GYearMonth',
	typeName : Jsonix.Schema.XSD.qname('gYearMonth'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GYearMonth'
});
Jsonix.Schema.XSD.GYearMonth.INSTANCE = new Jsonix.Schema.XSD.GYearMonth();
Jsonix.Schema.XSD.GYearMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GYearMonth.INSTANCE);
Jsonix.Schema.XSD.GYear = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GYear',
	typeName : Jsonix.Schema.XSD.qname('gYear'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GYear'
});
Jsonix.Schema.XSD.GYear.INSTANCE = new Jsonix.Schema.XSD.GYear();
Jsonix.Schema.XSD.GYear.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GYear.INSTANCE);
Jsonix.Schema.XSD.GMonthDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GMonthDay',
	typeName : Jsonix.Schema.XSD.qname('gMonthDay'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GMonthDay'
});
Jsonix.Schema.XSD.GMonthDay.INSTANCE = new Jsonix.Schema.XSD.GMonthDay();
Jsonix.Schema.XSD.GMonthDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GMonthDay.INSTANCE);
Jsonix.Schema.XSD.GDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GDay',
	typeName : Jsonix.Schema.XSD.qname('gDay'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GDay'
});
Jsonix.Schema.XSD.GDay.INSTANCE = new Jsonix.Schema.XSD.GDay();
Jsonix.Schema.XSD.GDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GDay.INSTANCE);
Jsonix.Schema.XSD.GMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GMonth',
	typeName : Jsonix.Schema.XSD.qname('gMonth'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GMonth'
});
Jsonix.Schema.XSD.GMonth.INSTANCE = new Jsonix.Schema.XSD.GMonth();
Jsonix.Schema.XSD.GMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GMonth.INSTANCE);
Jsonix.Schema.XSD.ID = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'ID',
	typeName : Jsonix.Schema.XSD.qname('ID'),
	CLASS_NAME : 'Jsonix.Schema.XSD.ID'
});
Jsonix.Schema.XSD.ID.INSTANCE = new Jsonix.Schema.XSD.ID();
Jsonix.Schema.XSD.ID.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.ID.INSTANCE);
Jsonix.Schema.XSD.IDREF = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'IDREF',
	typeName : Jsonix.Schema.XSD.qname('IDREF'),
	CLASS_NAME : 'Jsonix.Schema.XSD.IDREF'
});
Jsonix.Schema.XSD.IDREF.INSTANCE = new Jsonix.Schema.XSD.IDREF();
Jsonix.Schema.XSD.IDREF.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.IDREF.INSTANCE);
Jsonix.Schema.XSD.IDREFS = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'IDREFS',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.IDREF.INSTANCE, Jsonix.Schema.XSD.qname('IDREFS'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.IDREFS'
});
Jsonix.Schema.XSD.IDREFS.INSTANCE = new Jsonix.Schema.XSD.IDREFS();
Jsonix.Context = Jsonix
		.Class({
			modules : [],
			typeInfos : null,
			elementInfos : null,
			properties : null,
			substitutionMembersMap : null,
			scopedElementInfosMap : null,
			initialize : function(mappings, properties) {
				this.modules = [];
				this.elementInfos = [];
				this.typeInfos = {};
				this.registerBuiltinTypeInfos();
				this.properties = {
					namespacePrefixes : {}
				};
				this.substitutionMembersMap = {};
				this.scopedElementInfosMap = {};


				// Initialize properties
				if (Jsonix.Util.Type.exists(properties)) {
					Jsonix.Util.Ensure.ensureObject(properties);
					if (Jsonix.Util.Type
							.isObject(properties.namespacePrefixes)) {
						this.properties.namespacePrefixes = 
							Jsonix.Util.Type.cloneObject(properties.namespacePrefixes, {});
					}
				}
				// Initialize modules
				if (Jsonix.Util.Type.exists(mappings)) {
					Jsonix.Util.Ensure.ensureArray(mappings);
					// Initialize modules
					var index, mapping, module;
					for (index = 0; index < mappings.length; index++) {
						mapping = mappings[index];
						module = this.createModule(mapping);
						this.modules[index] = module;
					}
				}
				this.processModules();
			},
			createModule : function(mapping) {
				var module;
				if (mapping instanceof Jsonix.Model.Module) {
					module = mapping;
				} else {
					module = new Jsonix.Model.Module(mapping);
				}
				return module;
			},
			registerBuiltinTypeInfos : function() {
				for ( var index = 0; index < this.builtinTypeInfos.length; index++) {
					this.registerTypeInfo(this.builtinTypeInfos[index]);
				}
			},
			processModules : function() {
				var index, module;
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.registerTypeInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.buildTypeInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.registerElementInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.buildElementInfos(this);
				}
			},
			registerTypeInfo : function(typeInfo) {
				Jsonix.Util.Ensure.ensureObject(typeInfo);
				var n = typeInfo.name||typeInfo.n||null;
				Jsonix.Util.Ensure.ensureString(n);
				this.typeInfos[n] = typeInfo;
			},
			resolveTypeInfo : function(mapping, module) {
				if (!Jsonix.Util.Type.exists(mapping)) {
					return null;
				} else if (mapping instanceof Jsonix.Model.TypeInfo) {
					return mapping;
				} else if (Jsonix.Util.Type.isString(mapping)) {
					var typeInfoName;
					// If mapping starts with '.' consider it to be a local type name in this module
					if (mapping.length > 0 && mapping.charAt(0) === '.')
					{
						var n = module.name || module.n || undefined;
						Jsonix.Util.Ensure.ensureObject(module, 'Type info mapping can only be resolved if module is provided.');
						Jsonix.Util.Ensure.ensureString(n, 'Type info mapping can only be resolved if module name is provided.');
						typeInfoName = n + mapping;
					}
					else
					{
						typeInfoName = mapping;
					}
					if (!this.typeInfos[typeInfoName]) {
						throw new Error('Type info [' + typeInfoName + '] is not known in this context.');
					} else {
						return this.typeInfos[typeInfoName];
					}
				} else {
					Jsonix.Util.Ensure.ensureObject(module, 'Type info mapping can only be resolved if module is provided.');
					var typeInfo = module.createTypeInfo(mapping);
					typeInfo.build(this, module);
					return typeInfo;
				}
			},
			registerElementInfo : function(elementInfo, module) {
				Jsonix.Util.Ensure.ensureObject(elementInfo);
				this.elementInfos.push(elementInfo);

				if (Jsonix.Util.Type.exists(elementInfo.substitutionHead)) {
					var substitutionHead = elementInfo.substitutionHead;
					var substitutionHeadKey = substitutionHead.key;
					var substitutionMembers = this.substitutionMembersMap[substitutionHeadKey];

					if (!Jsonix.Util.Type.isArray(substitutionMembers)) {
						substitutionMembers = [];
						this.substitutionMembersMap[substitutionHeadKey] = substitutionMembers;
					}
					substitutionMembers.push(elementInfo);
				}

				var scopeKey;
				if (Jsonix.Util.Type.exists(elementInfo.scope)) {
					scopeKey = this.resolveTypeInfo(elementInfo.scope, module).name;
				} else {
					scopeKey = '##global';
				}

				var scopedElementInfos = this.scopedElementInfosMap[scopeKey];

				if (!Jsonix.Util.Type.isObject(scopedElementInfos)) {
					scopedElementInfos = {};
					this.scopedElementInfosMap[scopeKey] = scopedElementInfos;
				}
				scopedElementInfos[elementInfo.elementName.key] = elementInfo;

			},
			getElementInfo : function(name, scope) {
				if (Jsonix.Util.Type.exists(scope)) {
					var scopeKey = scope.name;
					var scopedElementInfos = this.scopedElementInfosMap[scopeKey];
					if (Jsonix.Util.Type.exists(scopedElementInfos)) {
						var scopedElementInfo = scopedElementInfos[name.key];
						if (Jsonix.Util.Type.exists(scopedElementInfo)) {
							return scopedElementInfo;
						}
					}
				}

				var globalScopeKey = '##global';
				var globalScopedElementInfos = this.scopedElementInfosMap[globalScopeKey];
				if (Jsonix.Util.Type.exists(globalScopedElementInfos)) {
					var globalScopedElementInfo = globalScopedElementInfos[name.key];
					if (Jsonix.Util.Type.exists(globalScopedElementInfo)) {
						return globalScopedElementInfo;
					}
				}
				return null;
				//
				// throw new Error("Element [" + name.key
				// + "] could not be found in the given context.");
			},
			getSubstitutionMembers : function(name) {
				return this.substitutionMembersMap[Jsonix.XML.QName
						.fromObject(name).key];
			},
			createMarshaller : function() {
				return new Jsonix.Context.Marshaller(this);
			},
			createUnmarshaller : function() {
				return new Jsonix.Context.Unmarshaller(this);
			},
			getNamespaceURI : function(prefix) {
				Jsonix.Util.Ensure.ensureString(prefix);
				return this.properties.namespacePrefixes[prefix];
			},
			/**
			 * Builtin type infos.
			 */
			builtinTypeInfos : [
			        Jsonix.Schema.XSD.AnyType.INSTANCE,
					Jsonix.Schema.XSD.AnyURI.INSTANCE,
					Jsonix.Schema.XSD.Base64Binary.INSTANCE,
					Jsonix.Schema.XSD.Boolean.INSTANCE,
					Jsonix.Schema.XSD.Byte.INSTANCE,
					Jsonix.Schema.XSD.Calendar.INSTANCE,
					Jsonix.Schema.XSD.Date.INSTANCE,
					Jsonix.Schema.XSD.DateTime.INSTANCE,
					Jsonix.Schema.XSD.Decimal.INSTANCE,
					Jsonix.Schema.XSD.Double.INSTANCE,
					Jsonix.Schema.XSD.Duration.INSTANCE,
					Jsonix.Schema.XSD.Float.INSTANCE,
					Jsonix.Schema.XSD.GDay.INSTANCE,
					Jsonix.Schema.XSD.GMonth.INSTANCE,
					Jsonix.Schema.XSD.GMonthDay.INSTANCE,
					Jsonix.Schema.XSD.GYear.INSTANCE,
					Jsonix.Schema.XSD.GYearMonth.INSTANCE,
					Jsonix.Schema.XSD.HexBinary.INSTANCE,
					Jsonix.Schema.XSD.ID.INSTANCE,
					Jsonix.Schema.XSD.IDREF.INSTANCE,
					Jsonix.Schema.XSD.IDREFS.INSTANCE,
					Jsonix.Schema.XSD.Int.INSTANCE,
					Jsonix.Schema.XSD.Integer.INSTANCE,
					Jsonix.Schema.XSD.Language.INSTANCE,
					Jsonix.Schema.XSD.Long.INSTANCE,
					Jsonix.Schema.XSD.Name.INSTANCE,
					Jsonix.Schema.XSD.NCName.INSTANCE,
					Jsonix.Schema.XSD.NegativeInteger.INSTANCE,
					Jsonix.Schema.XSD.NMToken.INSTANCE,
					Jsonix.Schema.XSD.NMTokens.INSTANCE,
					Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE,
					Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE,
					Jsonix.Schema.XSD.NormalizedString.INSTANCE,
					Jsonix.Schema.XSD.Number.INSTANCE,
					Jsonix.Schema.XSD.PositiveInteger.INSTANCE,
					Jsonix.Schema.XSD.QName.INSTANCE,
					Jsonix.Schema.XSD.Short.INSTANCE,
					Jsonix.Schema.XSD.String.INSTANCE,
					Jsonix.Schema.XSD.Strings.INSTANCE,
					Jsonix.Schema.XSD.Time.INSTANCE,
					Jsonix.Schema.XSD.Token.INSTANCE,
					Jsonix.Schema.XSD.UnsignedByte.INSTANCE,
					Jsonix.Schema.XSD.UnsignedInt.INSTANCE,
					Jsonix.Schema.XSD.UnsignedLong.INSTANCE,
					Jsonix.Schema.XSD.UnsignedShort.INSTANCE ],
			CLASS_NAME : 'Jsonix.Context'
		});
Jsonix.Context.Marshaller = Jsonix.Class({
	context : null,
	initialize : function(context) {
		Jsonix.Util.Ensure.ensureObject(context);
		this.context = context;
	},
	marshalString : function(value) {
		var doc = this.marshalDocument(value);
		var text = Jsonix.DOM.serialize(doc);
		return text;
	},
	marshalDocument : function(value) {
		var output = new Jsonix.XML.Output({
			namespacePrefixes : this.context.properties.namespacePrefixes
		});

		var doc = output.writeStartDocument();

		this.marshalElementNode(value, output);

		output.writeEndDocument();

		return doc;

	},
	marshalElementNode : function(value, output, scope) {

		Jsonix.Util.Ensure.ensureObject(value);
		Jsonix.Util.Ensure.ensureObject(value.name);
		Jsonix.Util.Ensure.ensureExists(value.value);

		var name = Jsonix.XML.QName.fromObject(value.name);

		var elementDeclaration = this.context.getElementInfo(name, scope);
		if (!Jsonix.Util.Type.exists(elementDeclaration)) {
			throw new Error("Could not find element declaration for the element [" + name.key + "].");
		}
		Jsonix.Util.Ensure.ensureObject(elementDeclaration.typeInfo);
		var typeInfo = elementDeclaration.typeInfo;
		var element = output.writeStartElement(value.name);
		var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
		adapter.marshal(typeInfo, value.value, this.context, output, scope);
		output.writeEndElement();
		return element;

	},
	CLASS_NAME : 'Jsonix.Context.Marshaller'
});
Jsonix.Context.Unmarshaller = Jsonix.Class({
	context : null,
	initialize : function(context) {
		Jsonix.Util.Ensure.ensureObject(context);
		this.context = context;
	},
	unmarshalString : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		var doc = Jsonix.DOM.parse(text);
		return this.unmarshalDocument(doc);
	},
	unmarshalURL : function(url, callback, options) {
		Jsonix.Util.Ensure.ensureString(url);
		Jsonix.Util.Ensure.ensureFunction(callback);
		if (Jsonix.Util.Type.exists(options)) {
			Jsonix.Util.Ensure.ensureObject(options);
		}
		that = this;
		Jsonix.DOM.load(url, function(doc) {
			callback(that.unmarshalDocument(doc));
		}, options);
	},
	unmarshalFile : function(fileName, callback, options) {
		if (typeof _jsonix_fs === 'undefined')
		{
			throw new Error("File unmarshalling is only available in environments which support file systems.");
		}
		Jsonix.Util.Ensure.ensureString(fileName);
		Jsonix.Util.Ensure.ensureFunction(callback);
		if (Jsonix.Util.Type.exists(options)) {
			Jsonix.Util.Ensure.ensureObject(options);
		}
		that = this;
		var fs =_jsonix_fs;
		fs.readFile(fileName, options, function(err, data) {
			if (err)
			{
				throw err;
			}
			else
			{
				var text = data.toString();
				var doc = Jsonix.DOM.parse(text);
				callback(that.unmarshalDocument(doc));
			}
		});
	},
	unmarshalDocument : function(doc) {
		var input = new Jsonix.XML.Input(doc);

		var result = null;
		input.nextTag();
		return this.unmarshalElementNode(input);

	},
	unmarshalElementNode : function(input, scope) {
		if (input.eventType != 1) {
			throw new Error("Parser must be on START_ELEMENT to read next text.");
		}

		var result = null;
		var name = Jsonix.XML.QName.fromObject(input.getName());

		var elementDeclaration = this.context.getElementInfo(name, scope);
		if (!Jsonix.Util.Type.exists(elementDeclaration)) {
			throw new Error("Could not find element declaration for the element [" + name.key + "].");
		}
		Jsonix.Util.Ensure.ensureObject(elementDeclaration.typeInfo);
		var typeInfo = elementDeclaration.typeInfo;
		var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
		var value = adapter.unmarshal(typeInfo, this.context, input, scope);
		result = {
			name : name,
			value : value
		};

		return result;

	},
	CLASS_NAME : 'Jsonix.Context.Unmarshaller'
});
	// Complete Jsonix script is included above
	return { Jsonix: Jsonix };
};

// If the require function exists ...
if (typeof require === 'function') {
	// ... but the define function does not exists
	if (typeof define !== 'function') {
		// Load the define function via amdefine
		var define = require('amdefine')(module);
		// If we're not in browser
		if (typeof window === 'undefined')
		{
			// Require xmldom, xmlhttprequest and fs
			define(["xmldom", "xmlhttprequest", "fs"], _jsonix_factory);
		}
		else
		{
			// We're probably in browser, maybe browserify
			// Do not require xmldom, xmlhttprequest as they'r provided by the browser
			// Do not require fs since file system is not available anyway
			define([], _jsonix_factory);
		}
	}
	else {
		// Otherwise assume we're in the browser/RequireJS environment
		// Load the module without xmldom and xmlhttprequests dependencies
		define([], _jsonix_factory);
	}
}
// If the require function does not exists, we're not in Node.js and therefore in browser environment
else
{
	// Just call the factory and set Jsonix as global.
	var Jsonix = _jsonix_factory().Jsonix;
}

},{"amdefine":19}],3:[function(require,module,exports){
var Filter_1_0_0_Module_Factory = function () {
  var Filter_1_0_0 = {
    n: 'Filter_1_0_0',
    dens: 'http:\/\/www.opengis.net\/ogc',
    deps: ['GML_2_1_2'],
    tis: [{
        ln: 'PropertyNameType',
        bti: '.ExpressionType',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            t: 'ae'
          }]
      }, {
        ln: 'SpatialOperatorsType.Intersect',
        tn: null
      }, {
        ln: 'UpperBoundaryType',
        ps: [{
            n: 'expression',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }]
      }, {
        ln: 'SpatialOperatorsType.Crosses',
        tn: null
      }, {
        ln: 'SimpleComparisons',
        tn: null
      }, {
        ln: 'SpatialOperatorsType.Within',
        tn: null
      }, {
        ln: 'ExpressionType'
      }, {
        ln: 'SpatialOperatorsType.Equals',
        tn: null
      }, {
        ln: 'SimpleArithmetic',
        tn: null
      }, {
        ln: 'SortPropertyType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'sortOrder',
            en: 'SortOrder'
          }]
      }, {
        ln: 'SpatialOpsType'
      }, {
        ln: 'LiteralType',
        bti: '.ExpressionType',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            t: 'ae'
          }]
      }, {
        ln: 'DistanceType',
        ps: [{
            n: 'content',
            t: 'v'
          }, {
            n: 'units',
            rq: true,
            an: {
              lp: 'units'
            },
            t: 'a'
          }]
      }, {
        ln: 'FunctionType',
        bti: '.ExpressionType',
        ps: [{
            n: 'expression',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'BinaryOperatorType',
        bti: '.ExpressionType',
        ps: [{
            n: 'expression',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }]
      }, {
        ln: 'ComparisonOperatorsType',
        tn: 'Comparison_OperatorsType',
        ps: [{
            n: 'simpleComparisonsOrLikeOrBetween',
            rq: true,
            col: true,
            etis: [{
                en: 'Simple_Comparisons',
                ti: '.SimpleComparisons'
              }, {
                en: 'Like',
                ti: '.Like'
              }, {
                en: 'Between',
                ti: '.Between'
              }, {
                en: 'NullCheck',
                ti: '.NullCheck'
              }],
            t: 'es'
          }]
      }, {
        ln: 'SortByType',
        ps: [{
            n: 'sortProperty',
            rq: true,
            col: true,
            en: 'SortProperty',
            ti: '.SortPropertyType'
          }]
      }, {
        ln: 'SpatialOperatorsType.Overlaps',
        tn: null
      }, {
        ln: 'ArithmeticOperatorsType',
        tn: 'Arithmetic_OperatorsType',
        ps: [{
            n: 'simpleArithmeticOrFunctions',
            rq: true,
            col: true,
            etis: [{
                en: 'Simple_Arithmetic',
                ti: '.SimpleArithmetic'
              }, {
                en: 'Functions',
                ti: '.FunctionsType'
              }],
            t: 'es'
          }]
      }, {
        ln: 'BinaryLogicOpType',
        bti: '.LogicOpsType',
        ps: [{
            n: 'ops',
            rq: true,
            mno: 2,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'spatialOps',
                ti: '.SpatialOpsType'
              }, {
                en: 'comparisonOps',
                ti: '.ComparisonOpsType'
              }, {
                en: 'logicOps',
                ti: '.LogicOpsType'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'FunctionNamesType',
        tn: 'Function_NamesType',
        ps: [{
            n: 'functionName',
            rq: true,
            col: true,
            en: 'Function_Name',
            ti: '.FunctionNameType'
          }]
      }, {
        ln: 'LogicalOperators',
        tn: null
      }, {
        ln: 'PropertyIsNullType',
        bti: '.ComparisonOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'literal',
            rq: true,
            en: 'Literal',
            ti: '.LiteralType'
          }]
      }, {
        ln: 'PropertyIsBetweenType',
        bti: '.ComparisonOpsType',
        ps: [{
            n: 'expression',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }, {
            n: 'lowerBoundary',
            rq: true,
            en: 'LowerBoundary',
            ti: '.LowerBoundaryType'
          }, {
            n: 'upperBoundary',
            rq: true,
            en: 'UpperBoundary',
            ti: '.UpperBoundaryType'
          }]
      }, {
        ln: 'FilterType',
        ps: [{
            n: 'spatialOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.SpatialOpsType',
            t: 'er'
          }, {
            n: 'comparisonOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ComparisonOpsType',
            t: 'er'
          }, {
            n: 'logicOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.LogicOpsType',
            t: 'er'
          }, {
            n: 'featureId',
            rq: true,
            col: true,
            en: 'FeatureId',
            ti: '.FeatureIdType'
          }]
      }, {
        ln: 'BinaryComparisonOpType',
        bti: '.ComparisonOpsType',
        ps: [{
            n: 'expression',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }]
      }, {
        ln: 'LogicOpsType'
      }, {
        ln: 'Between',
        tn: null
      }, {
        ln: 'SpatialOperatorsType.Touches',
        tn: null
      }, {
        ln: 'SpatialOperatorsType.DWithin',
        tn: null
      }, {
        ln: 'FunctionsType',
        ps: [{
            n: 'functionNames',
            rq: true,
            en: 'Function_Names',
            ti: '.FunctionNamesType'
          }]
      }, {
        ln: 'FunctionNameType',
        tn: 'Function_NameType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'nArgs',
            rq: true,
            an: {
              lp: 'nArgs'
            },
            t: 'a'
          }]
      }, {
        ln: 'FilterCapabilities',
        tn: null,
        ps: [{
            n: 'spatialCapabilities',
            rq: true,
            en: 'Spatial_Capabilities',
            ti: '.SpatialCapabilitiesType'
          }, {
            n: 'scalarCapabilities',
            rq: true,
            en: 'Scalar_Capabilities',
            ti: '.ScalarCapabilitiesType'
          }]
      }, {
        ln: 'UnaryLogicOpType',
        bti: '.LogicOpsType',
        ps: [{
            n: 'comparisonOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ComparisonOpsType',
            t: 'er'
          }, {
            n: 'spatialOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.SpatialOpsType',
            t: 'er'
          }, {
            n: 'logicOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.LogicOpsType',
            t: 'er'
          }]
      }, {
        ln: 'ScalarCapabilitiesType',
        tn: 'Scalar_CapabilitiesType',
        ps: [{
            n: 'logicalOperatorsOrComparisonOperatorsOrArithmeticOperators',
            rq: true,
            col: true,
            etis: [{
                en: 'Logical_Operators',
                ti: '.LogicalOperators'
              }, {
                en: 'Comparison_Operators',
                ti: '.ComparisonOperatorsType'
              }, {
                en: 'Arithmetic_Operators',
                ti: '.ArithmeticOperatorsType'
              }],
            t: 'es'
          }]
      }, {
        ln: 'Like',
        tn: null
      }, {
        ln: 'SpatialCapabilitiesType',
        tn: 'Spatial_CapabilitiesType',
        ps: [{
            n: 'spatialOperators',
            rq: true,
            en: 'Spatial_Operators',
            ti: '.SpatialOperatorsType'
          }]
      }, {
        ln: 'FeatureIdType',
        ps: [{
            n: 'fid',
            rq: true,
            an: {
              lp: 'fid'
            },
            t: 'a'
          }]
      }, {
        ln: 'SpatialOperatorsType.BBOX',
        tn: null
      }, {
        ln: 'SpatialOperatorsType.Disjoint',
        tn: null
      }, {
        ln: 'SpatialOperatorsType.Beyond',
        tn: null
      }, {
        ln: 'ComparisonOpsType'
      }, {
        ln: 'BBOXType',
        bti: '.SpatialOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'box',
            rq: true,
            en: {
              lp: 'Box',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_2_1_2.BoxType'
          }]
      }, {
        ln: 'NullCheck',
        tn: null
      }, {
        ln: 'LowerBoundaryType',
        ps: [{
            n: 'expression',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }]
      }, {
        ln: 'DistanceBufferType',
        bti: '.SpatialOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: {
              lp: '_Geometry',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_2_1_2.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'distance',
            rq: true,
            en: 'Distance',
            ti: '.DistanceType'
          }]
      }, {
        ln: 'PropertyIsLikeType',
        bti: '.ComparisonOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'literal',
            rq: true,
            en: 'Literal',
            ti: '.LiteralType'
          }, {
            n: 'wildCard',
            rq: true,
            an: {
              lp: 'wildCard'
            },
            t: 'a'
          }, {
            n: 'singleChar',
            rq: true,
            an: {
              lp: 'singleChar'
            },
            t: 'a'
          }, {
            n: 'escape',
            rq: true,
            an: {
              lp: 'escape'
            },
            t: 'a'
          }]
      }, {
        ln: 'SpatialOperatorsType',
        tn: 'Spatial_OperatorsType',
        ps: [{
            n: 'bboxOrEqualsOrDisjoint',
            rq: true,
            col: true,
            etis: [{
                en: 'BBOX',
                ti: '.SpatialOperatorsType.BBOX'
              }, {
                en: 'Equals',
                ti: '.SpatialOperatorsType.Equals'
              }, {
                en: 'Disjoint',
                ti: '.SpatialOperatorsType.Disjoint'
              }, {
                en: 'Intersect',
                ti: '.SpatialOperatorsType.Intersect'
              }, {
                en: 'Touches',
                ti: '.SpatialOperatorsType.Touches'
              }, {
                en: 'Crosses',
                ti: '.SpatialOperatorsType.Crosses'
              }, {
                en: 'Within',
                ti: '.SpatialOperatorsType.Within'
              }, {
                en: 'Contains',
                ti: '.SpatialOperatorsType.Contains'
              }, {
                en: 'Overlaps',
                ti: '.SpatialOperatorsType.Overlaps'
              }, {
                en: 'Beyond',
                ti: '.SpatialOperatorsType.Beyond'
              }, {
                en: 'DWithin',
                ti: '.SpatialOperatorsType.DWithin'
              }],
            t: 'es'
          }]
      }, {
        ln: 'SpatialOperatorsType.Contains',
        tn: null
      }, {
        ln: 'BinarySpatialOpType',
        bti: '.SpatialOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: {
              lp: '_Geometry',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_2_1_2.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'box',
            rq: true,
            en: {
              lp: 'Box',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_2_1_2.BoxType'
          }]
      }, {
        t: 'enum',
        ln: 'SortOrderType',
        vs: ['DESC', 'ASC']
      }],
    eis: [{
        en: 'Div',
        ti: '.BinaryOperatorType',
        sh: 'expression'
      }, {
        en: 'comparisonOps',
        ti: '.ComparisonOpsType'
      }, {
        en: 'Simple_Comparisons',
        ti: '.SimpleComparisons'
      }, {
        en: 'PropertyIsLike',
        ti: '.PropertyIsLikeType',
        sh: 'comparisonOps'
      }, {
        en: 'Disjoint',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Filter',
        ti: '.FilterType'
      }, {
        en: 'expression',
        ti: '.ExpressionType'
      }, {
        en: 'Beyond',
        ti: '.DistanceBufferType',
        sh: 'spatialOps'
      }, {
        en: 'BBOX',
        ti: '.BBOXType',
        sh: 'spatialOps'
      }, {
        en: 'Function',
        ti: '.FunctionType',
        sh: 'expression'
      }, {
        en: 'Overlaps',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Mul',
        ti: '.BinaryOperatorType',
        sh: 'expression'
      }, {
        en: 'Sub',
        ti: '.BinaryOperatorType',
        sh: 'expression'
      }, {
        en: 'PropertyIsGreaterThanOrEqualTo',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'NullCheck',
        ti: '.NullCheck'
      }, {
        en: 'Literal',
        ti: '.LiteralType',
        sh: 'expression'
      }, {
        en: 'DWithin',
        ti: '.DistanceBufferType',
        sh: 'spatialOps'
      }, {
        en: 'Logical_Operators',
        ti: '.LogicalOperators'
      }, {
        en: 'FeatureId',
        ti: '.FeatureIdType'
      }, {
        en: 'PropertyIsEqualTo',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'SortBy',
        ti: '.SortByType'
      }, {
        en: 'Intersects',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Add',
        ti: '.BinaryOperatorType',
        sh: 'expression'
      }, {
        en: 'PropertyIsGreaterThan',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'Like',
        ti: '.Like'
      }, {
        en: 'And',
        ti: '.BinaryLogicOpType',
        sh: 'logicOps'
      }, {
        en: 'PropertyIsBetween',
        ti: '.PropertyIsBetweenType',
        sh: 'comparisonOps'
      }, {
        en: 'Contains',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'PropertyIsLessThan',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'Filter_Capabilities',
        ti: '.FilterCapabilities'
      }, {
        en: 'Simple_Arithmetic',
        ti: '.SimpleArithmetic'
      }, {
        en: 'Or',
        ti: '.BinaryLogicOpType',
        sh: 'logicOps'
      }, {
        en: 'Equals',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'PropertyIsLessThanOrEqualTo',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'PropertyIsNotEqualTo',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'Not',
        ti: '.UnaryLogicOpType',
        sh: 'logicOps'
      }, {
        en: 'Crosses',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'PropertyIsNull',
        ti: '.PropertyIsNullType',
        sh: 'comparisonOps'
      }, {
        en: 'logicOps',
        ti: '.LogicOpsType'
      }, {
        en: 'Touches',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Within',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'PropertyName',
        ti: '.PropertyNameType',
        sh: 'expression'
      }, {
        en: 'spatialOps',
        ti: '.SpatialOpsType'
      }, {
        en: 'Between',
        ti: '.Between'
      }]
  };
  return {
    Filter_1_0_0: Filter_1_0_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], Filter_1_0_0_Module_Factory);
}
else {
  var Filter_1_0_0_Module = Filter_1_0_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.Filter_1_0_0 = Filter_1_0_0_Module.Filter_1_0_0;
  }
  else {
    var Filter_1_0_0 = Filter_1_0_0_Module.Filter_1_0_0;
  }
}
},{}],4:[function(require,module,exports){
var Filter_1_1_0_Module_Factory = function () {
  var Filter_1_1_0 = {
    n: 'Filter_1_1_0',
    dens: 'http:\/\/www.opengis.net\/ogc',
    deps: ['GML_3_1_1'],
    tis: [{
        ln: 'ArithmeticOperatorsType',
        ps: [{
            n: 'ops',
            rq: true,
            col: true,
            etis: [{
                en: 'SimpleArithmetic',
                ti: '.SimpleArithmetic'
              }, {
                en: 'Functions',
                ti: '.FunctionsType'
              }],
            t: 'es'
          }]
      }, {
        ln: 'BinaryComparisonOpType',
        bti: '.ComparisonOpsType',
        ps: [{
            n: 'expression',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }, {
            n: 'matchCase',
            ti: 'Boolean',
            an: {
              lp: 'matchCase'
            },
            t: 'a'
          }]
      }, {
        ln: 'FilterCapabilities',
        tn: null,
        ps: [{
            n: 'spatialCapabilities',
            rq: true,
            en: 'Spatial_Capabilities',
            ti: '.SpatialCapabilitiesType'
          }, {
            n: 'scalarCapabilities',
            rq: true,
            en: 'Scalar_Capabilities',
            ti: '.ScalarCapabilitiesType'
          }, {
            n: 'idCapabilities',
            rq: true,
            en: 'Id_Capabilities',
            ti: '.IdCapabilitiesType'
          }]
      }, {
        ln: 'LiteralType',
        bti: '.ExpressionType',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            t: 'ae'
          }]
      }, {
        ln: 'ComparisonOpsType'
      }, {
        ln: 'FunctionNamesType',
        ps: [{
            n: 'functionName',
            rq: true,
            col: true,
            en: 'FunctionName',
            ti: '.FunctionNameType'
          }]
      }, {
        ln: 'BinaryLogicOpType',
        bti: '.LogicOpsType',
        ps: [{
            n: 'ops',
            rq: true,
            mno: 2,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'spatialOps',
                ti: '.SpatialOpsType'
              }, {
                en: 'Function',
                ti: '.FunctionType'
              }, {
                en: 'comparisonOps',
                ti: '.ComparisonOpsType'
              }, {
                en: 'logicOps',
                ti: '.LogicOpsType'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'PropertyIsLikeType',
        bti: '.ComparisonOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'literal',
            rq: true,
            en: 'Literal',
            ti: '.LiteralType'
          }, {
            n: 'wildCard',
            rq: true,
            an: {
              lp: 'wildCard'
            },
            t: 'a'
          }, {
            n: 'singleChar',
            rq: true,
            an: {
              lp: 'singleChar'
            },
            t: 'a'
          }, {
            n: 'escapeChar',
            rq: true,
            an: {
              lp: 'escapeChar'
            },
            t: 'a'
          }, {
            n: 'matchCase',
            ti: 'Boolean',
            an: {
              lp: 'matchCase'
            },
            t: 'a'
          }]
      }, {
        ln: 'FunctionNameType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'nArgs',
            rq: true,
            an: {
              lp: 'nArgs'
            },
            t: 'a'
          }]
      }, {
        ln: 'ScalarCapabilitiesType',
        tn: 'Scalar_CapabilitiesType',
        ps: [{
            n: 'logicalOperators',
            en: 'LogicalOperators',
            ti: '.LogicalOperators'
          }, {
            n: 'comparisonOperators',
            en: 'ComparisonOperators',
            ti: '.ComparisonOperatorsType'
          }, {
            n: 'arithmeticOperators',
            en: 'ArithmeticOperators',
            ti: '.ArithmeticOperatorsType'
          }]
      }, {
        ln: 'LogicOpsType'
      }, {
        ln: 'UnaryLogicOpType',
        bti: '.LogicOpsType',
        ps: [{
            n: 'comparisonOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ComparisonOpsType',
            t: 'er'
          }, {
            n: 'spatialOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.SpatialOpsType',
            t: 'er'
          }, {
            n: 'logicOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.LogicOpsType',
            t: 'er'
          }, {
            n: 'function',
            rq: true,
            en: 'Function',
            ti: '.FunctionType'
          }]
      }, {
        ln: 'PropertyIsNullType',
        bti: '.ComparisonOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }]
      }, {
        ln: 'SpatialOperatorsType',
        ps: [{
            n: 'spatialOperator',
            rq: true,
            col: true,
            en: 'SpatialOperator',
            ti: '.SpatialOperatorType'
          }]
      }, {
        ln: 'FeatureIdType',
        bti: '.AbstractIdType',
        ps: [{
            n: 'fid',
            rq: true,
            ti: 'ID',
            an: {
              lp: 'fid'
            },
            t: 'a'
          }]
      }, {
        ln: 'SortPropertyType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'sortOrder',
            en: 'SortOrder'
          }]
      }, {
        ln: 'SimpleArithmetic',
        tn: null
      }, {
        ln: 'FID',
        tn: null
      }, {
        ln: 'ExpressionType'
      }, {
        ln: 'AbstractIdType'
      }, {
        ln: 'FilterType',
        ps: [{
            n: 'spatialOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.SpatialOpsType',
            t: 'er'
          }, {
            n: 'comparisonOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ComparisonOpsType',
            t: 'er'
          }, {
            n: 'logicOps',
            rq: true,
            mx: false,
            dom: false,
            ti: '.LogicOpsType',
            t: 'er'
          }, {
            n: 'id',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            en: '_Id',
            ti: '.AbstractIdType',
            t: 'er'
          }]
      }, {
        ln: 'GmlObjectIdType',
        bti: '.AbstractIdType',
        ps: [{
            n: 'id',
            rq: true,
            ti: 'ID',
            an: {
              lp: 'id',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }]
      }, {
        ln: 'PropertyNameType',
        bti: '.ExpressionType',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            t: 'ae'
          }]
      }, {
        ln: 'UpperBoundaryType',
        ps: [{
            n: 'expression',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }]
      }, {
        ln: 'EID',
        tn: null
      }, {
        ln: 'BinarySpatialOpType',
        bti: '.SpatialOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            mxo: 2,
            col: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: {
              lp: '_Geometry',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_3_1_1.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'envelope',
            rq: true,
            mx: false,
            dom: false,
            en: {
              lp: 'Envelope',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_3_1_1.EnvelopeType',
            t: 'er'
          }]
      }, {
        ln: 'ComparisonOperatorsType',
        ps: [{
            n: 'comparisonOperator',
            rq: true,
            col: true,
            en: 'ComparisonOperator'
          }]
      }, {
        ln: 'SpatialOpsType'
      }, {
        ln: 'FunctionType',
        bti: '.ExpressionType',
        ps: [{
            n: 'expression',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'DistanceBufferType',
        bti: '.SpatialOpsType',
        ps: [{
            n: 'propertyName',
            rq: true,
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: {
              lp: '_Geometry',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_3_1_1.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'distance',
            rq: true,
            en: 'Distance',
            ti: '.DistanceType'
          }]
      }, {
        ln: 'LogicalOperators',
        tn: null
      }, {
        ln: 'LowerBoundaryType',
        ps: [{
            n: 'expression',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }]
      }, {
        ln: 'BBOXType',
        bti: '.SpatialOpsType',
        ps: [{
            n: 'propertyName',
            en: 'PropertyName',
            ti: '.PropertyNameType'
          }, {
            n: 'envelope',
            rq: true,
            mx: false,
            dom: false,
            en: {
              lp: 'Envelope',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_3_1_1.EnvelopeType',
            t: 'er'
          }]
      }, {
        ln: 'SpatialCapabilitiesType',
        tn: 'Spatial_CapabilitiesType',
        ps: [{
            n: 'geometryOperands',
            rq: true,
            en: 'GeometryOperands',
            ti: '.GeometryOperandsType'
          }, {
            n: 'spatialOperators',
            rq: true,
            en: 'SpatialOperators',
            ti: '.SpatialOperatorsType'
          }]
      }, {
        ln: 'IdCapabilitiesType',
        tn: 'Id_CapabilitiesType',
        ps: [{
            n: 'ids',
            rq: true,
            col: true,
            etis: [{
                en: 'EID',
                ti: '.EID'
              }, {
                en: 'FID',
                ti: '.FID'
              }],
            t: 'es'
          }]
      }, {
        ln: 'DistanceType',
        ps: [{
            n: 'value',
            ti: 'Double',
            t: 'v'
          }, {
            n: 'units',
            rq: true,
            an: {
              lp: 'units'
            },
            t: 'a'
          }]
      }, {
        ln: 'SpatialOperatorType',
        ps: [{
            n: 'geometryOperands',
            en: 'GeometryOperands',
            ti: '.GeometryOperandsType'
          }, {
            n: 'name',
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'FunctionsType',
        ps: [{
            n: 'functionNames',
            rq: true,
            en: 'FunctionNames',
            ti: '.FunctionNamesType'
          }]
      }, {
        ln: 'PropertyIsBetweenType',
        bti: '.ComparisonOpsType',
        ps: [{
            n: 'expression',
            rq: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }, {
            n: 'lowerBoundary',
            rq: true,
            en: 'LowerBoundary',
            ti: '.LowerBoundaryType'
          }, {
            n: 'upperBoundary',
            rq: true,
            en: 'UpperBoundary',
            ti: '.UpperBoundaryType'
          }]
      }, {
        ln: 'BinaryOperatorType',
        bti: '.ExpressionType',
        ps: [{
            n: 'expression',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            mx: false,
            dom: false,
            ti: '.ExpressionType',
            t: 'er'
          }]
      }, {
        ln: 'SortByType',
        ps: [{
            n: 'sortProperty',
            rq: true,
            col: true,
            en: 'SortProperty',
            ti: '.SortPropertyType'
          }]
      }, {
        ln: 'GeometryOperandsType',
        ps: [{
            n: 'geometryOperand',
            rq: true,
            col: true,
            en: 'GeometryOperand',
            ti: 'QName'
          }]
      }, {
        t: 'enum',
        ln: 'SortOrderType',
        vs: ['DESC', 'ASC']
      }, {
        t: 'enum',
        ln: 'SpatialOperatorNameType',
        vs: ['BBOX', 'Equals', 'Disjoint', 'Intersects', 'Touches', 'Crosses', 'Within', 'Contains', 'Overlaps', 'Beyond', 'DWithin']
      }, {
        t: 'enum',
        ln: 'ComparisonOperatorType',
        vs: ['LessThan', 'GreaterThan', 'LessThanEqualTo', 'GreaterThanEqualTo', 'EqualTo', 'NotEqualTo', 'Like', 'Between', 'NullCheck']
      }],
    eis: [{
        en: 'SimpleArithmetic',
        ti: '.SimpleArithmetic'
      }, {
        en: 'EID',
        ti: '.EID'
      }, {
        en: 'PropertyName',
        ti: '.PropertyNameType',
        sh: 'expression'
      }, {
        en: 'PropertyIsEqualTo',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'Equals',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Filter_Capabilities',
        ti: '.FilterCapabilities'
      }, {
        en: 'Overlaps',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Crosses',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'FID',
        ti: '.FID'
      }, {
        en: 'Mul',
        ti: '.BinaryOperatorType',
        sh: 'expression'
      }, {
        en: 'FeatureId',
        ti: '.FeatureIdType',
        sh: '_Id'
      }, {
        en: 'Div',
        ti: '.BinaryOperatorType',
        sh: 'expression'
      }, {
        en: 'Intersects',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: '_Id',
        ti: '.AbstractIdType'
      }, {
        en: 'Within',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Sub',
        ti: '.BinaryOperatorType',
        sh: 'expression'
      }, {
        en: 'PropertyIsNull',
        ti: '.PropertyIsNullType',
        sh: 'comparisonOps'
      }, {
        en: 'Not',
        ti: '.UnaryLogicOpType',
        sh: 'logicOps'
      }, {
        en: 'PropertyIsNotEqualTo',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'logicOps',
        ti: '.LogicOpsType'
      }, {
        en: 'Add',
        ti: '.BinaryOperatorType',
        sh: 'expression'
      }, {
        en: 'Touches',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'PropertyIsGreaterThan',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'PropertyIsGreaterThanOrEqualTo',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'comparisonOps',
        ti: '.ComparisonOpsType'
      }, {
        en: 'PropertyIsLessThanOrEqualTo',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'PropertyIsBetween',
        ti: '.PropertyIsBetweenType',
        sh: 'comparisonOps'
      }, {
        en: 'PropertyIsLessThan',
        ti: '.BinaryComparisonOpType',
        sh: 'comparisonOps'
      }, {
        en: 'Filter',
        ti: '.FilterType'
      }, {
        en: 'Beyond',
        ti: '.DistanceBufferType',
        sh: 'spatialOps'
      }, {
        en: 'PropertyIsLike',
        ti: '.PropertyIsLikeType',
        sh: 'comparisonOps'
      }, {
        en: 'Or',
        ti: '.BinaryLogicOpType',
        sh: 'logicOps'
      }, {
        en: 'DWithin',
        ti: '.DistanceBufferType',
        sh: 'spatialOps'
      }, {
        en: 'expression',
        ti: '.ExpressionType'
      }, {
        en: 'GmlObjectId',
        ti: '.GmlObjectIdType',
        sh: '_Id'
      }, {
        en: 'BBOX',
        ti: '.BBOXType',
        sh: 'spatialOps'
      }, {
        en: 'LogicalOperators',
        ti: '.LogicalOperators'
      }, {
        en: 'Function',
        ti: '.FunctionType',
        sh: 'expression'
      }, {
        en: 'And',
        ti: '.BinaryLogicOpType',
        sh: 'logicOps'
      }, {
        en: 'spatialOps',
        ti: '.SpatialOpsType'
      }, {
        en: 'SortBy',
        ti: '.SortByType'
      }, {
        en: 'Disjoint',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Contains',
        ti: '.BinarySpatialOpType',
        sh: 'spatialOps'
      }, {
        en: 'Literal',
        ti: '.LiteralType',
        sh: 'expression'
      }]
  };
  return {
    Filter_1_1_0: Filter_1_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], Filter_1_1_0_Module_Factory);
}
else {
  var Filter_1_1_0_Module = Filter_1_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.Filter_1_1_0 = Filter_1_1_0_Module.Filter_1_1_0;
  }
  else {
    var Filter_1_1_0 = Filter_1_1_0_Module.Filter_1_1_0;
  }
}
},{}],5:[function(require,module,exports){
var GML_2_1_2_Module_Factory = function () {
  var GML_2_1_2 = {
    n: 'GML_2_1_2',
    dens: 'http:\/\/www.opengis.net\/gml',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    deps: ['XLink_1_0'],
    tis: [{
        ln: 'MultiPolygonPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'LineStringType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'coord',
            rq: true,
            mno: 2,
            col: true,
            ti: '.CoordType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'AbstractFeatureType',
        ps: [{
            n: 'description'
          }, {
            n: 'name'
          }, {
            n: 'boundedBy',
            ti: '.BoundingShapeType'
          }, {
            n: 'fid',
            ti: 'ID',
            an: {
              lp: 'fid'
            },
            t: 'a'
          }]
      }, {
        ln: 'MultiPointPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'LinearRingMemberType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'MultiGeometryPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'CoordType',
        ps: [{
            n: 'x',
            rq: true,
            en: 'X',
            ti: 'Decimal'
          }, {
            n: 'y',
            en: 'Y',
            ti: 'Decimal'
          }, {
            n: 'z',
            en: 'Z',
            ti: 'Decimal'
          }]
      }, {
        ln: 'CoordinatesType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'decimal',
            an: {
              lp: 'decimal'
            },
            t: 'a'
          }, {
            n: 'cs',
            an: {
              lp: 'cs'
            },
            t: 'a'
          }, {
            n: 'ts',
            an: {
              lp: 'ts'
            },
            t: 'a'
          }]
      }, {
        ln: 'LineStringMemberType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'MultiPolygonType',
        bti: '.GeometryCollectionType'
      }, {
        ln: 'AbstractFeatureCollectionType',
        bti: '.AbstractFeatureCollectionBaseType',
        ps: [{
            n: 'featureMember',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            ti: '.FeatureAssociationType',
            t: 'er'
          }]
      }, {
        ln: 'GeometryCollectionType',
        bti: '.AbstractGeometryCollectionBaseType',
        ps: [{
            n: 'geometryMember',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            ti: '.GeometryAssociationType',
            t: 'er'
          }]
      }, {
        ln: 'PolygonType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'outerBoundaryIs',
            rq: true,
            ti: '.LinearRingMemberType'
          }, {
            n: 'innerBoundaryIs',
            mno: 0,
            col: true,
            ti: '.LinearRingMemberType'
          }]
      }, {
        ln: 'PolygonPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'PointPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'AbstractFeatureCollectionBaseType',
        bti: '.AbstractFeatureType'
      }, {
        ln: 'LinearRingType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'coord',
            rq: true,
            mno: 4,
            col: true,
            ti: '.CoordType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'GeometryPropertyType',
        ps: [{
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'BoxType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'coord',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            ti: '.CoordType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'LineStringPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'AbstractGeometryType',
        ps: [{
            n: 'gid',
            ti: 'ID',
            an: {
              lp: 'gid'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        ln: 'MultiLineStringPropertyType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'GeometryAssociationType',
        ps: [{
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'PointMemberType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'PolygonMemberType',
        bti: '.GeometryAssociationType'
      }, {
        ln: 'MultiLineStringType',
        bti: '.GeometryCollectionType'
      }, {
        ln: 'MultiPointType',
        bti: '.GeometryCollectionType'
      }, {
        ln: 'BoundingShapeType',
        ps: [{
            n: 'box',
            rq: true,
            en: 'Box',
            ti: '.BoxType'
          }, {
            n: '_null',
            rq: true,
            en: 'null'
          }]
      }, {
        ln: 'AbstractGeometryCollectionBaseType',
        bti: '.AbstractGeometryType'
      }, {
        ln: 'PointType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'coord',
            rq: true,
            ti: '.CoordType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'FeatureAssociationType',
        ps: [{
            n: 'feature',
            rq: true,
            mx: false,
            dom: false,
            en: '_Feature',
            ti: '.AbstractFeatureType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'NullType',
        vs: ['inapplicable', 'unknown', 'unavailable', 'missing']
      }],
    eis: [{
        en: 'location',
        ti: '.PointPropertyType',
        sh: 'pointProperty'
      }, {
        en: 'polygonProperty',
        ti: '.PolygonPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'lineStringProperty',
        ti: '.LineStringPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'pointMember',
        ti: '.PointMemberType',
        sh: 'geometryMember'
      }, {
        en: 'boundedBy',
        ti: '.BoundingShapeType'
      }, {
        en: 'multiCenterOf',
        ti: '.MultiPointPropertyType',
        sh: 'multiPointProperty'
      }, {
        en: 'multiGeometryProperty',
        ti: '.MultiGeometryPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'multiCenterLineOf',
        ti: '.MultiLineStringPropertyType',
        sh: 'multiLineStringProperty'
      }, {
        en: 'multiCoverage',
        ti: '.MultiPolygonPropertyType',
        sh: 'multiPolygonProperty'
      }, {
        en: 'multiEdgeOf',
        ti: '.MultiLineStringPropertyType',
        sh: 'multiLineStringProperty'
      }, {
        en: '_Feature',
        ti: '.AbstractFeatureType'
      }, {
        en: 'multiLineStringProperty',
        ti: '.MultiLineStringPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'position',
        ti: '.PointPropertyType',
        sh: 'pointProperty'
      }, {
        en: 'innerBoundaryIs',
        ti: '.LinearRingMemberType'
      }, {
        en: 'pointProperty',
        ti: '.PointPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'multiPolygonProperty',
        ti: '.MultiPolygonPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'multiExtentOf',
        ti: '.MultiPolygonPropertyType',
        sh: 'multiPolygonProperty'
      }, {
        en: 'geometryMember',
        ti: '.GeometryAssociationType'
      }, {
        en: 'name'
      }, {
        en: 'coord',
        ti: '.CoordType'
      }, {
        en: 'edgeOf',
        ti: '.LineStringPropertyType',
        sh: 'lineStringProperty'
      }, {
        en: 'MultiPoint',
        ti: '.MultiPointType',
        sh: '_Geometry'
      }, {
        en: 'centerOf',
        ti: '.PointPropertyType',
        sh: 'pointProperty'
      }, {
        en: 'multiLocation',
        ti: '.MultiPointPropertyType',
        sh: 'multiPointProperty'
      }, {
        en: '_Geometry',
        ti: '.AbstractGeometryType'
      }, {
        en: 'featureMember',
        ti: '.FeatureAssociationType'
      }, {
        en: 'extentOf',
        ti: '.PolygonPropertyType',
        sh: 'polygonProperty'
      }, {
        en: 'Point',
        ti: '.PointType',
        sh: '_Geometry'
      }, {
        en: 'Box',
        ti: '.BoxType'
      }, {
        en: 'coverage',
        ti: '.PolygonPropertyType',
        sh: 'polygonProperty'
      }, {
        en: 'description'
      }, {
        en: 'Polygon',
        ti: '.PolygonType',
        sh: '_Geometry'
      }, {
        en: 'MultiGeometry',
        ti: '.GeometryCollectionType',
        sh: '_Geometry'
      }, {
        en: 'geometryProperty',
        ti: '.GeometryAssociationType'
      }, {
        en: '_FeatureCollection',
        ti: '.AbstractFeatureCollectionType',
        sh: '_Feature'
      }, {
        en: 'coordinates',
        ti: '.CoordinatesType'
      }, {
        en: 'outerBoundaryIs',
        ti: '.LinearRingMemberType'
      }, {
        en: 'multiPosition',
        ti: '.MultiPointPropertyType',
        sh: 'multiPointProperty'
      }, {
        en: 'LinearRing',
        ti: '.LinearRingType',
        sh: '_Geometry'
      }, {
        en: 'multiPointProperty',
        ti: '.MultiPointPropertyType',
        sh: '_geometryProperty'
      }, {
        en: 'lineStringMember',
        ti: '.LineStringMemberType',
        sh: 'geometryMember'
      }, {
        en: 'LineString',
        ti: '.LineStringType',
        sh: '_Geometry'
      }, {
        en: 'otherFeatureMember',
        ti: '.FeatureAssociationType',
        sh: 'featureMember'
      }, {
        en: '_GeometryCollection',
        ti: '.GeometryCollectionType',
        sh: '_Geometry'
      }, {
        en: 'MultiPolygon',
        ti: '.MultiPolygonType',
        sh: '_Geometry'
      }, {
        en: 'MultiLineString',
        ti: '.MultiLineStringType',
        sh: '_Geometry'
      }, {
        en: 'centerLineOf',
        ti: '.LineStringPropertyType',
        sh: 'lineStringProperty'
      }, {
        en: '_geometryProperty',
        ti: '.GeometryAssociationType'
      }, {
        en: 'polygonMember',
        ti: '.PolygonMemberType',
        sh: 'geometryMember'
      }]
  };
  return {
    GML_2_1_2: GML_2_1_2
  };
};
if (typeof define === 'function' && define.amd) {
  define([], GML_2_1_2_Module_Factory);
}
else {
  var GML_2_1_2_Module = GML_2_1_2_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.GML_2_1_2 = GML_2_1_2_Module.GML_2_1_2;
  }
  else {
    var GML_2_1_2 = GML_2_1_2_Module.GML_2_1_2;
  }
}
},{}],6:[function(require,module,exports){
var GML_3_1_1_Module_Factory = function () {
  var GML_3_1_1 = {
    n: 'GML_3_1_1',
    dens: 'http:\/\/www.opengis.net\/gml',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    deps: ['XLink_1_0', 'SMIL_2_0_Language'],
    tis: [{
        ln: 'EngineeringCRSType',
        bti: '.AbstractReferenceSystemType',
        ps: [{
            n: 'usesCS',
            rq: true,
            ti: '.CoordinateSystemRefType'
          }, {
            n: 'usesEngineeringDatum',
            rq: true,
            ti: '.EngineeringDatumRefType'
          }]
      }, {
        ln: 'FileType',
        ps: [{
            n: 'rangeParameters',
            rq: true,
            ti: '.RangeParametersType'
          }, {
            n: 'fileName',
            rq: true
          }, {
            n: 'fileStructure',
            rq: true
          }, {
            n: 'mimeType'
          }, {
            n: 'compression'
          }]
      }, {
        ln: 'CylinderType',
        bti: '.AbstractGriddedSurfaceType',
        ps: [{
            n: 'horizontalCURVETYPE',
            an: {
              lp: 'horizontalCurveType'
            },
            t: 'a'
          }, {
            n: 'verticalCURVETYPE',
            an: {
              lp: 'verticalCurveType'
            },
            t: 'a'
          }]
      }, {
        ln: 'LinearRingType',
        bti: '.AbstractRingType',
        ps: [{
            n: 'posOrPointPropertyOrPointRep',
            rq: true,
            mno: 4,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }, {
                en: 'pointRep',
                ti: '.PointPropertyType'
              }],
            t: 'ers'
          }, {
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'coord',
            rq: true,
            mno: 4,
            col: true,
            ti: '.CoordType'
          }]
      }, {
        ln: 'AbstractCurveType',
        bti: '.AbstractGeometricPrimitiveType'
      }, {
        ln: 'MultiCurvePropertyType',
        ps: [{
            n: 'multiCurve',
            rq: true,
            en: 'MultiCurve',
            ti: '.MultiCurveType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CoordinateSystemAxisRefType',
        ps: [{
            n: 'coordinateSystemAxis',
            rq: true,
            en: 'CoordinateSystemAxis',
            ti: '.CoordinateSystemAxisType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'EllipsoidType',
        bti: '.EllipsoidBaseType',
        ps: [{
            n: 'ellipsoidID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'semiMajorAxis',
            rq: true,
            ti: '.MeasureType'
          }, {
            n: 'secondDefiningParameter',
            rq: true,
            ti: '.SecondDefiningParameterType'
          }]
      }, {
        ln: 'SurfacePropertyType',
        ps: [{
            n: 'surface',
            rq: true,
            mx: false,
            dom: false,
            en: '_Surface',
            ti: '.AbstractSurfaceType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ProjectedCRSType',
        bti: '.AbstractGeneralDerivedCRSType',
        ps: [{
            n: 'usesCartesianCS',
            rq: true,
            ti: '.CartesianCSRefType'
          }]
      }, {
        ln: 'CodeType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'codeSpace',
            an: {
              lp: 'codeSpace'
            },
            t: 'a'
          }]
      }, {
        ln: 'GeneralConversionRefType',
        ps: [{
            n: 'generalConversion',
            rq: true,
            mx: false,
            dom: false,
            en: '_GeneralConversion',
            ti: '.AbstractGeneralConversionType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CompositeCurvePropertyType',
        ps: [{
            n: 'compositeCurve',
            rq: true,
            en: 'CompositeCurve',
            ti: '.CompositeCurveType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TopoPointType',
        bti: '.AbstractTopologyType',
        ps: [{
            n: 'directedNode',
            rq: true,
            ti: '.DirectedNodePropertyType'
          }]
      }, {
        ln: 'TimeInstantType',
        bti: '.AbstractTimeGeometricPrimitiveType',
        ps: [{
            n: 'timePosition',
            rq: true,
            ti: '.TimePositionType'
          }]
      }, {
        ln: 'EnvelopeType',
        ps: [{
            n: 'lowerCorner',
            rq: true,
            ti: '.DirectPositionType'
          }, {
            n: 'upperCorner',
            rq: true,
            ti: '.DirectPositionType'
          }, {
            n: 'coord',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            ti: '.CoordType'
          }, {
            n: 'pos',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            ti: '.DirectPositionType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }, {
            n: 'srsDimension',
            ti: 'PositiveInteger',
            an: {
              lp: 'srsDimension'
            },
            t: 'a'
          }, {
            n: 'axisLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'axisLabels'
            },
            t: 'a'
          }, {
            n: 'uomLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'uomLabels'
            },
            t: 'a'
          }]
      }, {
        ln: 'GeographicCRSType',
        bti: '.AbstractReferenceSystemType',
        ps: [{
            n: 'usesEllipsoidalCS',
            rq: true,
            ti: '.EllipsoidalCSRefType'
          }, {
            n: 'usesGeodeticDatum',
            rq: true,
            ti: '.GeodeticDatumRefType'
          }]
      }, {
        ln: 'GeometricComplexPropertyType',
        ps: [{
            n: 'geometricComplex',
            rq: true,
            en: 'GeometricComplex',
            ti: '.GeometricComplexType'
          }, {
            n: 'compositeCurve',
            rq: true,
            en: 'CompositeCurve',
            ti: '.CompositeCurveType'
          }, {
            n: 'compositeSurface',
            rq: true,
            en: 'CompositeSurface',
            ti: '.CompositeSurfaceType'
          }, {
            n: 'compositeSolid',
            rq: true,
            en: 'CompositeSolid',
            ti: '.CompositeSolidType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'IdentifierType',
        ps: [{
            n: 'name',
            rq: true,
            mx: false,
            dom: false,
            ti: '.CodeType',
            t: 'er'
          }, {
            n: 'version'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }]
      }, {
        ln: 'TopoVolumeType',
        bti: '.AbstractTopologyType',
        ps: [{
            n: 'directedTopoSolid',
            rq: true,
            col: true,
            ti: '.DirectedTopoSolidPropertyType'
          }]
      }, {
        ln: 'AbstractGeneralOperationParameterType',
        bti: '.DefinitionType',
        ps: [{
            n: 'minimumOccurs',
            ti: 'NonNegativeInteger'
          }]
      }, {
        ln: 'OperationParameterType',
        bti: '.OperationParameterBaseType',
        ps: [{
            n: 'parameterID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }]
      }, {
        ln: 'StyleVariationType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'styleProperty',
            rq: true,
            an: {
              lp: 'styleProperty'
            },
            t: 'a'
          }, {
            n: 'featurePropertyRange',
            an: {
              lp: 'featurePropertyRange'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractTimeTopologyPrimitiveType',
        bti: '.AbstractTimePrimitiveType',
        ps: [{
            n: 'complex',
            ti: '.ReferenceType'
          }]
      }, {
        ln: 'TimeEdgePropertyType',
        ps: [{
            n: 'timeEdge',
            rq: true,
            en: 'TimeEdge',
            ti: '.TimeEdgeType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'EllipsoidalCSRefType',
        ps: [{
            n: 'ellipsoidalCS',
            rq: true,
            en: 'EllipsoidalCS',
            ti: '.EllipsoidalCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ArcByCenterPointType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'pos',
            rq: true,
            ti: '.DirectPositionType'
          }, {
            n: 'pointProperty',
            rq: true,
            ti: '.PointPropertyType'
          }, {
            n: 'pointRep',
            rq: true,
            ti: '.PointPropertyType'
          }, {
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'radius',
            rq: true,
            ti: '.LengthType'
          }, {
            n: 'startAngle',
            ti: '.AngleType'
          }, {
            n: 'endAngle',
            ti: '.AngleType'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }, {
            n: 'numARC',
            rq: true,
            ti: 'Integer',
            an: {
              lp: 'numArc'
            },
            t: 'a'
          }]
      }, {
        ln: 'VolumeType',
        bti: '.MeasureType'
      }, {
        ln: 'AbstractTimeReferenceSystemType',
        bti: '.DefinitionType',
        ps: [{
            n: 'domainOfValidity'
          }]
      }, {
        ln: 'MultiSurfaceCoverageType',
        bti: '.AbstractDiscreteCoverageType'
      }, {
        ln: 'GeocentricCRSRefType',
        ps: [{
            n: 'geocentricCRS',
            rq: true,
            en: 'GeocentricCRS',
            ti: '.GeocentricCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CurveSegmentArrayPropertyType',
        ps: [{
            n: 'curveSegment',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_CurveSegment',
            ti: '.AbstractCurveSegmentType',
            t: 'er'
          }]
      }, {
        ln: 'TopoCurvePropertyType',
        ps: [{
            n: 'topoCurve',
            rq: true,
            en: 'TopoCurve',
            ti: '.TopoCurveType'
          }]
      }, {
        ln: 'SecondDefiningParameterType',
        ps: [{
            n: 'inverseFlattening',
            rq: true,
            ti: '.MeasureType'
          }, {
            n: 'semiMinorAxis',
            rq: true,
            ti: '.MeasureType'
          }, {
            n: 'isSphere',
            rq: true
          }]
      }, {
        ln: 'MultiCurveCoverageType',
        bti: '.AbstractDiscreteCoverageType'
      }, {
        ln: 'DerivedCRSTypeType',
        bti: '.CodeType'
      }, {
        ln: 'ProjectedCRSRefType',
        ps: [{
            n: 'projectedCRS',
            rq: true,
            en: 'ProjectedCRS',
            ti: '.ProjectedCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AngleType',
        bti: '.MeasureType'
      }, {
        ln: 'DirectionVectorType',
        ps: [{
            n: 'vector',
            rq: true,
            ti: '.VectorType'
          }, {
            n: 'horizontalAngle',
            rq: true,
            ti: '.AngleType'
          }, {
            n: 'verticalAngle',
            rq: true,
            ti: '.AngleType'
          }]
      }, {
        ln: 'DerivationUnitTermType',
        bti: '.UnitOfMeasureType',
        ps: [{
            n: 'exponent',
            ti: 'Integer',
            an: {
              lp: 'exponent'
            },
            t: 'a'
          }]
      }, {
        ln: 'ConversionType',
        bti: '.AbstractGeneralConversionType',
        ps: [{
            n: 'usesMethod',
            rq: true,
            ti: '.OperationMethodRefType'
          }, {
            n: 'usesValue',
            mno: 0,
            col: true,
            ti: '.ParameterValueType'
          }]
      }, {
        ln: 'ScaleType',
        bti: '.MeasureType'
      }, {
        ln: 'TimePeriodType',
        bti: '.AbstractTimeGeometricPrimitiveType',
        ps: [{
            n: 'beginPosition',
            rq: true,
            ti: '.TimePositionType'
          }, {
            n: 'begin',
            rq: true,
            ti: '.TimeInstantPropertyType'
          }, {
            n: 'endPosition',
            rq: true,
            ti: '.TimePositionType'
          }, {
            n: 'end',
            rq: true,
            ti: '.TimeInstantPropertyType'
          }, {
            n: 'duration',
            rq: true,
            ti: 'Duration'
          }, {
            n: 'timeInterval',
            rq: true,
            ti: '.TimeIntervalLengthType'
          }]
      }, {
        ln: 'LabelType',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            en: 'LabelExpression',
            t: 'er'
          }, {
            n: 'transform',
            an: {
              lp: 'transform',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }]
      }, {
        ln: 'PixelInCellType',
        bti: '.CodeType'
      }, {
        ln: 'PolarCSRefType',
        ps: [{
            n: 'polarCS',
            rq: true,
            en: 'PolarCS',
            ti: '.PolarCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractGeneralParameterValueType'
      }, {
        ln: 'GeodeticDatumRefType',
        ps: [{
            n: 'geodeticDatum',
            rq: true,
            en: 'GeodeticDatum',
            ti: '.GeodeticDatumType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'VerticalCRSRefType',
        ps: [{
            n: 'verticalCRS',
            rq: true,
            en: 'VerticalCRS',
            ti: '.VerticalCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CylindricalCSRefType',
        ps: [{
            n: 'cylindricalCS',
            rq: true,
            en: 'CylindricalCS',
            ti: '.CylindricalCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'MultiSolidDomainType',
        bti: '.DomainSetType'
      }, {
        ln: 'TemporalCRSType',
        bti: '.AbstractReferenceSystemType',
        ps: [{
            n: 'usesTemporalCS',
            rq: true,
            ti: '.TemporalCSRefType'
          }, {
            n: 'usesTemporalDatum',
            rq: true,
            ti: '.TemporalDatumRefType'
          }]
      }, {
        ln: 'AbstractGMLType',
        ps: [{
            n: 'metaDataProperty',
            mno: 0,
            col: true,
            ti: '.MetaDataPropertyType'
          }, {
            n: 'description',
            ti: '.StringOrRefType'
          }, {
            n: 'name',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            ti: '.CodeType',
            t: 'er'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }]
      }, {
        ln: 'RingType',
        bti: '.AbstractRingType',
        ps: [{
            n: 'curveMember',
            rq: true,
            col: true,
            ti: '.CurvePropertyType'
          }]
      }, {
        ln: 'KnotType',
        ps: [{
            n: 'value',
            rq: true,
            ti: 'Double'
          }, {
            n: 'multiplicity',
            rq: true,
            ti: 'NonNegativeInteger'
          }, {
            n: 'weight',
            rq: true,
            ti: 'Double'
          }]
      }, {
        ln: 'PointType',
        bti: '.AbstractGeometricPrimitiveType',
        ps: [{
            n: 'pos',
            rq: true,
            ti: '.DirectPositionType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'coord',
            rq: true,
            ti: '.CoordType'
          }]
      }, {
        ln: 'MeasureOrNullListType',
        ps: [{
            n: 'value',
            ti: {
              t: 'l'
            },
            t: 'v'
          }, {
            n: 'uom',
            rq: true,
            an: {
              lp: 'uom'
            },
            t: 'a'
          }]
      }, {
        ln: 'CurveArrayPropertyType',
        ps: [{
            n: 'curve',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_Curve',
            ti: '.AbstractCurveType',
            t: 'er'
          }]
      }, {
        ln: 'AbstractTimeSliceType',
        bti: '.AbstractGMLType',
        ps: [{
            n: 'validTime',
            rq: true,
            ti: '.TimePrimitivePropertyType'
          }, {
            n: 'dataSource',
            ti: '.StringOrRefType'
          }]
      }, {
        ln: 'TransformationRefType',
        ps: [{
            n: 'transformation',
            rq: true,
            en: 'Transformation',
            ti: '.TransformationType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'OrientableCurveType',
        bti: '.AbstractCurveType',
        ps: [{
            n: 'baseCurve',
            rq: true,
            ti: '.CurvePropertyType'
          }, {
            n: 'orientation',
            an: {
              lp: 'orientation'
            },
            t: 'a'
          }]
      }, {
        ln: 'GridCoverageType',
        bti: '.AbstractDiscreteCoverageType'
      }, {
        ln: 'CoordinateSystemAxisBaseType',
        bti: '.DefinitionType'
      }, {
        ln: 'SurfaceArrayPropertyType',
        ps: [{
            n: 'surface',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_Surface',
            ti: '.AbstractSurfaceType',
            t: 'er'
          }]
      }, {
        ln: 'TopoVolumePropertyType',
        ps: [{
            n: 'topoVolume',
            rq: true,
            en: 'TopoVolume',
            ti: '.TopoVolumeType'
          }]
      }, {
        ln: 'TopoComplexMemberType',
        ps: [{
            n: 'topoComplex',
            en: 'TopoComplex',
            ti: '.TopoComplexType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GeometryStylePropertyType',
        ps: [{
            n: 'geometryStyle',
            en: 'GeometryStyle',
            ti: '.GeometryStyleType'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ArrayType',
        bti: '.AbstractGMLType',
        ps: [{
            n: 'members',
            ti: '.ArrayAssociationType'
          }]
      }, {
        ln: 'GeodeticDatumType',
        bti: '.AbstractDatumType',
        ps: [{
            n: 'usesPrimeMeridian',
            rq: true,
            ti: '.PrimeMeridianRefType'
          }, {
            n: 'usesEllipsoid',
            rq: true,
            ti: '.EllipsoidRefType'
          }]
      }, {
        ln: 'TinType.ControlPoint',
        tn: null,
        ps: [{
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'geometricPositionGroup',
            rq: true,
            mno: 3,
            col: true,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }],
            t: 'es'
          }]
      }, {
        ln: 'ImageDatumType',
        bti: '.AbstractDatumType',
        ps: [{
            n: 'pixelInCell',
            rq: true,
            ti: '.PixelInCellType'
          }]
      }, {
        ln: 'AbstractReferenceSystemBaseType',
        bti: '.DefinitionType'
      }, {
        ln: 'AbstractGeneralTransformationType',
        bti: '.AbstractCoordinateOperationType'
      }, {
        ln: 'ObservationType',
        bti: '.AbstractFeatureType',
        ps: [{
            n: 'validTime',
            rq: true,
            ti: '.TimePrimitivePropertyType'
          }, {
            n: 'using',
            ti: '.FeaturePropertyType'
          }, {
            n: 'target',
            mx: false,
            dom: false,
            ti: '.TargetPropertyType',
            t: 'er'
          }, {
            n: 'resultOf',
            rq: true,
            ti: '.AssociationType'
          }]
      }, {
        ln: 'ArrayAssociationType',
        ps: [{
            n: 'object',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_Object',
            ti: 'AnyType',
            t: 'er'
          }]
      }, {
        ln: 'TimeCoordinateSystemType',
        bti: '.AbstractTimeReferenceSystemType',
        ps: [{
            n: 'originPosition',
            rq: true,
            ti: '.TimePositionType'
          }, {
            n: 'origin',
            rq: true,
            ti: '.TimeInstantPropertyType'
          }, {
            n: 'interval',
            rq: true,
            ti: '.TimeIntervalLengthType'
          }]
      }, {
        ln: 'CoverageFunctionType',
        ps: [{
            n: 'mappingRule',
            rq: true,
            en: 'MappingRule',
            ti: '.StringOrRefType'
          }, {
            n: 'gridFunction',
            rq: true,
            mx: false,
            dom: false,
            en: 'GridFunction',
            ti: '.GridFunctionType',
            t: 'er'
          }]
      }, {
        ln: 'DefaultStylePropertyType',
        ps: [{
            n: 'style',
            mx: false,
            dom: false,
            en: '_Style',
            ti: '.AbstractStyleType',
            t: 'er'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'SphericalCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'TimeCalendarEraPropertyType',
        ps: [{
            n: 'timeCalendarEra',
            rq: true,
            en: 'TimeCalendarEra',
            ti: '.TimeCalendarEraType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractDatumBaseType',
        bti: '.DefinitionType'
      }, {
        ln: 'UnitOfMeasureType',
        ps: [{
            n: 'uom',
            rq: true,
            an: {
              lp: 'uom'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractTopoPrimitiveType',
        bti: '.AbstractTopologyType',
        ps: [{
            n: 'isolated',
            mno: 0,
            col: true,
            ti: '.IsolatedPropertyType'
          }, {
            n: 'container',
            ti: '.ContainerPropertyType'
          }]
      }, {
        ln: 'ConventionalUnitType',
        bti: '.UnitDefinitionType',
        ps: [{
            n: 'conversionToPreferredUnit',
            rq: true,
            ti: '.ConversionToPreferredUnitType'
          }, {
            n: 'roughConversionToPreferredUnit',
            rq: true,
            ti: '.ConversionToPreferredUnitType'
          }, {
            n: 'derivationUnitTerm',
            mno: 0,
            col: true,
            ti: '.DerivationUnitTermType'
          }]
      }, {
        ln: 'ExtentType',
        ps: [{
            n: 'description',
            ti: '.StringOrRefType'
          }, {
            n: 'boundingBox',
            mno: 0,
            col: true,
            ti: '.EnvelopeType'
          }, {
            n: 'boundingPolygon',
            mno: 0,
            col: true,
            ti: '.PolygonType'
          }, {
            n: 'verticalExtent',
            mno: 0,
            col: true,
            ti: '.EnvelopeType'
          }, {
            n: 'temporalExtent',
            mno: 0,
            col: true,
            ti: '.TimePeriodType'
          }]
      }, {
        ln: 'AbsoluteExternalPositionalAccuracyType',
        bti: '.AbstractPositionalAccuracyType',
        ps: [{
            n: 'result',
            rq: true,
            ti: '.MeasureType'
          }]
      }, {
        ln: 'CoordinateSystemRefType',
        ps: [{
            n: 'coordinateSystem',
            rq: true,
            mx: false,
            dom: false,
            en: '_CoordinateSystem',
            ti: '.AbstractCoordinateSystemType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'BaseStyleDescriptorType',
        bti: '.AbstractGMLType',
        ps: [{
            n: 'spatialResolution',
            ti: '.ScaleType'
          }, {
            n: 'styleVariation',
            mno: 0,
            col: true,
            ti: '.StyleVariationType'
          }, {
            n: 'animate',
            mno: 0,
            col: true,
            en: {
              lp: 'animate',
              ns: 'http:\/\/www.w3.org\/2001\/SMIL20\/'
            },
            ti: 'SMIL_2_0_Language.AnimateType'
          }, {
            n: 'animateMotion',
            mno: 0,
            col: true,
            en: {
              lp: 'animateMotion',
              ns: 'http:\/\/www.w3.org\/2001\/SMIL20\/'
            },
            ti: 'SMIL_2_0_Language.AnimateMotionType'
          }, {
            n: 'animateColor',
            mno: 0,
            col: true,
            en: {
              lp: 'animateColor',
              ns: 'http:\/\/www.w3.org\/2001\/SMIL20\/'
            },
            ti: 'SMIL_2_0_Language.AnimateColorType'
          }, {
            n: 'set',
            mno: 0,
            col: true,
            en: {
              lp: 'set',
              ns: 'http:\/\/www.w3.org\/2001\/SMIL20\/'
            },
            ti: 'SMIL_2_0_Language.SetType'
          }]
      }, {
        ln: 'AssociationType',
        ps: [{
            n: 'object',
            rq: true,
            mx: false,
            dom: false,
            en: '_Object',
            ti: 'AnyType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'MultiCurveDomainType',
        bti: '.DomainSetType'
      }, {
        ln: 'LinearCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'MeasureType',
        ps: [{
            n: 'value',
            ti: 'Double',
            t: 'v'
          }, {
            n: 'uom',
            rq: true,
            an: {
              lp: 'uom'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractGeometryType',
        bti: '.AbstractGMLType',
        ps: [{
            n: 'gid',
            an: {
              lp: 'gid'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }, {
            n: 'srsDimension',
            ti: 'PositiveInteger',
            an: {
              lp: 'srsDimension'
            },
            t: 'a'
          }, {
            n: 'axisLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'axisLabels'
            },
            t: 'a'
          }, {
            n: 'uomLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'uomLabels'
            },
            t: 'a'
          }]
      }, {
        ln: 'TopoPointPropertyType',
        ps: [{
            n: 'topoPoint',
            rq: true,
            en: 'TopoPoint',
            ti: '.TopoPointType'
          }]
      }, {
        ln: 'DerivedUnitType',
        bti: '.UnitDefinitionType',
        ps: [{
            n: 'derivationUnitTerm',
            rq: true,
            col: true,
            ti: '.DerivationUnitTermType'
          }]
      }, {
        ln: 'MultiPointCoverageType',
        bti: '.AbstractDiscreteCoverageType'
      }, {
        ln: 'AbstractTimeComplexType',
        bti: '.AbstractTimeObjectType'
      }, {
        ln: 'SequenceRuleType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'order',
            an: {
              lp: 'order'
            },
            t: 'a'
          }]
      }, {
        ln: 'DirectedObservationAtDistanceType',
        bti: '.DirectedObservationType',
        ps: [{
            n: 'distance',
            rq: true,
            ti: '.MeasureType'
          }]
      }, {
        ln: 'GeographicCRSRefType',
        ps: [{
            n: 'geographicCRS',
            rq: true,
            en: 'GeographicCRS',
            ti: '.GeographicCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractFeatureCollectionType',
        bti: '.AbstractFeatureType',
        ps: [{
            n: 'featureMember',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            ti: '.FeaturePropertyType',
            t: 'er'
          }, {
            n: 'featureMembers',
            mx: false,
            dom: false,
            ti: '.FeatureArrayPropertyType',
            t: 'er'
          }]
      }, {
        ln: 'MultiPointType',
        bti: '.AbstractGeometricAggregateType',
        ps: [{
            n: 'pointMember',
            mno: 0,
            col: true,
            ti: '.PointPropertyType'
          }, {
            n: 'pointMembers',
            ti: '.PointArrayPropertyType'
          }]
      }, {
        ln: 'VerticalDatumTypeType',
        bti: '.CodeType'
      }, {
        ln: 'BaseUnitType',
        bti: '.UnitDefinitionType',
        ps: [{
            n: 'unitsSystem',
            rq: true,
            ti: '.ReferenceType'
          }]
      }, {
        ln: 'MultiLineStringPropertyType',
        ps: [{
            n: 'multiLineString',
            rq: true,
            en: 'MultiLineString',
            ti: '.MultiLineStringType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TimeGeometricPrimitivePropertyType',
        ps: [{
            n: 'timeGeometricPrimitive',
            rq: true,
            mx: false,
            dom: false,
            en: '_TimeGeometricPrimitive',
            ti: '.AbstractTimeGeometricPrimitiveType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TriangulatedSurfaceType',
        bti: '.SurfaceType'
      }, {
        ln: 'RangeParametersType',
        ps: [{
            n: '_boolean',
            rq: true,
            en: 'Boolean',
            ti: 'Boolean'
          }, {
            n: 'category',
            rq: true,
            en: 'Category',
            ti: '.CodeType'
          }, {
            n: 'quantity',
            rq: true,
            en: 'Quantity',
            ti: '.MeasureType'
          }, {
            n: 'count',
            rq: true,
            en: 'Count',
            ti: 'Integer'
          }, {
            n: 'booleanList',
            rq: true,
            en: 'BooleanList',
            ti: {
              t: 'l'
            }
          }, {
            n: 'categoryList',
            rq: true,
            en: 'CategoryList',
            ti: '.CodeOrNullListType'
          }, {
            n: 'quantityList',
            rq: true,
            en: 'QuantityList',
            ti: '.MeasureOrNullListType'
          }, {
            n: 'countList',
            rq: true,
            en: 'CountList',
            ti: {
              t: 'l'
            }
          }, {
            n: 'categoryExtent',
            rq: true,
            en: 'CategoryExtent',
            ti: '.CategoryExtentType'
          }, {
            n: 'quantityExtent',
            rq: true,
            en: 'QuantityExtent',
            ti: '.QuantityExtentType'
          }, {
            n: 'countExtent',
            rq: true,
            en: 'CountExtent',
            ti: {
              t: 'l'
            }
          }, {
            n: 'compositeValue',
            rq: true,
            mx: false,
            dom: false,
            en: 'CompositeValue',
            ti: '.CompositeValueType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TriangleType',
        bti: '.AbstractSurfacePatchType',
        ps: [{
            n: 'exterior',
            rq: true,
            mx: false,
            dom: false,
            ti: '.AbstractRingPropertyType',
            t: 'er'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractReferenceSystemType',
        bti: '.AbstractReferenceSystemBaseType',
        ps: [{
            n: 'srsID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'validArea',
            ti: '.ExtentType'
          }, {
            n: 'scope'
          }]
      }, {
        ln: 'TimePositionType',
        ps: [{
            n: 'value',
            ti: {
              t: 'l'
            },
            t: 'v'
          }, {
            n: 'frame',
            an: {
              lp: 'frame'
            },
            t: 'a'
          }, {
            n: 'calendarEraName',
            an: {
              lp: 'calendarEraName'
            },
            t: 'a'
          }, {
            n: 'indeterminatePosition',
            an: {
              lp: 'indeterminatePosition'
            },
            t: 'a'
          }]
      }, {
        ln: 'FeaturePropertyType',
        ps: [{
            n: 'feature',
            rq: true,
            mx: false,
            en: '_Feature',
            ti: '.AbstractFeatureType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TimeOrdinalEraType',
        bti: '.DefinitionType',
        ps: [{
            n: 'relatedTime',
            mno: 0,
            col: true,
            ti: '.RelatedTimeType'
          }, {
            n: 'start',
            rq: true,
            ti: '.TimeNodePropertyType'
          }, {
            n: 'end',
            rq: true,
            ti: '.TimeNodePropertyType'
          }, {
            n: 'extent',
            ti: '.TimePeriodPropertyType'
          }, {
            n: 'member',
            mno: 0,
            col: true,
            ti: '.TimeOrdinalEraPropertyType'
          }, {
            n: 'group',
            ti: '.ReferenceType'
          }]
      }, {
        ln: 'RelativeInternalPositionalAccuracyType',
        bti: '.AbstractPositionalAccuracyType',
        ps: [{
            n: 'result',
            rq: true,
            ti: '.MeasureType'
          }]
      }, {
        ln: 'CurvePropertyType',
        ps: [{
            n: 'curve',
            rq: true,
            mx: false,
            dom: false,
            en: '_Curve',
            ti: '.AbstractCurveType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'OperationParameterGroupType',
        bti: '.OperationParameterGroupBaseType',
        ps: [{
            n: 'groupID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'maximumOccurs',
            ti: 'PositiveInteger'
          }, {
            n: 'includesParameter',
            rq: true,
            mno: 2,
            col: true,
            ti: '.AbstractGeneralOperationParameterRefType'
          }]
      }, {
        ln: 'LineStringSegmentType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'posOrPointPropertyOrPointRep',
            rq: true,
            mno: 2,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }, {
                en: 'pointRep',
                ti: '.PointPropertyType'
              }],
            t: 'ers'
          }, {
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }]
      }, {
        ln: 'TimeCalendarEraType',
        bti: '.DefinitionType',
        ps: [{
            n: 'referenceEvent',
            rq: true,
            ti: '.StringOrRefType'
          }, {
            n: 'referenceDate',
            ti: 'Date'
          }, {
            n: 'julianReference',
            rq: true,
            ti: 'Decimal'
          }, {
            n: 'epochOfUse',
            rq: true,
            ti: '.TimePeriodPropertyType'
          }]
      }, {
        ln: 'EdgeType',
        bti: '.AbstractTopoPrimitiveType',
        ps: [{
            n: 'directedNode',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            ti: '.DirectedNodePropertyType'
          }, {
            n: 'directedFace',
            mno: 0,
            col: true,
            ti: '.DirectedFacePropertyType'
          }, {
            n: 'curveProperty',
            ti: '.CurvePropertyType'
          }]
      }, {
        ln: 'TinType',
        bti: '.TriangulatedSurfaceType',
        ps: [{
            n: 'stopLines',
            mno: 0,
            col: true,
            ti: '.LineStringSegmentArrayPropertyType'
          }, {
            n: 'breakLines',
            mno: 0,
            col: true,
            ti: '.LineStringSegmentArrayPropertyType'
          }, {
            n: 'maxLength',
            rq: true,
            ti: '.LengthType'
          }, {
            n: 'controlPoint',
            rq: true,
            ti: '.TinType.ControlPoint'
          }]
      }, {
        ln: 'NodeType',
        bti: '.AbstractTopoPrimitiveType',
        ps: [{
            n: 'directedEdge',
            mno: 0,
            col: true,
            ti: '.DirectedEdgePropertyType'
          }, {
            n: 'pointProperty',
            ti: '.PointPropertyType'
          }]
      }, {
        ln: 'LineStringSegmentArrayPropertyType',
        ps: [{
            n: 'lineStringSegment',
            mno: 0,
            col: true,
            en: 'LineStringSegment',
            ti: '.LineStringSegmentType'
          }]
      }, {
        ln: 'DirectedFacePropertyType',
        ps: [{
            n: 'face',
            rq: true,
            en: 'Face',
            ti: '.FaceType'
          }, {
            n: 'orientation',
            an: {
              lp: 'orientation'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'StringOrRefType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CoordinateSystemAxisType',
        bti: '.CoordinateSystemAxisBaseType',
        ps: [{
            n: 'axisID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'axisAbbrev',
            rq: true,
            ti: '.CodeType'
          }, {
            n: 'axisDirection',
            rq: true,
            ti: '.CodeType'
          }, {
            n: 'uom',
            rq: true,
            an: {
              lp: 'uom',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }]
      }, {
        ln: 'BagType',
        bti: '.AbstractGMLType',
        ps: [{
            n: 'member',
            mno: 0,
            col: true,
            ti: '.AssociationType'
          }, {
            n: 'members',
            ti: '.ArrayAssociationType'
          }]
      }, {
        ln: 'AbstractRingType',
        bti: '.AbstractGeometryType'
      }, {
        ln: 'ParameterValueType',
        bti: '.AbstractGeneralParameterValueType',
        ps: [{
            n: 'value',
            rq: true,
            ti: '.MeasureType'
          }, {
            n: 'dmsAngleValue',
            rq: true,
            ti: '.DMSAngleType'
          }, {
            n: 'stringValue',
            rq: true
          }, {
            n: 'integerValue',
            rq: true,
            ti: 'PositiveInteger'
          }, {
            n: 'booleanValue',
            rq: true,
            ti: 'Boolean'
          }, {
            n: 'valueList',
            rq: true,
            ti: '.MeasureListType'
          }, {
            n: 'integerValueList',
            rq: true,
            ti: {
              t: 'l',
              bti: 'Integer'
            }
          }, {
            n: 'valueFile',
            rq: true
          }, {
            n: 'valueOfParameter',
            rq: true,
            ti: '.OperationParameterRefType'
          }]
      }, {
        ln: 'LabelStyleType',
        bti: '.BaseStyleDescriptorType',
        ps: [{
            n: 'style',
            rq: true
          }, {
            n: 'label',
            rq: true,
            ti: '.LabelType'
          }]
      }, {
        ln: 'DerivedCRSRefType',
        ps: [{
            n: 'derivedCRS',
            rq: true,
            en: 'DerivedCRS',
            ti: '.DerivedCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ConversionRefType',
        ps: [{
            n: 'conversion',
            rq: true,
            en: 'Conversion',
            ti: '.ConversionType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'EngineeringCRSRefType',
        ps: [{
            n: 'engineeringCRS',
            rq: true,
            en: 'EngineeringCRS',
            ti: '.EngineeringCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CovarianceMatrixType',
        bti: '.AbstractPositionalAccuracyType',
        ps: [{
            n: 'unitOfMeasure',
            rq: true,
            col: true,
            ti: '.UnitOfMeasureType'
          }, {
            n: 'includesElement',
            rq: true,
            col: true,
            ti: '.CovarianceElementType'
          }]
      }, {
        ln: 'GeocentricCRSType',
        bti: '.AbstractReferenceSystemType',
        ps: [{
            n: 'usesCartesianCS',
            rq: true,
            ti: '.CartesianCSRefType'
          }, {
            n: 'usesSphericalCS',
            rq: true,
            ti: '.SphericalCSRefType'
          }, {
            n: 'usesGeodeticDatum',
            rq: true,
            ti: '.GeodeticDatumRefType'
          }]
      }, {
        ln: 'OperationMethodType',
        bti: '.OperationMethodBaseType',
        ps: [{
            n: 'methodID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'methodFormula',
            rq: true,
            ti: '.CodeType'
          }, {
            n: 'sourceDimensions',
            rq: true,
            ti: 'PositiveInteger'
          }, {
            n: 'targetDimensions',
            rq: true,
            ti: 'PositiveInteger'
          }, {
            n: 'usesParameter',
            mno: 0,
            col: true,
            ti: '.AbstractGeneralOperationParameterRefType'
          }]
      }, {
        ln: 'CompositeValueType',
        bti: '.AbstractGMLType',
        ps: [{
            n: 'valueComponent',
            mno: 0,
            col: true,
            ti: '.ValuePropertyType'
          }, {
            n: 'valueComponents',
            ti: '.ValueArrayPropertyType'
          }]
      }, {
        ln: 'PrimeMeridianType',
        bti: '.PrimeMeridianBaseType',
        ps: [{
            n: 'meridianID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'greenwichLongitude',
            rq: true,
            ti: '.AngleChoiceType'
          }]
      }, {
        ln: 'AbstractFeatureType',
        bti: '.AbstractGMLType',
        ps: [{
            n: 'boundedBy',
            ti: '.BoundingShapeType'
          }, {
            n: 'location',
            mx: false,
            dom: false,
            ti: '.LocationPropertyType',
            t: 'er'
          }]
      }, {
        ln: 'MultiPolygonPropertyType',
        ps: [{
            n: 'multiPolygon',
            rq: true,
            en: 'MultiPolygon',
            ti: '.MultiPolygonType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TimeClockType',
        bti: '.AbstractTimeReferenceSystemType',
        ps: [{
            n: 'referenceEvent',
            rq: true,
            ti: '.StringOrRefType'
          }, {
            n: 'referenceTime',
            rq: true,
            ti: 'Time'
          }, {
            n: 'utcReference',
            rq: true,
            ti: 'Time'
          }, {
            n: 'dateBasis',
            mno: 0,
            col: true,
            ti: '.TimeCalendarPropertyType'
          }]
      }, {
        ln: 'GridLimitsType',
        ps: [{
            n: 'gridEnvelope',
            rq: true,
            en: 'GridEnvelope',
            ti: '.GridEnvelopeType'
          }]
      }, {
        ln: 'DMSAngleType',
        ps: [{
            n: 'degrees',
            rq: true,
            ti: '.DegreesType'
          }, {
            n: 'decimalMinutes',
            rq: true,
            ti: 'Decimal'
          }, {
            n: 'minutes',
            rq: true,
            ti: 'NonNegativeInteger'
          }, {
            n: 'seconds',
            ti: 'Decimal'
          }]
      }, {
        ln: 'CoordinateReferenceSystemRefType',
        ps: [{
            n: 'coordinateReferenceSystem',
            rq: true,
            mx: false,
            dom: false,
            en: '_CoordinateReferenceSystem',
            ti: '.AbstractReferenceSystemType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractContinuousCoverageType',
        bti: '.AbstractCoverageType',
        ps: [{
            n: 'coverageFunction',
            ti: '.CoverageFunctionType'
          }]
      }, {
        ln: 'UnitDefinitionType',
        bti: '.DefinitionType',
        ps: [{
            n: 'quantityType',
            rq: true,
            ti: '.StringOrRefType'
          }, {
            n: 'catalogSymbol',
            ti: '.CodeType'
          }]
      }, {
        ln: 'ReferenceSystemRefType',
        ps: [{
            n: 'referenceSystem',
            rq: true,
            mx: false,
            dom: false,
            en: '_ReferenceSystem',
            ti: '.AbstractReferenceSystemType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ArcStringType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'posOrPointPropertyOrPointRep',
            rq: true,
            mno: 3,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }, {
                en: 'pointRep',
                ti: '.PointPropertyType'
              }],
            t: 'ers'
          }, {
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }, {
            n: 'numArc',
            ti: 'Integer',
            an: {
              lp: 'numArc'
            },
            t: 'a'
          }]
      }, {
        ln: 'LinearRingPropertyType',
        ps: [{
            n: 'linearRing',
            rq: true,
            en: 'LinearRing',
            ti: '.LinearRingType'
          }]
      }, {
        ln: 'TimeCalendarType',
        bti: '.AbstractTimeReferenceSystemType',
        ps: [{
            n: 'referenceFrame',
            rq: true,
            col: true,
            ti: '.TimeCalendarEraPropertyType'
          }]
      }, {
        ln: 'PrimeMeridianBaseType',
        bti: '.DefinitionType'
      }, {
        ln: 'RingPropertyType',
        ps: [{
            n: 'ring',
            rq: true,
            en: 'Ring',
            ti: '.RingType'
          }]
      }, {
        ln: 'MultiSurfaceType',
        bti: '.AbstractGeometricAggregateType',
        ps: [{
            n: 'surfaceMember',
            mno: 0,
            col: true,
            ti: '.SurfacePropertyType'
          }, {
            n: 'surfaceMembers',
            ti: '.SurfaceArrayPropertyType'
          }]
      }, {
        ln: 'StyleType',
        bti: '.AbstractStyleType',
        ps: [{
            n: 'featureStyle',
            rq: true,
            col: true,
            ti: '.FeatureStylePropertyType'
          }, {
            n: 'graphStyle',
            ti: '.GraphStylePropertyType'
          }]
      }, {
        ln: 'FeatureStyleType',
        bti: '.AbstractGMLType',
        ps: [{
            n: 'featureConstraint'
          }, {
            n: 'geometryStyle',
            mno: 0,
            col: true,
            ti: '.GeometryStylePropertyType'
          }, {
            n: 'topologyStyle',
            mno: 0,
            col: true,
            ti: '.TopologyStylePropertyType'
          }, {
            n: 'labelStyle',
            ti: '.LabelStylePropertyType'
          }, {
            n: 'featureType',
            an: {
              lp: 'featureType'
            },
            t: 'a'
          }, {
            n: 'baseType',
            an: {
              lp: 'baseType'
            },
            t: 'a'
          }, {
            n: 'queryGrammar',
            an: {
              lp: 'queryGrammar'
            },
            t: 'a'
          }]
      }, {
        ln: 'MultiSolidType',
        bti: '.AbstractGeometricAggregateType',
        ps: [{
            n: 'solidMember',
            mno: 0,
            col: true,
            ti: '.SolidPropertyType'
          }, {
            n: 'solidMembers',
            ti: '.SolidArrayPropertyType'
          }]
      }, {
        ln: 'PolygonPropertyType',
        ps: [{
            n: 'polygon',
            rq: true,
            en: 'Polygon',
            ti: '.PolygonType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CategoryPropertyType',
        bti: '.ValuePropertyType'
      }, {
        ln: 'DataBlockType',
        ps: [{
            n: 'rangeParameters',
            rq: true,
            ti: '.RangeParametersType'
          }, {
            n: 'tupleList',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'doubleOrNullTupleList',
            rq: true,
            ti: {
              t: 'l'
            }
          }]
      }, {
        ln: 'EnvelopeWithTimePeriodType',
        bti: '.EnvelopeType',
        ps: [{
            n: 'timePosition',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            ti: '.TimePositionType'
          }, {
            n: 'frame',
            an: {
              lp: 'frame'
            },
            t: 'a'
          }]
      }, {
        ln: 'OperationMethodRefType',
        ps: [{
            n: 'operationMethod',
            rq: true,
            en: 'OperationMethod',
            ti: '.OperationMethodType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'MultiPointDomainType',
        bti: '.DomainSetType'
      }, {
        ln: 'AbstractCoverageType',
        bti: '.AbstractFeatureType',
        ps: [{
            n: 'domainSet',
            rq: true,
            mx: false,
            dom: false,
            ti: '.DomainSetType',
            t: 'er'
          }, {
            n: 'rangeSet',
            rq: true,
            ti: '.RangeSetType'
          }, {
            n: 'dimension',
            ti: 'PositiveInteger',
            an: {
              lp: 'dimension'
            },
            t: 'a'
          }]
      }, {
        ln: 'GridEnvelopeType',
        ps: [{
            n: 'low',
            rq: true,
            ti: {
              t: 'l',
              bti: 'Integer'
            }
          }, {
            n: 'high',
            rq: true,
            ti: {
              t: 'l',
              bti: 'Integer'
            }
          }]
      }, {
        ln: 'PolarCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'GeometricComplexType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'element',
            rq: true,
            col: true,
            ti: '.GeometricPrimitivePropertyType'
          }]
      }, {
        ln: 'LineStringType',
        bti: '.AbstractCurveType',
        ps: [{
            n: 'posOrPointPropertyOrPointRep',
            rq: true,
            mno: 2,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'coord',
                ti: '.CoordType'
              }, {
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }, {
                en: 'pointRep',
                ti: '.PointPropertyType'
              }],
            t: 'ers'
          }, {
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }]
      }, {
        ln: 'ContainerPropertyType',
        ps: [{
            n: 'face',
            rq: true,
            en: 'Face',
            ti: '.FaceType'
          }, {
            n: 'topoSolid',
            rq: true,
            en: 'TopoSolid',
            ti: '.TopoSolidType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GridType',
        bti: '.AbstractGeometryType',
        ps: [{
            n: 'limits',
            rq: true,
            ti: '.GridLimitsType'
          }, {
            n: 'axisName',
            rq: true,
            col: true
          }, {
            n: 'dimension',
            rq: true,
            ti: 'PositiveInteger',
            an: {
              lp: 'dimension'
            },
            t: 'a'
          }]
      }, {
        ln: 'ScalarValuePropertyType',
        bti: '.ValuePropertyType'
      }, {
        ln: 'AbstractGriddedSurfaceType',
        bti: '.AbstractParametricCurveSurfaceType',
        ps: [{
            n: 'row',
            rq: true,
            col: true,
            ti: '.AbstractGriddedSurfaceType.Row'
          }, {
            n: 'rows',
            ti: 'Integer'
          }, {
            n: 'columns',
            ti: 'Integer'
          }]
      }, {
        ln: 'TemporalCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'VerticalCRSType',
        bti: '.AbstractReferenceSystemType',
        ps: [{
            n: 'usesVerticalCS',
            rq: true,
            ti: '.VerticalCSRefType'
          }, {
            n: 'usesVerticalDatum',
            rq: true,
            ti: '.VerticalDatumRefType'
          }]
      }, {
        ln: 'CurveType',
        bti: '.AbstractCurveType',
        ps: [{
            n: 'segments',
            rq: true,
            ti: '.CurveSegmentArrayPropertyType'
          }]
      }, {
        ln: 'MultiGeometryPropertyType',
        ps: [{
            n: 'geometricAggregate',
            rq: true,
            mx: false,
            dom: false,
            en: '_GeometricAggregate',
            ti: '.AbstractGeometricAggregateType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TimeInstantPropertyType',
        ps: [{
            n: 'timeInstant',
            rq: true,
            en: 'TimeInstant',
            ti: '.TimeInstantType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'PriorityLocationPropertyType',
        bti: '.LocationPropertyType',
        ps: [{
            n: 'priority',
            an: {
              lp: 'priority'
            },
            t: 'a'
          }]
      }, {
        ln: 'FormulaType',
        ps: [{
            n: 'a',
            ti: 'Double'
          }, {
            n: 'b',
            rq: true,
            ti: 'Double'
          }, {
            n: 'c',
            rq: true,
            ti: 'Double'
          }, {
            n: 'd',
            ti: 'Double'
          }]
      }, {
        ln: 'CylindricalCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'DirectedEdgePropertyType',
        ps: [{
            n: 'edge',
            rq: true,
            en: 'Edge',
            ti: '.EdgeType'
          }, {
            n: 'orientation',
            an: {
              lp: 'orientation'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractGeometricPrimitiveType',
        bti: '.AbstractGeometryType'
      }, {
        ln: 'PassThroughOperationType',
        bti: '.AbstractCoordinateOperationType',
        ps: [{
            n: 'modifiedCoordinate',
            rq: true,
            col: true,
            ti: 'PositiveInteger'
          }, {
            n: 'usesOperation',
            rq: true,
            ti: '.OperationRefType'
          }]
      }, {
        ln: 'ArcType',
        bti: '.ArcStringType'
      }, {
        ln: 'OrientableSurfaceType',
        bti: '.AbstractSurfaceType',
        ps: [{
            n: 'baseSurface',
            rq: true,
            ti: '.SurfacePropertyType'
          }, {
            n: 'orientation',
            an: {
              lp: 'orientation'
            },
            t: 'a'
          }]
      }, {
        ln: 'UserDefinedCSRefType',
        ps: [{
            n: 'userDefinedCS',
            rq: true,
            en: 'UserDefinedCS',
            ti: '.UserDefinedCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ReferenceType',
        ps: [{
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'BooleanPropertyType',
        bti: '.ValuePropertyType'
      }, {
        ln: 'MultiSolidPropertyType',
        ps: [{
            n: 'multiSolid',
            rq: true,
            en: 'MultiSolid',
            ti: '.MultiSolidType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'MultiSurfacePropertyType',
        ps: [{
            n: 'multiSurface',
            rq: true,
            en: 'MultiSurface',
            ti: '.MultiSurfaceType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ConcatenatedOperationRefType',
        ps: [{
            n: 'concatenatedOperation',
            rq: true,
            en: 'ConcatenatedOperation',
            ti: '.ConcatenatedOperationType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'OffsetCurveType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'offsetBase',
            rq: true,
            ti: '.CurvePropertyType'
          }, {
            n: 'distance',
            rq: true,
            ti: '.LengthType'
          }, {
            n: 'refDirection',
            ti: '.VectorType'
          }]
      }, {
        ln: 'TimeOrdinalEraPropertyType',
        ps: [{
            n: 'timeOrdinalEra',
            rq: true,
            en: 'TimeOrdinalEra',
            ti: '.TimeOrdinalEraType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AngleChoiceType',
        ps: [{
            n: 'angle',
            rq: true,
            ti: '.MeasureType'
          }, {
            n: 'dmsAngle',
            rq: true,
            ti: '.DMSAngleType'
          }]
      }, {
        ln: 'MultiGeometryType',
        bti: '.AbstractGeometricAggregateType',
        ps: [{
            n: 'geometryMember',
            mno: 0,
            col: true,
            ti: '.GeometryPropertyType'
          }, {
            n: 'geometryMembers',
            ti: '.GeometryArrayPropertyType'
          }]
      }, {
        ln: 'GridFunctionType',
        ps: [{
            n: 'sequenceRule',
            ti: '.SequenceRuleType'
          }, {
            n: 'startPoint',
            ti: {
              t: 'l',
              bti: 'Integer'
            }
          }]
      }, {
        ln: 'DictionaryEntryType',
        ps: [{
            n: 'definition',
            rq: true,
            mx: false,
            dom: false,
            en: 'Definition',
            ti: '.DefinitionType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'RelatedTimeType',
        bti: '.TimePrimitivePropertyType',
        ps: [{
            n: 'relativePosition',
            an: {
              lp: 'relativePosition'
            },
            t: 'a'
          }]
      }, {
        ln: 'IndirectEntryType',
        ps: [{
            n: 'definitionProxy',
            rq: true,
            en: 'DefinitionProxy',
            ti: '.DefinitionProxyType'
          }]
      }, {
        ln: 'ValuePropertyType',
        ps: [{
            n: '_boolean',
            rq: true,
            en: 'Boolean',
            ti: 'Boolean'
          }, {
            n: 'category',
            rq: true,
            en: 'Category',
            ti: '.CodeType'
          }, {
            n: 'quantity',
            rq: true,
            en: 'Quantity',
            ti: '.MeasureType'
          }, {
            n: 'count',
            rq: true,
            en: 'Count',
            ti: 'Integer'
          }, {
            n: 'booleanList',
            rq: true,
            en: 'BooleanList',
            ti: {
              t: 'l'
            }
          }, {
            n: 'categoryList',
            rq: true,
            en: 'CategoryList',
            ti: '.CodeOrNullListType'
          }, {
            n: 'quantityList',
            rq: true,
            en: 'QuantityList',
            ti: '.MeasureOrNullListType'
          }, {
            n: 'countList',
            rq: true,
            en: 'CountList',
            ti: {
              t: 'l'
            }
          }, {
            n: 'categoryExtent',
            rq: true,
            en: 'CategoryExtent',
            ti: '.CategoryExtentType'
          }, {
            n: 'quantityExtent',
            rq: true,
            en: 'QuantityExtent',
            ti: '.QuantityExtentType'
          }, {
            n: 'countExtent',
            rq: true,
            en: 'CountExtent',
            ti: {
              t: 'l'
            }
          }, {
            n: 'compositeValue',
            rq: true,
            mx: false,
            dom: false,
            en: 'CompositeValue',
            ti: '.CompositeValueType',
            t: 'er'
          }, {
            n: 'object',
            rq: true,
            mx: false,
            dom: false,
            en: '_Object',
            ti: 'AnyType',
            t: 'er'
          }, {
            n: '_null',
            rq: true,
            en: 'Null',
            ti: {
              t: 'l'
            }
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractCoordinateSystemType',
        bti: '.AbstractCoordinateSystemBaseType',
        ps: [{
            n: 'csID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'usesAxis',
            rq: true,
            col: true,
            ti: '.CoordinateSystemAxisRefType'
          }]
      }, {
        ln: 'RectifiedGridType',
        bti: '.GridType',
        ps: [{
            n: 'origin',
            rq: true,
            ti: '.PointPropertyType'
          }, {
            n: 'offsetVector',
            rq: true,
            col: true,
            ti: '.VectorType'
          }]
      }, {
        ln: 'CompositeSolidType',
        bti: '.AbstractSolidType',
        ps: [{
            n: 'solidMember',
            rq: true,
            col: true,
            ti: '.SolidPropertyType'
          }]
      }, {
        ln: 'AbstractPositionalAccuracyType',
        ps: [{
            n: 'measureDescription',
            ti: '.CodeType'
          }]
      }, {
        ln: 'MultiPolygonType',
        bti: '.AbstractGeometricAggregateType',
        ps: [{
            n: 'polygonMember',
            mno: 0,
            col: true,
            ti: '.PolygonPropertyType'
          }]
      }, {
        ln: 'CovarianceElementType',
        ps: [{
            n: 'rowIndex',
            rq: true,
            ti: 'PositiveInteger'
          }, {
            n: 'columnIndex',
            rq: true,
            ti: 'PositiveInteger'
          }, {
            n: 'covariance',
            rq: true,
            ti: 'Double'
          }]
      }, {
        ln: 'DirectPositionListType',
        ps: [{
            n: 'value',
            ti: {
              t: 'l',
              bti: 'Double'
            },
            t: 'v'
          }, {
            n: 'count',
            ti: 'PositiveInteger',
            an: {
              lp: 'count'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }, {
            n: 'srsDimension',
            ti: 'PositiveInteger',
            an: {
              lp: 'srsDimension'
            },
            t: 'a'
          }, {
            n: 'axisLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'axisLabels'
            },
            t: 'a'
          }, {
            n: 'uomLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'uomLabels'
            },
            t: 'a'
          }]
      }, {
        ln: 'ObliqueCartesianCSRefType',
        ps: [{
            n: 'obliqueCartesianCS',
            rq: true,
            en: 'ObliqueCartesianCS',
            ti: '.ObliqueCartesianCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CartesianCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'ObliqueCartesianCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'DynamicFeatureCollectionType',
        bti: '.FeatureCollectionType',
        ps: [{
            n: 'validTime',
            ti: '.TimePrimitivePropertyType'
          }, {
            n: 'history',
            mx: false,
            dom: false,
            ti: '.HistoryPropertyType',
            t: 'er'
          }, {
            n: 'dataSource',
            ti: '.StringOrRefType'
          }]
      }, {
        ln: 'ImageDatumRefType',
        ps: [{
            n: 'imageDatum',
            rq: true,
            en: 'ImageDatum',
            ti: '.ImageDatumType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'OperationParameterBaseType',
        bti: '.AbstractGeneralOperationParameterType'
      }, {
        ln: 'UserDefinedCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'PolygonPatchArrayPropertyType',
        bti: '.SurfacePatchArrayPropertyType'
      }, {
        ln: 'TemporalDatumType',
        bti: '.TemporalDatumBaseType',
        ps: [{
            n: 'origin',
            rq: true,
            ti: 'DateTime'
          }]
      }, {
        ln: 'QuantityPropertyType',
        bti: '.ValuePropertyType'
      }, {
        ln: 'DirectionPropertyType',
        ps: [{
            n: 'directionVector',
            rq: true,
            en: 'DirectionVector',
            ti: '.DirectionVectorType'
          }, {
            n: 'compassPoint',
            rq: true,
            en: 'CompassPoint'
          }, {
            n: 'directionKeyword',
            rq: true,
            en: 'DirectionKeyword',
            ti: '.CodeType'
          }, {
            n: 'directionString',
            rq: true,
            en: 'DirectionString',
            ti: '.StringOrRefType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'PolyhedralSurfaceType',
        bti: '.SurfaceType'
      }, {
        ln: 'CompositeCurveType',
        bti: '.AbstractCurveType',
        ps: [{
            n: 'curveMember',
            rq: true,
            col: true,
            ti: '.CurvePropertyType'
          }]
      }, {
        ln: 'TemporalDatumRefType',
        ps: [{
            n: 'temporalDatum',
            rq: true,
            en: 'TemporalDatum',
            ti: '.TemporalDatumType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TransformationType',
        bti: '.AbstractGeneralTransformationType',
        ps: [{
            n: 'usesMethod',
            rq: true,
            ti: '.OperationMethodRefType'
          }, {
            n: 'usesValue',
            mno: 0,
            col: true,
            ti: '.ParameterValueType'
          }]
      }, {
        ln: 'AbstractDiscreteCoverageType',
        bti: '.AbstractCoverageType',
        ps: [{
            n: 'coverageFunction',
            ti: '.CoverageFunctionType'
          }]
      }, {
        ln: 'MetaDataPropertyType',
        ps: [{
            n: 'any',
            rq: true,
            mx: false,
            t: 'ae'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractDatumType',
        bti: '.AbstractDatumBaseType',
        ps: [{
            n: 'datumID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'anchorPoint',
            ti: '.CodeType'
          }, {
            n: 'realizationEpoch',
            ti: 'Date'
          }, {
            n: 'validArea',
            ti: '.ExtentType'
          }, {
            n: 'scope'
          }]
      }, {
        ln: 'FeatureArrayPropertyType',
        ps: [{
            n: 'feature',
            mno: 0,
            col: true,
            mx: false,
            en: '_Feature',
            ti: '.AbstractFeatureType',
            t: 'er'
          }]
      }, {
        ln: 'AbstractCurveSegmentType',
        ps: [{
            n: 'numDerivativesAtStart',
            ti: 'Integer',
            an: {
              lp: 'numDerivativesAtStart'
            },
            t: 'a'
          }, {
            n: 'numDerivativesAtEnd',
            ti: 'Integer',
            an: {
              lp: 'numDerivativesAtEnd'
            },
            t: 'a'
          }, {
            n: 'numDerivativeInterior',
            ti: 'Integer',
            an: {
              lp: 'numDerivativeInterior'
            },
            t: 'a'
          }]
      }, {
        ln: 'EngineeringDatumRefType',
        ps: [{
            n: 'engineeringDatum',
            rq: true,
            en: 'EngineeringDatum',
            ti: '.EngineeringDatumType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'EllipsoidBaseType',
        bti: '.DefinitionType'
      }, {
        ln: 'CompoundCRSRefType',
        ps: [{
            n: 'compoundCRS',
            rq: true,
            en: 'CompoundCRS',
            ti: '.CompoundCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TimeTopologyComplexType',
        bti: '.AbstractTimeComplexType',
        ps: [{
            n: 'primitive',
            rq: true,
            col: true,
            ti: '.TimeTopologyPrimitivePropertyType'
          }]
      }, {
        ln: 'AbstractCoordinateOperationType',
        bti: '.AbstractCoordinateOperationBaseType',
        ps: [{
            n: 'coordinateOperationID',
            mno: 0,
            col: true,
            ti: '.IdentifierType'
          }, {
            n: 'remarks',
            ti: '.StringOrRefType'
          }, {
            n: 'operationVersion'
          }, {
            n: 'validArea',
            ti: '.ExtentType'
          }, {
            n: 'scope'
          }, {
            n: 'positionalAccuracy',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_positionalAccuracy',
            ti: '.AbstractPositionalAccuracyType',
            t: 'er'
          }, {
            n: 'sourceCRS',
            ti: '.CRSRefType'
          }, {
            n: 'targetCRS',
            ti: '.CRSRefType'
          }]
      }, {
        ln: 'AbstractCoordinateSystemBaseType',
        bti: '.DefinitionType'
      }, {
        ln: 'BezierType',
        bti: '.BSplineType'
      }, {
        ln: 'GraphStylePropertyType',
        ps: [{
            n: 'graphStyle',
            en: 'GraphStyle',
            ti: '.GraphStyleType'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CountPropertyType',
        bti: '.ValuePropertyType'
      }, {
        ln: 'ClothoidType.RefLocation',
        tn: null,
        ps: [{
            n: 'affinePlacement',
            rq: true,
            en: 'AffinePlacement',
            ti: '.AffinePlacementType'
          }]
      }, {
        ln: 'TargetPropertyType',
        ps: [{
            n: 'feature',
            rq: true,
            mx: false,
            en: '_Feature',
            ti: '.AbstractFeatureType',
            t: 'er'
          }, {
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CircleByCenterPointType',
        bti: '.ArcByCenterPointType'
      }, {
        ln: 'TimeType',
        bti: '.MeasureType'
      }, {
        ln: 'CartesianCSRefType',
        ps: [{
            n: 'cartesianCS',
            rq: true,
            en: 'CartesianCS',
            ti: '.CartesianCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'DerivedCRSType',
        bti: '.AbstractGeneralDerivedCRSType',
        ps: [{
            n: 'derivedCRSType',
            rq: true,
            ti: '.DerivedCRSTypeType'
          }, {
            n: 'usesCS',
            rq: true,
            ti: '.CoordinateSystemRefType'
          }]
      }, {
        ln: 'TemporalCSRefType',
        ps: [{
            n: 'temporalCS',
            rq: true,
            en: 'TemporalCS',
            ti: '.TemporalCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'OperationParameterRefType',
        ps: [{
            n: 'operationParameter',
            rq: true,
            en: 'OperationParameter',
            ti: '.OperationParameterType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'QuantityExtentType',
        bti: '.MeasureOrNullListType'
      }, {
        ln: 'AbstractGeneralDerivedCRSType',
        bti: '.AbstractReferenceSystemType',
        ps: [{
            n: 'baseCRS',
            rq: true,
            ti: '.CoordinateReferenceSystemRefType'
          }, {
            n: 'definedByConversion',
            rq: true,
            ti: '.GeneralConversionRefType'
          }]
      }, {
        ln: 'MultiSurfaceDomainType',
        bti: '.DomainSetType'
      }, {
        ln: 'GeometryPropertyType',
        ps: [{
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'OperationParameterGroupRefType',
        ps: [{
            n: 'operationParameterGroup',
            rq: true,
            en: 'OperationParameterGroup',
            ti: '.OperationParameterGroupType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CubicSplineType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'posOrPointPropertyOrPointRep',
            rq: true,
            mno: 2,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }, {
                en: 'pointRep',
                ti: '.PointPropertyType'
              }],
            t: 'ers'
          }, {
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'vectorAtStart',
            rq: true,
            ti: '.VectorType'
          }, {
            n: 'vectorAtEnd',
            rq: true,
            ti: '.VectorType'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }, {
            n: 'degree',
            ti: 'Integer',
            an: {
              lp: 'degree'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractGeometricAggregateType',
        bti: '.AbstractGeometryType'
      }, {
        ln: 'PassThroughOperationRefType',
        ps: [{
            n: 'passThroughOperation',
            rq: true,
            en: 'PassThroughOperation',
            ti: '.PassThroughOperationType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'IndexMapType',
        bti: '.GridFunctionType',
        ps: [{
            n: 'lookUpTable',
            rq: true,
            ti: {
              t: 'l',
              bti: 'Integer'
            }
          }]
      }, {
        ln: 'VerticalDatumType',
        bti: '.AbstractDatumType',
        ps: [{
            n: 'verticalDatumType',
            ti: '.VerticalDatumTypeType'
          }]
      }, {
        ln: 'TimeEdgeType',
        bti: '.AbstractTimeTopologyPrimitiveType',
        ps: [{
            n: 'start',
            rq: true,
            ti: '.TimeNodePropertyType'
          }, {
            n: 'end',
            rq: true,
            ti: '.TimeNodePropertyType'
          }, {
            n: 'extent',
            ti: '.TimePeriodPropertyType'
          }]
      }, {
        ln: 'AbstractSurfacePatchType'
      }, {
        ln: 'LineStringPropertyType',
        ps: [{
            n: 'lineString',
            rq: true,
            en: 'LineString',
            ti: '.LineStringType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'DirectedTopoSolidPropertyType',
        ps: [{
            n: 'topoSolid',
            rq: true,
            en: 'TopoSolid',
            ti: '.TopoSolidType'
          }, {
            n: 'orientation',
            an: {
              lp: 'orientation'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'OperationRefType',
        ps: [{
            n: 'operation',
            rq: true,
            mx: false,
            dom: false,
            en: '_Operation',
            ti: '.AbstractCoordinateOperationType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TopoComplexType',
        bti: '.AbstractTopologyType',
        ps: [{
            n: 'maximalComplex',
            rq: true,
            ti: '.TopoComplexMemberType'
          }, {
            n: 'superComplex',
            mno: 0,
            col: true,
            ti: '.TopoComplexMemberType'
          }, {
            n: 'subComplex',
            mno: 0,
            col: true,
            ti: '.TopoComplexMemberType'
          }, {
            n: 'topoPrimitiveMember',
            mno: 0,
            col: true,
            ti: '.TopoPrimitiveMemberType'
          }, {
            n: 'topoPrimitiveMembers',
            ti: '.TopoPrimitiveArrayAssociationType'
          }, {
            n: 'isMaximal',
            ti: 'Boolean',
            an: {
              lp: 'isMaximal'
            },
            t: 'a'
          }]
      }, {
        ln: 'TimeIntervalLengthType',
        ps: [{
            n: 'value',
            ti: 'Decimal',
            t: 'v'
          }, {
            n: 'unit',
            rq: true,
            an: {
              lp: 'unit'
            },
            t: 'a'
          }, {
            n: 'radix',
            ti: 'PositiveInteger',
            an: {
              lp: 'radix'
            },
            t: 'a'
          }, {
            n: 'factor',
            ti: 'Integer',
            an: {
              lp: 'factor'
            },
            t: 'a'
          }]
      }, {
        ln: 'MeasureListType',
        ps: [{
            n: 'value',
            ti: {
              t: 'l',
              bti: 'Double'
            },
            t: 'v'
          }, {
            n: 'uom',
            rq: true,
            an: {
              lp: 'uom'
            },
            t: 'a'
          }]
      }, {
        ln: 'CoordinatesType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'decimal',
            an: {
              lp: 'decimal'
            },
            t: 'a'
          }, {
            n: 'cs',
            an: {
              lp: 'cs'
            },
            t: 'a'
          }, {
            n: 'ts',
            an: {
              lp: 'ts'
            },
            t: 'a'
          }]
      }, {
        ln: 'SingleOperationRefType',
        ps: [{
            n: 'singleOperation',
            rq: true,
            mx: false,
            dom: false,
            en: '_SingleOperation',
            ti: '.AbstractCoordinateOperationType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AreaType',
        bti: '.MeasureType'
      }, {
        ln: 'DatumRefType',
        ps: [{
            n: 'datum',
            rq: true,
            mx: false,
            dom: false,
            en: '_Datum',
            ti: '.AbstractDatumType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'KnotPropertyType',
        ps: [{
            n: 'knot',
            rq: true,
            en: 'Knot',
            ti: '.KnotType'
          }]
      }, {
        ln: 'ClothoidType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'refLocation',
            rq: true,
            ti: '.ClothoidType.RefLocation'
          }, {
            n: 'scaleFactor',
            rq: true,
            ti: 'Decimal'
          }, {
            n: 'startParameter',
            rq: true,
            ti: 'Double'
          }, {
            n: 'endParameter',
            rq: true,
            ti: 'Double'
          }]
      }, {
        ln: 'AffinePlacementType',
        ps: [{
            n: 'location',
            rq: true,
            ti: '.DirectPositionType'
          }, {
            n: 'refDirection',
            rq: true,
            col: true,
            ti: '.VectorType'
          }, {
            n: 'inDimension',
            rq: true,
            ti: 'PositiveInteger'
          }, {
            n: 'outDimension',
            rq: true,
            ti: 'PositiveInteger'
          }]
      }, {
        ln: 'CompoundCRSType',
        bti: '.AbstractReferenceSystemType',
        ps: [{
            n: 'includesCRS',
            rq: true,
            mno: 2,
            col: true,
            ti: '.CoordinateReferenceSystemRefType'
          }]
      }, {
        ln: 'CoordinateOperationRefType',
        ps: [{
            n: 'coordinateOperation',
            rq: true,
            mx: false,
            dom: false,
            en: '_CoordinateOperation',
            ti: '.AbstractCoordinateOperationType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'DomainSetType',
        ps: [{
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'timeObject',
            rq: true,
            mx: false,
            dom: false,
            en: '_TimeObject',
            ti: '.AbstractTimeObjectType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'EllipsoidRefType',
        ps: [{
            n: 'ellipsoid',
            rq: true,
            en: 'Ellipsoid',
            ti: '.EllipsoidType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TimeClockPropertyType',
        ps: [{
            n: 'timeClock',
            rq: true,
            en: 'TimeClock',
            ti: '.TimeClockType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractCoordinateOperationBaseType',
        bti: '.DefinitionType'
      }, {
        ln: 'RectangleType',
        bti: '.AbstractSurfacePatchType',
        ps: [{
            n: 'exterior',
            rq: true,
            mx: false,
            dom: false,
            ti: '.AbstractRingPropertyType',
            t: 'er'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }]
      }, {
        ln: 'RangeSetType',
        ps: [{
            n: 'valueArray',
            rq: true,
            col: true,
            en: 'ValueArray',
            ti: '.ValueArrayType'
          }, {
            n: 'scalarValueList',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'CategoryList',
                ti: '.CodeOrNullListType'
              }, {
                en: 'CountList',
                ti: {
                  t: 'l'
                }
              }, {
                en: 'QuantityList',
                ti: '.MeasureOrNullListType'
              }, {
                en: 'BooleanList',
                ti: {
                  t: 'l'
                }
              }],
            t: 'ers'
          }, {
            n: 'dataBlock',
            rq: true,
            en: 'DataBlock',
            ti: '.DataBlockType'
          }, {
            n: 'file',
            rq: true,
            en: 'File',
            ti: '.FileType'
          }]
      }, {
        ln: 'AbstractSurfaceType',
        bti: '.AbstractGeometricPrimitiveType'
      }, {
        ln: 'VerticalDatumRefType',
        ps: [{
            n: 'verticalDatum',
            rq: true,
            en: 'VerticalDatum',
            ti: '.VerticalDatumType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'RectifiedGridDomainType',
        bti: '.DomainSetType'
      }, {
        ln: 'SymbolType',
        ps: [{
            n: 'any',
            mno: 0,
            col: true,
            typed: false,
            mx: false,
            t: 'ae'
          }, {
            n: 'symbolType',
            rq: true,
            an: {
              lp: 'symbolType'
            },
            t: 'a'
          }, {
            n: 'transform',
            an: {
              lp: 'transform',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GenericMetaDataType',
        bti: '.AbstractMetaDataType',
        ps: [{
            n: 'contentOverrideForGenericMetaDataType',
            t: 'ae'
          }]
      }, {
        ln: 'VerticalCSRefType',
        ps: [{
            n: 'verticalCS',
            rq: true,
            en: 'VerticalCS',
            ti: '.VerticalCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TopoSurfaceType',
        bti: '.AbstractTopologyType',
        ps: [{
            n: 'directedFace',
            rq: true,
            col: true,
            ti: '.DirectedFacePropertyType'
          }]
      }, {
        ln: 'LocationPropertyType',
        ps: [{
            n: 'geometry',
            rq: true,
            mx: false,
            dom: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }, {
            n: 'locationKeyWord',
            rq: true,
            en: 'LocationKeyWord',
            ti: '.CodeType'
          }, {
            n: 'locationString',
            rq: true,
            en: 'LocationString',
            ti: '.StringOrRefType'
          }, {
            n: '_null',
            rq: true,
            en: 'Null',
            ti: {
              t: 'l'
            }
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TopoCurveType',
        bti: '.AbstractTopologyType',
        ps: [{
            n: 'directedEdge',
            rq: true,
            col: true,
            ti: '.DirectedEdgePropertyType'
          }]
      }, {
        ln: 'AbstractParametricCurveSurfaceType',
        bti: '.AbstractSurfacePatchType'
      }, {
        ln: 'LengthType',
        bti: '.MeasureType'
      }, {
        ln: 'GeometricPrimitivePropertyType',
        ps: [{
            n: 'geometricPrimitive',
            rq: true,
            mx: false,
            dom: false,
            en: '_GeometricPrimitive',
            ti: '.AbstractGeometricPrimitiveType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GeodesicType',
        bti: '.GeodesicStringType'
      }, {
        ln: 'CompositeSolidPropertyType',
        ps: [{
            n: 'compositeSolid',
            rq: true,
            en: 'CompositeSolid',
            ti: '.CompositeSolidType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'OperationMethodBaseType',
        bti: '.DefinitionType'
      }, {
        ln: 'CompositeSurfacePropertyType',
        ps: [{
            n: 'compositeSurface',
            rq: true,
            en: 'CompositeSurface',
            ti: '.CompositeSurfaceType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TimePrimitivePropertyType',
        ps: [{
            n: 'timePrimitive',
            rq: true,
            mx: false,
            dom: false,
            en: '_TimePrimitive',
            ti: '.AbstractTimePrimitiveType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TrianglePatchArrayPropertyType',
        bti: '.SurfacePatchArrayPropertyType'
      }, {
        ln: 'MovingObjectStatusType',
        bti: '.AbstractTimeSliceType',
        ps: [{
            n: 'location',
            rq: true,
            mx: false,
            dom: false,
            ti: '.LocationPropertyType',
            t: 'er'
          }, {
            n: 'speed',
            ti: '.MeasureType'
          }, {
            n: 'bearing',
            ti: '.DirectionPropertyType'
          }, {
            n: 'acceleration',
            ti: '.MeasureType'
          }, {
            n: 'elevation',
            ti: '.MeasureType'
          }, {
            n: 'status',
            ti: '.StringOrRefType'
          }]
      }, {
        ln: 'PrimeMeridianRefType',
        ps: [{
            n: 'primeMeridian',
            rq: true,
            en: 'PrimeMeridian',
            ti: '.PrimeMeridianType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TopologyStylePropertyType',
        ps: [{
            n: 'topologyStyle',
            en: 'TopologyStyle',
            ti: '.TopologyStyleType'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractTopologyType',
        bti: '.AbstractGMLType'
      }, {
        ln: 'PolygonPatchType',
        bti: '.AbstractSurfacePatchType',
        ps: [{
            n: 'exterior',
            mx: false,
            dom: false,
            ti: '.AbstractRingPropertyType',
            t: 'er'
          }, {
            n: 'interior',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            ti: '.AbstractRingPropertyType',
            t: 'er'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }]
      }, {
        ln: 'GeometryStyleType',
        bti: '.BaseStyleDescriptorType',
        ps: [{
            n: 'symbol',
            rq: true,
            ti: '.SymbolType'
          }, {
            n: 'style',
            rq: true
          }, {
            n: 'labelStyle',
            ti: '.LabelStylePropertyType'
          }, {
            n: 'geometryProperty',
            an: {
              lp: 'geometryProperty'
            },
            t: 'a'
          }, {
            n: 'geometryType',
            an: {
              lp: 'geometryType'
            },
            t: 'a'
          }]
      }, {
        ln: 'DirectedNodePropertyType',
        ps: [{
            n: 'node',
            rq: true,
            en: 'Node',
            ti: '.NodeType'
          }, {
            n: 'orientation',
            an: {
              lp: 'orientation'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GeodesicStringType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'geometricPositionGroup',
            rq: true,
            mno: 2,
            col: true,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }],
            t: 'es'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }]
      }, {
        ln: 'BSplineType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'posOrPointPropertyOrPointRep',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }, {
                en: 'pointRep',
                ti: '.PointPropertyType'
              }],
            t: 'ers'
          }, {
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'degree',
            rq: true,
            ti: 'NonNegativeInteger'
          }, {
            n: 'knot',
            rq: true,
            mno: 2,
            col: true,
            ti: '.KnotPropertyType'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }, {
            n: 'isPolynomial',
            ti: 'Boolean',
            an: {
              lp: 'isPolynomial'
            },
            t: 'a'
          }, {
            n: 'knotType',
            an: {
              lp: 'knotType'
            },
            t: 'a'
          }]
      }, {
        ln: 'HistoryPropertyType',
        ps: [{
            n: 'timeSlice',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            en: '_TimeSlice',
            ti: '.AbstractTimeSliceType',
            t: 'er'
          }]
      }, {
        ln: 'DirectPositionType',
        ps: [{
            n: 'value',
            ti: {
              t: 'l',
              bti: 'Double'
            },
            t: 'v'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }, {
            n: 'srsDimension',
            ti: 'PositiveInteger',
            an: {
              lp: 'srsDimension'
            },
            t: 'a'
          }, {
            n: 'axisLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'axisLabels'
            },
            t: 'a'
          }, {
            n: 'uomLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'uomLabels'
            },
            t: 'a'
          }]
      }, {
        ln: 'SphericalCSRefType',
        ps: [{
            n: 'sphericalCS',
            rq: true,
            en: 'SphericalCS',
            ti: '.SphericalCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractSolidType',
        bti: '.AbstractGeometricPrimitiveType'
      }, {
        ln: 'MultiPointPropertyType',
        ps: [{
            n: 'multiPoint',
            rq: true,
            en: 'MultiPoint',
            ti: '.MultiPointType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GeneralTransformationRefType',
        ps: [{
            n: 'generalTransformation',
            rq: true,
            mx: false,
            dom: false,
            en: '_GeneralTransformation',
            ti: '.AbstractGeneralTransformationType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'DefinitionType',
        bti: '.AbstractGMLType'
      }, {
        ln: 'SpeedType',
        bti: '.MeasureType'
      }, {
        ln: 'VectorType',
        ps: [{
            n: 'value',
            ti: {
              t: 'l',
              bti: 'Double'
            },
            t: 'v'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }, {
            n: 'srsDimension',
            ti: 'PositiveInteger',
            an: {
              lp: 'srsDimension'
            },
            t: 'a'
          }, {
            n: 'axisLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'axisLabels'
            },
            t: 'a'
          }, {
            n: 'uomLabels',
            ti: {
              t: 'l',
              bti: 'NCName'
            },
            an: {
              lp: 'uomLabels'
            },
            t: 'a'
          }]
      }, {
        ln: 'ArcByBulgeType',
        bti: '.ArcStringByBulgeType'
      }, {
        ln: 'DirectedObservationType',
        bti: '.ObservationType',
        ps: [{
            n: 'direction',
            rq: true,
            ti: '.DirectionPropertyType'
          }]
      }, {
        ln: 'ConcatenatedOperationType',
        bti: '.AbstractCoordinateOperationType',
        ps: [{
            n: 'usesSingleOperation',
            rq: true,
            mno: 2,
            col: true,
            ti: '.SingleOperationRefType'
          }]
      }, {
        ln: 'RectifiedGridCoverageType',
        bti: '.AbstractDiscreteCoverageType'
      }, {
        ln: 'SolidArrayPropertyType',
        ps: [{
            n: 'solid',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_Solid',
            ti: '.AbstractSolidType',
            t: 'er'
          }]
      }, {
        ln: 'SurfacePatchArrayPropertyType',
        ps: [{
            n: 'surfacePatch',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_SurfacePatch',
            ti: '.AbstractSurfacePatchType',
            t: 'er'
          }]
      }, {
        ln: 'TimeTopologyPrimitivePropertyType',
        ps: [{
            n: 'timeTopologyPrimitive',
            rq: true,
            mx: false,
            dom: false,
            en: '_TimeTopologyPrimitive',
            ti: '.AbstractTimeTopologyPrimitiveType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'MultiSolidCoverageType',
        bti: '.AbstractDiscreteCoverageType'
      }, {
        ln: 'LinearCSRefType',
        ps: [{
            n: 'linearCS',
            rq: true,
            en: 'LinearCS',
            ti: '.LinearCSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ImageCRSRefType',
        ps: [{
            n: 'imageCRS',
            rq: true,
            en: 'ImageCRS',
            ti: '.ImageCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GridDomainType',
        bti: '.DomainSetType'
      }, {
        ln: 'TopoPrimitiveArrayAssociationType',
        ps: [{
            n: 'topoPrimitive',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_TopoPrimitive',
            ti: '.AbstractTopoPrimitiveType',
            t: 'er'
          }]
      }, {
        ln: 'TimeNodeType',
        bti: '.AbstractTimeTopologyPrimitiveType',
        ps: [{
            n: 'previousEdge',
            mno: 0,
            col: true,
            ti: '.TimeEdgePropertyType'
          }, {
            n: 'nextEdge',
            mno: 0,
            col: true,
            ti: '.TimeEdgePropertyType'
          }, {
            n: 'position',
            ti: '.TimeInstantPropertyType'
          }]
      }, {
        ln: 'ArcStringByBulgeType',
        bti: '.AbstractCurveSegmentType',
        ps: [{
            n: 'posOrPointPropertyOrPointRep',
            rq: true,
            mno: 2,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }, {
                en: 'pointRep',
                ti: '.PointPropertyType'
              }],
            t: 'ers'
          }, {
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'coordinates',
            rq: true,
            ti: '.CoordinatesType'
          }, {
            n: 'bulge',
            rq: true,
            col: true,
            ti: 'Double'
          }, {
            n: 'normal',
            rq: true,
            col: true,
            ti: '.VectorType'
          }, {
            n: 'interpolation',
            an: {
              lp: 'interpolation'
            },
            t: 'a'
          }, {
            n: 'numArc',
            ti: 'Integer',
            an: {
              lp: 'numArc'
            },
            t: 'a'
          }]
      }, {
        ln: 'ParameterValueGroupType',
        bti: '.AbstractGeneralParameterValueType',
        ps: [{
            n: 'includesValue',
            rq: true,
            mno: 2,
            col: true,
            ti: '.AbstractGeneralParameterValueType'
          }, {
            n: 'valuesOfGroup',
            rq: true,
            ti: '.OperationParameterGroupRefType'
          }]
      }, {
        ln: 'CodeListType',
        ps: [{
            n: 'value',
            ti: {
              t: 'l',
              bti: 'Name'
            },
            t: 'v'
          }, {
            n: 'codeSpace',
            an: {
              lp: 'codeSpace'
            },
            t: 'a'
          }]
      }, {
        ln: 'FaceType',
        bti: '.AbstractTopoPrimitiveType',
        ps: [{
            n: 'directedEdge',
            rq: true,
            col: true,
            ti: '.DirectedEdgePropertyType'
          }, {
            n: 'directedTopoSolid',
            mno: 0,
            mxo: 2,
            col: true,
            ti: '.DirectedTopoSolidPropertyType'
          }, {
            n: 'surfaceProperty',
            ti: '.SurfacePropertyType'
          }]
      }, {
        ln: 'DynamicFeatureType',
        bti: '.AbstractFeatureType',
        ps: [{
            n: 'validTime',
            ti: '.TimePrimitivePropertyType'
          }, {
            n: 'history',
            mx: false,
            dom: false,
            ti: '.HistoryPropertyType',
            t: 'er'
          }, {
            n: 'dataSource',
            ti: '.StringOrRefType'
          }]
      }, {
        ln: 'DictionaryType',
        bti: '.DefinitionType',
        ps: [{
            n: 'dictionaryEntryOrIndirectEntry',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'dictionaryEntry',
                ti: '.DictionaryEntryType'
              }, {
                en: 'indirectEntry',
                ti: '.IndirectEntryType'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'SolidPropertyType',
        ps: [{
            n: 'solid',
            rq: true,
            mx: false,
            dom: false,
            en: '_Solid',
            ti: '.AbstractSolidType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GeometryArrayPropertyType',
        ps: [{
            n: 'geometry',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_Geometry',
            ti: '.AbstractGeometryType',
            t: 'er'
          }]
      }, {
        ln: 'ConversionToPreferredUnitType',
        bti: '.UnitOfMeasureType',
        ps: [{
            n: 'factor',
            rq: true,
            ti: 'Double'
          }, {
            n: 'formula',
            rq: true,
            ti: '.FormulaType'
          }]
      }, {
        ln: 'GraphStyleType',
        bti: '.BaseStyleDescriptorType',
        ps: [{
            n: 'planar',
            ti: 'Boolean'
          }, {
            n: 'directed',
            ti: 'Boolean'
          }, {
            n: 'grid',
            ti: 'Boolean'
          }, {
            n: 'minDistance',
            ti: 'Double'
          }, {
            n: 'minAngle',
            ti: 'Double'
          }, {
            n: 'graphType'
          }, {
            n: 'drawingType'
          }, {
            n: 'lineType'
          }, {
            n: 'aestheticCriteria',
            mno: 0,
            col: true
          }]
      }, {
        ln: 'TemporalDatumBaseType',
        bti: '.AbstractDatumType'
      }, {
        ln: 'ValueArrayType',
        bti: '.CompositeValueType',
        ps: [{
            n: 'codeSpace',
            an: {
              lp: 'codeSpace'
            },
            t: 'a'
          }, {
            n: 'uom',
            an: {
              lp: 'uom'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractStyleType',
        bti: '.AbstractGMLType'
      }, {
        ln: 'AbstractMetaDataType',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            t: 'ers'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractTimeGeometricPrimitiveType',
        bti: '.AbstractTimePrimitiveType',
        ps: [{
            n: 'frame',
            an: {
              lp: 'frame'
            },
            t: 'a'
          }]
      }, {
        ln: 'CRSRefType',
        ps: [{
            n: 'crs',
            rq: true,
            mx: false,
            dom: false,
            en: '_CRS',
            ti: '.AbstractReferenceSystemType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'MultiCurveType',
        bti: '.AbstractGeometricAggregateType',
        ps: [{
            n: 'curveMember',
            mno: 0,
            col: true,
            ti: '.CurvePropertyType'
          }, {
            n: 'curveMembers',
            ti: '.CurveArrayPropertyType'
          }]
      }, {
        ln: 'BoundedFeatureType',
        bti: '.AbstractFeatureType'
      }, {
        ln: 'AbstractTimeObjectType',
        bti: '.AbstractGMLType'
      }, {
        ln: 'TimeNodePropertyType',
        ps: [{
            n: 'timeNode',
            rq: true,
            en: 'TimeNode',
            ti: '.TimeNodeType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'FeatureCollectionType',
        bti: '.AbstractFeatureCollectionType'
      }, {
        ln: 'OperationParameterGroupBaseType',
        bti: '.AbstractGeneralOperationParameterType'
      }, {
        ln: 'VerticalCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'AbstractTimePrimitiveType',
        bti: '.AbstractTimeObjectType',
        ps: [{
            n: 'relatedTime',
            mno: 0,
            col: true,
            ti: '.RelatedTimeType'
          }]
      }, {
        ln: 'ImageCRSType',
        bti: '.AbstractReferenceSystemType',
        ps: [{
            n: 'usesCartesianCS',
            rq: true,
            ti: '.CartesianCSRefType'
          }, {
            n: 'usesObliqueCartesianCS',
            rq: true,
            ti: '.ObliqueCartesianCSRefType'
          }, {
            n: 'usesImageDatum',
            rq: true,
            ti: '.ImageDatumRefType'
          }]
      }, {
        ln: 'SphereType',
        bti: '.AbstractGriddedSurfaceType',
        ps: [{
            n: 'horizontalCURVETYPE',
            an: {
              lp: 'horizontalCurveType'
            },
            t: 'a'
          }, {
            n: 'verticalCURVETYPE',
            an: {
              lp: 'verticalCurveType'
            },
            t: 'a'
          }]
      }, {
        ln: 'PolygonType',
        bti: '.AbstractSurfaceType',
        ps: [{
            n: 'exterior',
            mx: false,
            dom: false,
            ti: '.AbstractRingPropertyType',
            t: 'er'
          }, {
            n: 'interior',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            ti: '.AbstractRingPropertyType',
            t: 'er'
          }]
      }, {
        ln: 'SolidType',
        bti: '.AbstractSolidType',
        ps: [{
            n: 'exterior',
            ti: '.SurfacePropertyType'
          }, {
            n: 'interior',
            mno: 0,
            col: true,
            ti: '.SurfacePropertyType'
          }]
      }, {
        ln: 'TopoPrimitiveMemberType',
        ps: [{
            n: 'topoPrimitive',
            mx: false,
            dom: false,
            en: '_TopoPrimitive',
            ti: '.AbstractTopoPrimitiveType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GridLengthType',
        bti: '.MeasureType'
      }, {
        ln: 'DefinitionProxyType',
        bti: '.DefinitionType',
        ps: [{
            n: 'definitionRef',
            rq: true,
            ti: '.ReferenceType'
          }]
      }, {
        ln: 'MultiLineStringType',
        bti: '.AbstractGeometricAggregateType',
        ps: [{
            n: 'lineStringMember',
            mno: 0,
            col: true,
            ti: '.LineStringPropertyType'
          }]
      }, {
        ln: 'SurfaceType',
        bti: '.AbstractSurfaceType',
        ps: [{
            n: 'patches',
            rq: true,
            mx: false,
            dom: false,
            ti: '.SurfacePatchArrayPropertyType',
            t: 'er'
          }]
      }, {
        ln: 'LabelStylePropertyType',
        ps: [{
            n: 'labelStyle',
            en: 'LabelStyle',
            ti: '.LabelStyleType'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ValueArrayPropertyType',
        ps: [{
            n: 'value',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'CategoryList',
                ti: '.CodeOrNullListType'
              }, {
                en: 'Count',
                ti: 'Integer'
              }, {
                en: 'QuantityList',
                ti: '.MeasureOrNullListType'
              }, {
                en: '_Object',
                ti: 'AnyType'
              }, {
                en: 'Boolean',
                ti: 'Boolean'
              }, {
                en: 'Category',
                ti: '.CodeType'
              }, {
                en: 'Quantity',
                ti: '.MeasureType'
              }, {
                en: 'Null',
                ti: {
                  t: 'l'
                }
              }, {
                en: 'QuantityExtent',
                ti: '.QuantityExtentType'
              }, {
                en: 'CountList',
                ti: {
                  t: 'l'
                }
              }, {
                en: 'CategoryExtent',
                ti: '.CategoryExtentType'
              }, {
                en: 'BooleanList',
                ti: {
                  t: 'l'
                }
              }, {
                en: 'CountExtent',
                ti: {
                  t: 'l'
                }
              }, {
                en: 'CompositeValue',
                ti: '.CompositeValueType'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'TimePeriodPropertyType',
        ps: [{
            n: 'timePeriod',
            rq: true,
            en: 'TimePeriod',
            ti: '.TimePeriodType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TimeOrdinalReferenceSystemType',
        bti: '.AbstractTimeReferenceSystemType',
        ps: [{
            n: 'component',
            rq: true,
            col: true,
            ti: '.TimeOrdinalEraPropertyType'
          }]
      }, {
        ln: 'FeatureStylePropertyType',
        ps: [{
            n: 'featureStyle',
            en: 'FeatureStyle',
            ti: '.FeatureStyleType'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CompositeSurfaceType',
        bti: '.AbstractSurfaceType',
        ps: [{
            n: 'surfaceMember',
            rq: true,
            col: true,
            ti: '.SurfacePropertyType'
          }]
      }, {
        ln: 'PointPropertyType',
        ps: [{
            n: 'point',
            rq: true,
            en: 'Point',
            ti: '.PointType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CoordType',
        ps: [{
            n: 'x',
            rq: true,
            en: 'X',
            ti: 'Decimal'
          }, {
            n: 'y',
            en: 'Y',
            ti: 'Decimal'
          }, {
            n: 'z',
            en: 'Z',
            ti: 'Decimal'
          }]
      }, {
        ln: 'PointArrayPropertyType',
        ps: [{
            n: 'point',
            mno: 0,
            col: true,
            en: 'Point',
            ti: '.PointType'
          }]
      }, {
        ln: 'AbstractGriddedSurfaceType.Row',
        tn: null,
        ps: [{
            n: 'posList',
            rq: true,
            ti: '.DirectPositionListType'
          }, {
            n: 'geometricPositionGroup',
            rq: true,
            col: true,
            etis: [{
                en: 'pos',
                ti: '.DirectPositionType'
              }, {
                en: 'pointProperty',
                ti: '.PointPropertyType'
              }],
            t: 'es'
          }]
      }, {
        ln: 'AbstractRingPropertyType',
        ps: [{
            n: 'ring',
            rq: true,
            mx: false,
            dom: false,
            en: '_Ring',
            ti: '.AbstractRingType',
            t: 'er'
          }]
      }, {
        ln: 'DegreesType',
        ps: [{
            n: 'value',
            ti: 'NonNegativeInteger',
            t: 'v'
          }, {
            n: 'direction',
            an: {
              lp: 'direction'
            },
            t: 'a'
          }]
      }, {
        ln: 'EllipsoidalCSType',
        bti: '.AbstractCoordinateSystemType'
      }, {
        ln: 'TopologyStyleType',
        bti: '.BaseStyleDescriptorType',
        ps: [{
            n: 'symbol',
            rq: true,
            ti: '.SymbolType'
          }, {
            n: 'style',
            rq: true
          }, {
            n: 'labelStyle',
            ti: '.LabelStylePropertyType'
          }, {
            n: 'topologyProperty',
            an: {
              lp: 'topologyProperty'
            },
            t: 'a'
          }, {
            n: 'topologyType',
            an: {
              lp: 'topologyType'
            },
            t: 'a'
          }]
      }, {
        ln: 'AbstractGeneralConversionType',
        bti: '.AbstractCoordinateOperationType'
      }, {
        ln: 'ConeType',
        bti: '.AbstractGriddedSurfaceType',
        ps: [{
            n: 'horizontalCURVETYPE',
            an: {
              lp: 'horizontalCurveType'
            },
            t: 'a'
          }, {
            n: 'verticalCURVETYPE',
            an: {
              lp: 'verticalCurveType'
            },
            t: 'a'
          }]
      }, {
        ln: 'TimeTopologyComplexPropertyType',
        ps: [{
            n: 'timeTopologyComplex',
            rq: true,
            en: 'TimeTopologyComplex',
            ti: '.TimeTopologyComplexType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CategoryExtentType',
        bti: '.CodeOrNullListType'
      }, {
        ln: 'CodeOrNullListType',
        ps: [{
            n: 'value',
            ti: {
              t: 'l'
            },
            t: 'v'
          }, {
            n: 'codeSpace',
            an: {
              lp: 'codeSpace'
            },
            t: 'a'
          }]
      }, {
        ln: 'TimeCalendarPropertyType',
        ps: [{
            n: 'timeCalendar',
            rq: true,
            en: 'TimeCalendar',
            ti: '.TimeCalendarType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TopoSolidType',
        bti: '.AbstractTopoPrimitiveType',
        ps: [{
            n: 'directedFace',
            rq: true,
            col: true,
            ti: '.DirectedFacePropertyType'
          }]
      }, {
        ln: 'EngineeringDatumType',
        bti: '.AbstractDatumType'
      }, {
        ln: 'TopoSurfacePropertyType',
        ps: [{
            n: 'topoSurface',
            rq: true,
            en: 'TopoSurface',
            ti: '.TopoSurfaceType'
          }]
      }, {
        ln: 'BoundingShapeType',
        ps: [{
            n: 'envelope',
            rq: true,
            mx: false,
            dom: false,
            en: 'Envelope',
            ti: '.EnvelopeType',
            t: 'er'
          }, {
            n: '_null',
            rq: true,
            en: 'Null',
            ti: {
              t: 'l'
            }
          }]
      }, {
        ln: 'CircleType',
        bti: '.ArcType'
      }, {
        ln: 'TrackType',
        bti: '.HistoryPropertyType'
      }, {
        ln: 'IsolatedPropertyType',
        ps: [{
            n: 'node',
            rq: true,
            en: 'Node',
            ti: '.NodeType'
          }, {
            n: 'edge',
            rq: true,
            en: 'Edge',
            ti: '.EdgeType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AbstractGeneralOperationParameterRefType',
        ps: [{
            n: 'generalOperationParameter',
            rq: true,
            mx: false,
            dom: false,
            en: '_GeneralOperationParameter',
            ti: '.AbstractGeneralOperationParameterType',
            t: 'er'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TemporalCRSRefType',
        ps: [{
            n: 'temporalCRS',
            rq: true,
            en: 'TemporalCRS',
            ti: '.TemporalCRSType'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'KnotTypesType',
        vs: ['uniform', 'quasiUniform', 'piecewiseBezier']
      }, {
        t: 'enum',
        ln: 'SurfaceInterpolationType',
        vs: ['none', 'planar', 'spherical', 'elliptical', 'conic', 'tin', 'parametricCurve', 'polynomialSpline', 'rationalSpline', 'triangulatedSpline']
      }, {
        t: 'enum',
        ln: 'IncrementOrder',
        vs: ['+x+y', '+y+x', '+x-y', '-x-y']
      }, {
        t: 'enum',
        ln: 'FileValueModelType',
        vs: ['Record Interleaved']
      }, {
        t: 'enum',
        ln: 'CurveInterpolationType',
        vs: ['linear', 'geodesic', 'circularArc3Points', 'circularArc2PointWithBulge', 'circularArcCenterPointWithRadius', 'elliptical', 'clothoid', 'conic', 'polynomialSpline', 'cubicSpline', 'rationalSpline']
      }, {
        t: 'enum',
        ln: 'TimeIndeterminateValueType',
        vs: ['after', 'before', 'now', 'unknown']
      }, {
        t: 'enum',
        ln: 'SymbolTypeEnumeration',
        vs: ['svg', 'xpath', 'other']
      }, {
        t: 'enum',
        ln: 'SignType',
        vs: ['-', '+']
      }, {
        t: 'enum',
        ln: 'SuccessionType',
        vs: ['substitution', 'division', 'fusion', 'initiation']
      }, {
        t: 'enum',
        ln: 'CompassPointEnumeration',
        vs: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
      }, {
        t: 'enum',
        ln: 'GraphTypeType',
        vs: ['TREE', 'BICONNECTED']
      }, {
        t: 'enum',
        ln: 'SequenceRuleNames',
        vs: ['Linear', 'Boustrophedonic', 'Cantor-diagonal', 'Spiral', 'Morton', 'Hilbert']
      }, {
        t: 'enum',
        ln: 'DrawingTypeType',
        vs: ['POLYLINE', 'ORTHOGONAL']
      }, {
        t: 'enum',
        ln: 'LineTypeType',
        vs: ['STRAIGHT', 'BENT']
      }, {
        t: 'enum',
        ln: 'QueryGrammarEnumeration',
        vs: ['xpath', 'xquery', 'other']
      }, {
        t: 'enum',
        ln: 'AesheticCriteriaType',
        vs: ['MIN_CROSSINGS', 'MIN_AREA', 'MIN_BENDS', 'MAX_BENDS', 'UNIFORM_BENDS', 'MIN_SLOPES', 'MIN_EDGE_LENGTH', 'MAX_EDGE_LENGTH', 'UNIFORM_EDGE_LENGTH', 'MAX_ANGULAR_RESOLUTION', 'MIN_ASPECT_RATIO', 'MAX_SYMMETRIES']
      }],
    eis: [{
        en: 'validTime',
        ti: '.TimePrimitivePropertyType'
      }, {
        en: 'MultiSolidCoverage',
        ti: '.MultiSolidCoverageType',
        sh: '_DiscreteCoverage'
      }, {
        en: 'Clothoid',
        ti: '.ClothoidType',
        sh: '_CurveSegment'
      }, {
        en: 'priorityLocation',
        ti: '.PriorityLocationPropertyType',
        sh: 'location'
      }, {
        en: 'multiExtentOf',
        ti: '.MultiSurfacePropertyType'
      }, {
        en: '_GeometricAggregate',
        ti: '.AbstractGeometricAggregateType',
        sh: '_Geometry'
      }, {
        en: 'srsID',
        ti: '.IdentifierType'
      }, {
        en: 'TimeEdge',
        ti: '.TimeEdgeType',
        sh: '_TimeTopologyPrimitive'
      }, {
        en: 'roughConversionToPreferredUnit',
        ti: '.ConversionToPreferredUnitType'
      }, {
        en: 'LabelStyle',
        ti: '.LabelStyleType',
        sh: '_GML'
      }, {
        en: 'patches',
        ti: '.SurfacePatchArrayPropertyType'
      }, {
        en: 'container',
        ti: '.ContainerPropertyType'
      }, {
        en: 'passThroughOperationRef',
        ti: '.PassThroughOperationRefType'
      }, {
        en: 'featureMembers',
        ti: '.FeatureArrayPropertyType'
      }, {
        en: 'TriangulatedSurface',
        ti: '.TriangulatedSurfaceType',
        sh: 'Surface'
      }, {
        en: 'datumID',
        ti: '.IdentifierType'
      }, {
        en: 'EllipsoidalCS',
        ti: '.EllipsoidalCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'File',
        ti: '.FileType'
      }, {
        en: 'booleanValue',
        ti: 'Boolean'
      }, {
        en: 'GeodesicString',
        ti: '.GeodesicStringType',
        sh: '_CurveSegment'
      }, {
        en: '_Geometry',
        ti: '.AbstractGeometryType',
        sh: '_GML'
      }, {
        en: 'pointProperty',
        ti: '.PointPropertyType'
      }, {
        en: 'valueProperty',
        ti: '.ValuePropertyType'
      }, {
        en: 'coordinates',
        ti: '.CoordinatesType'
      }, {
        en: 'otherFeatureMembers',
        ti: '.FeatureArrayPropertyType',
        sh: 'featureMembers'
      }, {
        en: 'CompositeValue',
        ti: '.CompositeValueType'
      }, {
        en: 'polygonProperty',
        ti: '.PolygonPropertyType'
      }, {
        en: 'dataSource',
        ti: '.StringOrRefType'
      }, {
        en: 'measureDescription',
        ti: '.CodeType'
      }, {
        en: 'doubleOrNullTupleList',
        ti: {
          t: 'l'
        }
      }, {
        en: '_GriddedSurface',
        ti: '.AbstractGriddedSurfaceType',
        sh: '_ParametricCurveSurface'
      }, {
        en: 'LinearCS',
        ti: '.LinearCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'usesAxis',
        ti: '.CoordinateSystemAxisRefType'
      }, {
        en: 'verticalDatumType',
        ti: '.VerticalDatumTypeType'
      }, {
        en: 'CompassPoint'
      }, {
        en: 'gridDomain',
        ti: '.GridDomainType',
        sh: 'domainSet'
      }, {
        en: '_TimeGeometricPrimitive',
        ti: '.AbstractTimeGeometricPrimitiveType',
        sh: '_TimePrimitive'
      }, {
        en: 'ObliqueCartesianCS',
        ti: '.ObliqueCartesianCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'geometryMembers',
        ti: '.GeometryArrayPropertyType'
      }, {
        en: 'Quantity',
        ti: '.MeasureType'
      }, {
        en: 'MultiPolygon',
        ti: '.MultiPolygonType',
        sh: '_GeometricAggregate'
      }, {
        en: 'Ellipsoid',
        ti: '.EllipsoidType',
        sh: 'Definition'
      }, {
        en: 'Definition',
        ti: '.DefinitionType',
        sh: '_GML'
      }, {
        en: 'Ring',
        ti: '.RingType',
        sh: '_Ring'
      }, {
        en: 'OrientableSurface',
        ti: '.OrientableSurfaceType',
        sh: '_Surface'
      }, {
        en: 'lineStringMember',
        ti: '.LineStringPropertyType'
      }, {
        en: 'ArcString',
        ti: '.ArcStringType',
        sh: '_CurveSegment'
      }, {
        en: 'directedNode',
        ti: '.DirectedNodePropertyType'
      }, {
        en: 'MultiSurfaceCoverage',
        ti: '.MultiSurfaceCoverageType',
        sh: '_DiscreteCoverage'
      }, {
        en: '_positionalAccuracy',
        ti: '.AbstractPositionalAccuracyType'
      }, {
        en: 'multiGeometryProperty',
        ti: '.MultiGeometryPropertyType'
      }, {
        en: 'absoluteExternalPositionalAccuracy',
        ti: '.AbsoluteExternalPositionalAccuracyType',
        sh: '_positionalAccuracy'
      }, {
        en: 'GeocentricCRS',
        ti: '.GeocentricCRSType',
        sh: '_CoordinateReferenceSystem'
      }, {
        en: 'TimeNode',
        ti: '.TimeNodeType',
        sh: '_TimeTopologyPrimitive'
      }, {
        en: 'valueComponents',
        ti: '.ValueArrayPropertyType'
      }, {
        en: 'GenericMetaData',
        ti: '.GenericMetaDataType',
        sh: '_MetaData'
      }, {
        en: 'topoPrimitiveMembers',
        ti: '.TopoPrimitiveArrayAssociationType'
      }, {
        en: 'timePosition',
        ti: '.TimePositionType'
      }, {
        en: 'Bag',
        ti: '.BagType',
        sh: '_GML'
      }, {
        en: 'ellipsoidName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: 'unitOfMeasure',
        ti: '.UnitOfMeasureType'
      }, {
        en: 'Geodesic',
        ti: '.GeodesicType',
        sh: 'GeodesicString'
      }, {
        en: 'definedByConversion',
        ti: '.GeneralConversionRefType'
      }, {
        en: 'scope'
      }, {
        en: 'PolarCS',
        ti: '.PolarCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'Solid',
        ti: '.SolidType',
        sh: '_Solid'
      }, {
        en: 'surfaceMember',
        ti: '.SurfacePropertyType'
      }, {
        en: 'TopoSurface',
        ti: '.TopoSurfaceType'
      }, {
        en: '_Solid',
        ti: '.AbstractSolidType',
        sh: '_GeometricPrimitive'
      }, {
        en: 'CountList',
        ti: {
          t: 'l'
        }
      }, {
        en: 'CubicSpline',
        ti: '.CubicSplineType',
        sh: '_CurveSegment'
      }, {
        en: 'GeographicCRS',
        ti: '.GeographicCRSType',
        sh: '_CoordinateReferenceSystem'
      }, {
        en: 'Grid',
        ti: '.GridType',
        sh: '_ImplicitGeometry'
      }, {
        en: '_ContinuousCoverage',
        ti: '.AbstractContinuousCoverageType',
        sh: '_Coverage'
      }, {
        en: 'PassThroughOperation',
        ti: '.PassThroughOperationType',
        sh: '_SingleOperation'
      }, {
        en: 'rangeParameters',
        ti: '.RangeParametersType'
      }, {
        en: 'definitionRef',
        ti: '.ReferenceType'
      }, {
        en: 'baseSurface',
        ti: '.SurfacePropertyType'
      }, {
        en: '_GeometricPrimitive',
        ti: '.AbstractGeometricPrimitiveType',
        sh: '_Geometry'
      }, {
        en: 'verticalCSRef',
        ti: '.VerticalCSRefType'
      }, {
        en: 'TimeCalendar',
        ti: '.TimeCalendarType',
        sh: '_TimeReferenceSystem'
      }, {
        en: 'TopoCurve',
        ti: '.TopoCurveType'
      }, {
        en: 'subject',
        ti: '.TargetPropertyType',
        sh: 'target'
      }, {
        en: 'TemporalCS',
        ti: '.TemporalCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'isSphere'
      }, {
        en: 'RectifiedGridCoverage',
        ti: '.RectifiedGridCoverageType',
        sh: '_DiscreteCoverage'
      }, {
        en: 'sourceDimensions',
        ti: 'PositiveInteger'
      }, {
        en: '_MetaData',
        ti: '.AbstractMetaDataType',
        sh: '_Object'
      }, {
        en: 'BSpline',
        ti: '.BSplineType',
        sh: '_CurveSegment'
      }, {
        en: '_CoordinateOperation',
        ti: '.AbstractCoordinateOperationType',
        sh: 'Definition'
      }, {
        en: '_association',
        ti: '.AssociationType'
      }, {
        en: 'definitionMember',
        ti: '.DictionaryEntryType',
        sh: 'dictionaryEntry'
      }, {
        en: 'LineStringSegment',
        ti: '.LineStringSegmentType',
        sh: '_CurveSegment'
      }, {
        en: '_CRS',
        ti: '.AbstractReferenceSystemType',
        sh: '_ReferenceSystem'
      }, {
        en: 'result',
        ti: '.MeasureType'
      }, {
        en: 'Circle',
        ti: '.CircleType',
        sh: 'Arc'
      }, {
        en: '_DiscreteCoverage',
        ti: '.AbstractDiscreteCoverageType',
        sh: '_Coverage'
      }, {
        en: '_Surface',
        ti: '.AbstractSurfaceType',
        sh: '_GeometricPrimitive'
      }, {
        en: 'verticalCRSRef',
        ti: '.VerticalCRSRefType'
      }, {
        en: 'concatenatedOperationRef',
        ti: '.ConcatenatedOperationRefType'
      }, {
        en: 'operationParameterRef',
        ti: '.OperationParameterRefType'
      }, {
        en: 'meridianID',
        ti: '.IdentifierType'
      }, {
        en: 'usesEngineeringDatum',
        ti: '.EngineeringDatumRefType'
      }, {
        en: 'CompositeSolid',
        ti: '.CompositeSolidType',
        sh: '_Solid'
      }, {
        en: 'curveProperty',
        ti: '.CurvePropertyType'
      }, {
        en: '_CoordinateReferenceSystem',
        ti: '.AbstractReferenceSystemType',
        sh: '_CRS'
      }, {
        en: 'greenwichLongitude',
        ti: '.AngleChoiceType'
      }, {
        en: 'Envelope',
        ti: '.EnvelopeType'
      }, {
        en: 'usesVerticalCS',
        ti: '.VerticalCSRefType'
      }, {
        en: 'degrees',
        ti: '.DegreesType'
      }, {
        en: 'location',
        ti: '.LocationPropertyType'
      }, {
        en: 'geometryMember',
        ti: '.GeometryPropertyType'
      }, {
        en: 'topoCurveProperty',
        ti: '.TopoCurvePropertyType'
      }, {
        en: '_TimeObject',
        ti: '.AbstractTimeObjectType',
        sh: '_GML'
      }, {
        en: 'coordinateSystemAxisRef',
        ti: '.CoordinateSystemAxisRefType'
      }, {
        en: 'surfaceArrayProperty',
        ti: '.SurfaceArrayPropertyType'
      }, {
        en: 'labelStyle',
        ti: '.LabelStylePropertyType'
      }, {
        en: 'otherFeatureMember',
        ti: '.FeaturePropertyType',
        sh: 'featureMember'
      }, {
        en: 'IndexMap',
        ti: '.IndexMapType',
        sh: 'GridFunction'
      }, {
        en: '_Feature',
        ti: '.AbstractFeatureType',
        sh: '_GML'
      }, {
        en: 'direction',
        ti: '.DirectionPropertyType'
      }, {
        en: 'parameterValue',
        ti: '.ParameterValueType',
        sh: '_generalParameterValue'
      }, {
        en: 'duration',
        ti: 'Duration'
      }, {
        en: 'boundedBy',
        ti: '.BoundingShapeType'
      }, {
        en: 'secondDefiningParameter',
        ti: '.SecondDefiningParameterType'
      }, {
        en: 'Rectangle',
        ti: '.RectangleType',
        sh: '_SurfacePatch'
      }, {
        en: 'Sphere',
        ti: '.SphereType',
        sh: '_GriddedSurface'
      }, {
        en: '_Coverage',
        ti: '.AbstractCoverageType',
        sh: '_Feature'
      }, {
        en: 'member',
        ti: '.AssociationType'
      }, {
        en: 'multiCoverage',
        ti: '.MultiSurfacePropertyType'
      }, {
        en: 'imageCRSRef',
        ti: '.ImageCRSRefType'
      }, {
        en: '_FeatureCollection',
        ti: '.AbstractFeatureCollectionType',
        sh: '_Feature'
      }, {
        en: 'usesParameter',
        ti: '.AbstractGeneralOperationParameterRefType'
      }, {
        en: 'coordinateSystemRef',
        ti: '.CoordinateSystemRefType'
      }, {
        en: 'posList',
        ti: '.DirectPositionListType'
      }, {
        en: 'csID',
        ti: '.IdentifierType'
      }, {
        en: 'featureMember',
        ti: '.FeaturePropertyType'
      }, {
        en: 'centerLineOf',
        ti: '.CurvePropertyType'
      }, {
        en: 'isolated',
        ti: '.IsolatedPropertyType'
      }, {
        en: 'TimePeriod',
        ti: '.TimePeriodType',
        sh: '_TimeGeometricPrimitive'
      }, {
        en: 'multiSurfaceProperty',
        ti: '.MultiSurfacePropertyType'
      }, {
        en: '_Operation',
        ti: '.AbstractCoordinateOperationType',
        sh: '_SingleOperation'
      }, {
        en: 'symbol',
        ti: '.SymbolType'
      }, {
        en: 'LocationString',
        ti: '.StringOrRefType'
      }, {
        en: 'subComplex',
        ti: '.TopoComplexMemberType'
      }, {
        en: 'csName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: 'axisAbbrev',
        ti: '.CodeType'
      }, {
        en: '_TimePrimitive',
        ti: '.AbstractTimePrimitiveType',
        sh: '_TimeObject'
      }, {
        en: 'usesGeodeticDatum',
        ti: '.GeodeticDatumRefType'
      }, {
        en: '_CurveSegment',
        ti: '.AbstractCurveSegmentType'
      }, {
        en: 'Boolean',
        ti: 'Boolean'
      }, {
        en: 'resultOf',
        ti: '.AssociationType'
      }, {
        en: 'usesValue',
        ti: '.ParameterValueType'
      }, {
        en: 'usesEllipsoid',
        ti: '.EllipsoidRefType'
      }, {
        en: '_GML',
        ti: '.AbstractGMLType',
        sh: '_Object'
      }, {
        en: 'Conversion',
        ti: '.ConversionType',
        sh: '_GeneralConversion'
      }, {
        en: 'derivedCRSType',
        ti: '.DerivedCRSTypeType'
      }, {
        en: 'Dictionary',
        ti: '.DictionaryType',
        sh: 'Definition'
      }, {
        en: 'exterior',
        ti: '.AbstractRingPropertyType'
      }, {
        en: 'methodID',
        ti: '.IdentifierType'
      }, {
        en: 'TopologyStyle',
        ti: '.TopologyStyleType',
        sh: '_GML'
      }, {
        en: 'defaultStyle',
        ti: '.DefaultStylePropertyType'
      }, {
        en: 'featureStyle',
        ti: '.FeatureStylePropertyType'
      }, {
        en: 'TopoVolume',
        ti: '.TopoVolumeType'
      }, {
        en: 'ArcByBulge',
        ti: '.ArcByBulgeType',
        sh: 'ArcStringByBulge'
      }, {
        en: 'geographicCRSRef',
        ti: '.GeographicCRSRefType'
      }, {
        en: 'GeometricComplex',
        ti: '.GeometricComplexType',
        sh: '_Geometry'
      }, {
        en: 'vector',
        ti: '.VectorType'
      }, {
        en: 'polygonPatches',
        ti: '.PolygonPatchArrayPropertyType',
        sh: 'patches'
      }, {
        en: 'centerOf',
        ti: '.PointPropertyType'
      }, {
        en: 'usesVerticalDatum',
        ti: '.VerticalDatumRefType'
      }, {
        en: 'VerticalCRS',
        ti: '.VerticalCRSType',
        sh: '_CoordinateReferenceSystem'
      }, {
        en: 'angle',
        ti: '.MeasureType'
      }, {
        en: 'CategoryExtent',
        ti: '.CategoryExtentType'
      }, {
        en: 'sphericalCSRef',
        ti: '.SphericalCSRefType'
      }, {
        en: 'QuantityExtent',
        ti: '.QuantityExtentType'
      }, {
        en: 'multiCenterLineOf',
        ti: '.MultiCurvePropertyType'
      }, {
        en: 'CompositeSurface',
        ti: '.CompositeSurfaceType',
        sh: '_Surface'
      }, {
        en: 'derivedCRSRef',
        ti: '.DerivedCRSRefType'
      }, {
        en: 'coordinateOperationName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: '_TopoPrimitive',
        ti: '.AbstractTopoPrimitiveType',
        sh: '_Topology'
      }, {
        en: '_TimeSlice',
        ti: '.AbstractTimeSliceType',
        sh: '_GML'
      }, {
        en: 'temporalDatumRef',
        ti: '.TemporalDatumRefType'
      }, {
        en: 'stringValue'
      }, {
        en: 'name',
        ti: '.CodeType'
      }, {
        en: 'surfaceMembers',
        ti: '.SurfaceArrayPropertyType'
      }, {
        en: 'derivationUnitTerm',
        ti: '.DerivationUnitTermType'
      }, {
        en: 'DefinitionCollection',
        ti: '.DictionaryType',
        sh: 'Definition'
      }, {
        en: 'GraphStyle',
        ti: '.GraphStyleType',
        sh: '_GML'
      }, {
        en: 'semiMajorAxis',
        ti: '.MeasureType'
      }, {
        en: 'LinearRing',
        ti: '.LinearRingType',
        sh: '_Ring'
      }, {
        en: 'domainSet',
        ti: '.DomainSetType'
      }, {
        en: 'userDefinedCSRef',
        ti: '.UserDefinedCSRefType'
      }, {
        en: 'geocentricCRSRef',
        ti: '.GeocentricCRSRefType'
      }, {
        en: 'operationVersion'
      }, {
        en: 'dmsAngle',
        ti: '.DMSAngleType'
      }, {
        en: 'OffsetCurve',
        ti: '.OffsetCurveType',
        sh: '_CurveSegment'
      }, {
        en: 'PrimeMeridian',
        ti: '.PrimeMeridianType',
        sh: 'Definition'
      }, {
        en: 'TimeCoordinateSystem',
        ti: '.TimeCoordinateSystemType',
        sh: '_TimeReferenceSystem'
      }, {
        en: '_generalParameterValue',
        ti: '.AbstractGeneralParameterValueType'
      }, {
        en: 'meridianName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: 'ImageCRS',
        ti: '.ImageCRSType',
        sh: '_CoordinateReferenceSystem'
      }, {
        en: '_GeneralTransformation',
        ti: '.AbstractGeneralTransformationType',
        sh: '_Operation'
      }, {
        en: 'realizationEpoch',
        ti: 'Date'
      }, {
        en: 'Null',
        ti: {
          t: 'l'
        }
      }, {
        en: 'crsRef',
        ti: '.CRSRefType'
      }, {
        en: 'ArcStringByBulge',
        ti: '.ArcStringByBulgeType',
        sh: '_CurveSegment'
      }, {
        en: 'MultiCurve',
        ti: '.MultiCurveType',
        sh: '_GeometricAggregate'
      }, {
        en: 'DerivedUnit',
        ti: '.DerivedUnitType',
        sh: 'UnitDefinition'
      }, {
        en: 'geodeticDatumRef',
        ti: '.GeodeticDatumRefType'
      }, {
        en: 'topoPointProperty',
        ti: '.TopoPointPropertyType'
      }, {
        en: 'solidProperty',
        ti: '.SolidPropertyType'
      }, {
        en: 'Transformation',
        ti: '.TransformationType',
        sh: '_GeneralTransformation'
      }, {
        en: 'multiCurveProperty',
        ti: '.MultiCurvePropertyType'
      }, {
        en: 'curveArrayProperty',
        ti: '.CurveArrayPropertyType'
      }, {
        en: 'ellipsoidalCSRef',
        ti: '.EllipsoidalCSRefType'
      }, {
        en: 'usesObliqueCartesianCS',
        ti: '.ObliqueCartesianCSRefType'
      }, {
        en: 'datumName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: 'covarianceMatrix',
        ti: '.CovarianceMatrixType',
        sh: '_positionalAccuracy'
      }, {
        en: 'interior',
        ti: '.AbstractRingPropertyType'
      }, {
        en: 'OrientableCurve',
        ti: '.OrientableCurveType',
        sh: '_Curve'
      }, {
        en: 'Observation',
        ti: '.ObservationType',
        sh: '_Feature'
      }, {
        en: 'BaseUnit',
        ti: '.BaseUnitType',
        sh: 'UnitDefinition'
      }, {
        en: 'DirectedObservationAtDistance',
        ti: '.DirectedObservationAtDistanceType',
        sh: 'DirectedObservation'
      }, {
        en: 'LineString',
        ti: '.LineStringType',
        sh: '_Curve'
      }, {
        en: 'CompoundCRS',
        ti: '.CompoundCRSType',
        sh: '_CRS'
      }, {
        en: 'baseCurve',
        ti: '.CurvePropertyType'
      }, {
        en: 'CategoryList',
        ti: '.CodeOrNullListType'
      }, {
        en: '_SingleOperation',
        ti: '.AbstractCoordinateOperationType',
        sh: '_CoordinateOperation'
      }, {
        en: 'history',
        ti: '.HistoryPropertyType'
      }, {
        en: 'status',
        ti: '.StringOrRefType'
      }, {
        en: 'multiPointProperty',
        ti: '.MultiPointPropertyType'
      }, {
        en: 'ConcatenatedOperation',
        ti: '.ConcatenatedOperationType',
        sh: '_CoordinateOperation'
      }, {
        en: 'extentOf',
        ti: '.SurfacePropertyType'
      }, {
        en: 'DataBlock',
        ti: '.DataBlockType'
      }, {
        en: 'imageDatumRef',
        ti: '.ImageDatumRefType'
      }, {
        en: 'rowIndex',
        ti: 'PositiveInteger'
      }, {
        en: 'TimeOrdinalReferenceSystem',
        ti: '.TimeOrdinalReferenceSystemType',
        sh: '_TimeReferenceSystem'
      }, {
        en: 'metaDataProperty',
        ti: '.MetaDataPropertyType'
      }, {
        en: 'minimumOccurs',
        ti: 'NonNegativeInteger'
      }, {
        en: 'semiMinorAxis',
        ti: '.MeasureType'
      }, {
        en: 'usesImageDatum',
        ti: '.ImageDatumRefType'
      }, {
        en: 'DefinitionProxy',
        ti: '.DefinitionProxyType',
        sh: 'Definition'
      }, {
        en: 'segments',
        ti: '.CurveSegmentArrayPropertyType'
      }, {
        en: 'Polygon',
        ti: '.PolygonType',
        sh: '_Surface'
      }, {
        en: 'directedEdge',
        ti: '.DirectedEdgePropertyType'
      }, {
        en: 'decimalMinutes',
        ti: 'Decimal'
      }, {
        en: 'catalogSymbol',
        ti: '.CodeType'
      }, {
        en: 'directedFace',
        ti: '.DirectedFacePropertyType'
      }, {
        en: 'rangeSet',
        ti: '.RangeSetType'
      }, {
        en: 'targetDimensions',
        ti: 'PositiveInteger'
      }, {
        en: 'ConventionalUnit',
        ti: '.ConventionalUnitType',
        sh: 'UnitDefinition'
      }, {
        en: 'polygonMember',
        ti: '.PolygonPropertyType'
      }, {
        en: 'Bezier',
        ti: '.BezierType',
        sh: 'BSpline'
      }, {
        en: '_TimeReferenceSystem',
        ti: '.AbstractTimeReferenceSystemType',
        sh: 'Definition'
      }, {
        en: 'OperationParameter',
        ti: '.OperationParameterType',
        sh: '_GeneralOperationParameter'
      }, {
        en: 'TopoPoint',
        ti: '.TopoPointType'
      }, {
        en: '_Style',
        ti: '.AbstractStyleType',
        sh: '_GML'
      }, {
        en: 'Category',
        ti: '.CodeType'
      }, {
        en: 'primeMeridianRef',
        ti: '.PrimeMeridianRefType'
      }, {
        en: 'LocationKeyWord',
        ti: '.CodeType'
      }, {
        en: 'VerticalCS',
        ti: '.VerticalCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'boundingBox',
        ti: '.EnvelopeType'
      }, {
        en: 'pointMember',
        ti: '.PointPropertyType'
      }, {
        en: 'PolyhedralSurface',
        ti: '.PolyhedralSurfaceType',
        sh: 'Surface'
      }, {
        en: 'verticalExtent',
        ti: '.EnvelopeType'
      }, {
        en: 'obliqueCartesianCSRef',
        ti: '.ObliqueCartesianCSRefType'
      }, {
        en: 'targetCRS',
        ti: '.CRSRefType'
      }, {
        en: 'referenceSystemRef',
        ti: '.ReferenceSystemRefType'
      }, {
        en: 'axisDirection',
        ti: '.CodeType'
      }, {
        en: 'parameterName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: 'multiPosition',
        ti: '.MultiPointPropertyType'
      }, {
        en: 'Arc',
        ti: '.ArcType',
        sh: 'ArcString'
      }, {
        en: 'singleOperationRef',
        ti: '.SingleOperationRefType'
      }, {
        en: 'usesSphericalCS',
        ti: '.SphericalCSRefType'
      }, {
        en: 'includesValue',
        ti: '.AbstractGeneralParameterValueType',
        sh: '_generalParameterValue'
      }, {
        en: 'temporalCSRef',
        ti: '.TemporalCSRefType'
      }, {
        en: 'origin',
        ti: 'DateTime'
      }, {
        en: 'Point',
        ti: '.PointType',
        sh: '_GeometricPrimitive'
      }, {
        en: 'CylindricalCS',
        ti: '.CylindricalCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'MultiSolid',
        ti: '.MultiSolidType',
        sh: '_GeometricAggregate'
      }, {
        en: '_Curve',
        ti: '.AbstractCurveType',
        sh: '_GeometricPrimitive'
      }, {
        en: 'usesTemporalCS',
        ti: '.TemporalCSRefType'
      }, {
        en: 'rectifiedGridDomain',
        ti: '.RectifiedGridDomainType',
        sh: 'domainSet'
      }, {
        en: 'TimeClock',
        ti: '.TimeClockType',
        sh: '_TimeReferenceSystem'
      }, {
        en: 'usesSingleOperation',
        ti: '.SingleOperationRefType'
      }, {
        en: 'pixelInCell',
        ti: '.PixelInCellType'
      }, {
        en: 'ProjectedCRS',
        ti: '.ProjectedCRSType',
        sh: '_GeneralDerivedCRS'
      }, {
        en: '_Topology',
        ti: '.AbstractTopologyType',
        sh: '_GML'
      }, {
        en: 'modifiedCoordinate',
        ti: 'PositiveInteger'
      }, {
        en: 'relativeInternalPositionalAccuracy',
        ti: '.RelativeInternalPositionalAccuracyType',
        sh: '_positionalAccuracy'
      }, {
        en: '_GeneralOperationParameter',
        ti: '.AbstractGeneralOperationParameterType',
        sh: 'Definition'
      }, {
        en: 'EnvelopeWithTimePeriod',
        ti: '.EnvelopeWithTimePeriodType',
        sh: 'Envelope'
      }, {
        en: 'covariance',
        ti: 'Double'
      }, {
        en: 'outerBoundaryIs',
        ti: '.AbstractRingPropertyType',
        sh: 'exterior'
      }, {
        en: 'Edge',
        ti: '.EdgeType',
        sh: '_TopoPrimitive'
      }, {
        en: 'operationParameterGroupRef',
        ti: '.OperationParameterRefType'
      }, {
        en: 'includesElement',
        ti: '.CovarianceElementType'
      }, {
        en: '_ImplicitGeometry',
        ti: '.AbstractGeometryType',
        sh: '_Geometry'
      }, {
        en: 'dmsAngleValue',
        ti: '.DMSAngleType'
      }, {
        en: 'geometryStyle',
        ti: '.GeometryStylePropertyType'
      }, {
        en: 'usesTemporalDatum',
        ti: '.TemporalDatumRefType'
      }, {
        en: 'Tin',
        ti: '.TinType',
        sh: 'TriangulatedSurface'
      }, {
        en: 'trianglePatches',
        ti: '.TrianglePatchArrayPropertyType',
        sh: 'patches'
      }, {
        en: 'RectifiedGrid',
        ti: '.RectifiedGridType',
        sh: '_ImplicitGeometry'
      }, {
        en: 'inverseFlattening',
        ti: '.MeasureType'
      }, {
        en: 'FeatureStyle',
        ti: '.FeatureStyleType',
        sh: '_GML'
      }, {
        en: 'CompositeCurve',
        ti: '.CompositeCurveType',
        sh: '_Curve'
      }, {
        en: '_Datum',
        ti: '.AbstractDatumType',
        sh: 'Definition'
      }, {
        en: 'position',
        ti: '.PointPropertyType'
      }, {
        en: 'GridCoverage',
        ti: '.GridCoverageType',
        sh: '_DiscreteCoverage'
      }, {
        en: 'dictionaryEntry',
        ti: '.DictionaryEntryType'
      }, {
        en: 'includesCRS',
        ti: '.CoordinateReferenceSystemRefType'
      }, {
        en: 'methodFormula',
        ti: '.CodeType'
      }, {
        en: 'Array',
        ti: '.ArrayType',
        sh: '_GML'
      }, {
        en: 'topoComplexProperty',
        ti: '.TopoComplexMemberType'
      }, {
        en: 'BooleanList',
        ti: {
          t: 'l'
        }
      }, {
        en: 'temporalExtent',
        ti: '.TimePeriodType'
      }, {
        en: 'linearCSRef',
        ti: '.LinearCSRefType'
      }, {
        en: 'coordinateOperationID',
        ti: '.IdentifierType'
      }, {
        en: 'MultiPointCoverage',
        ti: '.MultiPointCoverageType',
        sh: '_DiscreteCoverage'
      }, {
        en: 'multiCenterOf',
        ti: '.MultiPointPropertyType'
      }, {
        en: 'EngineeringDatum',
        ti: '.EngineeringDatumType',
        sh: '_Datum'
      }, {
        en: 'validArea',
        ti: '.ExtentType'
      }, {
        en: 'minutes',
        ti: 'NonNegativeInteger'
      }, {
        en: 'innerBoundaryIs',
        ti: '.AbstractRingPropertyType',
        sh: 'interior'
      }, {
        en: 'CircleByCenterPoint',
        ti: '.CircleByCenterPointType',
        sh: 'ArcByCenterPoint'
      }, {
        en: 'OperationMethod',
        ti: '.OperationMethodType',
        sh: 'Definition'
      }, {
        en: 'Node',
        ti: '.NodeType',
        sh: '_TopoPrimitive'
      }, {
        en: 'multiPointDomain',
        ti: '.MultiPointDomainType',
        sh: 'domainSet'
      }, {
        en: 'topologyStyle',
        ti: '.TopologyStylePropertyType'
      }, {
        en: 'topoPrimitiveMember',
        ti: '.TopoPrimitiveMemberType'
      }, {
        en: 'usesPrimeMeridian',
        ti: '.PrimeMeridianRefType'
      }, {
        en: 'remarks',
        ti: '.StringOrRefType'
      }, {
        en: '_TimeTopologyPrimitive',
        ti: '.AbstractTimeTopologyPrimitiveType',
        sh: '_TimePrimitive'
      }, {
        en: 'temporalCRSRef',
        ti: '.TemporalCRSRefType'
      }, {
        en: 'UnitDefinition',
        ti: '.UnitDefinitionType',
        sh: 'Definition'
      }, {
        en: 'generalTransformationRef',
        ti: '.GeneralTransformationRefType'
      }, {
        en: 'multiSurfaceDomain',
        ti: '.MultiSurfaceDomainType',
        sh: 'domainSet'
      }, {
        en: 'topoSurfaceProperty',
        ti: '.TopoSurfacePropertyType'
      }, {
        en: 'MultiGeometry',
        ti: '.MultiGeometryType',
        sh: '_GeometricAggregate'
      }, {
        en: 'pointRep',
        ti: '.PointPropertyType'
      }, {
        en: 'solidMembers',
        ti: '.SolidArrayPropertyType'
      }, {
        en: '_SurfacePatch',
        ti: '.AbstractSurfacePatchType'
      }, {
        en: 'directedTopoSolid',
        ti: '.DirectedTopoSolidPropertyType'
      }, {
        en: 'coordinateOperationRef',
        ti: '.CoordinateOperationRefType'
      }, {
        en: 'boundingPolygon',
        ti: '.PolygonType'
      }, {
        en: 'solidArrayProperty',
        ti: '.SolidArrayPropertyType'
      }, {
        en: '_strictAssociation',
        ti: '.AssociationType'
      }, {
        en: 'DerivedCRS',
        ti: '.DerivedCRSType',
        sh: '_GeneralDerivedCRS'
      }, {
        en: '_CoordinateSystem',
        ti: '.AbstractCoordinateSystemType',
        sh: 'Definition'
      }, {
        en: 'Face',
        ti: '.FaceType',
        sh: '_TopoPrimitive'
      }, {
        en: 'integerValue',
        ti: 'PositiveInteger'
      }, {
        en: 'parameterID',
        ti: '.IdentifierType'
      }, {
        en: 'usesOperation',
        ti: '.OperationRefType'
      }, {
        en: 'multiSolidDomain',
        ti: '.MultiSolidDomainType',
        sh: 'domainSet'
      }, {
        en: 'datumRef',
        ti: '.DatumRefType'
      }, {
        en: 'methodName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: 'verticalDatumRef',
        ti: '.VerticalDatumRefType'
      }, {
        en: 'Cone',
        ti: '.ConeType',
        sh: '_GriddedSurface'
      }, {
        en: 'usesMethod',
        ti: '.OperationMethodRefType'
      }, {
        en: 'surfaceProperty',
        ti: '.SurfacePropertyType'
      }, {
        en: 'abstractGeneralOperationParameterRef',
        ti: '.AbstractGeneralOperationParameterRefType'
      }, {
        en: 'ArcByCenterPoint',
        ti: '.ArcByCenterPointType',
        sh: '_CurveSegment'
      }, {
        en: '_GeneralConversion',
        ti: '.AbstractGeneralConversionType',
        sh: '_Operation'
      }, {
        en: '_TimeComplex',
        ti: '.AbstractTimeComplexType',
        sh: '_TimeObject'
      }, {
        en: 'engineeringDatumRef',
        ti: '.EngineeringDatumRefType'
      }, {
        en: 'multiEdgeOf',
        ti: '.MultiCurvePropertyType'
      }, {
        en: 'coord',
        ti: '.CoordType'
      }, {
        en: 'generalConversionRef',
        ti: '.GeneralConversionRefType'
      }, {
        en: 'CartesianCS',
        ti: '.CartesianCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'value',
        ti: '.MeasureType'
      }, {
        en: 'QuantityList',
        ti: '.MeasureOrNullListType'
      }, {
        en: 'transformationRef',
        ti: '.TransformationRefType'
      }, {
        en: 'valueFile'
      }, {
        en: '_Ring',
        ti: '.AbstractRingType',
        sh: '_Geometry'
      }, {
        en: 'Surface',
        ti: '.SurfaceType',
        sh: '_Surface'
      }, {
        en: 'ValueArray',
        ti: '.ValueArrayType',
        sh: 'CompositeValue'
      }, {
        en: 'maximumOccurs',
        ti: 'PositiveInteger'
      }, {
        en: 'TemporalDatum',
        ti: '.TemporalDatumType',
        sh: '_Datum'
      }, {
        en: 'usesEllipsoidalCS',
        ti: '.EllipsoidalCSRefType'
      }, {
        en: 'MultiCurveCoverage',
        ti: '.MultiCurveCoverageType',
        sh: '_DiscreteCoverage'
      }, {
        en: 'ellipsoidID',
        ti: '.IdentifierType'
      }, {
        en: '_GeneralDerivedCRS',
        ti: '.AbstractGeneralDerivedCRSType',
        sh: '_CoordinateReferenceSystem'
      }, {
        en: 'CountExtent',
        ti: {
          t: 'l'
        }
      }, {
        en: 'coordinateReferenceSystemRef',
        ti: '.CoordinateReferenceSystemRefType'
      }, {
        en: 'pos',
        ti: '.DirectPositionType'
      }, {
        en: 'maximalComplex',
        ti: '.TopoComplexMemberType'
      }, {
        en: '_ReferenceSystem',
        ti: '.AbstractReferenceSystemType',
        sh: 'Definition'
      }, {
        en: 'description',
        ti: '.StringOrRefType'
      }, {
        en: 'pointMembers',
        ti: '.PointArrayPropertyType'
      }, {
        en: 'curveMembers',
        ti: '.CurveArrayPropertyType'
      }, {
        en: 'coverageFunction',
        ti: '.CoverageFunctionType'
      }, {
        en: 'includesParameter',
        ti: '.AbstractGeneralOperationParameterRefType'
      }, {
        en: 'seconds',
        ti: 'Decimal'
      }, {
        en: 'TemporalCRS',
        ti: '.TemporalCRSType',
        sh: '_CoordinateReferenceSystem'
      }, {
        en: 'TimeCalendarEra',
        ti: '.TimeCalendarEraType',
        sh: 'Definition'
      }, {
        en: 'TimeTopologyComplex',
        ti: '.TimeTopologyComplexType',
        sh: '_TimeComplex'
      }, {
        en: 'FeatureCollection',
        ti: '.FeatureCollectionType',
        sh: '_Feature'
      }, {
        en: 'DirectedObservation',
        ti: '.DirectedObservationType',
        sh: 'Observation'
      }, {
        en: 'TimeInstant',
        ti: '.TimeInstantType',
        sh: '_TimeGeometricPrimitive'
      }, {
        en: 'using',
        ti: '.FeaturePropertyType'
      }, {
        en: 'superComplex',
        ti: '.TopoComplexMemberType'
      }, {
        en: 'integerValueList',
        ti: {
          t: 'l',
          bti: 'Integer'
        }
      }, {
        en: 'groupID',
        ti: '.IdentifierType'
      }, {
        en: '_Object',
        ti: 'AnyType'
      }, {
        en: 'usesCS',
        ti: '.CoordinateSystemRefType'
      }, {
        en: 'track',
        ti: '.TrackType',
        sh: 'history'
      }, {
        en: 'operationRef',
        ti: '.OperationRefType'
      }, {
        en: 'MultiLineString',
        ti: '.MultiLineStringType',
        sh: '_GeometricAggregate'
      }, {
        en: 'Triangle',
        ti: '.TriangleType',
        sh: '_SurfacePatch'
      }, {
        en: 'edgeOf',
        ti: '.CurvePropertyType'
      }, {
        en: 'valuesOfGroup',
        ti: '.OperationParameterGroupRefType'
      }, {
        en: 'EngineeringCRS',
        ti: '.EngineeringCRSType',
        sh: '_CoordinateReferenceSystem'
      }, {
        en: 'MovingObjectStatus',
        ti: '.MovingObjectStatusType',
        sh: '_TimeSlice'
      }, {
        en: 'featureProperty',
        ti: '.FeaturePropertyType'
      }, {
        en: 'groupName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: 'GeodeticDatum',
        ti: '.GeodeticDatumType',
        sh: '_Datum'
      }, {
        en: 'tupleList',
        ti: '.CoordinatesType'
      }, {
        en: 'projectedCRSRef',
        ti: '.ProjectedCRSRefType'
      }, {
        en: 'Curve',
        ti: '.CurveType',
        sh: '_Curve'
      }, {
        en: 'indirectEntry',
        ti: '.IndirectEntryType'
      }, {
        en: '_ParametricCurveSurface',
        ti: '.AbstractParametricCurveSurfaceType',
        sh: '_SurfacePatch'
      }, {
        en: 'Cylinder',
        ti: '.CylinderType',
        sh: '_GriddedSurface'
      }, {
        en: 'SphericalCS',
        ti: '.SphericalCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'UserDefinedCS',
        ti: '.UserDefinedCSType',
        sh: '_CoordinateSystem'
      }, {
        en: 'cartesianCSRef',
        ti: '.CartesianCSRefType'
      }, {
        en: 'usesCartesianCS',
        ti: '.CartesianCSRefType'
      }, {
        en: 'AffinePlacement',
        ti: '.AffinePlacementType'
      }, {
        en: 'PolygonPatch',
        ti: '.PolygonPatchType',
        sh: '_SurfacePatch'
      }, {
        en: 'LabelExpression',
        sc: '.LabelType'
      }, {
        en: 'multiSolidProperty',
        ti: '.MultiSolidPropertyType'
      }, {
        en: 'MultiPoint',
        ti: '.MultiPointType',
        sh: '_GeometricAggregate'
      }, {
        en: 'TopoSolid',
        ti: '.TopoSolidType',
        sh: '_TopoPrimitive'
      }, {
        en: 'multiCurveDomain',
        ti: '.MultiCurveDomainType',
        sh: 'domainSet'
      }, {
        en: 'MappingRule',
        ti: '.StringOrRefType'
      }, {
        en: 'valueOfParameter',
        ti: '.OperationParameterRefType'
      }, {
        en: 'cylindricalCSRef',
        ti: '.CylindricalCSRefType'
      }, {
        en: 'ImageDatum',
        ti: '.ImageDatumType',
        sh: '_Datum'
      }, {
        en: 'VerticalDatum',
        ti: '.VerticalDatumType',
        sh: '_Datum'
      }, {
        en: 'pointArrayProperty',
        ti: '.PointArrayPropertyType'
      }, {
        en: 'lineStringProperty',
        ti: '.LineStringPropertyType'
      }, {
        en: '_reference',
        ti: '.ReferenceType'
      }, {
        en: 'srsName',
        ti: '.CodeType',
        sh: 'name'
      }, {
        en: 'OperationParameterGroup',
        ti: '.OperationParameterGroupType',
        sh: '_GeneralOperationParameter'
      }, {
        en: 'operationMethodRef',
        ti: '.OperationMethodRefType'
      }, {
        en: 'timeInterval',
        ti: '.TimeIntervalLengthType'
      }, {
        en: 'parameterValueGroup',
        ti: '.ParameterValueGroupType',
        sh: '_generalParameterValue'
      }, {
        en: 'conversionToPreferredUnit',
        ti: '.ConversionToPreferredUnitType'
      }, {
        en: 'TimeOrdinalEra',
        ti: '.TimeOrdinalEraType'
      }, {
        en: 'MultiSurface',
        ti: '.MultiSurfaceType',
        sh: '_GeometricAggregate'
      }, {
        en: 'solidMember',
        ti: '.SolidPropertyType'
      }, {
        en: 'quantityType',
        ti: '.StringOrRefType'
      }, {
        en: 'Style',
        ti: '.StyleType',
        sh: '_Style'
      }, {
        en: 'members',
        ti: '.ArrayAssociationType'
      }, {
        en: 'columnIndex',
        ti: 'PositiveInteger'
      }, {
        en: 'sourceCRS',
        ti: '.CRSRefType'
      }, {
        en: 'conversionRef',
        ti: '.ConversionRefType'
      }, {
        en: 'GeometryStyle',
        ti: '.GeometryStyleType',
        sh: '_GML'
      }, {
        en: 'measure',
        ti: '.MeasureType'
      }, {
        en: 'axisID',
        ti: '.IdentifierType'
      }, {
        en: 'compoundCRSRef',
        ti: '.CompoundCRSRefType'
      }, {
        en: 'multiLocation',
        ti: '.MultiPointPropertyType'
      }, {
        en: 'DirectionVector',
        ti: '.DirectionVectorType'
      }, {
        en: 'version'
      }, {
        en: 'topoVolumeProperty',
        ti: '.TopoVolumePropertyType'
      }, {
        en: 'engineeringCRSRef',
        ti: '.EngineeringCRSRefType'
      }, {
        en: 'curveMember',
        ti: '.CurvePropertyType'
      }, {
        en: 'valueComponent',
        ti: '.ValuePropertyType'
      }, {
        en: 'CoordinateSystemAxis',
        ti: '.CoordinateSystemAxisType',
        sh: 'Definition'
      }, {
        en: 'anchorPoint',
        ti: '.CodeType'
      }, {
        en: 'TopoComplex',
        ti: '.TopoComplexType',
        sh: '_Topology'
      }, {
        en: 'GridFunction',
        ti: '.GridFunctionType'
      }, {
        en: 'baseCRS',
        ti: '.CoordinateReferenceSystemRefType'
      }, {
        en: 'Count',
        ti: 'Integer'
      }, {
        en: 'polarCSRef',
        ti: '.PolarCSRefType'
      }, {
        en: 'target',
        ti: '.TargetPropertyType'
      }, {
        en: 'graphStyle',
        ti: '.GraphStylePropertyType'
      }, {
        en: 'ellipsoidRef',
        ti: '.EllipsoidRefType'
      }, {
        en: 'valueList',
        ti: '.MeasureListType'
      }]
  };
  return {
    GML_3_1_1: GML_3_1_1
  };
};
if (typeof define === 'function' && define.amd) {
  define([], GML_3_1_1_Module_Factory);
}
else {
  var GML_3_1_1_Module = GML_3_1_1_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.GML_3_1_1 = GML_3_1_1_Module.GML_3_1_1;
  }
  else {
    var GML_3_1_1 = GML_3_1_1_Module.GML_3_1_1;
  }
}
},{}],7:[function(require,module,exports){
var OWS_1_0_0_Module_Factory = function () {
  var OWS_1_0_0 = {
    n: 'OWS_1_0_0',
    dens: 'http:\/\/www.opengis.net\/ows',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    deps: ['XLink_1_0'],
    tis: [{
        ln: 'ResponsiblePartyType',
        ps: [{
            n: 'individualName',
            en: 'IndividualName'
          }, {
            n: 'organisationName',
            en: 'OrganisationName'
          }, {
            n: 'positionName',
            en: 'PositionName'
          }, {
            n: 'contactInfo',
            en: 'ContactInfo',
            ti: '.ContactType'
          }, {
            n: 'role',
            rq: true,
            en: 'Role',
            ti: '.CodeType'
          }]
      }, {
        ln: 'ServiceProvider',
        tn: null,
        ps: [{
            n: 'providerName',
            rq: true,
            en: 'ProviderName'
          }, {
            n: 'providerSite',
            en: 'ProviderSite',
            ti: '.OnlineResourceType'
          }, {
            n: 'serviceContact',
            rq: true,
            en: 'ServiceContact',
            ti: '.ResponsiblePartySubsetType'
          }]
      }, {
        ln: 'WGS84BoundingBoxType',
        bti: '.BoundingBoxType'
      }, {
        ln: 'Operation',
        tn: null,
        ps: [{
            n: 'dcp',
            rq: true,
            col: true,
            en: 'DCP',
            ti: '.DCP'
          }, {
            n: 'parameter',
            mno: 0,
            col: true,
            en: 'Parameter',
            ti: '.DomainType'
          }, {
            n: 'constraint',
            mno: 0,
            col: true,
            en: 'Constraint',
            ti: '.DomainType'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: 'Metadata',
            ti: '.MetadataType'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'AcceptVersionsType',
        ps: [{
            n: 'version',
            rq: true,
            col: true,
            en: 'Version'
          }]
      }, {
        ln: 'OperationsMetadata',
        tn: null,
        ps: [{
            n: 'operation',
            rq: true,
            mno: 2,
            col: true,
            en: 'Operation',
            ti: '.Operation'
          }, {
            n: 'parameter',
            mno: 0,
            col: true,
            en: 'Parameter',
            ti: '.DomainType'
          }, {
            n: 'constraint',
            mno: 0,
            col: true,
            en: 'Constraint',
            ti: '.DomainType'
          }, {
            n: 'extendedCapabilities',
            en: 'ExtendedCapabilities',
            ti: 'AnyType'
          }]
      }, {
        ln: 'SectionsType',
        ps: [{
            n: 'section',
            mno: 0,
            col: true,
            en: 'Section'
          }]
      }, {
        ln: 'CapabilitiesBaseType',
        ps: [{
            n: 'serviceIdentification',
            en: 'ServiceIdentification',
            ti: '.ServiceIdentification'
          }, {
            n: 'serviceProvider',
            en: 'ServiceProvider',
            ti: '.ServiceProvider'
          }, {
            n: 'operationsMetadata',
            en: 'OperationsMetadata',
            ti: '.OperationsMetadata'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'updateSequence',
            an: {
              lp: 'updateSequence'
            },
            t: 'a'
          }]
      }, {
        ln: 'GetCapabilitiesType',
        ps: [{
            n: 'acceptVersions',
            en: 'AcceptVersions',
            ti: '.AcceptVersionsType'
          }, {
            n: 'sections',
            en: 'Sections',
            ti: '.SectionsType'
          }, {
            n: 'acceptFormats',
            en: 'AcceptFormats',
            ti: '.AcceptFormatsType'
          }, {
            n: 'updateSequence',
            an: {
              lp: 'updateSequence'
            },
            t: 'a'
          }]
      }, {
        ln: 'DomainType',
        ps: [{
            n: 'value',
            rq: true,
            col: true,
            en: 'Value'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: 'Metadata',
            ti: '.MetadataType'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'RequestMethodType',
        bti: '.OnlineResourceType',
        ps: [{
            n: 'constraint',
            mno: 0,
            col: true,
            en: 'Constraint',
            ti: '.DomainType'
          }]
      }, {
        ln: 'IdentificationType',
        bti: '.DescriptionType',
        ps: [{
            n: 'identifier',
            en: 'Identifier',
            ti: '.CodeType'
          }, {
            n: 'boundingBox',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'BoundingBox',
            ti: '.BoundingBoxType',
            t: 'er'
          }, {
            n: 'outputFormat',
            mno: 0,
            col: true,
            en: 'OutputFormat'
          }, {
            n: 'availableCRS',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'AvailableCRS',
            t: 'er'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: 'Metadata',
            ti: '.MetadataType'
          }]
      }, {
        ln: 'MetadataType',
        ps: [{
            n: 'abstractMetaData',
            en: 'AbstractMetaData',
            ti: 'AnyType'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'AcceptFormatsType',
        ps: [{
            n: 'outputFormat',
            mno: 0,
            col: true,
            en: 'OutputFormat'
          }]
      }, {
        ln: 'CodeType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'codeSpace',
            an: {
              lp: 'codeSpace'
            },
            t: 'a'
          }]
      }, {
        ln: 'AddressType',
        ps: [{
            n: 'deliveryPoint',
            mno: 0,
            col: true,
            en: 'DeliveryPoint'
          }, {
            n: 'city',
            en: 'City'
          }, {
            n: 'administrativeArea',
            en: 'AdministrativeArea'
          }, {
            n: 'postalCode',
            en: 'PostalCode'
          }, {
            n: 'country',
            en: 'Country'
          }, {
            n: 'electronicMailAddress',
            mno: 0,
            col: true,
            en: 'ElectronicMailAddress'
          }]
      }, {
        ln: 'BoundingBoxType',
        ps: [{
            n: 'lowerCorner',
            rq: true,
            en: 'LowerCorner',
            ti: {
              t: 'l',
              bti: 'Double'
            }
          }, {
            n: 'upperCorner',
            rq: true,
            en: 'UpperCorner',
            ti: {
              t: 'l',
              bti: 'Double'
            }
          }, {
            n: 'crs',
            an: {
              lp: 'crs'
            },
            t: 'a'
          }, {
            n: 'dimensions',
            ti: 'PositiveInteger',
            an: {
              lp: 'dimensions'
            },
            t: 'a'
          }]
      }, {
        ln: 'KeywordsType',
        ps: [{
            n: 'keyword',
            rq: true,
            col: true,
            en: 'Keyword'
          }, {
            n: 'type',
            en: 'Type',
            ti: '.CodeType'
          }]
      }, {
        ln: 'DescriptionType',
        ps: [{
            n: 'title',
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'keywords',
            mno: 0,
            col: true,
            en: 'Keywords',
            ti: '.KeywordsType'
          }]
      }, {
        ln: 'ContactType',
        ps: [{
            n: 'phone',
            en: 'Phone',
            ti: '.TelephoneType'
          }, {
            n: 'address',
            en: 'Address',
            ti: '.AddressType'
          }, {
            n: 'onlineResource',
            en: 'OnlineResource',
            ti: '.OnlineResourceType'
          }, {
            n: 'hoursOfService',
            en: 'HoursOfService'
          }, {
            n: 'contactInstructions',
            en: 'ContactInstructions'
          }]
      }, {
        ln: 'ExceptionReport',
        tn: null,
        ps: [{
            n: 'exception',
            rq: true,
            col: true,
            en: 'Exception',
            ti: '.ExceptionType'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'language',
            ti: 'Language',
            an: {
              lp: 'language'
            },
            t: 'a'
          }]
      }, {
        ln: 'ResponsiblePartySubsetType',
        ps: [{
            n: 'individualName',
            en: 'IndividualName'
          }, {
            n: 'positionName',
            en: 'PositionName'
          }, {
            n: 'contactInfo',
            en: 'ContactInfo',
            ti: '.ContactType'
          }, {
            n: 'role',
            en: 'Role',
            ti: '.CodeType'
          }]
      }, {
        ln: 'DCP',
        tn: null,
        ps: [{
            n: 'http',
            rq: true,
            en: 'HTTP',
            ti: '.HTTP'
          }]
      }, {
        ln: 'HTTP',
        tn: null,
        ps: [{
            n: 'getOrPost',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'Post',
                ti: '.RequestMethodType'
              }, {
                en: 'Get',
                ti: '.RequestMethodType'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'TelephoneType',
        ps: [{
            n: 'voice',
            mno: 0,
            col: true,
            en: 'Voice'
          }, {
            n: 'facsimile',
            mno: 0,
            col: true,
            en: 'Facsimile'
          }]
      }, {
        ln: 'ServiceIdentification',
        tn: null,
        bti: '.DescriptionType',
        ps: [{
            n: 'serviceType',
            rq: true,
            en: 'ServiceType',
            ti: '.CodeType'
          }, {
            n: 'serviceTypeVersion',
            rq: true,
            col: true,
            en: 'ServiceTypeVersion'
          }, {
            n: 'fees',
            en: 'Fees'
          }, {
            n: 'accessConstraints',
            mno: 0,
            col: true,
            en: 'AccessConstraints'
          }]
      }, {
        ln: 'ExceptionType',
        ps: [{
            n: 'exceptionText',
            mno: 0,
            col: true,
            en: 'ExceptionText'
          }, {
            n: 'exceptionCode',
            rq: true,
            an: {
              lp: 'exceptionCode'
            },
            t: 'a'
          }, {
            n: 'locator',
            an: {
              lp: 'locator'
            },
            t: 'a'
          }]
      }, {
        ln: 'OnlineResourceType',
        ps: [{
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }],
    eis: [{
        en: 'GetCapabilities',
        ti: '.GetCapabilitiesType'
      }, {
        en: 'ServiceProvider',
        ti: '.ServiceProvider'
      }, {
        en: 'PointOfContact',
        ti: '.ResponsiblePartyType'
      }, {
        en: 'ContactInfo',
        ti: '.ContactType'
      }, {
        en: 'OrganisationName'
      }, {
        en: 'HTTP',
        ti: '.HTTP'
      }, {
        en: 'Title'
      }, {
        en: 'Language',
        ti: 'Language'
      }, {
        en: 'DCP',
        ti: '.DCP'
      }, {
        en: 'AvailableCRS'
      }, {
        en: 'AbstractMetaData',
        ti: 'AnyType'
      }, {
        en: 'PositionName'
      }, {
        en: 'SupportedCRS',
        sh: 'AvailableCRS'
      }, {
        en: 'AccessConstraints'
      }, {
        en: 'OperationsMetadata',
        ti: '.OperationsMetadata'
      }, {
        en: 'ExtendedCapabilities',
        ti: 'AnyType'
      }, {
        en: 'Operation',
        ti: '.Operation'
      }, {
        en: 'Fees'
      }, {
        en: 'IndividualName'
      }, {
        en: 'Role',
        ti: '.CodeType'
      }, {
        en: 'Abstract'
      }, {
        en: 'Identifier',
        ti: '.CodeType'
      }, {
        en: 'OutputFormat'
      }, {
        en: 'WGS84BoundingBox',
        ti: '.WGS84BoundingBoxType',
        sh: 'BoundingBox'
      }, {
        en: 'Metadata',
        ti: '.MetadataType'
      }, {
        en: 'Post',
        ti: '.RequestMethodType',
        sc: '.HTTP'
      }, {
        en: 'ServiceIdentification',
        ti: '.ServiceIdentification'
      }, {
        en: 'ExceptionReport',
        ti: '.ExceptionReport'
      }, {
        en: 'BoundingBox',
        ti: '.BoundingBoxType'
      }, {
        en: 'Keywords',
        ti: '.KeywordsType'
      }, {
        en: 'Exception',
        ti: '.ExceptionType'
      }, {
        en: 'Get',
        ti: '.RequestMethodType',
        sc: '.HTTP'
      }]
  };
  return {
    OWS_1_0_0: OWS_1_0_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], OWS_1_0_0_Module_Factory);
}
else {
  var OWS_1_0_0_Module = OWS_1_0_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.OWS_1_0_0 = OWS_1_0_0_Module.OWS_1_0_0;
  }
  else {
    var OWS_1_0_0 = OWS_1_0_0_Module.OWS_1_0_0;
  }
}
},{}],8:[function(require,module,exports){
var OWS_1_1_0_Module_Factory = function () {
  var OWS_1_1_0 = {
    n: 'OWS_1_1_0',
    dens: 'http:\/\/www.opengis.net\/ows\/1.1',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    deps: ['XLink_1_0'],
    tis: [{
        ln: 'ReferenceGroupType',
        bti: '.BasicIdentificationType',
        ps: [{
            n: 'abstractReferenceBase',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            en: 'AbstractReferenceBase',
            ti: '.AbstractReferenceBaseType',
            t: 'er'
          }]
      }, {
        ln: 'GetCapabilitiesType',
        ps: [{
            n: 'acceptVersions',
            en: 'AcceptVersions',
            ti: '.AcceptVersionsType'
          }, {
            n: 'sections',
            en: 'Sections',
            ti: '.SectionsType'
          }, {
            n: 'acceptFormats',
            en: 'AcceptFormats',
            ti: '.AcceptFormatsType'
          }, {
            n: 'updateSequence',
            an: {
              lp: 'updateSequence'
            },
            t: 'a'
          }]
      }, {
        ln: 'GetResourceByIdType',
        ps: [{
            n: 'resourceID',
            mno: 0,
            col: true,
            en: 'ResourceID'
          }, {
            n: 'outputFormat',
            en: 'OutputFormat'
          }, {
            n: 'service',
            rq: true,
            an: {
              lp: 'service'
            },
            t: 'a'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }]
      }, {
        ln: 'ValuesReference',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'reference',
            rq: true,
            an: {
              lp: 'reference',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            t: 'a'
          }]
      }, {
        ln: 'MetadataType',
        ps: [{
            n: 'abstractMetaData',
            en: 'AbstractMetaData',
            ti: 'AnyType'
          }, {
            n: 'about',
            an: {
              lp: 'about'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'DescriptionType',
        ps: [{
            n: 'title',
            mno: 0,
            col: true,
            en: 'Title',
            ti: '.LanguageStringType'
          }, {
            n: '_abstract',
            mno: 0,
            col: true,
            en: 'Abstract',
            ti: '.LanguageStringType'
          }, {
            n: 'keywords',
            mno: 0,
            col: true,
            en: 'Keywords',
            ti: '.KeywordsType'
          }]
      }, {
        ln: 'ServiceReferenceType',
        bti: '.ReferenceType',
        ps: [{
            n: 'requestMessage',
            rq: true,
            en: 'RequestMessage',
            ti: 'AnyType'
          }, {
            n: 'requestMessageReference',
            rq: true,
            en: 'RequestMessageReference'
          }]
      }, {
        ln: 'LanguageStringType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'HTTP',
        tn: null,
        ps: [{
            n: 'getOrPost',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'Get',
                ti: '.RequestMethodType'
              }, {
                en: 'Post',
                ti: '.RequestMethodType'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'AllowedValues',
        tn: null,
        ps: [{
            n: 'valueOrRange',
            rq: true,
            col: true,
            etis: [{
                en: 'Value',
                ti: '.ValueType'
              }, {
                en: 'Range',
                ti: '.RangeType'
              }],
            t: 'es'
          }]
      }, {
        ln: 'KeywordsType',
        ps: [{
            n: 'keyword',
            rq: true,
            col: true,
            en: 'Keyword',
            ti: '.LanguageStringType'
          }, {
            n: 'type',
            en: 'Type',
            ti: '.CodeType'
          }]
      }, {
        ln: 'UnNamedDomainType',
        ps: [{
            n: 'allowedValues',
            rq: true,
            en: 'AllowedValues',
            ti: '.AllowedValues'
          }, {
            n: 'anyValue',
            rq: true,
            en: 'AnyValue',
            ti: '.AnyValue'
          }, {
            n: 'noValues',
            rq: true,
            en: 'NoValues',
            ti: '.NoValues'
          }, {
            n: 'valuesReference',
            rq: true,
            en: 'ValuesReference',
            ti: '.ValuesReference'
          }, {
            n: 'defaultValue',
            en: 'DefaultValue',
            ti: '.ValueType'
          }, {
            n: 'meaning',
            en: 'Meaning',
            ti: '.DomainMetadataType'
          }, {
            n: 'dataType',
            en: 'DataType',
            ti: '.DomainMetadataType'
          }, {
            n: 'uom',
            rq: true,
            en: 'UOM',
            ti: '.DomainMetadataType'
          }, {
            n: 'referenceSystem',
            rq: true,
            en: 'ReferenceSystem',
            ti: '.DomainMetadataType'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: 'Metadata',
            ti: '.MetadataType'
          }]
      }, {
        ln: 'TelephoneType',
        ps: [{
            n: 'voice',
            mno: 0,
            col: true,
            en: 'Voice'
          }, {
            n: 'facsimile',
            mno: 0,
            col: true,
            en: 'Facsimile'
          }]
      }, {
        ln: 'ResponsiblePartyType',
        ps: [{
            n: 'individualName',
            en: 'IndividualName'
          }, {
            n: 'organisationName',
            en: 'OrganisationName'
          }, {
            n: 'positionName',
            en: 'PositionName'
          }, {
            n: 'contactInfo',
            en: 'ContactInfo',
            ti: '.ContactType'
          }, {
            n: 'role',
            rq: true,
            en: 'Role',
            ti: '.CodeType'
          }]
      }, {
        ln: 'ResponsiblePartySubsetType',
        ps: [{
            n: 'individualName',
            en: 'IndividualName'
          }, {
            n: 'positionName',
            en: 'PositionName'
          }, {
            n: 'contactInfo',
            en: 'ContactInfo',
            ti: '.ContactType'
          }, {
            n: 'role',
            en: 'Role',
            ti: '.CodeType'
          }]
      }, {
        ln: 'AddressType',
        ps: [{
            n: 'deliveryPoint',
            mno: 0,
            col: true,
            en: 'DeliveryPoint'
          }, {
            n: 'city',
            en: 'City'
          }, {
            n: 'administrativeArea',
            en: 'AdministrativeArea'
          }, {
            n: 'postalCode',
            en: 'PostalCode'
          }, {
            n: 'country',
            en: 'Country'
          }, {
            n: 'electronicMailAddress',
            mno: 0,
            col: true,
            en: 'ElectronicMailAddress'
          }]
      }, {
        ln: 'ValueType',
        ps: [{
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'ExceptionType',
        ps: [{
            n: 'exceptionText',
            mno: 0,
            col: true,
            en: 'ExceptionText'
          }, {
            n: 'exceptionCode',
            rq: true,
            an: {
              lp: 'exceptionCode'
            },
            t: 'a'
          }, {
            n: 'locator',
            an: {
              lp: 'locator'
            },
            t: 'a'
          }]
      }, {
        ln: 'NoValues',
        tn: null
      }, {
        ln: 'WGS84BoundingBoxType',
        bti: '.BoundingBoxType'
      }, {
        ln: 'ServiceIdentification',
        tn: null,
        bti: '.DescriptionType',
        ps: [{
            n: 'serviceType',
            rq: true,
            en: 'ServiceType',
            ti: '.CodeType'
          }, {
            n: 'serviceTypeVersion',
            rq: true,
            col: true,
            en: 'ServiceTypeVersion'
          }, {
            n: 'profile',
            mno: 0,
            col: true,
            en: 'Profile'
          }, {
            n: 'fees',
            en: 'Fees'
          }, {
            n: 'accessConstraints',
            mno: 0,
            col: true,
            en: 'AccessConstraints'
          }]
      }, {
        ln: 'AcceptVersionsType',
        ps: [{
            n: 'version',
            rq: true,
            col: true,
            en: 'Version'
          }]
      }, {
        ln: 'SectionsType',
        ps: [{
            n: 'section',
            mno: 0,
            col: true,
            en: 'Section'
          }]
      }, {
        ln: 'ContactType',
        ps: [{
            n: 'phone',
            en: 'Phone',
            ti: '.TelephoneType'
          }, {
            n: 'address',
            en: 'Address',
            ti: '.AddressType'
          }, {
            n: 'onlineResource',
            en: 'OnlineResource',
            ti: '.OnlineResourceType'
          }, {
            n: 'hoursOfService',
            en: 'HoursOfService'
          }, {
            n: 'contactInstructions',
            en: 'ContactInstructions'
          }]
      }, {
        ln: 'RangeType',
        ps: [{
            n: 'minimumValue',
            en: 'MinimumValue',
            ti: '.ValueType'
          }, {
            n: 'maximumValue',
            en: 'MaximumValue',
            ti: '.ValueType'
          }, {
            n: 'spacing',
            en: 'Spacing',
            ti: '.ValueType'
          }, {
            n: 'rangeClosure',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'rangeClosure',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            t: 'a'
          }]
      }, {
        ln: 'ExceptionReport',
        tn: null,
        ps: [{
            n: 'exception',
            rq: true,
            col: true,
            en: 'Exception',
            ti: '.ExceptionType'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'DatasetDescriptionSummaryBaseType',
        bti: '.DescriptionType',
        ps: [{
            n: 'wgs84BoundingBox',
            mno: 0,
            col: true,
            en: 'WGS84BoundingBox',
            ti: '.WGS84BoundingBoxType'
          }, {
            n: 'identifier',
            rq: true,
            en: 'Identifier',
            ti: '.CodeType'
          }, {
            n: 'boundingBox',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'BoundingBox',
            ti: '.BoundingBoxType',
            t: 'er'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: 'Metadata',
            ti: '.MetadataType'
          }, {
            n: 'datasetDescriptionSummary',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'DatasetDescriptionSummary',
            ti: '.DatasetDescriptionSummaryBaseType',
            t: 'er'
          }]
      }, {
        ln: 'OperationsMetadata',
        tn: null,
        ps: [{
            n: 'operation',
            rq: true,
            mno: 2,
            col: true,
            en: 'Operation',
            ti: '.Operation'
          }, {
            n: 'parameter',
            mno: 0,
            col: true,
            en: 'Parameter',
            ti: '.DomainType'
          }, {
            n: 'constraint',
            mno: 0,
            col: true,
            en: 'Constraint',
            ti: '.DomainType'
          }, {
            n: 'extendedCapabilities',
            en: 'ExtendedCapabilities',
            ti: 'AnyType'
          }]
      }, {
        ln: 'IdentificationType',
        bti: '.BasicIdentificationType',
        ps: [{
            n: 'boundingBox',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'BoundingBox',
            ti: '.BoundingBoxType',
            t: 'er'
          }, {
            n: 'outputFormat',
            mno: 0,
            col: true,
            en: 'OutputFormat'
          }, {
            n: 'availableCRS',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'AvailableCRS',
            t: 'er'
          }]
      }, {
        ln: 'CodeType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'codeSpace',
            an: {
              lp: 'codeSpace'
            },
            t: 'a'
          }]
      }, {
        ln: 'ManifestType',
        bti: '.BasicIdentificationType',
        ps: [{
            n: 'referenceGroup',
            rq: true,
            col: true,
            en: 'ReferenceGroup',
            ti: '.ReferenceGroupType'
          }]
      }, {
        ln: 'Operation',
        tn: null,
        ps: [{
            n: 'dcp',
            rq: true,
            col: true,
            en: 'DCP',
            ti: '.DCP'
          }, {
            n: 'parameter',
            mno: 0,
            col: true,
            en: 'Parameter',
            ti: '.DomainType'
          }, {
            n: 'constraint',
            mno: 0,
            col: true,
            en: 'Constraint',
            ti: '.DomainType'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: 'Metadata',
            ti: '.MetadataType'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'ContentsBaseType',
        ps: [{
            n: 'datasetDescriptionSummary',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'DatasetDescriptionSummary',
            ti: '.DatasetDescriptionSummaryBaseType',
            t: 'er'
          }, {
            n: 'otherSource',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: 'OtherSource',
            ti: '.MetadataType',
            t: 'er'
          }]
      }, {
        ln: 'DomainType',
        bti: '.UnNamedDomainType',
        ps: [{
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'BasicIdentificationType',
        bti: '.DescriptionType',
        ps: [{
            n: 'identifier',
            en: 'Identifier',
            ti: '.CodeType'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: 'Metadata',
            ti: '.MetadataType'
          }]
      }, {
        ln: 'OnlineResourceType',
        ps: [{
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ServiceProvider',
        tn: null,
        ps: [{
            n: 'providerName',
            rq: true,
            en: 'ProviderName'
          }, {
            n: 'providerSite',
            en: 'ProviderSite',
            ti: '.OnlineResourceType'
          }, {
            n: 'serviceContact',
            rq: true,
            en: 'ServiceContact',
            ti: '.ResponsiblePartySubsetType'
          }]
      }, {
        ln: 'DomainMetadataType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'reference',
            an: {
              lp: 'reference',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            t: 'a'
          }]
      }, {
        ln: 'AcceptFormatsType',
        ps: [{
            n: 'outputFormat',
            mno: 0,
            col: true,
            en: 'OutputFormat'
          }]
      }, {
        ln: 'DCP',
        tn: null,
        ps: [{
            n: 'http',
            rq: true,
            en: 'HTTP',
            ti: '.HTTP'
          }]
      }, {
        ln: 'BoundingBoxType',
        ps: [{
            n: 'lowerCorner',
            rq: true,
            en: 'LowerCorner',
            ti: {
              t: 'l',
              bti: 'Double'
            }
          }, {
            n: 'upperCorner',
            rq: true,
            en: 'UpperCorner',
            ti: {
              t: 'l',
              bti: 'Double'
            }
          }, {
            n: 'crs',
            an: {
              lp: 'crs'
            },
            t: 'a'
          }, {
            n: 'dimensions',
            ti: 'PositiveInteger',
            an: {
              lp: 'dimensions'
            },
            t: 'a'
          }]
      }, {
        ln: 'ReferenceType',
        bti: '.AbstractReferenceBaseType',
        ps: [{
            n: 'identifier',
            en: 'Identifier',
            ti: '.CodeType'
          }, {
            n: '_abstract',
            mno: 0,
            col: true,
            en: 'Abstract',
            ti: '.LanguageStringType'
          }, {
            n: 'format',
            en: 'Format'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: 'Metadata',
            ti: '.MetadataType'
          }]
      }, {
        ln: 'AbstractReferenceBaseType',
        ps: [{
            n: 'type',
            an: {
              lp: 'type',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            t: 'a'
          }, {
            n: 'href',
            rq: true,
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CapabilitiesBaseType',
        ps: [{
            n: 'serviceIdentification',
            en: 'ServiceIdentification',
            ti: '.ServiceIdentification'
          }, {
            n: 'serviceProvider',
            en: 'ServiceProvider',
            ti: '.ServiceProvider'
          }, {
            n: 'operationsMetadata',
            en: 'OperationsMetadata',
            ti: '.OperationsMetadata'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'updateSequence',
            an: {
              lp: 'updateSequence'
            },
            t: 'a'
          }]
      }, {
        ln: 'RequestMethodType',
        bti: '.OnlineResourceType',
        ps: [{
            n: 'constraint',
            mno: 0,
            col: true,
            en: 'Constraint',
            ti: '.DomainType'
          }]
      }, {
        ln: 'AnyValue',
        tn: null
      }],
    eis: [{
        en: 'OtherSourceExtension',
        ti: '.MetadataType',
        sh: 'OtherSource'
      }, {
        en: 'Operation',
        ti: '.Operation'
      }, {
        en: 'Value',
        ti: '.ValueType'
      }, {
        en: 'ContactInfo',
        ti: '.ContactType'
      }, {
        en: 'DatasetDescriptionSummaryExtension',
        ti: '.DatasetDescriptionSummaryBaseType',
        sh: 'DatasetDescriptionSummary'
      }, {
        en: 'AnyValue',
        ti: '.AnyValue'
      }, {
        en: 'OrganisationName'
      }, {
        en: 'OtherSource',
        ti: '.MetadataType'
      }, {
        en: 'DefaultValue',
        ti: '.ValueType'
      }, {
        en: 'Spacing',
        ti: '.ValueType'
      }, {
        en: 'InputData',
        ti: '.ManifestType'
      }, {
        en: 'PointOfContact',
        ti: '.ResponsiblePartyType'
      }, {
        en: 'Meaning',
        ti: '.DomainMetadataType'
      }, {
        en: 'WGS84BoundingBox',
        ti: '.WGS84BoundingBoxType',
        sh: 'BoundingBox'
      }, {
        en: 'UOM',
        ti: '.DomainMetadataType'
      }, {
        en: 'Abstract',
        ti: '.LanguageStringType'
      }, {
        en: 'Fees'
      }, {
        en: 'ServiceReference',
        ti: '.ServiceReferenceType',
        sh: 'Reference'
      }, {
        en: 'AbstractReferenceBase',
        ti: '.AbstractReferenceBaseType'
      }, {
        en: 'Title',
        ti: '.LanguageStringType'
      }, {
        en: 'Resource',
        ti: 'AnyType'
      }, {
        en: 'AccessConstraints'
      }, {
        en: 'OperationsMetadata',
        ti: '.OperationsMetadata'
      }, {
        en: 'ExtendedCapabilities',
        ti: 'AnyType'
      }, {
        en: 'AbstractMetaData',
        ti: 'AnyType'
      }, {
        en: 'Metadata',
        ti: '.MetadataType'
      }, {
        en: 'NoValues',
        ti: '.NoValues'
      }, {
        en: 'ValuesReference',
        ti: '.ValuesReference'
      }, {
        en: 'ExceptionReport',
        ti: '.ExceptionReport'
      }, {
        en: 'Identifier',
        ti: '.CodeType'
      }, {
        en: 'SupportedCRS',
        sh: 'AvailableCRS'
      }, {
        en: 'ServiceIdentification',
        ti: '.ServiceIdentification'
      }, {
        en: 'AllowedValues',
        ti: '.AllowedValues'
      }, {
        en: 'IndividualName'
      }, {
        en: 'Language',
        ti: 'Language'
      }, {
        en: 'OperationResponse',
        ti: '.ManifestType'
      }, {
        en: 'HTTP',
        ti: '.HTTP'
      }, {
        en: 'GetResourceByID',
        ti: '.GetResourceByIdType'
      }, {
        en: 'Manifest',
        ti: '.ManifestType'
      }, {
        en: 'Role',
        ti: '.CodeType'
      }, {
        en: 'ReferenceGroup',
        ti: '.ReferenceGroupType'
      }, {
        en: 'DatasetDescriptionSummary',
        ti: '.DatasetDescriptionSummaryBaseType'
      }, {
        en: 'Get',
        ti: '.RequestMethodType',
        sc: '.HTTP'
      }, {
        en: 'DCP',
        ti: '.DCP'
      }, {
        en: 'OutputFormat'
      }, {
        en: 'DataType',
        ti: '.DomainMetadataType'
      }, {
        en: 'ReferenceSystem',
        ti: '.DomainMetadataType'
      }, {
        en: 'GetCapabilities',
        ti: '.GetCapabilitiesType'
      }, {
        en: 'ServiceProvider',
        ti: '.ServiceProvider'
      }, {
        en: 'Range',
        ti: '.RangeType'
      }, {
        en: 'PositionName'
      }, {
        en: 'Exception',
        ti: '.ExceptionType'
      }, {
        en: 'Post',
        ti: '.RequestMethodType',
        sc: '.HTTP'
      }, {
        en: 'Keywords',
        ti: '.KeywordsType'
      }, {
        en: 'MinimumValue',
        ti: '.ValueType'
      }, {
        en: 'AvailableCRS'
      }, {
        en: 'MaximumValue',
        ti: '.ValueType'
      }, {
        en: 'Reference',
        ti: '.ReferenceType',
        sh: 'AbstractReferenceBase'
      }, {
        en: 'BoundingBox',
        ti: '.BoundingBoxType'
      }]
  };
  return {
    OWS_1_1_0: OWS_1_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], OWS_1_1_0_Module_Factory);
}
else {
  var OWS_1_1_0_Module = OWS_1_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.OWS_1_1_0 = OWS_1_1_0_Module.OWS_1_1_0;
  }
  else {
    var OWS_1_1_0 = OWS_1_1_0_Module.OWS_1_1_0;
  }
}
},{}],9:[function(require,module,exports){
var SLD_1_0_0_Module_Factory = function () {
  var SLD_1_0_0 = {
    n: 'SLD_1_0_0',
    dens: 'http:\/\/www.opengis.net\/sld',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    deps: ['XLink_1_0', 'Filter_1_0_0'],
    tis: [{
        ln: 'RasterSymbolizer',
        tn: null,
        bti: '.SymbolizerType',
        ps: [{
            n: 'geometry',
            en: 'Geometry',
            ti: '.Geometry'
          }, {
            n: 'opacity',
            en: 'Opacity',
            ti: '.ParameterValueType'
          }, {
            n: 'channelSelection',
            en: 'ChannelSelection',
            ti: '.ChannelSelection'
          }, {
            n: 'overlapBehavior',
            en: 'OverlapBehavior',
            ti: '.OverlapBehavior'
          }, {
            n: 'colorMap',
            en: 'ColorMap',
            ti: '.ColorMap'
          }, {
            n: 'contrastEnhancement',
            en: 'ContrastEnhancement',
            ti: '.ContrastEnhancement'
          }, {
            n: 'shadedRelief',
            en: 'ShadedRelief',
            ti: '.ShadedRelief'
          }, {
            n: 'imageOutline',
            en: 'ImageOutline',
            ti: '.ImageOutline'
          }]
      }, {
        ln: 'LayerFeatureConstraints',
        tn: null,
        ps: [{
            n: 'featureTypeConstraint',
            rq: true,
            col: true,
            en: 'FeatureTypeConstraint',
            ti: '.FeatureTypeConstraint'
          }]
      }, {
        ln: 'FeatureTypeStyle',
        tn: null,
        ps: [{
            n: 'name',
            en: 'Name'
          }, {
            n: 'title',
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'featureTypeName',
            en: 'FeatureTypeName'
          }, {
            n: 'semanticTypeIdentifier',
            mno: 0,
            col: true,
            en: 'SemanticTypeIdentifier'
          }, {
            n: 'rule',
            rq: true,
            col: true,
            en: 'Rule',
            ti: '.Rule'
          }]
      }, {
        ln: 'LabelPlacement',
        tn: null,
        ps: [{
            n: 'pointPlacement',
            rq: true,
            en: 'PointPlacement',
            ti: '.PointPlacement'
          }, {
            n: 'linePlacement',
            rq: true,
            en: 'LinePlacement',
            ti: '.LinePlacement'
          }]
      }, {
        ln: 'LegendGraphic',
        tn: null,
        ps: [{
            n: 'graphic',
            rq: true,
            en: 'Graphic',
            ti: '.Graphic'
          }]
      }, {
        ln: 'EARLIESTONTOP',
        tn: null
      }, {
        ln: 'LATESTONTOP',
        tn: null
      }, {
        ln: 'GraphicFill',
        tn: null,
        ps: [{
            n: 'graphic',
            rq: true,
            en: 'Graphic',
            ti: '.Graphic'
          }]
      }, {
        ln: 'Histogram',
        tn: null
      }, {
        ln: 'OverlapBehavior',
        tn: null,
        ps: [{
            n: 'latestontop',
            rq: true,
            en: 'LATEST_ON_TOP',
            ti: '.LATESTONTOP'
          }, {
            n: 'earliestontop',
            rq: true,
            en: 'EARLIEST_ON_TOP',
            ti: '.EARLIESTONTOP'
          }, {
            n: 'average',
            rq: true,
            en: 'AVERAGE',
            ti: '.AVERAGE'
          }, {
            n: 'random',
            rq: true,
            en: 'RANDOM',
            ti: '.RANDOM'
          }]
      }, {
        ln: 'Geometry',
        tn: null,
        ps: [{
            n: 'propertyName',
            rq: true,
            en: {
              lp: 'PropertyName',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_0_0.PropertyNameType'
          }]
      }, {
        ln: 'CssParameter',
        tn: null,
        bti: '.ParameterValueType',
        ps: [{
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'NamedStyle',
        tn: null,
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name'
          }]
      }, {
        ln: 'PointPlacement',
        tn: null,
        ps: [{
            n: 'anchorPoint',
            en: 'AnchorPoint',
            ti: '.AnchorPoint'
          }, {
            n: 'displacement',
            en: 'Displacement',
            ti: '.Displacement'
          }, {
            n: 'rotation',
            en: 'Rotation',
            ti: '.ParameterValueType'
          }]
      }, {
        ln: 'UserStyle',
        tn: null,
        ps: [{
            n: 'name',
            en: 'Name'
          }, {
            n: 'title',
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'isDefault',
            en: 'IsDefault',
            ti: 'Boolean'
          }, {
            n: 'featureTypeStyle',
            rq: true,
            col: true,
            en: 'FeatureTypeStyle',
            ti: '.FeatureTypeStyle'
          }]
      }, {
        ln: 'ExternalGraphic',
        tn: null,
        ps: [{
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'format',
            rq: true,
            en: 'Format'
          }]
      }, {
        ln: 'ParameterValueType',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            en: {
              lp: 'expression',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_0_0.ExpressionType',
            t: 'er'
          }]
      }, {
        ln: 'ElseFilter',
        tn: null
      }, {
        ln: 'Halo',
        tn: null,
        ps: [{
            n: 'radius',
            en: 'Radius',
            ti: '.ParameterValueType'
          }, {
            n: 'fill',
            en: 'Fill',
            ti: '.Fill'
          }]
      }, {
        ln: 'TextSymbolizer',
        tn: null,
        bti: '.SymbolizerType',
        ps: [{
            n: 'geometry',
            en: 'Geometry',
            ti: '.Geometry'
          }, {
            n: 'label',
            en: 'Label',
            ti: '.ParameterValueType'
          }, {
            n: 'font',
            en: 'Font',
            ti: '.Font'
          }, {
            n: 'labelPlacement',
            en: 'LabelPlacement',
            ti: '.LabelPlacement'
          }, {
            n: 'halo',
            en: 'Halo',
            ti: '.Halo'
          }, {
            n: 'fill',
            en: 'Fill',
            ti: '.Fill'
          }]
      }, {
        ln: 'Extent',
        tn: null,
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name'
          }, {
            n: 'value',
            rq: true,
            en: 'Value'
          }]
      }, {
        ln: 'StyledLayerDescriptor',
        tn: null,
        ps: [{
            n: 'name',
            en: 'Name'
          }, {
            n: 'title',
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'namedLayerOrUserLayer',
            mno: 0,
            col: true,
            etis: [{
                en: 'NamedLayer',
                ti: '.NamedLayer'
              }, {
                en: 'UserLayer',
                ti: '.UserLayer'
              }],
            t: 'es'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }]
      }, {
        ln: 'RemoteOWS',
        tn: null,
        ps: [{
            n: 'service',
            rq: true,
            en: 'Service'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'ImageOutline',
        tn: null,
        ps: [{
            n: 'lineSymbolizer',
            rq: true,
            en: 'LineSymbolizer',
            ti: '.LineSymbolizer'
          }, {
            n: 'polygonSymbolizer',
            rq: true,
            en: 'PolygonSymbolizer',
            ti: '.PolygonSymbolizer'
          }]
      }, {
        ln: 'LineSymbolizer',
        tn: null,
        bti: '.SymbolizerType',
        ps: [{
            n: 'geometry',
            en: 'Geometry',
            ti: '.Geometry'
          }, {
            n: 'stroke',
            en: 'Stroke',
            ti: '.Stroke'
          }]
      }, {
        ln: 'FeatureTypeConstraint',
        tn: null,
        ps: [{
            n: 'featureTypeName',
            en: 'FeatureTypeName'
          }, {
            n: 'filter',
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_0_0.FilterType'
          }, {
            n: 'extent',
            mno: 0,
            col: true,
            en: 'Extent',
            ti: '.Extent'
          }]
      }, {
        ln: 'Graphic',
        tn: null,
        ps: [{
            n: 'externalGraphicOrMark',
            mno: 0,
            col: true,
            etis: [{
                en: 'ExternalGraphic',
                ti: '.ExternalGraphic'
              }, {
                en: 'Mark',
                ti: '.Mark'
              }],
            t: 'es'
          }, {
            n: 'opacity',
            en: 'Opacity',
            ti: '.ParameterValueType'
          }, {
            n: 'size',
            en: 'Size',
            ti: '.ParameterValueType'
          }, {
            n: 'rotation',
            en: 'Rotation',
            ti: '.ParameterValueType'
          }]
      }, {
        ln: 'AVERAGE',
        tn: null
      }, {
        ln: 'ShadedRelief',
        tn: null,
        ps: [{
            n: 'brightnessOnly',
            en: 'BrightnessOnly',
            ti: 'Boolean'
          }, {
            n: 'reliefFactor',
            en: 'ReliefFactor',
            ti: 'Double'
          }]
      }, {
        ln: 'RANDOM',
        tn: null
      }, {
        ln: 'PointSymbolizer',
        tn: null,
        bti: '.SymbolizerType',
        ps: [{
            n: 'geometry',
            en: 'Geometry',
            ti: '.Geometry'
          }, {
            n: 'graphic',
            en: 'Graphic',
            ti: '.Graphic'
          }]
      }, {
        ln: 'ChannelSelection',
        tn: null,
        ps: [{
            n: 'redChannel',
            rq: true,
            en: 'RedChannel',
            ti: '.SelectedChannelType'
          }, {
            n: 'greenChannel',
            rq: true,
            en: 'GreenChannel',
            ti: '.SelectedChannelType'
          }, {
            n: 'blueChannel',
            rq: true,
            en: 'BlueChannel',
            ti: '.SelectedChannelType'
          }, {
            n: 'grayChannel',
            rq: true,
            en: 'GrayChannel',
            ti: '.SelectedChannelType'
          }]
      }, {
        ln: 'Rule',
        tn: null,
        ps: [{
            n: 'name',
            en: 'Name'
          }, {
            n: 'title',
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'legendGraphic',
            en: 'LegendGraphic',
            ti: '.LegendGraphic'
          }, {
            n: 'filter',
            rq: true,
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_0_0.FilterType'
          }, {
            n: 'elseFilter',
            rq: true,
            en: 'ElseFilter',
            ti: '.ElseFilter'
          }, {
            n: 'minScaleDenominator',
            en: 'MinScaleDenominator',
            ti: 'Double'
          }, {
            n: 'maxScaleDenominator',
            en: 'MaxScaleDenominator',
            ti: 'Double'
          }, {
            n: 'symbolizer',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            en: 'Symbolizer',
            ti: '.SymbolizerType',
            t: 'er'
          }]
      }, {
        ln: 'UserLayer',
        tn: null,
        ps: [{
            n: 'name',
            en: 'Name'
          }, {
            n: 'remoteOWS',
            en: 'RemoteOWS',
            ti: '.RemoteOWS'
          }, {
            n: 'layerFeatureConstraints',
            rq: true,
            en: 'LayerFeatureConstraints',
            ti: '.LayerFeatureConstraints'
          }, {
            n: 'userStyle',
            rq: true,
            col: true,
            en: 'UserStyle',
            ti: '.UserStyle'
          }]
      }, {
        ln: 'AnchorPoint',
        tn: null,
        ps: [{
            n: 'anchorPointX',
            rq: true,
            en: 'AnchorPointX',
            ti: '.ParameterValueType'
          }, {
            n: 'anchorPointY',
            rq: true,
            en: 'AnchorPointY',
            ti: '.ParameterValueType'
          }]
      }, {
        ln: 'Stroke',
        tn: null,
        ps: [{
            n: 'graphicFill',
            rq: true,
            en: 'GraphicFill',
            ti: '.GraphicFill'
          }, {
            n: 'graphicStroke',
            rq: true,
            en: 'GraphicStroke',
            ti: '.GraphicStroke'
          }, {
            n: 'cssParameter',
            mno: 0,
            col: true,
            en: 'CssParameter',
            ti: '.CssParameter'
          }]
      }, {
        ln: 'ContrastEnhancement',
        tn: null,
        ps: [{
            n: 'normalize',
            rq: true,
            en: 'Normalize',
            ti: '.Normalize'
          }, {
            n: 'histogram',
            rq: true,
            en: 'Histogram',
            ti: '.Histogram'
          }, {
            n: 'gammaValue',
            en: 'GammaValue',
            ti: 'Double'
          }]
      }, {
        ln: 'SymbolizerType'
      }, {
        ln: 'Fill',
        tn: null,
        ps: [{
            n: 'graphicFill',
            en: 'GraphicFill',
            ti: '.GraphicFill'
          }, {
            n: 'cssParameter',
            mno: 0,
            col: true,
            en: 'CssParameter',
            ti: '.CssParameter'
          }]
      }, {
        ln: 'NamedLayer',
        tn: null,
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name'
          }, {
            n: 'layerFeatureConstraints',
            en: 'LayerFeatureConstraints',
            ti: '.LayerFeatureConstraints'
          }, {
            n: 'namedStyleOrUserStyle',
            mno: 0,
            col: true,
            etis: [{
                en: 'NamedStyle',
                ti: '.NamedStyle'
              }, {
                en: 'UserStyle',
                ti: '.UserStyle'
              }],
            t: 'es'
          }]
      }, {
        ln: 'PolygonSymbolizer',
        tn: null,
        bti: '.SymbolizerType',
        ps: [{
            n: 'geometry',
            en: 'Geometry',
            ti: '.Geometry'
          }, {
            n: 'fill',
            en: 'Fill',
            ti: '.Fill'
          }, {
            n: 'stroke',
            en: 'Stroke',
            ti: '.Stroke'
          }]
      }, {
        ln: 'Displacement',
        tn: null,
        ps: [{
            n: 'displacementX',
            rq: true,
            en: 'DisplacementX',
            ti: '.ParameterValueType'
          }, {
            n: 'displacementY',
            rq: true,
            en: 'DisplacementY',
            ti: '.ParameterValueType'
          }]
      }, {
        ln: 'Font',
        tn: null,
        ps: [{
            n: 'cssParameter',
            mno: 0,
            col: true,
            en: 'CssParameter',
            ti: '.CssParameter'
          }]
      }, {
        ln: 'Normalize',
        tn: null
      }, {
        ln: 'ColorMapEntry',
        tn: null,
        ps: [{
            n: 'color',
            rq: true,
            an: {
              lp: 'color'
            },
            t: 'a'
          }, {
            n: 'opacity',
            ti: 'Double',
            an: {
              lp: 'opacity'
            },
            t: 'a'
          }, {
            n: 'quantity',
            ti: 'Double',
            an: {
              lp: 'quantity'
            },
            t: 'a'
          }, {
            n: 'label',
            an: {
              lp: 'label'
            },
            t: 'a'
          }]
      }, {
        ln: 'OnlineResource',
        tn: null,
        ps: [{
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'GraphicStroke',
        tn: null,
        ps: [{
            n: 'graphic',
            rq: true,
            en: 'Graphic',
            ti: '.Graphic'
          }]
      }, {
        ln: 'SelectedChannelType',
        ps: [{
            n: 'sourceChannelName',
            rq: true,
            en: 'SourceChannelName'
          }, {
            n: 'contrastEnhancement',
            en: 'ContrastEnhancement',
            ti: '.ContrastEnhancement'
          }]
      }, {
        ln: 'ColorMap',
        tn: null,
        ps: [{
            n: 'colorMapEntry',
            mno: 0,
            col: true,
            en: 'ColorMapEntry',
            ti: '.ColorMapEntry'
          }]
      }, {
        ln: 'Mark',
        tn: null,
        ps: [{
            n: 'wellKnownName',
            en: 'WellKnownName'
          }, {
            n: 'fill',
            en: 'Fill',
            ti: '.Fill'
          }, {
            n: 'stroke',
            en: 'Stroke',
            ti: '.Stroke'
          }]
      }, {
        ln: 'LinePlacement',
        tn: null,
        ps: [{
            n: 'perpendicularOffset',
            en: 'PerpendicularOffset',
            ti: '.ParameterValueType'
          }]
      }],
    eis: [{
        en: 'Format'
      }, {
        en: 'Radius',
        ti: '.ParameterValueType'
      }, {
        en: 'GrayChannel',
        ti: '.SelectedChannelType'
      }, {
        en: 'Mark',
        ti: '.Mark'
      }, {
        en: 'ColorMapEntry',
        ti: '.ColorMapEntry'
      }, {
        en: 'LATEST_ON_TOP',
        ti: '.LATESTONTOP'
      }, {
        en: 'RANDOM',
        ti: '.RANDOM'
      }, {
        en: 'TextSymbolizer',
        ti: '.TextSymbolizer',
        sh: 'Symbolizer'
      }, {
        en: 'RedChannel',
        ti: '.SelectedChannelType'
      }, {
        en: 'LineSymbolizer',
        ti: '.LineSymbolizer',
        sh: 'Symbolizer'
      }, {
        en: 'ReliefFactor',
        ti: 'Double'
      }, {
        en: 'EARLIEST_ON_TOP',
        ti: '.EARLIESTONTOP'
      }, {
        en: 'Graphic',
        ti: '.Graphic'
      }, {
        en: 'UserLayer',
        ti: '.UserLayer'
      }, {
        en: 'PolygonSymbolizer',
        ti: '.PolygonSymbolizer',
        sh: 'Symbolizer'
      }, {
        en: 'Value'
      }, {
        en: 'WellKnownName'
      }, {
        en: 'LayerFeatureConstraints',
        ti: '.LayerFeatureConstraints'
      }, {
        en: 'Halo',
        ti: '.Halo'
      }, {
        en: 'PointSymbolizer',
        ti: '.PointSymbolizer',
        sh: 'Symbolizer'
      }, {
        en: 'Label',
        ti: '.ParameterValueType'
      }, {
        en: 'LinePlacement',
        ti: '.LinePlacement'
      }, {
        en: 'ContrastEnhancement',
        ti: '.ContrastEnhancement'
      }, {
        en: 'Opacity',
        ti: '.ParameterValueType'
      }, {
        en: 'GraphicStroke',
        ti: '.GraphicStroke'
      }, {
        en: 'Geometry',
        ti: '.Geometry'
      }, {
        en: 'GraphicFill',
        ti: '.GraphicFill'
      }, {
        en: 'ColorMap',
        ti: '.ColorMap'
      }, {
        en: 'Normalize',
        ti: '.Normalize'
      }, {
        en: 'RemoteOWS',
        ti: '.RemoteOWS'
      }, {
        en: 'DisplacementY',
        ti: '.ParameterValueType'
      }, {
        en: 'Histogram',
        ti: '.Histogram'
      }, {
        en: 'FeatureTypeStyle',
        ti: '.FeatureTypeStyle'
      }, {
        en: 'ExternalGraphic',
        ti: '.ExternalGraphic'
      }, {
        en: 'LabelPlacement',
        ti: '.LabelPlacement'
      }, {
        en: 'FeatureTypeConstraint',
        ti: '.FeatureTypeConstraint'
      }, {
        en: 'NamedLayer',
        ti: '.NamedLayer'
      }, {
        en: 'ElseFilter',
        ti: '.ElseFilter'
      }, {
        en: 'Displacement',
        ti: '.Displacement'
      }, {
        en: 'Title'
      }, {
        en: 'SemanticTypeIdentifier'
      }, {
        en: 'MaxScaleDenominator',
        ti: 'Double'
      }, {
        en: 'OnlineResource',
        ti: '.OnlineResource'
      }, {
        en: 'AVERAGE',
        ti: '.AVERAGE'
      }, {
        en: 'Font',
        ti: '.Font'
      }, {
        en: 'MinScaleDenominator',
        ti: 'Double'
      }, {
        en: 'RasterSymbolizer',
        ti: '.RasterSymbolizer',
        sh: 'Symbolizer'
      }, {
        en: 'AnchorPointY',
        ti: '.ParameterValueType'
      }, {
        en: 'DisplacementX',
        ti: '.ParameterValueType'
      }, {
        en: 'BlueChannel',
        ti: '.SelectedChannelType'
      }, {
        en: 'GammaValue',
        ti: 'Double'
      }, {
        en: 'ImageOutline',
        ti: '.ImageOutline'
      }, {
        en: 'GreenChannel',
        ti: '.SelectedChannelType'
      }, {
        en: 'UserStyle',
        ti: '.UserStyle'
      }, {
        en: 'CssParameter',
        ti: '.CssParameter'
      }, {
        en: 'ShadedRelief',
        ti: '.ShadedRelief'
      }, {
        en: 'Abstract'
      }, {
        en: 'PointPlacement',
        ti: '.PointPlacement'
      }, {
        en: 'Rule',
        ti: '.Rule'
      }, {
        en: 'FeatureTypeName'
      }, {
        en: 'AnchorPoint',
        ti: '.AnchorPoint'
      }, {
        en: 'IsDefault',
        ti: 'Boolean'
      }, {
        en: 'AnchorPointX',
        ti: '.ParameterValueType'
      }, {
        en: 'PerpendicularOffset',
        ti: '.ParameterValueType'
      }, {
        en: 'SourceChannelName'
      }, {
        en: 'Extent',
        ti: '.Extent'
      }, {
        en: 'Name'
      }, {
        en: 'Stroke',
        ti: '.Stroke'
      }, {
        en: 'Symbolizer',
        ti: '.SymbolizerType'
      }, {
        en: 'NamedStyle',
        ti: '.NamedStyle'
      }, {
        en: 'LegendGraphic',
        ti: '.LegendGraphic'
      }, {
        en: 'Fill',
        ti: '.Fill'
      }, {
        en: 'Size',
        ti: '.ParameterValueType'
      }, {
        en: 'Service'
      }, {
        en: 'OverlapBehavior',
        ti: '.OverlapBehavior'
      }, {
        en: 'ChannelSelection',
        ti: '.ChannelSelection'
      }, {
        en: 'BrightnessOnly',
        ti: 'Boolean'
      }, {
        en: 'Rotation',
        ti: '.ParameterValueType'
      }, {
        en: 'StyledLayerDescriptor',
        ti: '.StyledLayerDescriptor'
      }]
  };
  return {
    SLD_1_0_0: SLD_1_0_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], SLD_1_0_0_Module_Factory);
}
else {
  var SLD_1_0_0_Module = SLD_1_0_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.SLD_1_0_0 = SLD_1_0_0_Module.SLD_1_0_0;
  }
  else {
    var SLD_1_0_0 = SLD_1_0_0_Module.SLD_1_0_0;
  }
}
},{}],10:[function(require,module,exports){
var SMIL_2_0_Module_Factory = function () {
  var SMIL_2_0 = {
    n: 'SMIL_2_0',
    dens: 'http:\/\/www.w3.org\/2001\/SMIL20\/',
    deps: ['SMIL_2_0_Language'],
    tis: [{
        ln: 'AnimateMotionPrototype',
        tn: 'animateMotionPrototype',
        ps: [{
            n: 'origin',
            an: {
              lp: 'origin'
            },
            t: 'a'
          }, {
            n: 'from',
            an: {
              lp: 'from'
            },
            t: 'a'
          }, {
            n: 'by',
            an: {
              lp: 'by'
            },
            t: 'a'
          }, {
            n: 'values',
            an: {
              lp: 'values'
            },
            t: 'a'
          }, {
            n: 'to',
            an: {
              lp: 'to'
            },
            t: 'a'
          }, {
            n: 'additive',
            an: {
              lp: 'additive'
            },
            t: 'a'
          }, {
            n: 'accumulate',
            an: {
              lp: 'accumulate'
            },
            t: 'a'
          }]
      }, {
        ln: 'SetPrototype',
        tn: 'setPrototype',
        ps: [{
            n: 'to',
            an: {
              lp: 'to'
            },
            t: 'a'
          }, {
            n: 'attributeName',
            rq: true,
            an: {
              lp: 'attributeName'
            },
            t: 'a'
          }, {
            n: 'attributeType',
            an: {
              lp: 'attributeType'
            },
            t: 'a'
          }]
      }, {
        ln: 'AnimateColorPrototype',
        tn: 'animateColorPrototype',
        ps: [{
            n: 'additive',
            an: {
              lp: 'additive'
            },
            t: 'a'
          }, {
            n: 'accumulate',
            an: {
              lp: 'accumulate'
            },
            t: 'a'
          }, {
            n: 'attributeName',
            rq: true,
            an: {
              lp: 'attributeName'
            },
            t: 'a'
          }, {
            n: 'attributeType',
            an: {
              lp: 'attributeType'
            },
            t: 'a'
          }, {
            n: 'from',
            an: {
              lp: 'from'
            },
            t: 'a'
          }, {
            n: 'by',
            an: {
              lp: 'by'
            },
            t: 'a'
          }, {
            n: 'values',
            an: {
              lp: 'values'
            },
            t: 'a'
          }, {
            n: 'to',
            an: {
              lp: 'to'
            },
            t: 'a'
          }]
      }, {
        ln: 'AnimatePrototype',
        tn: 'animatePrototype',
        ps: [{
            n: 'from',
            an: {
              lp: 'from'
            },
            t: 'a'
          }, {
            n: 'by',
            an: {
              lp: 'by'
            },
            t: 'a'
          }, {
            n: 'values',
            an: {
              lp: 'values'
            },
            t: 'a'
          }, {
            n: 'to',
            an: {
              lp: 'to'
            },
            t: 'a'
          }, {
            n: 'attributeName',
            rq: true,
            an: {
              lp: 'attributeName'
            },
            t: 'a'
          }, {
            n: 'attributeType',
            an: {
              lp: 'attributeType'
            },
            t: 'a'
          }, {
            n: 'additive',
            an: {
              lp: 'additive'
            },
            t: 'a'
          }, {
            n: 'accumulate',
            an: {
              lp: 'accumulate'
            },
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'SyncBehaviorDefaultType',
        vs: ['canSlip', 'locked', 'independent', 'inherit']
      }, {
        t: 'enum',
        ln: 'FillDefaultType',
        vs: ['remove', 'freeze', 'hold', 'auto', 'inherit', 'transition']
      }, {
        t: 'enum',
        ln: 'SyncBehaviorType',
        vs: ['canSlip', 'locked', 'independent', 'default']
      }, {
        t: 'enum',
        ln: 'RestartTimingType',
        vs: ['never', 'always', 'whenNotActive', 'default']
      }, {
        t: 'enum',
        ln: 'FillTimingAttrsType',
        vs: ['remove', 'freeze', 'hold', 'auto', 'default', 'transition']
      }, {
        t: 'enum',
        ln: 'RestartDefaultType',
        vs: ['never', 'always', 'whenNotActive', 'inherit']
      }],
    eis: [{
        en: 'animate',
        ti: 'SMIL_2_0_Language.AnimateType',
        sh: {
          lp: 'animate',
          ns: 'http:\/\/www.w3.org\/2001\/SMIL20\/Language'
        }
      }, {
        en: 'animateColor',
        ti: 'SMIL_2_0_Language.AnimateColorType',
        sh: {
          lp: 'animateColor',
          ns: 'http:\/\/www.w3.org\/2001\/SMIL20\/Language'
        }
      }, {
        en: 'animateMotion',
        ti: 'SMIL_2_0_Language.AnimateMotionType',
        sh: {
          lp: 'animateMotion',
          ns: 'http:\/\/www.w3.org\/2001\/SMIL20\/Language'
        }
      }, {
        en: 'set',
        ti: 'SMIL_2_0_Language.SetType',
        sh: {
          lp: 'set',
          ns: 'http:\/\/www.w3.org\/2001\/SMIL20\/Language'
        }
      }]
  };
  return {
    SMIL_2_0: SMIL_2_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], SMIL_2_0_Module_Factory);
}
else {
  var SMIL_2_0_Module = SMIL_2_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.SMIL_2_0 = SMIL_2_0_Module.SMIL_2_0;
  }
  else {
    var SMIL_2_0 = SMIL_2_0_Module.SMIL_2_0;
  }
}
},{}],11:[function(require,module,exports){
var SMIL_2_0_Language_Module_Factory = function () {
  var SMIL_2_0_Language = {
    n: 'SMIL_2_0_Language',
    dens: 'http:\/\/www.w3.org\/2001\/SMIL20\/Language',
    deps: ['SMIL_2_0'],
    tis: [{
        ln: 'SetType',
        tn: 'setType',
        bti: 'SMIL_2_0.SetPrototype',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'any',
            mno: 0,
            col: true,
            mx: false,
            t: 'ae'
          }, {
            n: 'alt',
            an: {
              lp: 'alt'
            },
            t: 'a'
          }, {
            n: 'longdesc',
            an: {
              lp: 'longdesc'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'targetElement',
            ti: 'IDREF',
            an: {
              lp: 'targetElement'
            },
            t: 'a'
          }, {
            n: 'restartDefault',
            an: {
              lp: 'restartDefault'
            },
            t: 'a'
          }, {
            n: 'restart',
            an: {
              lp: 'restart'
            },
            t: 'a'
          }, {
            n: 'repeat',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'repeat'
            },
            t: 'a'
          }, {
            n: 'min',
            an: {
              lp: 'min'
            },
            t: 'a'
          }, {
            n: 'max',
            an: {
              lp: 'max'
            },
            t: 'a'
          }, {
            n: 'dur',
            an: {
              lp: 'dur'
            },
            t: 'a'
          }, {
            n: 'begin',
            an: {
              lp: 'begin'
            },
            t: 'a'
          }, {
            n: 'end',
            an: {
              lp: 'end'
            },
            t: 'a'
          }, {
            n: 'repeatDur',
            an: {
              lp: 'repeatDur'
            },
            t: 'a'
          }, {
            n: 'repeatCount',
            ti: 'Decimal',
            an: {
              lp: 'repeatCount'
            },
            t: 'a'
          }, {
            n: 'syncBehaviorDefault',
            an: {
              lp: 'syncBehaviorDefault'
            },
            t: 'a'
          }, {
            n: 'syncToleranceDefault',
            an: {
              lp: 'syncToleranceDefault'
            },
            t: 'a'
          }, {
            n: 'syncBehavior',
            an: {
              lp: 'syncBehavior'
            },
            t: 'a'
          }, {
            n: 'syncTolerance',
            an: {
              lp: 'syncTolerance'
            },
            t: 'a'
          }, {
            n: 'fill',
            an: {
              lp: 'fill'
            },
            t: 'a'
          }, {
            n: 'fillDefault',
            an: {
              lp: 'fillDefault'
            },
            t: 'a'
          }, {
            n: 'skipContent',
            ti: 'Boolean',
            an: {
              lp: 'skip-content'
            },
            t: 'a'
          }]
      }, {
        ln: 'AnimateType',
        tn: 'animateType',
        bti: 'SMIL_2_0.AnimatePrototype',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'any',
            mno: 0,
            col: true,
            mx: false,
            t: 'ae'
          }, {
            n: 'alt',
            an: {
              lp: 'alt'
            },
            t: 'a'
          }, {
            n: 'longdesc',
            an: {
              lp: 'longdesc'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'skipContent',
            ti: 'Boolean',
            an: {
              lp: 'skip-content'
            },
            t: 'a'
          }, {
            n: 'targetElement',
            ti: 'IDREF',
            an: {
              lp: 'targetElement'
            },
            t: 'a'
          }, {
            n: 'restartDefault',
            an: {
              lp: 'restartDefault'
            },
            t: 'a'
          }, {
            n: 'restart',
            an: {
              lp: 'restart'
            },
            t: 'a'
          }, {
            n: 'repeat',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'repeat'
            },
            t: 'a'
          }, {
            n: 'min',
            an: {
              lp: 'min'
            },
            t: 'a'
          }, {
            n: 'max',
            an: {
              lp: 'max'
            },
            t: 'a'
          }, {
            n: 'dur',
            an: {
              lp: 'dur'
            },
            t: 'a'
          }, {
            n: 'begin',
            an: {
              lp: 'begin'
            },
            t: 'a'
          }, {
            n: 'end',
            an: {
              lp: 'end'
            },
            t: 'a'
          }, {
            n: 'repeatDur',
            an: {
              lp: 'repeatDur'
            },
            t: 'a'
          }, {
            n: 'repeatCount',
            ti: 'Decimal',
            an: {
              lp: 'repeatCount'
            },
            t: 'a'
          }, {
            n: 'syncBehaviorDefault',
            an: {
              lp: 'syncBehaviorDefault'
            },
            t: 'a'
          }, {
            n: 'syncToleranceDefault',
            an: {
              lp: 'syncToleranceDefault'
            },
            t: 'a'
          }, {
            n: 'syncBehavior',
            an: {
              lp: 'syncBehavior'
            },
            t: 'a'
          }, {
            n: 'syncTolerance',
            an: {
              lp: 'syncTolerance'
            },
            t: 'a'
          }, {
            n: 'fill',
            an: {
              lp: 'fill'
            },
            t: 'a'
          }, {
            n: 'fillDefault',
            an: {
              lp: 'fillDefault'
            },
            t: 'a'
          }, {
            n: 'calcMode',
            an: {
              lp: 'calcMode'
            },
            t: 'a'
          }]
      }, {
        ln: 'AnimateColorType',
        tn: 'animateColorType',
        bti: 'SMIL_2_0.AnimateColorPrototype',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'any',
            mno: 0,
            col: true,
            mx: false,
            t: 'ae'
          }, {
            n: 'restartDefault',
            an: {
              lp: 'restartDefault'
            },
            t: 'a'
          }, {
            n: 'restart',
            an: {
              lp: 'restart'
            },
            t: 'a'
          }, {
            n: 'repeat',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'repeat'
            },
            t: 'a'
          }, {
            n: 'min',
            an: {
              lp: 'min'
            },
            t: 'a'
          }, {
            n: 'max',
            an: {
              lp: 'max'
            },
            t: 'a'
          }, {
            n: 'dur',
            an: {
              lp: 'dur'
            },
            t: 'a'
          }, {
            n: 'begin',
            an: {
              lp: 'begin'
            },
            t: 'a'
          }, {
            n: 'end',
            an: {
              lp: 'end'
            },
            t: 'a'
          }, {
            n: 'repeatDur',
            an: {
              lp: 'repeatDur'
            },
            t: 'a'
          }, {
            n: 'repeatCount',
            ti: 'Decimal',
            an: {
              lp: 'repeatCount'
            },
            t: 'a'
          }, {
            n: 'syncBehaviorDefault',
            an: {
              lp: 'syncBehaviorDefault'
            },
            t: 'a'
          }, {
            n: 'syncToleranceDefault',
            an: {
              lp: 'syncToleranceDefault'
            },
            t: 'a'
          }, {
            n: 'syncBehavior',
            an: {
              lp: 'syncBehavior'
            },
            t: 'a'
          }, {
            n: 'syncTolerance',
            an: {
              lp: 'syncTolerance'
            },
            t: 'a'
          }, {
            n: 'fill',
            an: {
              lp: 'fill'
            },
            t: 'a'
          }, {
            n: 'fillDefault',
            an: {
              lp: 'fillDefault'
            },
            t: 'a'
          }, {
            n: 'calcMode',
            an: {
              lp: 'calcMode'
            },
            t: 'a'
          }, {
            n: 'alt',
            an: {
              lp: 'alt'
            },
            t: 'a'
          }, {
            n: 'longdesc',
            an: {
              lp: 'longdesc'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'targetElement',
            ti: 'IDREF',
            an: {
              lp: 'targetElement'
            },
            t: 'a'
          }, {
            n: 'skipContent',
            ti: 'Boolean',
            an: {
              lp: 'skip-content'
            },
            t: 'a'
          }]
      }, {
        ln: 'AnimateMotionType',
        tn: 'animateMotionType',
        bti: 'SMIL_2_0.AnimateMotionPrototype',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'any',
            mno: 0,
            col: true,
            mx: false,
            t: 'ae'
          }, {
            n: 'alt',
            an: {
              lp: 'alt'
            },
            t: 'a'
          }, {
            n: 'longdesc',
            an: {
              lp: 'longdesc'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'targetElement',
            ti: 'IDREF',
            an: {
              lp: 'targetElement'
            },
            t: 'a'
          }, {
            n: 'calcMode',
            an: {
              lp: 'calcMode'
            },
            t: 'a'
          }, {
            n: 'restartDefault',
            an: {
              lp: 'restartDefault'
            },
            t: 'a'
          }, {
            n: 'restart',
            an: {
              lp: 'restart'
            },
            t: 'a'
          }, {
            n: 'repeat',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'repeat'
            },
            t: 'a'
          }, {
            n: 'min',
            an: {
              lp: 'min'
            },
            t: 'a'
          }, {
            n: 'max',
            an: {
              lp: 'max'
            },
            t: 'a'
          }, {
            n: 'dur',
            an: {
              lp: 'dur'
            },
            t: 'a'
          }, {
            n: 'begin',
            an: {
              lp: 'begin'
            },
            t: 'a'
          }, {
            n: 'end',
            an: {
              lp: 'end'
            },
            t: 'a'
          }, {
            n: 'repeatDur',
            an: {
              lp: 'repeatDur'
            },
            t: 'a'
          }, {
            n: 'repeatCount',
            ti: 'Decimal',
            an: {
              lp: 'repeatCount'
            },
            t: 'a'
          }, {
            n: 'syncBehaviorDefault',
            an: {
              lp: 'syncBehaviorDefault'
            },
            t: 'a'
          }, {
            n: 'syncToleranceDefault',
            an: {
              lp: 'syncToleranceDefault'
            },
            t: 'a'
          }, {
            n: 'syncBehavior',
            an: {
              lp: 'syncBehavior'
            },
            t: 'a'
          }, {
            n: 'syncTolerance',
            an: {
              lp: 'syncTolerance'
            },
            t: 'a'
          }, {
            n: 'fill',
            an: {
              lp: 'fill'
            },
            t: 'a'
          }, {
            n: 'fillDefault',
            an: {
              lp: 'fillDefault'
            },
            t: 'a'
          }, {
            n: 'skipContent',
            ti: 'Boolean',
            an: {
              lp: 'skip-content'
            },
            t: 'a'
          }]
      }],
    eis: [{
        en: 'set',
        ti: '.SetType'
      }, {
        en: 'animate',
        ti: '.AnimateType'
      }, {
        en: 'animateMotion',
        ti: '.AnimateMotionType'
      }, {
        en: 'animateColor',
        ti: '.AnimateColorType'
      }]
  };
  return {
    SMIL_2_0_Language: SMIL_2_0_Language
  };
};
if (typeof define === 'function' && define.amd) {
  define([], SMIL_2_0_Language_Module_Factory);
}
else {
  var SMIL_2_0_Language_Module = SMIL_2_0_Language_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.SMIL_2_0_Language = SMIL_2_0_Language_Module.SMIL_2_0_Language;
  }
  else {
    var SMIL_2_0_Language = SMIL_2_0_Language_Module.SMIL_2_0_Language;
  }
}
},{}],12:[function(require,module,exports){
var WFS_1_1_0_Module_Factory = function () {
  var WFS_1_1_0 = {
    n: 'WFS_1_1_0',
    dens: 'http:\/\/www.opengis.net\/wfs',
    deps: ['Filter_1_1_0', 'OWS_1_0_0', 'GML_3_1_1'],
    tis: [{
        ln: 'InsertResultsType',
        ps: [{
            n: 'feature',
            rq: true,
            col: true,
            en: 'Feature',
            ti: '.InsertedFeatureType'
          }]
      }, {
        ln: 'TransactionResponseType',
        ps: [{
            n: 'transactionSummary',
            rq: true,
            en: 'TransactionSummary',
            ti: '.TransactionSummaryType'
          }, {
            n: 'transactionResults',
            en: 'TransactionResults',
            ti: '.TransactionResultsType'
          }, {
            n: 'insertResults',
            en: 'InsertResults',
            ti: '.InsertResultsType'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }]
      }, {
        ln: 'BaseRequestType',
        ps: [{
            n: 'service',
            an: {
              lp: 'service'
            },
            t: 'a'
          }, {
            n: 'version',
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }]
      }, {
        ln: 'XlinkPropertyName',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'traverseXlinkDepth',
            rq: true,
            an: {
              lp: 'traverseXlinkDepth'
            },
            t: 'a'
          }, {
            n: 'traverseXlinkExpiry',
            ti: 'PositiveInteger',
            an: {
              lp: 'traverseXlinkExpiry'
            },
            t: 'a'
          }]
      }, {
        ln: 'DescribeFeatureTypeType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'typeName',
            mno: 0,
            col: true,
            en: 'TypeName',
            ti: 'QName'
          }, {
            n: 'outputFormat',
            an: {
              lp: 'outputFormat'
            },
            t: 'a'
          }]
      }, {
        ln: 'ActionType',
        ps: [{
            n: 'message',
            en: 'Message'
          }, {
            n: 'locator',
            rq: true,
            an: {
              lp: 'locator'
            },
            t: 'a'
          }, {
            n: 'code',
            an: {
              lp: 'code'
            },
            t: 'a'
          }]
      }, {
        ln: 'LockFeatureType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'lock',
            rq: true,
            col: true,
            en: 'Lock',
            ti: '.LockType'
          }, {
            n: 'expiry',
            ti: 'PositiveInteger',
            an: {
              lp: 'expiry'
            },
            t: 'a'
          }, {
            n: 'lockAction',
            an: {
              lp: 'lockAction'
            },
            t: 'a'
          }]
      }, {
        ln: 'GetGmlObjectType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'gmlObjectId',
            rq: true,
            en: {
              lp: 'GmlObjectId',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.GmlObjectIdType'
          }, {
            n: 'outputFormat',
            an: {
              lp: 'outputFormat'
            },
            t: 'a'
          }, {
            n: 'traverseXlinkDepth',
            rq: true,
            an: {
              lp: 'traverseXlinkDepth'
            },
            t: 'a'
          }, {
            n: 'traverseXlinkExpiry',
            ti: 'PositiveInteger',
            an: {
              lp: 'traverseXlinkExpiry'
            },
            t: 'a'
          }]
      }, {
        ln: 'OutputFormatListType',
        ps: [{
            n: 'format',
            rq: true,
            col: true,
            en: 'Format'
          }]
      }, {
        ln: 'MetadataURLType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'type',
            rq: true,
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'format',
            rq: true,
            an: {
              lp: 'format'
            },
            t: 'a'
          }]
      }, {
        ln: 'DeleteElementType',
        ps: [{
            n: 'filter',
            rq: true,
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.FilterType'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }, {
            n: 'typeName',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'typeName'
            },
            t: 'a'
          }]
      }, {
        ln: 'GetFeatureWithLockType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'query',
            rq: true,
            col: true,
            en: 'Query',
            ti: '.QueryType'
          }, {
            n: 'expiry',
            ti: 'PositiveInteger',
            an: {
              lp: 'expiry'
            },
            t: 'a'
          }, {
            n: 'resultType',
            an: {
              lp: 'resultType'
            },
            t: 'a'
          }, {
            n: 'outputFormat',
            an: {
              lp: 'outputFormat'
            },
            t: 'a'
          }, {
            n: 'maxFeatures',
            ti: 'PositiveInteger',
            an: {
              lp: 'maxFeatures'
            },
            t: 'a'
          }, {
            n: 'traverseXlinkDepth',
            an: {
              lp: 'traverseXlinkDepth'
            },
            t: 'a'
          }, {
            n: 'traverseXlinkExpiry',
            ti: 'PositiveInteger',
            an: {
              lp: 'traverseXlinkExpiry'
            },
            t: 'a'
          }]
      }, {
        ln: 'GMLObjectTypeType',
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name',
            ti: 'QName'
          }, {
            n: 'title',
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'keywords',
            mno: 0,
            col: true,
            en: {
              lp: 'Keywords',
              ns: 'http:\/\/www.opengis.net\/ows'
            },
            ti: 'OWS_1_0_0.KeywordsType'
          }, {
            n: 'outputFormats',
            en: 'OutputFormats',
            ti: '.OutputFormatListType'
          }]
      }, {
        ln: 'FeatureTypeType.NoSRS',
        tn: null
      }, {
        ln: 'OperationsType',
        ps: [{
            n: 'operation',
            rq: true,
            col: true,
            en: 'Operation'
          }]
      }, {
        ln: 'GetFeatureType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'query',
            rq: true,
            col: true,
            en: 'Query',
            ti: '.QueryType'
          }, {
            n: 'resultType',
            an: {
              lp: 'resultType'
            },
            t: 'a'
          }, {
            n: 'outputFormat',
            an: {
              lp: 'outputFormat'
            },
            t: 'a'
          }, {
            n: 'maxFeatures',
            ti: 'PositiveInteger',
            an: {
              lp: 'maxFeatures'
            },
            t: 'a'
          }, {
            n: 'traverseXlinkDepth',
            an: {
              lp: 'traverseXlinkDepth'
            },
            t: 'a'
          }, {
            n: 'traverseXlinkExpiry',
            ti: 'PositiveInteger',
            an: {
              lp: 'traverseXlinkExpiry'
            },
            t: 'a'
          }]
      }, {
        ln: 'WFSCapabilitiesType',
        tn: 'WFS_CapabilitiesType',
        bti: 'OWS_1_0_0.CapabilitiesBaseType',
        ps: [{
            n: 'featureTypeList',
            en: 'FeatureTypeList',
            ti: '.FeatureTypeListType'
          }, {
            n: 'servesGMLObjectTypeList',
            en: 'ServesGMLObjectTypeList',
            ti: '.GMLObjectTypeListType'
          }, {
            n: 'supportsGMLObjectTypeList',
            en: 'SupportsGMLObjectTypeList',
            ti: '.GMLObjectTypeListType'
          }, {
            n: 'filterCapabilities',
            rq: true,
            en: {
              lp: 'Filter_Capabilities',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.FilterCapabilities'
          }]
      }, {
        ln: 'TransactionType',
        bti: '.BaseRequestType',
        ps: [{
            n: 'lockId',
            en: 'LockId'
          }, {
            n: 'insertOrUpdateOrDelete',
            mno: 0,
            col: true,
            etis: [{
                en: 'Insert',
                ti: '.InsertElementType'
              }, {
                en: 'Update',
                ti: '.UpdateElementType'
              }, {
                en: 'Delete',
                ti: '.DeleteElementType'
              }, {
                en: 'Native',
                ti: '.NativeType'
              }],
            t: 'es'
          }, {
            n: 'releaseAction',
            an: {
              lp: 'releaseAction'
            },
            t: 'a'
          }]
      }, {
        ln: 'LockFeatureResponseType',
        ps: [{
            n: 'lockId',
            rq: true,
            en: 'LockId'
          }, {
            n: 'featuresLocked',
            en: 'FeaturesLocked',
            ti: '.FeaturesLockedType'
          }, {
            n: 'featuresNotLocked',
            en: 'FeaturesNotLocked',
            ti: '.FeaturesNotLockedType'
          }]
      }, {
        ln: 'UpdateElementType',
        ps: [{
            n: 'property',
            rq: true,
            col: true,
            en: 'Property',
            ti: '.PropertyType'
          }, {
            n: 'filter',
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.FilterType'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }, {
            n: 'typeName',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'typeName'
            },
            t: 'a'
          }, {
            n: 'inputFormat',
            an: {
              lp: 'inputFormat'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        ln: 'FeatureTypeType',
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name',
            ti: 'QName'
          }, {
            n: 'title',
            rq: true,
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'keywords',
            mno: 0,
            col: true,
            en: {
              lp: 'Keywords',
              ns: 'http:\/\/www.opengis.net\/ows'
            },
            ti: 'OWS_1_0_0.KeywordsType'
          }, {
            n: 'defaultSRS',
            rq: true,
            en: 'DefaultSRS'
          }, {
            n: 'otherSRS',
            mno: 0,
            col: true,
            en: 'OtherSRS'
          }, {
            n: 'noSRS',
            rq: true,
            en: 'NoSRS',
            ti: '.FeatureTypeType.NoSRS'
          }, {
            n: 'operations',
            en: 'Operations',
            ti: '.OperationsType'
          }, {
            n: 'outputFormats',
            en: 'OutputFormats',
            ti: '.OutputFormatListType'
          }, {
            n: 'wgs84BoundingBox',
            mno: 0,
            col: true,
            en: {
              lp: 'WGS84BoundingBox',
              ns: 'http:\/\/www.opengis.net\/ows'
            },
            ti: 'OWS_1_0_0.WGS84BoundingBoxType'
          }, {
            n: 'metadataURL',
            mno: 0,
            col: true,
            en: 'MetadataURL',
            ti: '.MetadataURLType'
          }]
      }, {
        ln: 'FeaturesNotLockedType',
        ps: [{
            n: 'featureId',
            rq: true,
            col: true,
            en: {
              lp: 'FeatureId',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.FeatureIdType'
          }]
      }, {
        ln: 'TransactionSummaryType',
        ps: [{
            n: 'totalInserted',
            ti: 'NonNegativeInteger'
          }, {
            n: 'totalUpdated',
            ti: 'NonNegativeInteger'
          }, {
            n: 'totalDeleted',
            ti: 'NonNegativeInteger'
          }]
      }, {
        ln: 'NativeType',
        ps: [{
            n: 'vendorId',
            rq: true,
            an: {
              lp: 'vendorId'
            },
            t: 'a'
          }, {
            n: 'safeToIgnore',
            rq: true,
            ti: 'Boolean',
            an: {
              lp: 'safeToIgnore'
            },
            t: 'a'
          }]
      }, {
        ln: 'InsertElementType',
        ps: [{
            n: 'feature',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            en: {
              lp: '_Feature',
              ns: 'http:\/\/www.opengis.net\/gml'
            },
            ti: 'GML_3_1_1.AbstractFeatureType',
            t: 'er'
          }, {
            n: 'idgen',
            an: {
              lp: 'idgen'
            },
            t: 'a'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }, {
            n: 'inputFormat',
            an: {
              lp: 'inputFormat'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        ln: 'PropertyType',
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name',
            ti: 'QName'
          }, {
            n: 'value',
            en: 'Value',
            ti: 'AnyType'
          }]
      }, {
        ln: 'FeatureTypeListType',
        ps: [{
            n: 'operations',
            en: 'Operations',
            ti: '.OperationsType'
          }, {
            n: 'featureType',
            rq: true,
            col: true,
            en: 'FeatureType',
            ti: '.FeatureTypeType'
          }]
      }, {
        ln: 'InsertedFeatureType',
        ps: [{
            n: 'featureId',
            rq: true,
            col: true,
            en: {
              lp: 'FeatureId',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.FeatureIdType'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }]
      }, {
        ln: 'LockType',
        ps: [{
            n: 'filter',
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.FilterType'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }, {
            n: 'typeName',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'typeName'
            },
            t: 'a'
          }]
      }, {
        ln: 'GetCapabilitiesType',
        bti: 'OWS_1_0_0.GetCapabilitiesType',
        ps: [{
            n: 'service',
            an: {
              lp: 'service'
            },
            t: 'a'
          }]
      }, {
        ln: 'GMLObjectTypeListType',
        ps: [{
            n: 'gmlObjectType',
            rq: true,
            col: true,
            en: 'GMLObjectType',
            ti: '.GMLObjectTypeType'
          }]
      }, {
        ln: 'QueryType',
        ps: [{
            n: 'propertyNameOrXlinkPropertyNameOrFunction',
            mno: 0,
            col: true,
            etis: [{
                en: 'PropertyName'
              }, {
                en: 'XlinkPropertyName',
                ti: '.XlinkPropertyName'
              }, {
                en: {
                  lp: 'Function',
                  ns: 'http:\/\/www.opengis.net\/ogc'
                },
                ti: 'Filter_1_1_0.FunctionType'
              }],
            t: 'es'
          }, {
            n: 'filter',
            en: {
              lp: 'Filter',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.FilterType'
          }, {
            n: 'sortBy',
            en: {
              lp: 'SortBy',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.SortByType'
          }, {
            n: 'handle',
            an: {
              lp: 'handle'
            },
            t: 'a'
          }, {
            n: 'typeName',
            rq: true,
            ti: {
              t: 'l',
              bti: 'QName'
            },
            an: {
              lp: 'typeName'
            },
            t: 'a'
          }, {
            n: 'featureVersion',
            an: {
              lp: 'featureVersion'
            },
            t: 'a'
          }, {
            n: 'srsName',
            an: {
              lp: 'srsName'
            },
            t: 'a'
          }]
      }, {
        ln: 'FeaturesLockedType',
        ps: [{
            n: 'featureId',
            rq: true,
            col: true,
            en: {
              lp: 'FeatureId',
              ns: 'http:\/\/www.opengis.net\/ogc'
            },
            ti: 'Filter_1_1_0.FeatureIdType'
          }]
      }, {
        ln: 'TransactionResultsType',
        ps: [{
            n: 'action',
            mno: 0,
            col: true,
            en: 'Action',
            ti: '.ActionType'
          }]
      }, {
        ln: 'FeatureCollectionType',
        bti: 'GML_3_1_1.AbstractFeatureCollectionType',
        ps: [{
            n: 'lockId',
            an: {
              lp: 'lockId'
            },
            t: 'a'
          }, {
            n: 'timeStamp',
            ti: 'DateTime',
            an: {
              lp: 'timeStamp'
            },
            t: 'a'
          }, {
            n: 'numberOfFeatures',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'numberOfFeatures'
            },
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'OperationType',
        vs: ['Insert', 'Update', 'Delete', 'Query', 'Lock', 'GetGmlObject']
      }, {
        t: 'enum',
        ln: 'AllSomeType',
        vs: ['ALL', 'SOME']
      }, {
        t: 'enum',
        ln: 'IdentifierGenerationOptionType',
        vs: ['UseExisting', 'ReplaceDuplicate', 'GenerateNew']
      }, {
        t: 'enum',
        ln: 'ResultTypeType',
        vs: ['results', 'hits']
      }],
    eis: [{
        en: 'GetFeatureWithLock',
        ti: '.GetFeatureWithLockType'
      }, {
        en: 'Delete',
        ti: '.DeleteElementType'
      }, {
        en: 'SupportsGMLObjectTypeList',
        ti: '.GMLObjectTypeListType'
      }, {
        en: 'Query',
        ti: '.QueryType'
      }, {
        en: 'LockId'
      }, {
        en: 'Native',
        ti: '.NativeType'
      }, {
        en: 'GetGmlObject',
        ti: '.GetGmlObjectType'
      }, {
        en: 'XlinkPropertyName',
        ti: '.XlinkPropertyName'
      }, {
        en: 'WFS_Capabilities',
        ti: '.WFSCapabilitiesType'
      }, {
        en: 'Transaction',
        ti: '.TransactionType'
      }, {
        en: 'TransactionResponse',
        ti: '.TransactionResponseType'
      }, {
        en: 'Property',
        ti: '.PropertyType'
      }, {
        en: 'ServesGMLObjectTypeList',
        ti: '.GMLObjectTypeListType'
      }, {
        en: 'LockFeatureResponse',
        ti: '.LockFeatureResponseType'
      }, {
        en: 'Insert',
        ti: '.InsertElementType'
      }, {
        en: 'PropertyName'
      }, {
        en: 'LockFeature',
        ti: '.LockFeatureType'
      }, {
        en: 'FeatureTypeList',
        ti: '.FeatureTypeListType'
      }, {
        en: 'DescribeFeatureType',
        ti: '.DescribeFeatureTypeType'
      }, {
        en: 'GetFeature',
        ti: '.GetFeatureType'
      }, {
        en: 'Update',
        ti: '.UpdateElementType'
      }, {
        en: 'FeatureCollection',
        ti: '.FeatureCollectionType',
        sh: {
          lp: '_FeatureCollection',
          ns: 'http:\/\/www.opengis.net\/gml'
        }
      }, {
        en: 'GetCapabilities',
        ti: '.GetCapabilitiesType'
      }]
  };
  return {
    WFS_1_1_0: WFS_1_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WFS_1_1_0_Module_Factory);
}
else {
  var WFS_1_1_0_Module = WFS_1_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WFS_1_1_0 = WFS_1_1_0_Module.WFS_1_1_0;
  }
  else {
    var WFS_1_1_0 = WFS_1_1_0_Module.WFS_1_1_0;
  }
}
},{}],13:[function(require,module,exports){
var WMSC_1_1_1_Module_Factory = function () {
  var WMSC_1_1_1 = {
    n: 'WMSC_1_1_1',
    tis: [{
        ln: 'Identifier',
        tn: null,
        ps: [{
            n: 'authority',
            an: {
              lp: 'authority'
            },
            t: 'a'
          }, {
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'HTTP',
        tn: null,
        ps: [{
            n: 'getOrPost',
            col: true,
            etis: [{
                en: {
                  lp: 'Get'
                },
                ti: '.Get'
              }, {
                en: {
                  lp: 'Post'
                },
                ti: '.Post'
              }],
            t: 'es'
          }]
      }, {
        ln: 'Query',
        tn: null,
        ps: [{
            n: 'typeName',
            an: {
              lp: 'typeName'
            },
            t: 'a'
          }]
      }, {
        ln: 'LayerDescription',
        tn: null,
        ps: [{
            n: 'name',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'wfs',
            an: {
              lp: 'wfs'
            },
            t: 'a'
          }, {
            n: 'owsType',
            an: {
              lp: 'owsType'
            },
            t: 'a'
          }, {
            n: 'owsURL',
            an: {
              lp: 'owsURL'
            },
            t: 'a'
          }, {
            n: 'query',
            col: true,
            en: {
              lp: 'Query'
            },
            ti: '.Query'
          }]
      }, {
        ln: 'DCPType',
        tn: null,
        ps: [{
            n: 'http',
            en: {
              lp: 'HTTP'
            },
            ti: '.HTTP'
          }]
      }, {
        ln: 'UserDefinedSymbolization',
        tn: null,
        ps: [{
            n: 'supportSLD',
            an: {
              lp: 'SupportSLD'
            },
            t: 'a'
          }, {
            n: 'userLayer',
            an: {
              lp: 'UserLayer'
            },
            t: 'a'
          }, {
            n: 'userStyle',
            an: {
              lp: 'UserStyle'
            },
            t: 'a'
          }, {
            n: 'remoteWFS',
            an: {
              lp: 'RemoteWFS'
            },
            t: 'a'
          }]
      }, {
        ln: 'VendorSpecificCapabilities',
        tn: null,
        ps: [{
            n: 'tileSet',
            col: true,
            en: {
              lp: 'TileSet'
            },
            ti: '.TileSet'
          }]
      }, {
        ln: 'GetLegendGraphic',
        tn: null,
        ps: [{
            n: 'format',
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'dcpType',
            col: true,
            en: {
              lp: 'DCPType'
            },
            ti: '.DCPType'
          }]
      }, {
        ln: 'GetMap',
        tn: null,
        ps: [{
            n: 'format',
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'dcpType',
            col: true,
            en: {
              lp: 'DCPType'
            },
            ti: '.DCPType'
          }]
      }, {
        ln: 'GetCapabilities',
        tn: null,
        ps: [{
            n: 'format',
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'dcpType',
            col: true,
            en: {
              lp: 'DCPType'
            },
            ti: '.DCPType'
          }]
      }, {
        ln: 'OnlineResource',
        tn: null,
        ps: [{
            n: 'xmlnsXlink',
            an: {
              lp: 'xmlns:xlink'
            },
            t: 'a'
          }, {
            n: 'xlinkType',
            an: {
              lp: 'xlink:type'
            },
            t: 'a'
          }, {
            n: 'xlinkHref',
            an: {
              lp: 'xlink:href'
            },
            t: 'a'
          }]
      }, {
        ln: 'ContactPersonPrimary',
        tn: null,
        ps: [{
            n: 'contactPerson',
            en: {
              lp: 'ContactPerson'
            }
          }, {
            n: 'contactOrganization',
            en: {
              lp: 'ContactOrganization'
            }
          }]
      }, {
        ln: 'DataURL',
        tn: null,
        ps: [{
            n: 'format',
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'ScaleHint',
        tn: null,
        ps: [{
            n: 'min',
            an: {
              lp: 'min'
            },
            t: 'a'
          }, {
            n: 'max',
            an: {
              lp: 'max'
            },
            t: 'a'
          }]
      }, {
        ln: 'LogoURL',
        tn: null,
        ps: [{
            n: 'width',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'height',
            an: {
              lp: 'height'
            },
            t: 'a'
          }, {
            n: 'format',
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Capability',
        tn: null,
        ps: [{
            n: 'request',
            en: {
              lp: 'Request'
            },
            ti: '.Request'
          }, {
            n: 'exception',
            en: {
              lp: 'Exception'
            },
            ti: '.Exception'
          }, {
            n: 'vendorSpecificCapabilities',
            en: {
              lp: 'VendorSpecificCapabilities'
            },
            ti: '.VendorSpecificCapabilities'
          }, {
            n: 'userDefinedSymbolization',
            en: {
              lp: 'UserDefinedSymbolization'
            },
            ti: '.UserDefinedSymbolization'
          }, {
            n: 'layer',
            en: {
              lp: 'Layer'
            },
            ti: '.Layer'
          }]
      }, {
        ln: 'PutStyles',
        tn: null,
        ps: [{
            n: 'format',
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'dcpType',
            col: true,
            en: {
              lp: 'DCPType'
            },
            ti: '.DCPType'
          }]
      }, {
        ln: 'Get',
        tn: null,
        ps: [{
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'BoundingBox',
        tn: null,
        ps: [{
            n: 'srs',
            an: {
              lp: 'SRS'
            },
            t: 'a'
          }, {
            n: 'minx',
            an: {
              lp: 'minx'
            },
            t: 'a'
          }, {
            n: 'miny',
            an: {
              lp: 'miny'
            },
            t: 'a'
          }, {
            n: 'maxx',
            an: {
              lp: 'maxx'
            },
            t: 'a'
          }, {
            n: 'maxy',
            an: {
              lp: 'maxy'
            },
            t: 'a'
          }, {
            n: 'resx',
            an: {
              lp: 'resx'
            },
            t: 'a'
          }, {
            n: 'resy',
            an: {
              lp: 'resy'
            },
            t: 'a'
          }]
      }, {
        ln: 'Style',
        tn: null,
        ps: [{
            n: 'name',
            en: {
              lp: 'Name'
            }
          }, {
            n: 'title',
            en: {
              lp: 'Title'
            }
          }, {
            n: '_abstract',
            en: {
              lp: 'Abstract'
            }
          }, {
            n: 'legendURL',
            col: true,
            en: {
              lp: 'LegendURL'
            },
            ti: '.LegendURL'
          }, {
            n: 'styleSheetURL',
            en: {
              lp: 'StyleSheetURL'
            },
            ti: '.StyleSheetURL'
          }, {
            n: 'styleURL',
            en: {
              lp: 'StyleURL'
            },
            ti: '.StyleURL'
          }]
      }, {
        ln: 'GetFeatureInfo',
        tn: null,
        ps: [{
            n: 'format',
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'dcpType',
            col: true,
            en: {
              lp: 'DCPType'
            },
            ti: '.DCPType'
          }]
      }, {
        ln: 'ContactInformation',
        tn: null,
        ps: [{
            n: 'contactPersonPrimary',
            en: {
              lp: 'ContactPersonPrimary'
            },
            ti: '.ContactPersonPrimary'
          }, {
            n: 'contactPosition',
            en: {
              lp: 'ContactPosition'
            }
          }, {
            n: 'contactAddress',
            en: {
              lp: 'ContactAddress'
            },
            ti: '.ContactAddress'
          }, {
            n: 'contactVoiceTelephone',
            en: {
              lp: 'ContactVoiceTelephone'
            }
          }, {
            n: 'contactFacsimileTelephone',
            en: {
              lp: 'ContactFacsimileTelephone'
            }
          }, {
            n: 'contactElectronicMailAddress',
            en: {
              lp: 'ContactElectronicMailAddress'
            }
          }]
      }, {
        ln: 'ServiceExceptionReport',
        tn: null,
        ps: [{
            n: 'version',
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'serviceException',
            col: true,
            en: {
              lp: 'ServiceException'
            },
            ti: '.ServiceException'
          }]
      }, {
        ln: 'WMSDescribeLayerResponse',
        tn: null,
        ps: [{
            n: 'version',
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'layerDescription',
            col: true,
            en: {
              lp: 'LayerDescription'
            },
            ti: '.LayerDescription'
          }]
      }, {
        ln: 'Post',
        tn: null,
        ps: [{
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'FeatureListURL',
        tn: null,
        ps: [{
            n: 'format',
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'DescribeLayer',
        tn: null,
        ps: [{
            n: 'format',
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'dcpType',
            col: true,
            en: {
              lp: 'DCPType'
            },
            ti: '.DCPType'
          }]
      }, {
        ln: 'AuthorityURL',
        tn: null,
        ps: [{
            n: 'name',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'LatLonBoundingBox',
        tn: null,
        ps: [{
            n: 'minx',
            an: {
              lp: 'minx'
            },
            t: 'a'
          }, {
            n: 'miny',
            an: {
              lp: 'miny'
            },
            t: 'a'
          }, {
            n: 'maxx',
            an: {
              lp: 'maxx'
            },
            t: 'a'
          }, {
            n: 'maxy',
            an: {
              lp: 'maxy'
            },
            t: 'a'
          }]
      }, {
        ln: 'Keyword',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'Service',
        tn: null,
        ps: [{
            n: 'name',
            en: {
              lp: 'Name'
            }
          }, {
            n: 'title',
            en: {
              lp: 'Title'
            }
          }, {
            n: '_abstract',
            en: {
              lp: 'Abstract'
            }
          }, {
            n: 'keywordList',
            en: {
              lp: 'KeywordList'
            },
            ti: '.KeywordList'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }, {
            n: 'contactInformation',
            en: {
              lp: 'ContactInformation'
            },
            ti: '.ContactInformation'
          }, {
            n: 'fees',
            en: {
              lp: 'Fees'
            }
          }, {
            n: 'accessConstraints',
            en: {
              lp: 'AccessConstraints'
            }
          }]
      }, {
        ln: 'Layers',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'WMTMSCapabilities',
        tn: null,
        ps: [{
            n: 'version',
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'updateSequence',
            an: {
              lp: 'updateSequence'
            },
            t: 'a'
          }, {
            n: 'service',
            en: {
              lp: 'Service'
            },
            ti: '.Service'
          }, {
            n: 'capability',
            en: {
              lp: 'Capability'
            },
            ti: '.Capability'
          }]
      }, {
        ln: 'Attribution',
        tn: null,
        ps: [{
            n: 'title',
            en: {
              lp: 'Title'
            }
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }, {
            n: 'logoURL',
            en: {
              lp: 'LogoURL'
            },
            ti: '.LogoURL'
          }]
      }, {
        ln: 'StyleURL',
        tn: null,
        ps: [{
            n: 'format',
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Dimension',
        tn: null,
        ps: [{
            n: 'name',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'units',
            an: {
              lp: 'units'
            },
            t: 'a'
          }, {
            n: 'unitSymbol',
            an: {
              lp: 'unitSymbol'
            },
            t: 'a'
          }]
      }, {
        ln: 'StyleSheetURL',
        tn: null,
        ps: [{
            n: 'format',
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Styles',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'MetadataURL',
        tn: null,
        ps: [{
            n: 'type',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'format',
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'TileSet',
        tn: null,
        ps: [{
            n: 'srs',
            en: {
              lp: 'SRS'
            },
            ti: '.SRS'
          }, {
            n: 'boundingBox',
            en: {
              lp: 'BoundingBox'
            },
            ti: '.BoundingBox'
          }, {
            n: 'resolutions',
            en: {
              lp: 'Resolutions'
            }
          }, {
            n: 'width',
            en: {
              lp: 'Width'
            }
          }, {
            n: 'height',
            en: {
              lp: 'Height'
            }
          }, {
            n: 'format',
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'layers',
            col: true,
            en: {
              lp: 'Layers'
            },
            ti: '.Layers'
          }, {
            n: 'styles',
            col: true,
            en: {
              lp: 'Styles'
            },
            ti: '.Styles'
          }]
      }, {
        ln: 'KeywordList',
        tn: null,
        ps: [{
            n: 'keyword',
            col: true,
            en: {
              lp: 'Keyword'
            },
            ti: '.Keyword'
          }]
      }, {
        ln: 'GetStyles',
        tn: null,
        ps: [{
            n: 'format',
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'dcpType',
            col: true,
            en: {
              lp: 'DCPType'
            },
            ti: '.DCPType'
          }]
      }, {
        ln: 'ContactAddress',
        tn: null,
        ps: [{
            n: 'addressType',
            en: {
              lp: 'AddressType'
            }
          }, {
            n: 'address',
            en: {
              lp: 'Address'
            }
          }, {
            n: 'city',
            en: {
              lp: 'City'
            }
          }, {
            n: 'stateOrProvince',
            en: {
              lp: 'StateOrProvince'
            }
          }, {
            n: 'postCode',
            en: {
              lp: 'PostCode'
            }
          }, {
            n: 'country',
            en: {
              lp: 'Country'
            }
          }]
      }, {
        ln: 'Exception',
        tn: null,
        ps: [{
            n: 'format',
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }]
      }, {
        ln: 'ServiceException',
        tn: null,
        ps: [{
            n: 'code',
            an: {
              lp: 'code'
            },
            t: 'a'
          }, {
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'LegendURL',
        tn: null,
        ps: [{
            n: 'width',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'height',
            an: {
              lp: 'height'
            },
            t: 'a'
          }, {
            n: 'format',
            en: {
              lp: 'Format'
            },
            ti: '.Format'
          }, {
            n: 'onlineResource',
            en: {
              lp: 'OnlineResource'
            },
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Extent',
        tn: null,
        ps: [{
            n: 'name',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: '_default',
            an: {
              lp: 'default'
            },
            t: 'a'
          }, {
            n: 'nearestValue',
            an: {
              lp: 'nearestValue'
            },
            t: 'a'
          }, {
            n: 'multipleValues',
            an: {
              lp: 'multipleValues'
            },
            t: 'a'
          }, {
            n: 'current',
            an: {
              lp: 'current'
            },
            t: 'a'
          }, {
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'Request',
        tn: null,
        ps: [{
            n: 'getCapabilities',
            en: {
              lp: 'GetCapabilities'
            },
            ti: '.GetCapabilities'
          }, {
            n: 'getMap',
            en: {
              lp: 'GetMap'
            },
            ti: '.GetMap'
          }, {
            n: 'getFeatureInfo',
            en: {
              lp: 'GetFeatureInfo'
            },
            ti: '.GetFeatureInfo'
          }, {
            n: 'describeLayer',
            en: {
              lp: 'DescribeLayer'
            },
            ti: '.DescribeLayer'
          }, {
            n: 'getLegendGraphic',
            en: {
              lp: 'GetLegendGraphic'
            },
            ti: '.GetLegendGraphic'
          }, {
            n: 'getStyles',
            en: {
              lp: 'GetStyles'
            },
            ti: '.GetStyles'
          }, {
            n: 'putStyles',
            en: {
              lp: 'PutStyles'
            },
            ti: '.PutStyles'
          }]
      }, {
        ln: 'SRS',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'Format',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'Layer',
        tn: null,
        ps: [{
            n: 'queryable',
            an: {
              lp: 'queryable'
            },
            t: 'a'
          }, {
            n: 'cascaded',
            an: {
              lp: 'cascaded'
            },
            t: 'a'
          }, {
            n: 'opaque',
            an: {
              lp: 'opaque'
            },
            t: 'a'
          }, {
            n: 'noSubsets',
            an: {
              lp: 'noSubsets'
            },
            t: 'a'
          }, {
            n: 'fixedWidth',
            an: {
              lp: 'fixedWidth'
            },
            t: 'a'
          }, {
            n: 'fixedHeight',
            an: {
              lp: 'fixedHeight'
            },
            t: 'a'
          }, {
            n: 'name',
            en: {
              lp: 'Name'
            }
          }, {
            n: 'title',
            en: {
              lp: 'Title'
            }
          }, {
            n: '_abstract',
            en: {
              lp: 'Abstract'
            }
          }, {
            n: 'keywordList',
            en: {
              lp: 'KeywordList'
            },
            ti: '.KeywordList'
          }, {
            n: 'srs',
            col: true,
            en: {
              lp: 'SRS'
            },
            ti: '.SRS'
          }, {
            n: 'latLonBoundingBox',
            en: {
              lp: 'LatLonBoundingBox'
            },
            ti: '.LatLonBoundingBox'
          }, {
            n: 'boundingBox',
            col: true,
            en: {
              lp: 'BoundingBox'
            },
            ti: '.BoundingBox'
          }, {
            n: 'dimension',
            col: true,
            en: {
              lp: 'Dimension'
            },
            ti: '.Dimension'
          }, {
            n: 'extent',
            col: true,
            en: {
              lp: 'Extent'
            },
            ti: '.Extent'
          }, {
            n: 'attribution',
            en: {
              lp: 'Attribution'
            },
            ti: '.Attribution'
          }, {
            n: 'authorityURL',
            col: true,
            en: {
              lp: 'AuthorityURL'
            },
            ti: '.AuthorityURL'
          }, {
            n: 'identifier',
            col: true,
            en: {
              lp: 'Identifier'
            },
            ti: '.Identifier'
          }, {
            n: 'metadataURL',
            col: true,
            en: {
              lp: 'MetadataURL'
            },
            ti: '.MetadataURL'
          }, {
            n: 'dataURL',
            col: true,
            en: {
              lp: 'DataURL'
            },
            ti: '.DataURL'
          }, {
            n: 'featureListURL',
            col: true,
            en: {
              lp: 'FeatureListURL'
            },
            ti: '.FeatureListURL'
          }, {
            n: 'style',
            col: true,
            en: {
              lp: 'Style'
            },
            ti: '.Style'
          }, {
            n: 'scaleHint',
            en: {
              lp: 'ScaleHint'
            },
            ti: '.ScaleHint'
          }, {
            n: 'layer',
            col: true,
            en: {
              lp: 'Layer'
            },
            ti: '.Layer'
          }]
      }],
    eis: [{
        en: {
          lp: 'OnlineResource'
        },
        ti: '.OnlineResource'
      }, {
        en: {
          lp: 'ContactPersonPrimary'
        },
        ti: '.ContactPersonPrimary'
      }, {
        en: {
          lp: 'UserDefinedSymbolization'
        },
        ti: '.UserDefinedSymbolization'
      }, {
        en: {
          lp: 'Request'
        },
        ti: '.Request'
      }, {
        en: {
          lp: 'Get'
        },
        ti: '.Get'
      }, {
        en: {
          lp: 'PutStyles'
        },
        ti: '.PutStyles'
      }, {
        en: {
          lp: 'ServiceExceptionReport'
        },
        ti: '.ServiceExceptionReport'
      }, {
        en: {
          lp: 'Identifier'
        },
        ti: '.Identifier'
      }, {
        en: {
          lp: 'Keyword'
        },
        ti: '.Keyword'
      }, {
        en: {
          lp: 'Dimension'
        },
        ti: '.Dimension'
      }, {
        en: {
          lp: 'LayerDescription'
        },
        ti: '.LayerDescription'
      }, {
        en: {
          lp: 'DataURL'
        },
        ti: '.DataURL'
      }, {
        en: {
          lp: 'StyleURL'
        },
        ti: '.StyleURL'
      }, {
        en: {
          lp: 'ServiceException'
        },
        ti: '.ServiceException'
      }, {
        en: {
          lp: 'LegendURL'
        },
        ti: '.LegendURL'
      }, {
        en: {
          lp: 'Extent'
        },
        ti: '.Extent'
      }, {
        en: {
          lp: 'ContactInformation'
        },
        ti: '.ContactInformation'
      }, {
        en: {
          lp: 'LatLonBoundingBox'
        },
        ti: '.LatLonBoundingBox'
      }, {
        en: {
          lp: 'Style'
        },
        ti: '.Style'
      }, {
        en: {
          lp: 'ScaleHint'
        },
        ti: '.ScaleHint'
      }, {
        en: {
          lp: 'DescribeLayer'
        },
        ti: '.DescribeLayer'
      }, {
        en: {
          lp: 'GetMap'
        },
        ti: '.GetMap'
      }, {
        en: {
          lp: 'KeywordList'
        },
        ti: '.KeywordList'
      }, {
        en: {
          lp: 'HTTP'
        },
        ti: '.HTTP'
      }, {
        en: {
          lp: 'ContactAddress'
        },
        ti: '.ContactAddress'
      }, {
        en: {
          lp: 'WMS_DescribeLayerResponse'
        },
        ti: '.WMSDescribeLayerResponse'
      }, {
        en: {
          lp: 'Styles'
        },
        ti: '.Styles'
      }, {
        en: {
          lp: 'Service'
        },
        ti: '.Service'
      }, {
        en: {
          lp: 'Post'
        },
        ti: '.Post'
      }, {
        en: {
          lp: 'GetFeatureInfo'
        },
        ti: '.GetFeatureInfo'
      }, {
        en: {
          lp: 'FeatureListURL'
        },
        ti: '.FeatureListURL'
      }, {
        en: {
          lp: 'AuthorityURL'
        },
        ti: '.AuthorityURL'
      }, {
        en: {
          lp: 'Format'
        },
        ti: '.Format'
      }, {
        en: {
          lp: 'Capability'
        },
        ti: '.Capability'
      }, {
        en: {
          lp: 'MetadataURL'
        },
        ti: '.MetadataURL'
      }, {
        en: {
          lp: 'GetStyles'
        },
        ti: '.GetStyles'
      }, {
        en: {
          lp: 'Exception'
        },
        ti: '.Exception'
      }, {
        en: {
          lp: 'DCPType'
        },
        ti: '.DCPType'
      }, {
        en: {
          lp: 'BoundingBox'
        },
        ti: '.BoundingBox'
      }, {
        en: {
          lp: 'Layer'
        },
        ti: '.Layer'
      }, {
        en: {
          lp: 'GetLegendGraphic'
        },
        ti: '.GetLegendGraphic'
      }, {
        en: {
          lp: 'SRS'
        },
        ti: '.SRS'
      }, {
        en: {
          lp: 'VendorSpecificCapabilities'
        },
        ti: '.VendorSpecificCapabilities'
      }, {
        en: {
          lp: 'TileSet'
        },
        ti: '.TileSet'
      }, {
        en: {
          lp: 'WMT_MS_Capabilities'
        },
        ti: '.WMTMSCapabilities'
      }, {
        en: {
          lp: 'StyleSheetURL'
        },
        ti: '.StyleSheetURL'
      }, {
        en: {
          lp: 'GetCapabilities'
        },
        ti: '.GetCapabilities'
      }, {
        en: {
          lp: 'LogoURL'
        },
        ti: '.LogoURL'
      }, {
        en: {
          lp: 'Layers'
        },
        ti: '.Layers'
      }, {
        en: {
          lp: 'Attribution'
        },
        ti: '.Attribution'
      }, {
        en: {
          lp: 'Query'
        },
        ti: '.Query'
      }]
  };
  return {
    WMSC_1_1_1: WMSC_1_1_1
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WMSC_1_1_1_Module_Factory);
}
else {
  var WMSC_1_1_1_Module = WMSC_1_1_1_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WMSC_1_1_1 = WMSC_1_1_1_Module.WMSC_1_1_1;
  }
  else {
    var WMSC_1_1_1 = WMSC_1_1_1_Module.WMSC_1_1_1;
  }
}
},{}],14:[function(require,module,exports){
var WMS_1_3_0_Module_Factory = function () {
  var WMS_1_3_0 = {
    n: 'WMS_1_3_0',
    dens: 'http:\/\/www.opengis.net\/wms',
    deps: ['XLink_1_0'],
    tis: [{
        ln: 'Dimension',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'units',
            rq: true,
            an: {
              lp: 'units'
            },
            t: 'a'
          }, {
            n: 'unitSymbol',
            an: {
              lp: 'unitSymbol'
            },
            t: 'a'
          }, {
            n: '_default',
            an: {
              lp: 'default'
            },
            t: 'a'
          }, {
            n: 'multipleValues',
            ti: 'Boolean',
            an: {
              lp: 'multipleValues'
            },
            t: 'a'
          }, {
            n: 'nearestValue',
            ti: 'Boolean',
            an: {
              lp: 'nearestValue'
            },
            t: 'a'
          }, {
            n: 'current',
            ti: 'Boolean',
            an: {
              lp: 'current'
            },
            t: 'a'
          }]
      }, {
        ln: 'Capability',
        tn: null,
        ps: [{
            n: 'request',
            rq: true,
            en: 'Request',
            ti: '.Request'
          }, {
            n: 'exception',
            rq: true,
            en: 'Exception',
            ti: '.Exception'
          }, {
            n: 'extendedCapabilities',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_ExtendedCapabilities',
            ti: 'AnyType',
            t: 'er'
          }, {
            n: 'layer',
            en: 'Layer',
            ti: '.Layer'
          }]
      }, {
        ln: 'DataURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'ContactAddress',
        tn: null,
        ps: [{
            n: 'addressType',
            rq: true,
            en: 'AddressType'
          }, {
            n: 'address',
            rq: true,
            en: 'Address'
          }, {
            n: 'city',
            rq: true,
            en: 'City'
          }, {
            n: 'stateOrProvince',
            rq: true,
            en: 'StateOrProvince'
          }, {
            n: 'postCode',
            rq: true,
            en: 'PostCode'
          }, {
            n: 'country',
            rq: true,
            en: 'Country'
          }]
      }, {
        ln: 'KeywordList',
        tn: null,
        ps: [{
            n: 'keyword',
            mno: 0,
            col: true,
            en: 'Keyword',
            ti: '.Keyword'
          }]
      }, {
        ln: 'DCPType',
        tn: null,
        ps: [{
            n: 'http',
            rq: true,
            en: 'HTTP',
            ti: '.HTTP'
          }]
      }, {
        ln: 'Attribution',
        tn: null,
        ps: [{
            n: 'title',
            en: 'Title'
          }, {
            n: 'onlineResource',
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'logoURL',
            en: 'LogoURL',
            ti: '.LogoURL'
          }]
      }, {
        ln: 'OnlineResource',
        tn: null,
        ps: [{
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            an: {
              lp: 'type',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'href',
            an: {
              lp: 'href',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'role',
            an: {
              lp: 'role',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'arcrole',
            an: {
              lp: 'arcrole',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            an: {
              lp: 'show',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            an: {
              lp: 'actuate',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }]
      }, {
        ln: 'Post',
        tn: null,
        ps: [{
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'EXGeographicBoundingBox',
        tn: null,
        ps: [{
            n: 'westBoundLongitude',
            rq: true,
            ti: 'Double'
          }, {
            n: 'eastBoundLongitude',
            rq: true,
            ti: 'Double'
          }, {
            n: 'southBoundLatitude',
            rq: true,
            ti: 'Double'
          }, {
            n: 'northBoundLatitude',
            rq: true,
            ti: 'Double'
          }]
      }, {
        ln: 'FeatureListURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'OperationType',
        ps: [{
            n: 'format',
            rq: true,
            col: true,
            en: 'Format'
          }, {
            n: 'dcpType',
            rq: true,
            col: true,
            en: 'DCPType',
            ti: '.DCPType'
          }]
      }, {
        ln: 'ContactInformation',
        tn: null,
        ps: [{
            n: 'contactPersonPrimary',
            en: 'ContactPersonPrimary',
            ti: '.ContactPersonPrimary'
          }, {
            n: 'contactPosition',
            en: 'ContactPosition'
          }, {
            n: 'contactAddress',
            en: 'ContactAddress',
            ti: '.ContactAddress'
          }, {
            n: 'contactVoiceTelephone',
            en: 'ContactVoiceTelephone'
          }, {
            n: 'contactFacsimileTelephone',
            en: 'ContactFacsimileTelephone'
          }, {
            n: 'contactElectronicMailAddress',
            en: 'ContactElectronicMailAddress'
          }]
      }, {
        ln: 'Style',
        tn: null,
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name'
          }, {
            n: 'title',
            rq: true,
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'legendURL',
            mno: 0,
            col: true,
            en: 'LegendURL',
            ti: '.LegendURL'
          }, {
            n: 'styleSheetURL',
            en: 'StyleSheetURL',
            ti: '.StyleSheetURL'
          }, {
            n: 'styleURL',
            en: 'StyleURL',
            ti: '.StyleURL'
          }]
      }, {
        ln: 'StyleSheetURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Keyword',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'vocabulary',
            an: {
              lp: 'vocabulary'
            },
            t: 'a'
          }]
      }, {
        ln: 'BoundingBox',
        tn: null,
        ps: [{
            n: 'crs',
            rq: true,
            an: {
              lp: 'CRS'
            },
            t: 'a'
          }, {
            n: 'minx',
            rq: true,
            ti: 'Double',
            an: {
              lp: 'minx'
            },
            t: 'a'
          }, {
            n: 'miny',
            rq: true,
            ti: 'Double',
            an: {
              lp: 'miny'
            },
            t: 'a'
          }, {
            n: 'maxx',
            rq: true,
            ti: 'Double',
            an: {
              lp: 'maxx'
            },
            t: 'a'
          }, {
            n: 'maxy',
            rq: true,
            ti: 'Double',
            an: {
              lp: 'maxy'
            },
            t: 'a'
          }, {
            n: 'resx',
            ti: 'Double',
            an: {
              lp: 'resx'
            },
            t: 'a'
          }, {
            n: 'resy',
            ti: 'Double',
            an: {
              lp: 'resy'
            },
            t: 'a'
          }]
      }, {
        ln: 'AuthorityURL',
        tn: null,
        ps: [{
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'name',
            rq: true,
            ti: 'NMToken',
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'Layer',
        tn: null,
        ps: [{
            n: 'name',
            en: 'Name'
          }, {
            n: 'title',
            rq: true,
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'keywordList',
            en: 'KeywordList',
            ti: '.KeywordList'
          }, {
            n: 'crs',
            mno: 0,
            col: true,
            en: 'CRS'
          }, {
            n: 'exGeographicBoundingBox',
            en: 'EX_GeographicBoundingBox',
            ti: '.EXGeographicBoundingBox'
          }, {
            n: 'boundingBox',
            mno: 0,
            col: true,
            en: 'BoundingBox',
            ti: '.BoundingBox'
          }, {
            n: 'dimension',
            mno: 0,
            col: true,
            en: 'Dimension',
            ti: '.Dimension'
          }, {
            n: 'attribution',
            en: 'Attribution',
            ti: '.Attribution'
          }, {
            n: 'authorityURL',
            mno: 0,
            col: true,
            en: 'AuthorityURL',
            ti: '.AuthorityURL'
          }, {
            n: 'identifier',
            mno: 0,
            col: true,
            en: 'Identifier',
            ti: '.Identifier'
          }, {
            n: 'metadataURL',
            mno: 0,
            col: true,
            en: 'MetadataURL',
            ti: '.MetadataURL'
          }, {
            n: 'dataURL',
            mno: 0,
            col: true,
            en: 'DataURL',
            ti: '.DataURL'
          }, {
            n: 'featureListURL',
            mno: 0,
            col: true,
            en: 'FeatureListURL',
            ti: '.FeatureListURL'
          }, {
            n: 'style',
            mno: 0,
            col: true,
            en: 'Style',
            ti: '.Style'
          }, {
            n: 'minScaleDenominator',
            en: 'MinScaleDenominator',
            ti: 'Double'
          }, {
            n: 'maxScaleDenominator',
            en: 'MaxScaleDenominator',
            ti: 'Double'
          }, {
            n: 'layer',
            mno: 0,
            col: true,
            en: 'Layer',
            ti: '.Layer'
          }, {
            n: 'queryable',
            ti: 'Boolean',
            an: {
              lp: 'queryable'
            },
            t: 'a'
          }, {
            n: 'cascaded',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'cascaded'
            },
            t: 'a'
          }, {
            n: 'opaque',
            ti: 'Boolean',
            an: {
              lp: 'opaque'
            },
            t: 'a'
          }, {
            n: 'noSubsets',
            ti: 'Boolean',
            an: {
              lp: 'noSubsets'
            },
            t: 'a'
          }, {
            n: 'fixedWidth',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'fixedWidth'
            },
            t: 'a'
          }, {
            n: 'fixedHeight',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'fixedHeight'
            },
            t: 'a'
          }]
      }, {
        ln: 'Exception',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            col: true,
            en: 'Format'
          }]
      }, {
        ln: 'StyleURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Service',
        tn: null,
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name'
          }, {
            n: 'title',
            rq: true,
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'keywordList',
            en: 'KeywordList',
            ti: '.KeywordList'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'contactInformation',
            en: 'ContactInformation',
            ti: '.ContactInformation'
          }, {
            n: 'fees',
            en: 'Fees'
          }, {
            n: 'accessConstraints',
            en: 'AccessConstraints'
          }, {
            n: 'layerLimit',
            en: 'LayerLimit',
            ti: 'PositiveInteger'
          }, {
            n: 'maxWidth',
            en: 'MaxWidth',
            ti: 'PositiveInteger'
          }, {
            n: 'maxHeight',
            en: 'MaxHeight',
            ti: 'PositiveInteger'
          }]
      }, {
        ln: 'Identifier',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'authority',
            rq: true,
            an: {
              lp: 'authority'
            },
            t: 'a'
          }]
      }, {
        ln: 'LegendURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'width',
            ti: 'PositiveInteger',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'height',
            ti: 'PositiveInteger',
            an: {
              lp: 'height'
            },
            t: 'a'
          }]
      }, {
        ln: 'LogoURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'width',
            ti: 'PositiveInteger',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'height',
            ti: 'PositiveInteger',
            an: {
              lp: 'height'
            },
            t: 'a'
          }]
      }, {
        ln: 'MetadataURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'type',
            rq: true,
            ti: 'NMToken',
            an: {
              lp: 'type'
            },
            t: 'a'
          }]
      }, {
        ln: 'ContactPersonPrimary',
        tn: null,
        ps: [{
            n: 'contactPerson',
            rq: true,
            en: 'ContactPerson'
          }, {
            n: 'contactOrganization',
            rq: true,
            en: 'ContactOrganization'
          }]
      }, {
        ln: 'HTTP',
        tn: null,
        ps: [{
            n: 'get',
            rq: true,
            en: 'Get',
            ti: '.Get'
          }, {
            n: 'post',
            en: 'Post',
            ti: '.Post'
          }]
      }, {
        ln: 'WMSCapabilities',
        tn: null,
        ps: [{
            n: 'service',
            rq: true,
            en: 'Service',
            ti: '.Service'
          }, {
            n: 'capability',
            rq: true,
            en: 'Capability',
            ti: '.Capability'
          }, {
            n: 'version',
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'updateSequence',
            an: {
              lp: 'updateSequence'
            },
            t: 'a'
          }]
      }, {
        ln: 'Get',
        tn: null,
        ps: [{
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Request',
        tn: null,
        ps: [{
            n: 'getCapabilities',
            rq: true,
            en: 'GetCapabilities',
            ti: '.OperationType'
          }, {
            n: 'getMap',
            rq: true,
            en: 'GetMap',
            ti: '.OperationType'
          }, {
            n: 'getFeatureInfo',
            en: 'GetFeatureInfo',
            ti: '.OperationType'
          }, {
            n: 'extendedOperation',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_ExtendedOperation',
            ti: '.OperationType',
            t: 'er'
          }]
      }],
    eis: [{
        en: 'City'
      }, {
        en: 'FeatureListURL',
        ti: '.FeatureListURL'
      }, {
        en: 'StyleSheetURL',
        ti: '.StyleSheetURL'
      }, {
        en: 'Dimension',
        ti: '.Dimension'
      }, {
        en: 'Address'
      }, {
        en: 'Fees'
      }, {
        en: 'MaxWidth',
        ti: 'PositiveInteger'
      }, {
        en: 'DataURL',
        ti: '.DataURL'
      }, {
        en: 'ContactPersonPrimary',
        ti: '.ContactPersonPrimary'
      }, {
        en: 'DCPType',
        ti: '.DCPType'
      }, {
        en: 'Attribution',
        ti: '.Attribution'
      }, {
        en: 'AuthorityURL',
        ti: '.AuthorityURL'
      }, {
        en: 'AccessConstraints'
      }, {
        en: 'EX_GeographicBoundingBox',
        ti: '.EXGeographicBoundingBox'
      }, {
        en: 'GetCapabilities',
        ti: '.OperationType'
      }, {
        en: 'Request',
        ti: '.Request'
      }, {
        en: 'MinScaleDenominator',
        ti: 'Double'
      }, {
        en: 'GetMap',
        ti: '.OperationType'
      }, {
        en: 'MetadataURL',
        ti: '.MetadataURL'
      }, {
        en: 'Capability',
        ti: '.Capability'
      }, {
        en: 'GetFeatureInfo',
        ti: '.OperationType'
      }, {
        en: 'ContactVoiceTelephone'
      }, {
        en: 'Layer',
        ti: '.Layer'
      }, {
        en: 'MaxHeight',
        ti: 'PositiveInteger'
      }, {
        en: 'Name'
      }, {
        en: 'BoundingBox',
        ti: '.BoundingBox'
      }, {
        en: 'Style',
        ti: '.Style'
      }, {
        en: 'OtherExtendedOperation',
        ti: '.OperationType',
        sh: '_ExtendedOperation'
      }, {
        en: 'OnlineResource',
        ti: '.OnlineResource'
      }, {
        en: 'Exception',
        ti: '.Exception'
      }, {
        en: 'HTTP',
        ti: '.HTTP'
      }, {
        en: 'Service',
        ti: '.Service'
      }, {
        en: 'OtherExtendedCapabilities',
        ti: 'AnyType',
        sh: '_ExtendedCapabilities'
      }, {
        en: 'LegendURL',
        ti: '.LegendURL'
      }, {
        en: 'LogoURL',
        ti: '.LogoURL'
      }, {
        en: 'Format'
      }, {
        en: 'ContactElectronicMailAddress'
      }, {
        en: 'ContactPosition'
      }, {
        en: 'ContactOrganization'
      }, {
        en: 'StateOrProvince'
      }, {
        en: 'PostCode'
      }, {
        en: 'Title'
      }, {
        en: 'KeywordList',
        ti: '.KeywordList'
      }, {
        en: 'Country'
      }, {
        en: '_ExtendedOperation',
        ti: '.OperationType'
      }, {
        en: 'ContactAddress',
        ti: '.ContactAddress'
      }, {
        en: 'Get',
        ti: '.Get'
      }, {
        en: '_ExtendedCapabilities',
        ti: 'AnyType'
      }, {
        en: 'StyleURL',
        ti: '.StyleURL'
      }, {
        en: 'Abstract'
      }, {
        en: 'LayerLimit',
        ti: 'PositiveInteger'
      }, {
        en: 'WMS_Capabilities',
        ti: '.WMSCapabilities'
      }, {
        en: 'ContactFacsimileTelephone'
      }, {
        en: 'MaxScaleDenominator',
        ti: 'Double'
      }, {
        en: 'Identifier',
        ti: '.Identifier'
      }, {
        en: 'AddressType'
      }, {
        en: 'Keyword',
        ti: '.Keyword'
      }, {
        en: 'ContactPerson'
      }, {
        en: 'ContactInformation',
        ti: '.ContactInformation'
      }, {
        en: 'CRS'
      }, {
        en: 'Post',
        ti: '.Post'
      }]
  };
  return {
    WMS_1_3_0: WMS_1_3_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WMS_1_3_0_Module_Factory);
}
else {
  var WMS_1_3_0_Module = WMS_1_3_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WMS_1_3_0 = WMS_1_3_0_Module.WMS_1_3_0;
  }
  else {
    var WMS_1_3_0 = WMS_1_3_0_Module.WMS_1_3_0;
  }
}
},{}],15:[function(require,module,exports){
var WMS_1_3_0_Exceptions_Module_Factory = function () {
  var WMS_1_3_0_Exceptions = {
    n: 'WMS_1_3_0_Exceptions',
    dens: 'http:\/\/www.opengis.net\/ogc',
    tis: [{
        ln: 'ServiceExceptionType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'code',
            an: {
              lp: 'code'
            },
            t: 'a'
          }, {
            n: 'locator',
            an: {
              lp: 'locator'
            },
            t: 'a'
          }]
      }, {
        ln: 'ServiceExceptionReport',
        tn: null,
        ps: [{
            n: 'serviceException',
            mno: 0,
            col: true,
            en: 'ServiceException',
            ti: '.ServiceExceptionType'
          }, {
            n: 'version',
            an: {
              lp: 'version'
            },
            t: 'a'
          }]
      }],
    eis: [{
        en: 'ServiceExceptionReport',
        ti: '.ServiceExceptionReport'
      }]
  };
  return {
    WMS_1_3_0_Exceptions: WMS_1_3_0_Exceptions
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WMS_1_3_0_Exceptions_Module_Factory);
}
else {
  var WMS_1_3_0_Exceptions_Module = WMS_1_3_0_Exceptions_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WMS_1_3_0_Exceptions = WMS_1_3_0_Exceptions_Module.WMS_1_3_0_Exceptions;
  }
  else {
    var WMS_1_3_0_Exceptions = WMS_1_3_0_Exceptions_Module.WMS_1_3_0_Exceptions;
  }
}
},{}],16:[function(require,module,exports){
var WPS_1_0_0_Module_Factory = function () {
  var WPS_1_0_0 = {
    n: 'WPS_1_0_0',
    dens: 'http:\/\/www.opengis.net\/wps\/1.0.0',
    deps: ['OWS_1_1_0'],
    tis: [{
        ln: 'InputDescriptionType',
        bti: '.DescriptionType',
        ps: [{
            n: 'complexData',
            rq: true,
            en: {
              lp: 'ComplexData'
            },
            ti: '.SupportedComplexDataInputType'
          }, {
            n: 'literalData',
            rq: true,
            en: {
              lp: 'LiteralData'
            },
            ti: '.LiteralInputType'
          }, {
            n: 'boundingBoxData',
            rq: true,
            en: {
              lp: 'BoundingBoxData'
            },
            ti: '.SupportedCRSsType'
          }, {
            n: 'minOccurs',
            rq: true,
            ti: 'NonNegativeInteger',
            an: {
              lp: 'minOccurs'
            },
            t: 'a'
          }, {
            n: 'maxOccurs',
            rq: true,
            ti: 'PositiveInteger',
            an: {
              lp: 'maxOccurs'
            },
            t: 'a'
          }]
      }, {
        ln: 'LiteralDataType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'dataType',
            an: {
              lp: 'dataType'
            },
            t: 'a'
          }, {
            n: 'uom',
            an: {
              lp: 'uom'
            },
            t: 'a'
          }]
      }, {
        ln: 'LiteralInputType',
        bti: '.LiteralOutputType',
        ps: [{
            n: 'allowedValues',
            rq: true,
            en: {
              lp: 'AllowedValues',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.AllowedValues'
          }, {
            n: 'anyValue',
            rq: true,
            en: {
              lp: 'AnyValue',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.AnyValue'
          }, {
            n: 'valuesReference',
            rq: true,
            en: {
              lp: 'ValuesReference'
            },
            ti: '.ValuesReferenceType'
          }, {
            n: 'defaultValue',
            en: {
              lp: 'DefaultValue'
            }
          }]
      }, {
        ln: 'SupportedUOMsType.Default',
        tn: null,
        ps: [{
            n: 'uom',
            rq: true,
            en: {
              lp: 'UOM',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.DomainMetadataType'
          }]
      }, {
        ln: 'ValuesReferenceType',
        ps: [{
            n: 'reference',
            an: {
              lp: 'reference',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            t: 'a'
          }, {
            n: 'valuesForm',
            an: {
              lp: 'valuesForm'
            },
            t: 'a'
          }]
      }, {
        ln: 'StatusType',
        ps: [{
            n: 'processAccepted',
            rq: true,
            en: 'ProcessAccepted'
          }, {
            n: 'processStarted',
            rq: true,
            en: 'ProcessStarted',
            ti: '.ProcessStartedType'
          }, {
            n: 'processPaused',
            rq: true,
            en: 'ProcessPaused',
            ti: '.ProcessStartedType'
          }, {
            n: 'processSucceeded',
            rq: true,
            en: 'ProcessSucceeded'
          }, {
            n: 'processFailed',
            rq: true,
            en: 'ProcessFailed',
            ti: '.ProcessFailedType'
          }, {
            n: 'creationTime',
            rq: true,
            ti: 'DateTime',
            an: {
              lp: 'creationTime'
            },
            t: 'a'
          }]
      }, {
        ln: 'ExecuteResponse.ProcessOutputs',
        tn: null,
        ps: [{
            n: 'output',
            rq: true,
            col: true,
            en: 'Output',
            ti: '.OutputDataType'
          }]
      }, {
        ln: 'InputReferenceType.Header',
        tn: null,
        ps: [{
            n: 'key',
            rq: true,
            an: {
              lp: 'key'
            },
            t: 'a'
          }, {
            n: 'value',
            rq: true,
            an: {
              lp: 'value'
            },
            t: 'a'
          }]
      }, {
        ln: 'ResponseBaseType',
        ps: [{
            n: 'service',
            rq: true,
            an: {
              lp: 'service'
            },
            t: 'a'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'lang',
            rq: true,
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'SupportedComplexDataInputType',
        bti: '.SupportedComplexDataType',
        ps: [{
            n: 'maximumMegabytes',
            ti: 'Integer',
            an: {
              lp: 'maximumMegabytes'
            },
            t: 'a'
          }]
      }, {
        ln: 'OutputReferenceType',
        ps: [{
            n: 'href',
            rq: true,
            an: {
              lp: 'href'
            },
            t: 'a'
          }, {
            n: 'mimeType',
            an: {
              lp: 'mimeType'
            },
            t: 'a'
          }, {
            n: 'encoding',
            an: {
              lp: 'encoding'
            },
            t: 'a'
          }, {
            n: 'schema',
            an: {
              lp: 'schema'
            },
            t: 'a'
          }]
      }, {
        ln: 'DescriptionType',
        ps: [{
            n: 'identifier',
            rq: true,
            en: {
              lp: 'Identifier',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.CodeType'
          }, {
            n: 'title',
            rq: true,
            en: {
              lp: 'Title',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.LanguageStringType'
          }, {
            n: '_abstract',
            en: {
              lp: 'Abstract',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.LanguageStringType'
          }, {
            n: 'metadata',
            mno: 0,
            col: true,
            en: {
              lp: 'Metadata',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.MetadataType'
          }]
      }, {
        ln: 'Execute',
        tn: null,
        bti: '.RequestBaseType',
        ps: [{
            n: 'identifier',
            rq: true,
            en: {
              lp: 'Identifier',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.CodeType'
          }, {
            n: 'dataInputs',
            en: 'DataInputs',
            ti: '.DataInputsType'
          }, {
            n: 'responseForm',
            en: 'ResponseForm',
            ti: '.ResponseFormType'
          }]
      }, {
        ln: 'ResponseDocumentType',
        ps: [{
            n: 'output',
            rq: true,
            col: true,
            en: 'Output',
            ti: '.DocumentOutputDefinitionType'
          }, {
            n: 'storeExecuteResponse',
            ti: 'Boolean',
            an: {
              lp: 'storeExecuteResponse'
            },
            t: 'a'
          }, {
            n: 'lineage',
            ti: 'Boolean',
            an: {
              lp: 'lineage'
            },
            t: 'a'
          }, {
            n: 'status',
            ti: 'Boolean',
            an: {
              lp: 'status'
            },
            t: 'a'
          }]
      }, {
        ln: 'LanguagesType',
        ps: [{
            n: 'language',
            rq: true,
            col: true,
            en: {
              lp: 'Language',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'Language'
          }]
      }, {
        ln: 'DocumentOutputDefinitionType',
        bti: '.OutputDefinitionType',
        ps: [{
            n: 'title',
            en: {
              lp: 'Title',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.LanguageStringType'
          }, {
            n: '_abstract',
            en: {
              lp: 'Abstract',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.LanguageStringType'
          }, {
            n: 'asReference',
            ti: 'Boolean',
            an: {
              lp: 'asReference'
            },
            t: 'a'
          }]
      }, {
        ln: 'WPSCapabilitiesType',
        bti: 'OWS_1_1_0.CapabilitiesBaseType',
        ps: [{
            n: 'processOfferings',
            rq: true,
            en: 'ProcessOfferings',
            ti: '.ProcessOfferings'
          }, {
            n: 'languages',
            rq: true,
            en: 'Languages',
            ti: '.Languages'
          }, {
            n: 'wsdl',
            en: 'WSDL',
            ti: '.WSDL'
          }, {
            n: 'service',
            rq: true,
            ti: 'AnySimpleType',
            an: {
              lp: 'service'
            },
            t: 'a'
          }, {
            n: 'lang',
            rq: true,
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'OutputDescriptionType',
        bti: '.DescriptionType',
        ps: [{
            n: 'complexOutput',
            rq: true,
            en: {
              lp: 'ComplexOutput'
            },
            ti: '.SupportedComplexDataType'
          }, {
            n: 'literalOutput',
            rq: true,
            en: {
              lp: 'LiteralOutput'
            },
            ti: '.LiteralOutputType'
          }, {
            n: 'boundingBoxOutput',
            rq: true,
            en: {
              lp: 'BoundingBoxOutput'
            },
            ti: '.SupportedCRSsType'
          }]
      }, {
        ln: 'SupportedComplexDataType',
        ps: [{
            n: '_default',
            rq: true,
            en: {
              lp: 'Default'
            },
            ti: '.ComplexDataCombinationType'
          }, {
            n: 'supported',
            rq: true,
            en: {
              lp: 'Supported'
            },
            ti: '.ComplexDataCombinationsType'
          }]
      }, {
        ln: 'InputReferenceType',
        ps: [{
            n: 'header',
            mno: 0,
            col: true,
            en: 'Header',
            ti: '.InputReferenceType.Header'
          }, {
            n: 'body',
            rq: true,
            en: 'Body',
            ti: 'AnyType'
          }, {
            n: 'bodyReference',
            rq: true,
            en: 'BodyReference',
            ti: '.InputReferenceType.BodyReference'
          }, {
            n: 'href',
            rq: true,
            an: {
              lp: 'href',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'method',
            an: {
              lp: 'method'
            },
            t: 'a'
          }, {
            n: 'mimeType',
            an: {
              lp: 'mimeType'
            },
            t: 'a'
          }, {
            n: 'encoding',
            an: {
              lp: 'encoding'
            },
            t: 'a'
          }, {
            n: 'schema',
            an: {
              lp: 'schema'
            },
            t: 'a'
          }]
      }, {
        ln: 'ProcessDescriptions',
        tn: null,
        bti: '.ResponseBaseType',
        ps: [{
            n: 'processDescription',
            rq: true,
            col: true,
            en: {
              lp: 'ProcessDescription'
            },
            ti: '.ProcessDescriptionType'
          }]
      }, {
        ln: 'ProcessDescriptionType',
        bti: '.ProcessBriefType',
        ps: [{
            n: 'dataInputs',
            en: {
              lp: 'DataInputs'
            },
            ti: '.ProcessDescriptionType.DataInputs'
          }, {
            n: 'processOutputs',
            rq: true,
            en: {
              lp: 'ProcessOutputs'
            },
            ti: '.ProcessDescriptionType.ProcessOutputs'
          }, {
            n: 'storeSupported',
            ti: 'Boolean',
            an: {
              lp: 'storeSupported'
            },
            t: 'a'
          }, {
            n: 'statusSupported',
            ti: 'Boolean',
            an: {
              lp: 'statusSupported'
            },
            t: 'a'
          }]
      }, {
        ln: 'Languages',
        tn: null,
        ps: [{
            n: '_default',
            rq: true,
            en: 'Default',
            ti: '.Languages.Default'
          }, {
            n: 'supported',
            rq: true,
            en: 'Supported',
            ti: '.LanguagesType'
          }]
      }, {
        ln: 'ComplexDataDescriptionType',
        ps: [{
            n: 'mimeType',
            rq: true,
            en: {
              lp: 'MimeType'
            }
          }, {
            n: 'encoding',
            en: {
              lp: 'Encoding'
            }
          }, {
            n: 'schema',
            en: {
              lp: 'Schema'
            }
          }]
      }, {
        ln: 'InputType',
        ps: [{
            n: 'identifier',
            rq: true,
            en: {
              lp: 'Identifier',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.CodeType'
          }, {
            n: 'title',
            en: {
              lp: 'Title',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.LanguageStringType'
          }, {
            n: '_abstract',
            en: {
              lp: 'Abstract',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.LanguageStringType'
          }, {
            n: 'reference',
            rq: true,
            en: 'Reference',
            ti: '.InputReferenceType'
          }, {
            n: 'data',
            rq: true,
            en: 'Data',
            ti: '.DataType'
          }]
      }, {
        ln: 'ResponseFormType',
        ps: [{
            n: 'responseDocument',
            rq: true,
            en: 'ResponseDocument',
            ti: '.ResponseDocumentType'
          }, {
            n: 'rawDataOutput',
            rq: true,
            en: 'RawDataOutput',
            ti: '.OutputDefinitionType'
          }]
      }, {
        ln: 'CRSsType',
        ps: [{
            n: 'crs',
            rq: true,
            col: true,
            en: {
              lp: 'CRS'
            }
          }]
      }, {
        ln: 'UOMsType',
        ps: [{
            n: 'uom',
            rq: true,
            col: true,
            en: {
              lp: 'UOM',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.DomainMetadataType'
          }]
      }, {
        ln: 'ProcessStartedType',
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'percentCompleted',
            ti: 'Int',
            an: {
              lp: 'percentCompleted'
            },
            t: 'a'
          }]
      }, {
        ln: 'ProcessBriefType',
        bti: '.DescriptionType',
        ps: [{
            n: 'profile',
            mno: 0,
            col: true,
            en: 'Profile'
          }, {
            n: 'wsdl',
            en: 'WSDL',
            ti: '.WSDL'
          }, {
            n: 'processVersion',
            rq: true,
            an: {
              lp: 'processVersion',
              ns: 'http:\/\/www.opengis.net\/wps\/1.0.0'
            },
            t: 'a'
          }]
      }, {
        ln: 'ExecuteResponse',
        tn: null,
        bti: '.ResponseBaseType',
        ps: [{
            n: 'process',
            rq: true,
            en: 'Process',
            ti: '.ProcessBriefType'
          }, {
            n: 'status',
            rq: true,
            en: 'Status',
            ti: '.StatusType'
          }, {
            n: 'dataInputs',
            en: 'DataInputs',
            ti: '.DataInputsType'
          }, {
            n: 'outputDefinitions',
            en: 'OutputDefinitions',
            ti: '.OutputDefinitionsType'
          }, {
            n: 'processOutputs',
            en: 'ProcessOutputs',
            ti: '.ExecuteResponse.ProcessOutputs'
          }, {
            n: 'serviceInstance',
            rq: true,
            an: {
              lp: 'serviceInstance'
            },
            t: 'a'
          }, {
            n: 'statusLocation',
            an: {
              lp: 'statusLocation'
            },
            t: 'a'
          }]
      }, {
        ln: 'LiteralOutputType',
        ps: [{
            n: 'dataType',
            en: {
              lp: 'DataType',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.DomainMetadataType'
          }, {
            n: 'uoMs',
            en: {
              lp: 'UOMs'
            },
            ti: '.SupportedUOMsType'
          }]
      }, {
        ln: 'SupportedCRSsType',
        ps: [{
            n: '_default',
            rq: true,
            en: {
              lp: 'Default'
            },
            ti: '.SupportedCRSsType.Default'
          }, {
            n: 'supported',
            rq: true,
            en: {
              lp: 'Supported'
            },
            ti: '.CRSsType'
          }]
      }, {
        ln: 'GetCapabilities',
        tn: null,
        ps: [{
            n: 'acceptVersions',
            en: 'AcceptVersions',
            ti: 'OWS_1_1_0.AcceptVersionsType'
          }, {
            n: 'service',
            rq: true,
            an: {
              lp: 'service'
            },
            t: 'a'
          }, {
            n: 'language',
            an: {
              lp: 'language'
            },
            t: 'a'
          }]
      }, {
        ln: 'SupportedCRSsType.Default',
        tn: null,
        ps: [{
            n: 'crs',
            rq: true,
            en: {
              lp: 'CRS'
            }
          }]
      }, {
        ln: 'OutputDefinitionsType',
        ps: [{
            n: 'output',
            rq: true,
            col: true,
            en: 'Output',
            ti: '.DocumentOutputDefinitionType'
          }]
      }, {
        ln: 'Languages.Default',
        tn: null,
        ps: [{
            n: 'language',
            rq: true,
            en: {
              lp: 'Language',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'Language'
          }]
      }, {
        ln: 'ProcessDescriptionType.DataInputs',
        tn: null,
        ps: [{
            n: 'input',
            rq: true,
            col: true,
            en: {
              lp: 'Input'
            },
            ti: '.InputDescriptionType'
          }]
      }, {
        ln: 'ProcessDescriptionType.ProcessOutputs',
        tn: null,
        ps: [{
            n: 'output',
            rq: true,
            col: true,
            en: {
              lp: 'Output'
            },
            ti: '.OutputDescriptionType'
          }]
      }, {
        ln: 'ComplexDataType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'mimeType',
            an: {
              lp: 'mimeType'
            },
            t: 'a'
          }, {
            n: 'encoding',
            an: {
              lp: 'encoding'
            },
            t: 'a'
          }, {
            n: 'schema',
            an: {
              lp: 'schema'
            },
            t: 'a'
          }]
      }, {
        ln: 'DataType',
        ps: [{
            n: 'complexData',
            rq: true,
            en: 'ComplexData',
            ti: '.ComplexDataType'
          }, {
            n: 'literalData',
            rq: true,
            en: 'LiteralData',
            ti: '.LiteralDataType'
          }, {
            n: 'boundingBoxData',
            rq: true,
            en: 'BoundingBoxData',
            ti: 'OWS_1_1_0.BoundingBoxType'
          }]
      }, {
        ln: 'WSDL',
        tn: null,
        ps: [{
            n: 'href',
            rq: true,
            an: {
              lp: 'href',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }]
      }, {
        ln: 'InputReferenceType.BodyReference',
        tn: null,
        ps: [{
            n: 'href',
            rq: true,
            an: {
              lp: 'href',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }]
      }, {
        ln: 'DataInputsType',
        ps: [{
            n: 'input',
            rq: true,
            col: true,
            en: 'Input',
            ti: '.InputType'
          }]
      }, {
        ln: 'ComplexDataCombinationsType',
        ps: [{
            n: 'format',
            rq: true,
            col: true,
            en: {
              lp: 'Format'
            },
            ti: '.ComplexDataDescriptionType'
          }]
      }, {
        ln: 'DescribeProcess',
        tn: null,
        bti: '.RequestBaseType',
        ps: [{
            n: 'identifier',
            rq: true,
            col: true,
            en: {
              lp: 'Identifier',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.CodeType'
          }]
      }, {
        ln: 'OutputDataType',
        bti: '.DescriptionType',
        ps: [{
            n: 'reference',
            rq: true,
            en: 'Reference',
            ti: '.OutputReferenceType'
          }, {
            n: 'data',
            rq: true,
            en: 'Data',
            ti: '.DataType'
          }]
      }, {
        ln: 'ProcessFailedType',
        ps: [{
            n: 'exceptionReport',
            rq: true,
            en: {
              lp: 'ExceptionReport',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.ExceptionReport'
          }]
      }, {
        ln: 'ComplexDataCombinationType',
        ps: [{
            n: 'format',
            rq: true,
            en: {
              lp: 'Format'
            },
            ti: '.ComplexDataDescriptionType'
          }]
      }, {
        ln: 'ProcessOfferings',
        tn: null,
        ps: [{
            n: 'process',
            rq: true,
            col: true,
            en: 'Process',
            ti: '.ProcessBriefType'
          }]
      }, {
        ln: 'SupportedUOMsType',
        ps: [{
            n: '_default',
            rq: true,
            en: {
              lp: 'Default'
            },
            ti: '.SupportedUOMsType.Default'
          }, {
            n: 'supported',
            rq: true,
            en: {
              lp: 'Supported'
            },
            ti: '.UOMsType'
          }]
      }, {
        ln: 'RequestBaseType',
        ps: [{
            n: 'service',
            rq: true,
            an: {
              lp: 'service'
            },
            t: 'a'
          }, {
            n: 'version',
            rq: true,
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'language',
            an: {
              lp: 'language'
            },
            t: 'a'
          }]
      }, {
        ln: 'OutputDefinitionType',
        ps: [{
            n: 'identifier',
            rq: true,
            en: {
              lp: 'Identifier',
              ns: 'http:\/\/www.opengis.net\/ows\/1.1'
            },
            ti: 'OWS_1_1_0.CodeType'
          }, {
            n: 'uom',
            an: {
              lp: 'uom'
            },
            t: 'a'
          }, {
            n: 'mimeType',
            an: {
              lp: 'mimeType'
            },
            t: 'a'
          }, {
            n: 'encoding',
            an: {
              lp: 'encoding'
            },
            t: 'a'
          }, {
            n: 'schema',
            an: {
              lp: 'schema'
            },
            t: 'a'
          }]
      }],
    eis: [{
        en: 'ProcessOfferings',
        ti: '.ProcessOfferings'
      }, {
        en: 'Capabilities',
        ti: '.WPSCapabilitiesType'
      }, {
        en: 'Execute',
        ti: '.Execute'
      }, {
        en: 'WSDL',
        ti: '.WSDL'
      }, {
        en: 'ProcessDescriptions',
        ti: '.ProcessDescriptions'
      }, {
        en: 'ExecuteResponse',
        ti: '.ExecuteResponse'
      }, {
        en: 'DescribeProcess',
        ti: '.DescribeProcess'
      }, {
        en: 'GetCapabilities',
        ti: '.GetCapabilities'
      }, {
        en: 'Languages',
        ti: '.Languages'
      }]
  };
  return {
    WPS_1_0_0: WPS_1_0_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WPS_1_0_0_Module_Factory);
}
else {
  var WPS_1_0_0_Module = WPS_1_0_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WPS_1_0_0 = WPS_1_0_0_Module.WPS_1_0_0;
  }
  else {
    var WPS_1_0_0 = WPS_1_0_0_Module.WPS_1_0_0;
  }
}
},{}],17:[function(require,module,exports){
var XLink_1_0_Module_Factory = function () {
  var XLink_1_0 = {
    n: 'XLink_1_0',
    dens: 'http:\/\/www.w3.org\/1999\/xlink',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    tis: [{
        ln: 'Simple',
        tn: 'simple',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'Token',
            t: 'a'
          }]
      }, {
        ln: 'ArcType',
        tn: 'arcType',
        ps: [{
            n: 'locatorTitle',
            mno: 0,
            col: true,
            en: 'title',
            ti: '.TitleEltType'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'from',
            ti: 'NCName',
            t: 'a'
          }, {
            n: 'to',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        ln: 'TitleEltType',
        tn: 'titleEltType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'ResourceType',
        tn: 'resourceType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'label',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        ln: 'LocatorType',
        tn: 'locatorType',
        ps: [{
            n: 'locatorTitle',
            mno: 0,
            col: true,
            en: 'title',
            ti: '.TitleEltType'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'href',
            rq: true,
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'label',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        ln: 'Extended',
        tn: 'extended',
        ps: [{
            n: 'extendedModel',
            mno: 0,
            col: true,
            etis: [{
                en: 'title',
                ti: '.TitleEltType'
              }, {
                en: 'resource',
                ti: '.ResourceType'
              }, {
                en: 'locator',
                ti: '.LocatorType'
              }, {
                en: 'arc',
                ti: '.ArcType'
              }],
            t: 'es'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'ActuateType',
        bti: 'Token',
        vs: ['onLoad', 'onRequest', 'other', 'none']
      }, {
        t: 'enum',
        ln: 'ShowType',
        bti: 'Token',
        vs: ['new', 'replace', 'embed', 'other', 'none']
      }, {
        t: 'enum',
        ln: 'TypeType',
        bti: 'Token',
        vs: ['simple', 'extended', 'title', 'resource', 'locator', 'arc']
      }],
    eis: [{
        en: 'locator',
        ti: '.LocatorType'
      }, {
        en: 'title',
        ti: '.TitleEltType'
      }, {
        en: 'arc',
        ti: '.ArcType'
      }, {
        en: 'resource',
        ti: '.ResourceType'
      }]
  };
  return {
    XLink_1_0: XLink_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], XLink_1_0_Module_Factory);
}
else {
  var XLink_1_0_Module = XLink_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.XLink_1_0 = XLink_1_0_Module.XLink_1_0;
  }
  else {
    var XLink_1_0 = XLink_1_0_Module.XLink_1_0;
  }
}
},{}],18:[function(require,module,exports){
var XSD_1_0_Module_Factory = function () {
  var XSD_1_0 = {
    n: 'XSD_1_0',
    dens: 'http:\/\/www.w3.org\/2001\/XMLSchema',
    tis: [{
        ln: 'Annotation',
        tn: null,
        bti: '.OpenAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'appinfo',
            mno: 0,
            col: true,
            ti: '.Appinfo'
          }, {
            n: 'documentation',
            mno: 0,
            col: true,
            ti: '.Documentation'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'Union',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            mno: 0,
            col: true,
            ti: '.LocalSimpleType'
          }, {
            n: 'memberTypes',
            ti: {
              t: 'l',
              bti: 'QName'
            },
            an: {
              lp: 'memberTypes'
            },
            t: 'a'
          }]
      }, {
        ln: 'Redefine',
        tn: null,
        bti: '.OpenAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'annotation',
            mno: 0,
            col: true,
            ti: '.Annotation'
          }, {
            n: 'simpleType',
            mno: 0,
            col: true,
            ti: '.TopLevelSimpleType'
          }, {
            n: 'complexType',
            mno: 0,
            col: true,
            ti: '.TopLevelComplexType'
          }, {
            n: 'group',
            mno: 0,
            col: true,
            ti: '.NamedGroup'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.NamedAttributeGroup'
          }, {
            n: 'schemaLocation',
            rq: true,
            an: {
              lp: 'schemaLocation'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'ComplexRestrictionType',
        tn: 'complexRestrictionType',
        bti: '.RestrictionType'
      }, {
        ln: 'NarrowMaxMin',
        tn: 'narrowMaxMin',
        bti: '.LocalElement'
      }, {
        ln: 'Notation',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'name',
            rq: true,
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: '_public',
            ti: 'Token',
            an: {
              lp: 'public'
            },
            t: 'a'
          }, {
            n: 'system',
            an: {
              lp: 'system'
            },
            t: 'a'
          }]
      }, {
        ln: 'Annotated',
        tn: 'annotated',
        bti: '.OpenAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'annotation',
            ti: '.Annotation'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'Selector',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'xpath',
            rq: true,
            an: {
              lp: 'xpath'
            },
            t: 'a'
          }]
      }, {
        ln: 'SimpleType',
        tn: 'simpleType',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'restriction',
            rq: true,
            ti: '.Restriction'
          }, {
            n: 'list',
            rq: true,
            ti: '.List'
          }, {
            n: 'union',
            rq: true,
            ti: '.Union'
          }, {
            n: '_final',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'final'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'NamedAttributeGroup',
        tn: 'namedAttributeGroup',
        bti: '.AttributeGroup'
      }, {
        ln: 'Attribute',
        tn: 'attribute',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            ti: '.LocalSimpleType'
          }, {
            n: 'type',
            ti: 'QName',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'use',
            an: {
              lp: 'use'
            },
            t: 'a'
          }, {
            n: '_default',
            an: {
              lp: 'default'
            },
            t: 'a'
          }, {
            n: 'fixed',
            an: {
              lp: 'fixed'
            },
            t: 'a'
          }, {
            n: 'form',
            ti: 'NMToken',
            an: {
              lp: 'form'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'ref',
            ti: 'QName',
            an: {
              lp: 'ref'
            },
            t: 'a'
          }]
      }, {
        ln: 'SimpleExplicitGroup',
        tn: 'simpleExplicitGroup',
        bti: '.ExplicitGroup'
      }, {
        ln: 'LocalComplexType',
        tn: 'localComplexType',
        bti: '.ComplexType'
      }, {
        ln: 'Appinfo',
        tn: null,
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'source',
            an: {
              lp: 'source'
            },
            t: 'a'
          }]
      }, {
        ln: 'RestrictionType',
        tn: 'restrictionType',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'group',
            rq: true,
            ti: '.GroupRef'
          }, {
            n: 'all',
            rq: true,
            ti: '.All'
          }, {
            n: 'choice',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'sequence',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'simpleType',
            ti: '.LocalSimpleType'
          }, {
            n: 'whiteSpace',
            col: true,
            ti: '.WhiteSpace'
          }, {
            n: 'length',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'enumeration',
            col: true,
            ti: '.NoFixedFacet'
          }, {
            n: 'minExclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'maxExclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'maxLength',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'pattern',
            col: true,
            ti: '.Pattern'
          }, {
            n: 'minInclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'minLength',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'fractionDigits',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'totalDigits',
            col: true,
            ti: '.TotalDigits'
          }, {
            n: 'maxInclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.Attribute'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.AttributeGroupRef'
          }, {
            n: 'anyAttribute',
            ti: '.Wildcard'
          }, {
            n: 'base',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'base'
            },
            t: 'a'
          }]
      }, {
        ln: 'Import',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'namespace',
            an: {
              lp: 'namespace'
            },
            t: 'a'
          }, {
            n: 'schemaLocation',
            an: {
              lp: 'schemaLocation'
            },
            t: 'a'
          }]
      }, {
        ln: 'List',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            ti: '.LocalSimpleType'
          }, {
            n: 'itemType',
            ti: 'QName',
            an: {
              lp: 'itemType'
            },
            t: 'a'
          }]
      }, {
        ln: 'AttributeGroup',
        tn: 'attributeGroup',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.Attribute'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.AttributeGroupRef'
          }, {
            n: 'anyAttribute',
            ti: '.Wildcard'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'ref',
            ti: 'QName',
            an: {
              lp: 'ref'
            },
            t: 'a'
          }]
      }, {
        ln: 'Pattern',
        tn: null,
        bti: '.NoFixedFacet'
      }, {
        ln: 'Element',
        tn: 'element',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            rq: true,
            ti: '.LocalSimpleType'
          }, {
            n: 'complexType',
            rq: true,
            ti: '.LocalComplexType'
          }, {
            n: 'unique',
            col: true,
            ti: '.Keybase'
          }, {
            n: 'key',
            col: true,
            ti: '.Keybase'
          }, {
            n: 'keyref',
            col: true,
            ti: '.Keyref'
          }, {
            n: 'type',
            ti: 'QName',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'substitutionGroup',
            ti: 'QName',
            an: {
              lp: 'substitutionGroup'
            },
            t: 'a'
          }, {
            n: '_default',
            an: {
              lp: 'default'
            },
            t: 'a'
          }, {
            n: 'fixed',
            an: {
              lp: 'fixed'
            },
            t: 'a'
          }, {
            n: 'nillable',
            ti: 'Boolean',
            an: {
              lp: 'nillable'
            },
            t: 'a'
          }, {
            n: '_abstract',
            ti: 'Boolean',
            an: {
              lp: 'abstract'
            },
            t: 'a'
          }, {
            n: '_final',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'final'
            },
            t: 'a'
          }, {
            n: 'block',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'block'
            },
            t: 'a'
          }, {
            n: 'form',
            ti: 'NMToken',
            an: {
              lp: 'form'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'ref',
            ti: 'QName',
            an: {
              lp: 'ref'
            },
            t: 'a'
          }, {
            n: 'minOccurs',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'minOccurs'
            },
            t: 'a'
          }, {
            n: 'maxOccurs',
            an: {
              lp: 'maxOccurs'
            },
            t: 'a'
          }]
      }, {
        ln: 'Keyref',
        tn: null,
        bti: '.Keybase',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'refer',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'refer'
            },
            t: 'a'
          }]
      }, {
        ln: 'NamedGroup',
        tn: 'namedGroup',
        bti: '.RealGroup'
      }, {
        ln: 'LocalElement',
        tn: 'localElement',
        bti: '.Element'
      }, {
        ln: 'Schema',
        tn: null,
        bti: '.OpenAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'include',
            mno: 0,
            col: true,
            ti: '.Include'
          }, {
            n: '_import',
            mno: 0,
            col: true,
            en: 'import',
            ti: '.Import'
          }, {
            n: 'redefine',
            mno: 0,
            col: true,
            ti: '.Redefine'
          }, {
            n: 'simpleType',
            mno: 0,
            col: true,
            ti: '.TopLevelSimpleType'
          }, {
            n: 'complexType',
            mno: 0,
            col: true,
            ti: '.TopLevelComplexType'
          }, {
            n: 'group',
            mno: 0,
            col: true,
            ti: '.NamedGroup'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.NamedAttributeGroup'
          }, {
            n: 'element',
            mno: 0,
            col: true,
            ti: '.TopLevelElement'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.TopLevelAttribute'
          }, {
            n: 'notation',
            mno: 0,
            col: true,
            ti: '.Notation'
          }, {
            n: 'annotation',
            mno: 0,
            col: true,
            ti: '.Annotation'
          }, {
            n: 'targetNamespace',
            an: {
              lp: 'targetNamespace'
            },
            t: 'a'
          }, {
            n: 'version',
            ti: 'Token',
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'finalDefault',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'finalDefault'
            },
            t: 'a'
          }, {
            n: 'blockDefault',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'blockDefault'
            },
            t: 'a'
          }, {
            n: 'attributeFormDefault',
            ti: 'NMToken',
            an: {
              lp: 'attributeFormDefault'
            },
            t: 'a'
          }, {
            n: 'elementFormDefault',
            ti: 'NMToken',
            an: {
              lp: 'elementFormDefault'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'Documentation',
        tn: null,
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'source',
            an: {
              lp: 'source'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'Wildcard',
        tn: 'wildcard',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'namespace',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'namespace'
            },
            t: 'a'
          }, {
            n: 'processContents',
            an: {
              lp: 'processContents'
            },
            t: 'a'
          }]
      }, {
        ln: 'Facet',
        tn: 'facet',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'value',
            rq: true,
            ti: 'AnySimpleType',
            an: {
              lp: 'value'
            },
            t: 'a'
          }, {
            n: 'fixed',
            ti: 'Boolean',
            an: {
              lp: 'fixed'
            },
            t: 'a'
          }]
      }, {
        ln: 'OpenAttrs',
        tn: 'openAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }]
      }, {
        ln: 'WhiteSpace',
        tn: null,
        bti: '.Facet'
      }, {
        ln: 'Group',
        tn: 'group',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'choice',
            col: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'all',
            col: true,
            ti: '.All'
          }, {
            n: 'element',
            col: true,
            ti: '.LocalElement'
          }, {
            n: 'sequence',
            col: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'group',
            col: true,
            ti: '.GroupRef'
          }, {
            n: 'any',
            col: true,
            ti: '.Any'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'ref',
            ti: 'QName',
            an: {
              lp: 'ref'
            },
            t: 'a'
          }, {
            n: 'minOccurs',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'minOccurs'
            },
            t: 'a'
          }, {
            n: 'maxOccurs',
            an: {
              lp: 'maxOccurs'
            },
            t: 'a'
          }]
      }, {
        ln: 'TopLevelComplexType',
        tn: 'topLevelComplexType',
        bti: '.ComplexType'
      }, {
        ln: 'NoFixedFacet',
        tn: 'noFixedFacet',
        bti: '.Facet'
      }, {
        ln: 'GroupRef',
        tn: 'groupRef',
        bti: '.RealGroup'
      }, {
        ln: 'LocalSimpleType',
        tn: 'localSimpleType',
        bti: '.SimpleType'
      }, {
        ln: 'SimpleExtensionType',
        tn: 'simpleExtensionType',
        bti: '.ExtensionType'
      }, {
        ln: 'Any',
        tn: null,
        bti: '.Wildcard',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'minOccurs',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'minOccurs'
            },
            t: 'a'
          }, {
            n: 'maxOccurs',
            an: {
              lp: 'maxOccurs'
            },
            t: 'a'
          }]
      }, {
        ln: 'TotalDigits',
        tn: null,
        bti: '.NumFacet'
      }, {
        ln: 'ExtensionType',
        tn: 'extensionType',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'group',
            rq: true,
            ti: '.GroupRef'
          }, {
            n: 'all',
            rq: true,
            ti: '.All'
          }, {
            n: 'choice',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'sequence',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.Attribute'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.AttributeGroupRef'
          }, {
            n: 'anyAttribute',
            ti: '.Wildcard'
          }, {
            n: 'base',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'base'
            },
            t: 'a'
          }]
      }, {
        ln: 'ComplexContent',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'restriction',
            rq: true,
            ti: '.ComplexRestrictionType'
          }, {
            n: 'extension',
            rq: true,
            ti: '.ExtensionType'
          }, {
            n: 'mixed',
            ti: 'Boolean',
            an: {
              lp: 'mixed'
            },
            t: 'a'
          }]
      }, {
        ln: 'SimpleRestrictionType',
        tn: 'simpleRestrictionType',
        bti: '.RestrictionType'
      }, {
        ln: 'TopLevelElement',
        tn: 'topLevelElement',
        bti: '.Element'
      }, {
        ln: 'ExplicitGroup',
        tn: 'explicitGroup',
        bti: '.Group'
      }, {
        ln: 'Restriction',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            ti: '.LocalSimpleType'
          }, {
            n: 'whiteSpace',
            col: true,
            ti: '.WhiteSpace'
          }, {
            n: 'length',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'enumeration',
            col: true,
            ti: '.NoFixedFacet'
          }, {
            n: 'minExclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'maxExclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'maxLength',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'pattern',
            col: true,
            ti: '.Pattern'
          }, {
            n: 'minInclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'minLength',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'fractionDigits',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'totalDigits',
            col: true,
            ti: '.TotalDigits'
          }, {
            n: 'maxInclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'base',
            ti: 'QName',
            an: {
              lp: 'base'
            },
            t: 'a'
          }]
      }, {
        ln: 'All',
        tn: 'all',
        bti: '.ExplicitGroup'
      }, {
        ln: 'Keybase',
        tn: 'keybase',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'selector',
            rq: true,
            ti: '.Selector'
          }, {
            n: 'field',
            rq: true,
            col: true,
            ti: '.Field'
          }, {
            n: 'name',
            rq: true,
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'AttributeGroupRef',
        tn: 'attributeGroupRef',
        bti: '.AttributeGroup'
      }, {
        ln: 'SimpleContent',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'restriction',
            rq: true,
            ti: '.SimpleRestrictionType'
          }, {
            n: 'extension',
            rq: true,
            ti: '.SimpleExtensionType'
          }]
      }, {
        ln: 'RealGroup',
        tn: 'realGroup',
        bti: '.Group'
      }, {
        ln: 'Include',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'schemaLocation',
            rq: true,
            an: {
              lp: 'schemaLocation'
            },
            t: 'a'
          }]
      }, {
        ln: 'Field',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'xpath',
            rq: true,
            an: {
              lp: 'xpath'
            },
            t: 'a'
          }]
      }, {
        ln: 'NumFacet',
        tn: 'numFacet',
        bti: '.Facet'
      }, {
        ln: 'ComplexType',
        tn: 'complexType',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleContent',
            rq: true,
            ti: '.SimpleContent'
          }, {
            n: 'complexContent',
            rq: true,
            ti: '.ComplexContent'
          }, {
            n: 'group',
            rq: true,
            ti: '.GroupRef'
          }, {
            n: 'all',
            rq: true,
            ti: '.All'
          }, {
            n: 'choice',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'sequence',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.Attribute'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.AttributeGroupRef'
          }, {
            n: 'anyAttribute',
            ti: '.Wildcard'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'mixed',
            ti: 'Boolean',
            an: {
              lp: 'mixed'
            },
            t: 'a'
          }, {
            n: '_abstract',
            ti: 'Boolean',
            an: {
              lp: 'abstract'
            },
            t: 'a'
          }, {
            n: '_final',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'final'
            },
            t: 'a'
          }, {
            n: 'block',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'block'
            },
            t: 'a'
          }]
      }, {
        ln: 'TopLevelSimpleType',
        tn: 'topLevelSimpleType',
        bti: '.SimpleType'
      }, {
        ln: 'TopLevelAttribute',
        tn: 'topLevelAttribute',
        bti: '.Attribute'
      }, {
        t: 'enum',
        ln: 'TypeDerivationControl',
        bti: 'NMToken',
        vs: ['extension', 'restriction', 'list', 'union']
      }, {
        t: 'enum',
        ln: 'DerivationControl',
        bti: 'NMToken',
        vs: ['substitution', 'extension', 'restriction', 'list', 'union']
      }, {
        t: 'enum',
        ln: 'FormChoice',
        bti: 'NMToken',
        vs: ['qualified', 'unqualified']
      }, {
        t: 'enum',
        ln: 'ReducedDerivationControl',
        bti: 'NMToken',
        vs: ['extension', 'restriction']
      }],
    eis: [{
        en: 'union',
        ti: '.Union'
      }, {
        en: 'documentation',
        ti: '.Documentation'
      }, {
        en: 'simpleType',
        ti: '.TopLevelSimpleType'
      }, {
        en: 'appinfo',
        ti: '.Appinfo'
      }, {
        en: 'all',
        ti: '.All'
      }, {
        en: 'complexContent',
        ti: '.ComplexContent'
      }, {
        en: 'annotation',
        ti: '.Annotation'
      }, {
        en: 'totalDigits',
        ti: '.TotalDigits'
      }, {
        en: 'selector',
        ti: '.Selector'
      }, {
        en: 'complexType',
        ti: '.TopLevelComplexType'
      }, {
        en: 'length',
        ti: '.NumFacet'
      }, {
        en: 'attribute',
        ti: '.TopLevelAttribute'
      }, {
        en: 'enumeration',
        ti: '.NoFixedFacet'
      }, {
        en: 'group',
        ti: '.NamedGroup'
      }, {
        en: 'list',
        ti: '.List'
      }, {
        en: 'maxLength',
        ti: '.NumFacet'
      }, {
        en: 'minExclusive',
        ti: '.Facet'
      }, {
        en: 'unique',
        ti: '.Keybase'
      }, {
        en: 'attributeGroup',
        ti: '.NamedAttributeGroup'
      }, {
        en: 'group',
        ti: '.GroupRef',
        sc: '.Group'
      }, {
        en: 'redefine',
        ti: '.Redefine'
      }, {
        en: 'restriction',
        ti: '.Restriction'
      }, {
        en: 'simpleContent',
        ti: '.SimpleContent'
      }, {
        en: 'fractionDigits',
        ti: '.NumFacet'
      }, {
        en: 'choice',
        ti: '.ExplicitGroup'
      }, {
        en: 'schema',
        ti: '.Schema'
      }, {
        en: 'import',
        ti: '.Import'
      }, {
        en: 'whiteSpace',
        ti: '.WhiteSpace'
      }, {
        en: 'field',
        ti: '.Field'
      }, {
        en: 'element',
        ti: '.TopLevelElement'
      }, {
        en: 'minLength',
        ti: '.NumFacet'
      }, {
        en: 'any',
        ti: '.Any'
      }, {
        en: 'anyAttribute',
        ti: '.Wildcard'
      }, {
        en: 'key',
        ti: '.Keybase'
      }, {
        en: 'include',
        ti: '.Include'
      }, {
        en: 'maxExclusive',
        ti: '.Facet'
      }, {
        en: 'element',
        ti: '.LocalElement',
        sc: '.Group'
      }, {
        en: 'maxInclusive',
        ti: '.Facet'
      }, {
        en: 'keyref',
        ti: '.Keyref'
      }, {
        en: 'minInclusive',
        ti: '.Facet'
      }, {
        en: 'pattern',
        ti: '.Pattern'
      }, {
        en: 'sequence',
        ti: '.ExplicitGroup'
      }, {
        en: 'notation',
        ti: '.Notation'
      }]
  };
  return {
    XSD_1_0: XSD_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], XSD_1_0_Module_Factory);
}
else {
  var XSD_1_0_Module = XSD_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.XSD_1_0 = XSD_1_0_Module.XSD_1_0;
  }
  else {
    var XSD_1_0 = XSD_1_0_Module.XSD_1_0;
  }
}
},{}],19:[function(require,module,exports){
(function (process,__filename){
/** vim: et:ts=4:sw=4:sts=4
 * @license amdefine 1.0.1 Copyright (c) 2011-2016, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/amdefine for details
 */

/*jslint node: true */
/*global module, process */
'use strict';

/**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
function amdefine(module, requireFn) {
    'use strict';
    var defineCache = {},
        loaderCache = {},
        alreadyCalled = false,
        path = require('path'),
        makeRequire, stringRequire;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
        var i, part;
        for (i = 0; ary[i]; i+= 1) {
            part = ary[i];
            if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
            } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                    //End of the line. Keep at least one non-dot
                    //path segment at the front so it can be mapped
                    //correctly to disk. Otherwise, there is likely
                    //no path mapping for a path starting with '..'.
                    //This can still fail, but catches the most reasonable
                    //uses of ..
                    break;
                } else if (i > 0) {
                    ary.splice(i - 1, 2);
                    i -= 2;
                }
            }
        }
    }

    function normalize(name, baseName) {
        var baseParts;

        //Adjust any relative paths.
        if (name && name.charAt(0) === '.') {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
            }
        }

        return name;
    }

    /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(id) {
        function load(value) {
            loaderCache[id] = value;
        }

        load.fromText = function (id, text) {
            //This one is difficult because the text can/probably uses
            //define, and any relative paths and requires should be relative
            //to that id was it would be found on disk. But this would require
            //bootstrapping a module/require fairly deeply from node core.
            //Not sure how best to go about that yet.
            throw new Error('amdefine does not implement load.fromText');
        };

        return load;
    }

    makeRequire = function (systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
            if (typeof deps === 'string') {
                //Synchronous, single module require('')
                return stringRequire(systemRequire, exports, module, deps, relId);
            } else {
                //Array of dependencies with a callback.

                //Convert the dependencies to modules.
                deps = deps.map(function (depName) {
                    return stringRequire(systemRequire, exports, module, depName, relId);
                });

                //Wait for next tick to call back the require call.
                if (callback) {
                    process.nextTick(function () {
                        callback.apply(null, deps);
                    });
                }
            }
        }

        amdRequire.toUrl = function (filePath) {
            if (filePath.indexOf('.') === 0) {
                return normalize(filePath, path.dirname(module.filename));
            } else {
                return filePath;
            }
        };

        return amdRequire;
    };

    //Favor explicit value, passed in if the module wants to support Node 0.4.
    requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
    };

    function runFactory(id, deps, factory) {
        var r, e, m, result;

        if (id) {
            e = loaderCache[id] = {};
            m = {
                id: id,
                uri: __filename,
                exports: e
            };
            r = makeRequire(requireFn, e, m, id);
        } else {
            //Only support one define call per file
            if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
            }
            alreadyCalled = true;

            //Use the real variables from node
            //Use module.exports for exports, since
            //the exports in here is amdefine exports.
            e = module.exports;
            m = module;
            r = makeRequire(requireFn, e, m, module.id);
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return r(depName);
            });
        }

        //Call the factory with the right dependencies.
        if (typeof factory === 'function') {
            result = factory.apply(m.exports, deps);
        } else {
            result = factory;
        }

        if (result !== undefined) {
            m.exports = result;
            if (id) {
                loaderCache[id] = m.exports;
            }
        }
    }

    stringRequire = function (systemRequire, exports, module, id, relId) {
        //Split the ID by a ! so that
        var index = id.indexOf('!'),
            originalId = id,
            prefix, plugin;

        if (index === -1) {
            id = normalize(id, relId);

            //Straight module lookup. If it is one of the special dependencies,
            //deal with it, otherwise, delegate to node.
            if (id === 'require') {
                return makeRequire(systemRequire, exports, module, relId);
            } else if (id === 'exports') {
                return exports;
            } else if (id === 'module') {
                return module;
            } else if (loaderCache.hasOwnProperty(id)) {
                return loaderCache[id];
            } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                return loaderCache[id];
            } else {
                if(systemRequire) {
                    return systemRequire(originalId);
                } else {
                    throw new Error('No module with ID: ' + id);
                }
            }
        } else {
            //There is a plugin in play.
            prefix = id.substring(0, index);
            id = id.substring(index + 1, id.length);

            plugin = stringRequire(systemRequire, exports, module, prefix, relId);

            if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
            } else {
                //Normalize the ID normally.
                id = normalize(id, relId);
            }

            if (loaderCache[id]) {
                return loaderCache[id];
            } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                return loaderCache[id];
            }
        }
    };

    //Create a define function specific to the module asking for amdefine.
    function define(id, deps, factory) {
        if (Array.isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        } else if (typeof id !== 'string') {
            factory = id;
            id = deps = undefined;
        }

        if (deps && !Array.isArray(deps)) {
            factory = deps;
            deps = undefined;
        }

        if (!deps) {
            deps = ['require', 'exports', 'module'];
        }

        //Set up properties for this module. If an ID, then use
        //internal cache. If no ID, then use the external variables
        //for this node module.
        if (id) {
            //Put the module in deep freeze until there is a
            //require call for it.
            defineCache[id] = [id, deps, factory];
        } else {
            runFactory(id, deps, factory);
        }
    }

    //define.require, which has access to all the values in the
    //cache. Useful for AMD modules that all have IDs in the file,
    //but need to finally export a value to node based on one of those
    //IDs.
    define.require = function (id) {
        if (loaderCache[id]) {
            return loaderCache[id];
        }

        if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
        }
    };

    define.amd = {};

    return define;
}

module.exports = amdefine;

}).call(this,require('_process'),"/node_modules/amdefine/amdefine.js")
},{"_process":21,"path":20}],20:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":21}],21:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[1])(1)
});