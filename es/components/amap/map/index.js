import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Map, APILoader } from '@uiw/react-amap';
import classNames from 'classnames';
import './index.less';
;
const memo = (props) => {
    const { akey, securityJsCode, serviceHost, version, className, style, children, mapProps = {}, mapRef, useAMapUI, uiVersion = '1.1', uiCallback, } = props;
    const prefixCls = 'oak';
    useEffect(() => {
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
    useEffect(() => {
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
    return (_jsx("div", { style: style, className: classNames(`${prefixCls}-map`, className), children: _jsx(APILoader, { akey: akey, version: version, children: _jsx(Map, { ref: mapRef, ...mapProps, children: children }) }) }));
};
export default memo;
