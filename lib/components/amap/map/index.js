"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_amap_1 = require("@uiw/react-amap");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
;
var memo = function (props) {
    var akey = props.akey, securityJsCode = props.securityJsCode, serviceHost = props.serviceHost, version = props.version, className = props.className, style = props.style, children = props.children, _a = props.mapProps, mapProps = _a === void 0 ? {} : _a, mapRef = props.mapRef, useAMapUI = props.useAMapUI, _b = props.uiVersion, uiVersion = _b === void 0 ? '1.1' : _b, uiCallback = props.uiCallback;
    var prefixCls = 'oak';
    (0, react_1.useEffect)(function () {
        // 对安全密钥的支持
        if (serviceHost || securityJsCode) {
            if (serviceHost) {
                window._AMapSecurityConfig = {
                    serviceHost: "".concat(serviceHost, "/_AMapService"),
                };
            }
            else {
                window._AMapSecurityConfig = {
                    securityJsCode: securityJsCode,
                };
            }
        }
    }, []);
    (0, react_1.useEffect)(function () {
        if (!useAMapUI) {
            return;
        }
        if (window.AMap && !window.AMapUI) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "".concat(window.location.protocol, "//webapi.amap.com/ui/").concat(uiVersion, "/main.js");
            document.getElementsByTagName('head')[0].appendChild(script);
            script.onload = function () {
                uiCallback && uiCallback('success');
            };
            script.onerror = function (error) {
                uiCallback && uiCallback('fail', error);
            };
        }
    }, [window.AMap, useAMapUI]);
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: style, className: (0, classnames_1.default)("".concat(prefixCls, "-map"), className) }, { children: (0, jsx_runtime_1.jsx)(react_amap_1.APILoader, tslib_1.__assign({ akay: akey, version: version }, { children: (0, jsx_runtime_1.jsx)(react_amap_1.Map, tslib_1.__assign({ ref: mapRef }, mapProps, { children: children })) })) })));
};
exports.default = memo;
