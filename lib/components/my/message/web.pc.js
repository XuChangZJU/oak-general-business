"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const icons_1 = require("@ant-design/icons");
const simpleList_1 = tslib_1.__importDefault(require("../../../components/message/simpleList"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { count, className, onClick, style, buttonStyle, buttonClassName } = data;
    const { goMessageList } = methods;
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Badge, { count: count, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { className: (0, classnames_1.default)(web_module_less_1.default.btn, buttonClassName), style: buttonStyle, type: "text", shape: "circle", icon: (0, jsx_runtime_1.jsx)(icons_1.BellOutlined, { className: (0, classnames_1.default)(web_module_less_1.default.icon, className), style: style }), onClick: (e) => {
                        if (typeof onClick === 'function') {
                            onClick(e);
                            return;
                        }
                        setOpen(true);
                    } }) }), (0, jsx_runtime_1.jsx)(antd_1.Drawer, { title: "\u6D88\u606F", placement: "right", open: open, onClose: () => {
                    setOpen(false);
                }, extra: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", type: "text", onClick: () => {
                            setOpen(false);
                            goMessageList();
                        }, children: "\u67E5\u770B\u66F4\u591A" }) }), bodyStyle: {
                    padding: 0,
                }, destroyOnClose: true, children: (0, jsx_runtime_1.jsx)(simpleList_1.default, { onClose: () => {
                        setOpen(false);
                    }, oakAutoUnmount: true, oakPath: "$my/message-/message/simpleList" }) })] }));
}
exports.default = Render;
