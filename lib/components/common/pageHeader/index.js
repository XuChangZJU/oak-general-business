"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var tdesign_react_1 = require("tdesign-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
exports.default = (0, react_1.memo)(function (props) {
    var _a;
    var style = props.style, className = props.className, children = props.children, title = props.title, subTitle = props.subTitle, extra = props.extra, showBack = props.showBack, onBack = props.onBack, backIcon = props.backIcon, delta = props.delta, _b = props.contentMargin, contentMargin = _b === void 0 ? true : _b, contentStyle = props.contentStyle, contentClassName = props.contentClassName, tags = props.tags;
    var prefixCls = 'oak';
    var navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: style, className: (0, classnames_1.default)("".concat(prefixCls, "-pageHeader"), className) }, { children: [(title || showBack || subTitle || tags || extra) && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-pageHeader-header") }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Row, { children: [(0, jsx_runtime_1.jsxs)(tdesign_react_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [showBack && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ shape: "square", variant: "text", className: "".concat(prefixCls, "-pageHeader-header-back"), onClick: function () {
                                        if (typeof onBack === 'function') {
                                            onBack();
                                            return;
                                        }
                                        navigate(delta || -1);
                                    } }, { children: backIcon || ((0, jsx_runtime_1.jsx)(tdesign_icons_react_1.ArrowLeftIcon, { className: "".concat(prefixCls, "-pageHeader-header-backIcon") })) }))), title && ((0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-pageHeader-header-title") }, { children: title }))), subTitle && ((0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-pageHeader-header-subTitle") }, { children: subTitle }))), tags] })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ flex: "auto" }, { children: extra }))] }) }))), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: contentStyle, className: (0, classnames_1.default)("".concat(prefixCls, "-pageHeader-content"), contentClassName, (_a = {},
                    _a["".concat(prefixCls, "-pageHeader-content-margin")] = contentMargin,
                    _a)) }, { children: children }))] })));
});
