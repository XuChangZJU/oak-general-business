"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECode = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var assets_result_403_svg_1 = require("./assets/svg/assets-result-403.svg");
var assets_result_404_svg_1 = require("./assets/svg/assets-result-404.svg");
var assets_result_500_svg_1 = require("./assets/svg/assets-result-500.svg");
var assets_result_maintenance_svg_1 = require("./assets/svg/assets-result-maintenance.svg");
var assets_result_browser_incompatible_svg_1 = require("./assets/svg/assets-result-browser-incompatible.svg");
var assets_result_network_error_svg_1 = require("./assets/svg/assets-result-network-error.svg");
require("./web.less");
var ECode;
(function (ECode) {
    ECode["forbidden"] = "403";
    ECode["notFound"] = "404";
    ECode["error"] = "500";
    ECode["networkError"] = "network-error";
    ECode["browserIncompatible"] = "browser-incompatible";
    ECode["maintenance"] = "maintenance";
})(ECode = exports.ECode || (exports.ECode = {}));
var errorInfo = (_a = {},
    _a[ECode.forbidden] = {
        title: '403 Forbidden',
        desc: '抱歉，您无权限访问此页面',
        icon: (0, jsx_runtime_1.jsx)(assets_result_403_svg_1.ReactComponent, {}),
    },
    _a[ECode.notFound] = {
        title: '404 Not Found',
        desc: '抱歉，您访问的页面不存在。',
        icon: (0, jsx_runtime_1.jsx)(assets_result_404_svg_1.ReactComponent, {}),
    },
    _a[ECode.error] = {
        title: '500 Internal Server Error',
        desc: '抱歉，服务器出错啦！',
        icon: (0, jsx_runtime_1.jsx)(assets_result_500_svg_1.ReactComponent, {}),
    },
    _a[ECode.networkError] = {
        title: '网络异常',
        desc: '网络异常，请稍后再试',
        icon: (0, jsx_runtime_1.jsx)(assets_result_network_error_svg_1.ReactComponent, {}),
    },
    _a[ECode.browserIncompatible] = {
        title: '浏览器版本低',
        desc: '抱歉，您正在使用的浏览器版本过低，无法打开当前网页。',
        icon: (0, jsx_runtime_1.jsx)(assets_result_browser_incompatible_svg_1.ReactComponent, {}),
    },
    _a[ECode.maintenance] = {
        title: '系统维护中',
        desc: '系统维护中，请稍后再试。',
        icon: (0, jsx_runtime_1.jsx)(assets_result_maintenance_svg_1.ReactComponent, {}),
    },
    _a);
function ErrorPage(props) {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var code = props.code;
    var info = errorInfo[code];
    var prefixCls = 'oak';
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-errorBox") }, { children: [props.icon || (info === null || info === void 0 ? void 0 : info.icon), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-errorBox__title") }, { children: props.title || (info === null || info === void 0 ? void 0 : info.title) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-errorBox__description") }, { children: props.desc || (info === null || info === void 0 ? void 0 : info.desc) })), props.children || ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                    navigate(-1);
                } }, { children: "\u8FD4\u56DE" })))] })));
}
exports.default = ErrorPage;
