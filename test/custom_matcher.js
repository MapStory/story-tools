var customMatchers = {
    toBeXML: function(util, customEqualityTesters) {
        return {
            compare: function(actual, expected) {
                var getChildNodes = function(node) {
                    // ignores whitespace
                    var nodes = [];
                    for (var i = 0, ii=node.childNodes.length; i < ii; i++ ) {
                        var child = node.childNodes[i];
                        if (child.nodeType == 1) {
                            // element node, add it
                            nodes.push(child);
                        } else if (child.nodeType == 3) {
                            // text node, add if non empty
                            if (child.nodeValue &&
                              child.nodeValue.replace(/^\s*(.*?)\s*$/, '$1') !== '') {
                                nodes.push(child);
                            }
                        }
                    }
                    return nodes;
                };
                var assertElementNodesEqual = function(node1, node2, errors) {
                    if (!util.equals(node1.nodeType, node2.nodeType, customEqualityTesters)) {
                        errors.push('nodeType test failed for: ' + node1.nodeName + ' | ' +
                            node2.nodeName);
                    }
                    if (!util.equals(node1.nodeName.split(':').pop(),
                      node2.nodeName.split(':').pop(), customEqualityTesters)) {
                        errors.push('nodeName test failed for: ' + node1.nodeName + ' | ' +
                            node2.nodeName);
                    }
                    // for text nodes compare value
                    if (node1.nodeType === 3) {
                        if (!util.equals(node1.nodeValue.replace(/\s/g, ''),
                          node2.nodeValue.replace(/\s/g, ''), customEqualityTesters)) {
                            errors.push('nodeValue test failed');
                        }
                    }
                    // for element type nodes compare namespace, attributes, and children
                    else if (node1.nodeType === 1) {
                        // test namespace alias and uri
                        if (node1.namespaceURI || node2.namespaceURI) {
                            if (!util.equals(node1.namespaceURI, node2.namespaceURI, customEqualityTesters)) {
                                errors.push('namespaceURI test failed for: ' + node1.nodeName);
                            }
                        }
                        // compare attributes - disregard xmlns given namespace handling above
                        var node1AttrLen = 0;
                        var node1Attr = {};
                        var node2AttrLen = 0;
                        var node2Attr = {};
                        var ga, ea, gn, en;
                        var i, ii;
                        if (node1.attributes) {
                            for (i=0, ii=node1.attributes.length; i<ii; ++i) {
                                ga = node1.attributes[i];
                                if (ga.specified === undefined || ga.specified === true) {
                                    if (ga.name.split(':').shift() != 'xmlns') {
                                        gn = ga.name.split(':').pop();
                                        node1Attr[gn] = ga;
                                        ++node1AttrLen;
                                    }
                                }
                            }
                        }
                        if (node2.attributes) {
                            for (i=0, ii=node2.attributes.length; i<ii; ++i) {
                                ea = node2.attributes[i];
                                if (ea.specified === undefined || ea.specified === true) {
                                    if (ea.name.split(':').shift() != 'xmlns') {
                                        en = ea.name.split(':').pop();
                                        node2Attr[en] = ea;
                                        ++node2AttrLen;
                                    }
                                }
                            }
                        }
                        if (!util.equals(node1AttrLen, node2AttrLen, customEqualityTesters)) {
                            errors.push('Number of attributes test failed for: ' + node1.nodeName);
                        }
                        var gv, ev;
                        for (var name in node1Attr) {
                            if (node2Attr[name] === undefined) {
                                errors.push('Attribute name ' + node1Attr[name].name +
                                    ' expected for element ' + node1.nodeName);
                            }
                            // test attribute namespace
                            // we do not care about the difference between an empty string and
                            // null for namespaceURI some tests will fail in IE9 otherwise
                            // see also 
                            // http://msdn.microsoft.com/en-us/library/ff460650(v=vs.85).aspx
                            if (!util.equals(node1Attr[name].namespaceURI || null,
                              node2Attr[name].namespaceURI || null, customEqualityTesters)) {
                                errors.push('namespaceURI attribute test failed for: ' +
                                    node1.nodeName);
                            }
                            if (!util.equals(node1Attr[name].value, node2Attr[name].value, customEqualityTesters)) {
                                errors.push('Attribute value test failed for: ' + node1.nodeName);
                            }
                        }
                        // compare children
                        var node1ChildNodes = getChildNodes(node1);
                        var node2ChildNodes = getChildNodes(node2);
                        if (!util.equals(node1ChildNodes.length, node2ChildNodes.length, customEqualityTesters)) {
                            errors.push('Number of childNodes test failed for: ' + node1.nodeName);
                        }
                        // only compare if they are equal
                        if (node1ChildNodes.length === node2ChildNodes.length) {
                            for (var j=0, jj=node1ChildNodes.length; j<jj; ++j) {
                                assertElementNodesEqual(node1ChildNodes[j], node2ChildNodes[j], errors);
                            }
                        }
                    }
                };
                if (typeof expected === "string") {
                    expected = new DOMParser().parseFromString(expected, 'application/xml');
                }
                if (actual && actual.nodeType == 9) {
                    actual = actual.documentElement;
                }
                if (expected && expected.nodeType == 9) {
                    expected = expected.documentElement;
                }
                var errors = [];
                assertElementNodesEqual(actual, expected, errors);
                var result = {};
                result.pass = (errors.length === 0);
                if (result.pass) {
                    result.message = "Valid XML output";
                } else {
                    result.message = "Invalid XML output, details: " + errors.join('\n');
                }
                return result;
            }
        };
    }
};
