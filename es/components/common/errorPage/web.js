import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from 'antd';
import { ECode } from '../../../types/ErrorPage';
import { ReactComponent as Light403Icon } from './assets/svg/assets-result-403.svg';
import { ReactComponent as Light404Icon } from './assets/svg/assets-result-404.svg';
import { ReactComponent as Light500Icon } from './assets/svg/assets-result-500.svg';
import { ReactComponent as LightMaintenanceIcon } from './assets/svg/assets-result-maintenance.svg';
import { ReactComponent as LightBrowserIncompatibleIcon } from './assets/svg/assets-result-browser-incompatible.svg';
import { ReactComponent as LightNetworkErrorIcon } from './assets/svg/assets-result-network-error.svg';
import './web.less';
const errorInfo = {
    [ECode.forbidden]: {
        title: '403 Forbidden',
        desc: '抱歉，您无权限访问此页面',
        icon: _jsx(Light403Icon, {}),
    },
    [ECode.notFound]: {
        title: '404 Not Found',
        desc: '抱歉，您访问的页面不存在。',
        icon: _jsx(Light404Icon, {}),
    },
    [ECode.error]: {
        title: '500 Internal Server Error',
        desc: '抱歉，服务器出错啦！',
        icon: _jsx(Light500Icon, {}),
    },
    [ECode.networkError]: {
        title: '网络异常',
        desc: '网络异常，请稍后再试',
        icon: _jsx(LightNetworkErrorIcon, {}),
    },
    [ECode.browserIncompatible]: {
        title: '浏览器版本低',
        desc: '抱歉，您正在使用的浏览器版本过低，无法打开当前网页。',
        icon: _jsx(LightBrowserIncompatibleIcon, {}),
    },
    [ECode.maintenance]: {
        title: '系统维护中',
        desc: '系统维护中，请稍后再试。',
        icon: _jsx(LightMaintenanceIcon, {}),
    },
};
export default function Render(props) {
    const { code, icon, title, desc, children } = props.data;
    const { t, goBack } = props.methods;
    const info = errorInfo[code];
    const prefixCls = 'oak';
    return (_jsxs("div", { className: `${prefixCls}-errorBox`, children: [icon || info?.icon, _jsx("div", { className: `${prefixCls}-errorBox__title`, children: title || info?.title }), _jsx("div", { className: `${prefixCls}-errorBox__description`, children: desc || info?.desc }), children || (_jsx(Button, { type: "primary", onClick: () => {
                    goBack();
                }, children: "\u8FD4\u56DE" }))] }));
}
