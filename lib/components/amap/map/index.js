"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_amap_1 = require("@uiw/react-amap");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
;
const memo = (props) => {
    const { akey, securityJsCode, serviceHost, version, className, style, children, mapProps = {}, mapRef, useAMapUI, uiVersion = '1.1', uiCallback, } = props;
    const prefixCls = 'oak';
    (0, react_1.useEffect)(() => {
        // 对安全密钥的支持
        if (serviceHost || securityJsCode) {
            if (serviceHost) {
                window._AMapSecurityConfig = {
                    serviceHost: `${serviceHost}/_AMapService`,
                };
            }
            else {
                window._AMapSecurityConfig = {
                    securityJsCode,
                };
            }
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (!useAMapUI) {
            return;
        }
        if (window.AMap && !window.AMapUI) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `${window.location.protocol}//webapi.amap.com/ui/${uiVersion}/main.js`;
            document.getElementsByTagName('head')[0].appendChild(script);
            script.onload = () => {
                uiCallback && uiCallback('success');
            };
            script.onerror = (error) => {
                uiCallback && uiCallback('fail', error);
            };
        }
    }, [window.AMap, useAMapUI]);
    return ((0, jsx_runtime_1.jsx)("div", { style: style, className: (0, classnames_1.default)(`${prefixCls}-map`, className), children: (0, jsx_runtime_1.jsx)(react_amap_1.APILoader, { akey: akey, version: version, children: (0, jsx_runtime_1.jsx)(react_amap_1.Map, { ref: mapRef, ...mapProps, children: children }) }) }));
};
exports.default = memo;
