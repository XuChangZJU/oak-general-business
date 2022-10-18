"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
var headingElement = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
exports.default = (0, react_1.memo)(function (props) {
    var _a;
    var children = props.children, _b = props.size, size = _b === void 0 ? 'medium' : _b, _c = props.theme, theme = _c === void 0 ? 'default' : _c, _d = props.variant, variant = _d === void 0 ? 'title' : _d, _e = props.italic, italic = _e === void 0 ? false : _e, _f = props.strong, strong = _f === void 0 ? false : _f, _g = props.disabled, disabled = _g === void 0 ? false : _g, _h = props.underline, underline = _h === void 0 ? false : _h, _j = props.delete, delete2 = _j === void 0 ? false : _j, _k = props.code, code = _k === void 0 ? false : _k, _l = props.keyboard, keyboard = _l === void 0 ? false : _l, _m = props.mark, mark = _m === void 0 ? false : _m, _o = props.link, link = _o === void 0 ? false : _o, onClick = props.onClick, style = props.style, className = props.className;
    var prefixCls = 'oak-typography';
    var isHeadingElement = headingElement.includes(variant);
    var Component = isHeadingElement
        ? variant
        : 'span';
    return ((0, jsx_runtime_1.jsx)(Component, tslib_1.__assign({ style: style, onClick: !disabled ? onClick : undefined, className: (0, classnames_1.default)(className, (_a = {},
            _a[index_module_less_1.default["".concat(prefixCls, "-").concat(variant, "-").concat(size)]] = !isHeadingElement,
            _a[index_module_less_1.default["".concat(prefixCls, "-color-").concat(theme)]] = !disabled,
            _a[index_module_less_1.default["".concat(prefixCls, "-italic")]] = italic,
            _a[index_module_less_1.default["".concat(prefixCls, "-underline")]] = underline,
            _a[index_module_less_1.default["".concat(prefixCls, "-delete")]] = delete2,
            _a[index_module_less_1.default["".concat(prefixCls, "-strong")]] = strong,
            _a[index_module_less_1.default["".concat(prefixCls, "-keyboard")]] = keyboard,
            _a[index_module_less_1.default["".concat(prefixCls, "-code")]] = code,
            _a[index_module_less_1.default["".concat(prefixCls, "-mark")]] = mark,
            _a[index_module_less_1.default["".concat(prefixCls, "-link")]] = link,
            _a[index_module_less_1.default["".concat(prefixCls, "-disabled")]] = disabled,
            _a)) }, { children: children })));
});
