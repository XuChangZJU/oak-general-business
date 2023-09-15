"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = tslib_1.__importDefault(require("react"));
const color_1 = require("./color");
const radioColor_module_less_1 = tslib_1.__importDefault(require("./radioColor.module.less"));
const RadioColor = (props) => ((0, jsx_runtime_1.jsx)("div", { className: radioColor_module_less_1.default.panel, children: color_1.defaultColor.map((color, index) => ((0, jsx_runtime_1.jsx)("div", { onClick: () => props?.onChange(color), className: radioColor_module_less_1.default.box, style: {
            borderColor: props.defaultValue === color ? color : 'transparent',
        }, children: (0, jsx_runtime_1.jsx)("div", { className: radioColor_module_less_1.default.item, style: { backgroundColor: color } }) }, index))) }));
exports.default = react_1.default.memo(RadioColor);
