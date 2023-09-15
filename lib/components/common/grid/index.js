"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
exports.default = (0, react_1.memo)((props) => {
    const { style, className, column = 4, gutter = 0, list, onChange, imageClassName, textClassName, } = props;
    const prefixCls = 'oak';
    return ((0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-grid`, style: {
            gap: gutter,
        }, children: list?.map((ele, index) => ((0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)(className, `${prefixCls}-grid-item`, {
                [`${prefixCls}-grid-item-column-${column}`]: column,
            }), style: style, onClick: onChange ? (event) => onChange(index, event) : undefined, children: ele.render ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ele.render })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [typeof ele.image === 'string' ? ((0, jsx_runtime_1.jsx)("img", { className: (0, classnames_1.default)(`${prefixCls}-grid-item-image`, imageClassName), src: ele.image })) : (ele.image), (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-grid-item-text`, children: (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)(`${prefixCls}-grid-item-title`, textClassName), style: {
                                paddingTop: 4,
                            }, children: ele.text }) })] })) }, index))) }));
});
