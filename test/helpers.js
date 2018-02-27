$ = require('../node_modules/jquery/dist/jquery.js');

function setInputValue(el, val) {
    el.val(val);
    // tiggerHandler only works with angular element (not jquery)?
    angular.element(el).triggerHandler(sniffer.hasEvent('input') ? 'input' : 'change');
    return el;
}

function click(el) {
    angular.element(el).triggerHandler('click');
}

function compile(html, contents) {
    var scope = $rootScope.$new();
    var el = $compile(html)(scope);
    angular.extend(scope, contents);
    scope.$digest();
    return $(el);
}

function getScope(el) {
    return angular.element(el).scope();
}

exports.inject = function() {
    inject(function(_$compile_, _$rootScope_, $sniffer) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        sniffer = $sniffer;
    });
};
exports.setInputValue = setInputValue;
exports.click = click;
exports.compile = compile;
exports.getScope = getScope;