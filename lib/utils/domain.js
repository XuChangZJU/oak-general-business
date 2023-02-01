"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeDomainUrl = void 0;
var tslib_1 = require("tslib");
function composeDomainUrl(domain, url, props) {
    var e_1, _a;
    var port = domain.port, protocol = domain.protocol, apiPath = domain.apiPath, domainUrl = domain.url;
    var Url = "".concat(protocol, "://").concat(domainUrl);
    if (port) {
        Url += ":".concat(port);
    }
    if (url) {
        Url += "/".concat(url);
        if (props) {
            var k = Object.keys(props);
            if (k.length > 0) {
                try {
                    for (var k_1 = tslib_1.__values(k), k_1_1 = k_1.next(); !k_1_1.done; k_1_1 = k_1.next()) {
                        var k2 = k_1_1.value;
                        Url += Url.includes('?') ? '&' : '?';
                        Url += "".concat(k2, "=").concat(encodeURI(props[k2]));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (k_1_1 && !k_1_1.done && (_a = k_1.return)) _a.call(k_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
    }
    return Url;
}
exports.composeDomainUrl = composeDomainUrl;
