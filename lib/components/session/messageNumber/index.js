"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
const icons_1 = require("@ant-design/icons");
function MessageNumber(props) {
    const { number = 0, clear } = props;
    return ((0, jsx_runtime_1.jsxs)("div", { className: index_module_less_1.default.messageNumberBox, children: [(0, jsx_runtime_1.jsxs)("div", { className: index_module_less_1.default.messageNumber, children: [(0, jsx_runtime_1.jsx)("span", { className: index_module_less_1.default.messageText, children: "\u6D88\u606F" }), (0, jsx_runtime_1.jsxs)("span", { className: index_module_less_1.default.numberText, children: ["(", number, ")"] })] }), (0, jsx_runtime_1.jsx)("div", { onClick: () => {
                    clear();
                }, children: (0, jsx_runtime_1.jsx)(icons_1.ClearOutlined, { className: index_module_less_1.default.clearIcon }) })] }));
}
exports.default = MessageNumber;
