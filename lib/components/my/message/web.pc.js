"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var drawerList_1 = tslib_1.__importDefault(require("../../../pages/message/drawerList"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var data = props.data;
    var count = data.count;
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), open = _a[0], setOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Badge, tslib_1.__assign({ count: count }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { className: web_module_less_1.default.btn, type: "text", shape: "circle", icon: (0, jsx_runtime_1.jsx)(icons_1.BellOutlined, {}), onClick: function () {
                        setOpen(true);
                    } }) })), (0, jsx_runtime_1.jsx)(drawerList_1.default, { open: open, onClose: function () {
                    setOpen(false);
                } })] }));
}
exports.default = Render;
