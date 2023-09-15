"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const radioRect_module_less_1 = tslib_1.__importDefault(require("./radioRect.module.less"));
exports.default = (0, react_1.memo)((props) => {
    const [selectValue, setSelectValue] = (0, react_1.useState)(props.defaultValue);
    const handleClick = (option) => {
        setSelectValue(option.value);
        props?.onChange(option.value);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: radioRect_module_less_1.default.radioRectPanel, children: props.options.map((item, index) => {
            let ImageItem = item.image;
            if (typeof item.image === 'string') {
                ImageItem = ((0, jsx_runtime_1.jsx)("div", { className: radioRect_module_less_1.default.rectImg, style: { backgroundImage: `url(${item.image})` } }));
            }
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)(radioRect_module_less_1.default.rectItem, {
                            [radioRect_module_less_1.default.rectItemSelected]: selectValue === item.value,
                        }), onClick: () => handleClick(item), children: ImageItem }), item.name && ((0, jsx_runtime_1.jsx)("div", { className: radioRect_module_less_1.default.rectText, children: item.name }))] }, index));
        }) }));
});
