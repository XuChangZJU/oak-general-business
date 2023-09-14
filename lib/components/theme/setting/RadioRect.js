"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var radioRect_module_less_1 = tslib_1.__importDefault(require("./radioRect.module.less"));
exports.default = (0, react_1.memo)(function (props) {
    var _a = tslib_1.__read((0, react_1.useState)(props.defaultValue), 2), selectValue = _a[0], setSelectValue = _a[1];
    var handleClick = function (option) {
        setSelectValue(option.value);
        props === null || props === void 0 ? void 0 : props.onChange(option.value);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: radioRect_module_less_1.default.radioRectPanel, children: props.options.map(function (item, index) {
            var _a;
            var ImageItem = item.image;
            if (typeof item.image === 'string') {
                ImageItem = ((0, jsx_runtime_1.jsx)("div", { className: radioRect_module_less_1.default.rectImg, style: { backgroundImage: "url(".concat(item.image, ")") } }));
            }
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)(radioRect_module_less_1.default.rectItem, (_a = {},
                            _a[radioRect_module_less_1.default.rectItemSelected] = selectValue === item.value,
                            _a)), onClick: function () { return handleClick(item); }, children: ImageItem }), item.name && ((0, jsx_runtime_1.jsx)("div", { className: radioRect_module_less_1.default.rectText, children: item.name }))] }, index));
        }) }));
});
