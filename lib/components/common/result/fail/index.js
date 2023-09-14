"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var icons_1 = require("@ant-design/icons");
var index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
var Fail = function (props) { return ((0, jsx_runtime_1.jsxs)("div", { className: index_module_less_1.default.content, children: [props.icon || (0, jsx_runtime_1.jsx)(icons_1.ExclamationCircleOutlined, { className: index_module_less_1.default.icon }), (0, jsx_runtime_1.jsx)("div", { className: index_module_less_1.default.title, children: props.title || '创建失败' }), (0, jsx_runtime_1.jsx)("div", { className: index_module_less_1.default.description, children: props.description || '抱歉，创建失败，请联系管理员进行排查！' }), props.children] })); };
exports.default = (0, react_1.memo)(Fail);
