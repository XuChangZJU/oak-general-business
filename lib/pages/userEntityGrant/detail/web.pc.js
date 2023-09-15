"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const qrCode_1 = tslib_1.__importDefault(require("../../../components/common/qrCode"));
const antd_1 = require("antd");
function Render(props) {
    const { variant, showBack = true, url, expiresAt, title = '授权二维码', oakLoading, } = props.data;
    return ((0, jsx_runtime_1.jsx)(Container, { showBack: showBack, variant: variant, title: title, children: oakLoading ? ((0, jsx_runtime_1.jsx)("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                padding: '48px',
            }, children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { size: "large" }) })) : ((0, jsx_runtime_1.jsx)(qrCode_1.default, { url: url, expiresAt: expiresAt })) }));
}
exports.default = Render;
function Container(props) {
    const { children, variant = 'alone', showBack, title, } = props;
    if (['inline', 'dialog'].includes(variant)) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: showBack, title: title, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: children }) }));
}
