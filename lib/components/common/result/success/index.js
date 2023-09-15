"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const icons_1 = require("@ant-design/icons");
const index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
const Success = (props) => ((0, jsx_runtime_1.jsxs)("div", { className: index_module_less_1.default.content, children: [props.icon || (0, jsx_runtime_1.jsx)(icons_1.CheckCircleOutlined, { className: index_module_less_1.default.icon }), (0, jsx_runtime_1.jsx)("div", { className: index_module_less_1.default.title, children: props.title || '创建成功' }), (0, jsx_runtime_1.jsx)("div", { className: index_module_less_1.default.description, children: props.description || '恭喜，创建成功，可以在列表中查看。' }), props.children] }));
exports.default = (0, react_1.memo)(Success);
