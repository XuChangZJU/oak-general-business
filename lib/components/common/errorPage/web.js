"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECode = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
// @ts-ignore
const react_router_dom_1 = require("react-router-dom");
const assets_result_403_svg_1 = require("./assets/svg/assets-result-403.svg");
const assets_result_404_svg_1 = require("./assets/svg/assets-result-404.svg");
const assets_result_500_svg_1 = require("./assets/svg/assets-result-500.svg");
const assets_result_maintenance_svg_1 = require("./assets/svg/assets-result-maintenance.svg");
const assets_result_browser_incompatible_svg_1 = require("./assets/svg/assets-result-browser-incompatible.svg");
const assets_result_network_error_svg_1 = require("./assets/svg/assets-result-network-error.svg");
require("./web.less");
var ECode;
(function (ECode) {
    ECode["forbidden"] = "403";
    ECode["notFound"] = "404";
    ECode["error"] = "500";
    ECode["networkError"] = "network-error";
    ECode["browserIncompatible"] = "browser-incompatible";
    ECode["maintenance"] = "maintenance";
})(ECode || (exports.ECode = ECode = {}));
const errorInfo = {
    [ECode.forbidden]: {
        title: '403 Forbidden',
        desc: '抱歉，您无权限访问此页面',
        icon: (0, jsx_runtime_1.jsx)(assets_result_403_svg_1.ReactComponent, {}),
    },
    [ECode.notFound]: {
        title: '404 Not Found',
        desc: '抱歉，您访问的页面不存在。',
        icon: (0, jsx_runtime_1.jsx)(assets_result_404_svg_1.ReactComponent, {}),
    },
    [ECode.error]: {
        title: '500 Internal Server Error',
        desc: '抱歉，服务器出错啦！',
        icon: (0, jsx_runtime_1.jsx)(assets_result_500_svg_1.ReactComponent, {}),
    },
    [ECode.networkError]: {
        title: '网络异常',
        desc: '网络异常，请稍后再试',
        icon: (0, jsx_runtime_1.jsx)(assets_result_network_error_svg_1.ReactComponent, {}),
    },
    [ECode.browserIncompatible]: {
        title: '浏览器版本低',
        desc: '抱歉，您正在使用的浏览器版本过低，无法打开当前网页。',
        icon: (0, jsx_runtime_1.jsx)(assets_result_browser_incompatible_svg_1.ReactComponent, {}),
    },
    [ECode.maintenance]: {
        title: '系统维护中',
        desc: '系统维护中，请稍后再试。',
        icon: (0, jsx_runtime_1.jsx)(assets_result_maintenance_svg_1.ReactComponent, {}),
    },
};
function ErrorPage(props) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { code } = props;
    const info = errorInfo[code];
    const prefixCls = 'oak';
    return ((0, jsx_runtime_1.jsxs)("div", { className: `${prefixCls}-errorBox`, children: [props.icon || info?.icon, (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-errorBox__title`, children: props.title || info?.title }), (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-errorBox__description`, children: props.desc || info?.desc }), props.children || ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                    navigate(-1);
                }, children: "\u8FD4\u56DE" }))] }));
}
exports.default = ErrorPage;
