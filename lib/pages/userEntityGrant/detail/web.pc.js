"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var qrCode_1 = tslib_1.__importDefault(require("../../../components/common/qrCode"));
var antd_1 = require("antd");
function Render(props) {
    var _a = props.data, variant = _a.variant, _b = _a.showBack, showBack = _b === void 0 ? true : _b, url = _a.url, expiresAt = _a.expiresAt, _c = _a.title, title = _c === void 0 ? '授权二维码' : _c, oakLoading = _a.oakLoading;
    return ((0, jsx_runtime_1.jsx)(Container, tslib_1.__assign({ showBack: showBack, variant: variant, title: title }, { children: oakLoading ? ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                display: 'flex',
                justifyContent: 'center',
                padding: '48px',
            } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { size: "large" }) }))) : ((0, jsx_runtime_1.jsx)(qrCode_1.default, { url: url, expiresAt: expiresAt })) })));
}
exports.default = Render;
function Container(props) {
    var children = props.children, _a = props.variant, variant = _a === void 0 ? 'alone' : _a, showBack = props.showBack, title = props.title;
    if (['inline', 'dialog'].includes(variant)) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: title }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
