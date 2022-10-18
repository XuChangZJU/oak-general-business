"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
var prefixCls = 'grid';
var itemPrefixCls = prefixCls + '_item';
exports.default = (0, react_1.memo)(function (props) {
    var style = props.style, className = props.className, _a = props.column, column = _a === void 0 ? 4 : _a, _b = props.gutter, gutter = _b === void 0 ? 0 : _b, list = props.list, onChange = props.onChange, imageClassName = props.imageClassName, textClassName = props.textClassName;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: index_module_less_1.default[prefixCls], style: {
            gap: gutter,
        } }, { children: list === null || list === void 0 ? void 0 : list.map(function (ele, index) {
            var _a;
            return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: (0, classnames_1.default)(className, index_module_less_1.default[itemPrefixCls], (_a = {},
                    _a[index_module_less_1.default["".concat(itemPrefixCls, "-column-").concat(column)]] = column,
                    _a)), style: style, onClick: onChange ? function (event) { return onChange(index, event); } : undefined }, { children: [typeof ele.image === 'string' ? ((0, jsx_runtime_1.jsx)("img", { className: (0, classnames_1.default)(index_module_less_1.default.image, imageClassName), src: ele.image })) : (ele.image), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: index_module_less_1.default.text }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)(index_module_less_1.default.title, textClassName), style: {
                                paddingTop: 8,
                                marginBottom: 4,
                            } }, { children: ele.text })) }))] }), index));
        }) })));
});
