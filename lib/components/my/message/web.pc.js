"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var icons_1 = require("@ant-design/icons");
var simpleList_1 = tslib_1.__importDefault(require("../../../components/message/simpleList"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var count = data.count, className = data.className, onClick = data.onClick, style = data.style, buttonStyle = data.buttonStyle, buttonClassName = data.buttonClassName;
    var goMessageList = methods.goMessageList;
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), open = _a[0], setOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Badge, tslib_1.__assign({ count: count }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { className: (0, classnames_1.default)(web_module_less_1.default.btn, buttonClassName), style: buttonStyle, type: "text", shape: "circle", icon: (0, jsx_runtime_1.jsx)(icons_1.BellOutlined, { className: (0, classnames_1.default)(web_module_less_1.default.icon, className), style: style }), onClick: function (e) {
                        if (typeof onClick === 'function') {
                            onClick(e);
                            return;
                        }
                        setOpen(true);
                    } }) })), (0, jsx_runtime_1.jsx)(antd_1.Drawer, tslib_1.__assign({ title: "\u6D88\u606F", placement: "right", open: open, onClose: function () {
                    setOpen(false);
                }, extra: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "small", type: "text", onClick: function () {
                            setOpen(false);
                            goMessageList();
                        } }, { children: "\u67E5\u770B\u66F4\u591A" })) }), bodyStyle: {
                    padding: 0,
                }, destroyOnClose: true }, { children: (0, jsx_runtime_1.jsx)(simpleList_1.default, { onClose: function () {
                        setOpen(false);
                    }, oakAutoUnmount: true, oakPath: "$my/message-/message/simpleList" }) }))] }));
}
exports.default = Render;
