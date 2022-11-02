"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var assets_result_403_svg_1 = require("./assets/svg/assets-result-403.svg");
var assets_result_404_svg_1 = require("./assets/svg/assets-result-404.svg");
var assets_result_500_svg_1 = require("./assets/svg/assets-result-500.svg");
require("./index.less");
var ECode;
(function (ECode) {
    ECode[ECode["forbidden"] = 403] = "forbidden";
    ECode[ECode["notFount"] = 404] = "notFount";
    ECode[ECode["error"] = 500] = "error";
})(ECode || (ECode = {}));
var errorInfo = (_a = {},
    _a[ECode.forbidden] = {
        title: '403 Forbidden',
        desc: '抱歉，您无权限访问此页面',
        icon: (0, jsx_runtime_1.jsx)(assets_result_403_svg_1.ReactComponent, {}),
    },
    _a[ECode.notFount] = {
        title: '404 Not Found',
        desc: '抱歉，您访问的页面不存在。',
        icon: (0, jsx_runtime_1.jsx)(assets_result_404_svg_1.ReactComponent, {}),
    },
    _a[ECode.error] = {
        title: '500 Internal Server Error',
        desc: '抱歉，服务器出错啦！',
        icon: (0, jsx_runtime_1.jsx)(assets_result_500_svg_1.ReactComponent, {}),
    },
    _a);
function ErrorPage(props) {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var code = props.code;
    var info = errorInfo[code];
    var prefixCls = 'oak';
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-errorBox") }, { children: [info === null || info === void 0 ? void 0 : info.icon, (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-errorBox__title") }, { children: info === null || info === void 0 ? void 0 : info.title })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-errorBox__description") }, { children: info === null || info === void 0 ? void 0 : info.desc })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                    navigate(-1);
                } }, { children: "\u8FD4\u56DE" }))] })));
}
exports.default = ErrorPage;
