"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = tslib_1.__importDefault(require("react"));
var color_1 = require("./color");
var radioColor_module_less_1 = tslib_1.__importDefault(require("./radioColor.module.less"));
var RadioColor = function (props) { return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: radioColor_module_less_1.default.panel }, { children: color_1.defaultColor.map(function (color, index) { return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () { return props === null || props === void 0 ? void 0 : props.onChange(color); }, className: radioColor_module_less_1.default.box, style: {
            borderColor: props.defaultValue === color ? color : 'transparent',
        } }, { children: (0, jsx_runtime_1.jsx)("div", { className: radioColor_module_less_1.default.item, style: { backgroundColor: color } }) }), index)); }) }))); };
exports.default = react_1.default.memo(RadioColor);
