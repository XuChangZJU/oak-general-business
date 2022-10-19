"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var tdesign_react_1 = require("tdesign-react");
require("./index.less");
var Search = function (props) {
    var _a = props.className, className = _a === void 0 ? '' : _a, _b = props.style, style = _b === void 0 ? {} : _b, _c = props.action, action = _c === void 0 ? '' : _c, center = props.center, disabled = props.disabled, focus = props.focus, label = props.label, leftIcon = props.leftIcon, placeholder = props.placeholder, rightIcon = props.rightIcon, _d = props.shape, shape = _d === void 0 ? 'square' : _d, _e = props.value, value = _e === void 0 ? '' : _e, onActionClick = props.onActionClick, onBlur = props.onBlur, onChange = props.onChange, onClear = props.onClear, onFocus = props.onFocus, onSubmit = props.onSubmit, onClick = props.onClick;
    var prefixCls = 'oak';
    var inputRef = (0, react_1.useRef)(null);
    var _f = tslib_1.__read((0, react_1.useState)(focus), 2), focusState = _f[0], setFocus = _f[1];
    function handleBlur(e) {
        var _a;
        setFocus(false);
        (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        var value = e.currentTarget.value;
        onBlur && onBlur(value, e);
    }
    function handleClear(e) {
        onClear && onClear(e);
        onChange && onChange('');
    }
    function handleAction(e) {
        onActionClick && onActionClick(e);
    }
    function handleChange(e) {
        var value = e.currentTarget.value;
        onChange && onChange(value, e);
    }
    function handleFocus(e) {
        var value = e.currentTarget.value;
        onFocus && onFocus(value, e);
    }
    function handleSubmit(e) {
        var value = e.currentTarget.value;
        onSubmit && onSubmit(value, e);
    }
    function handleClick() {
        var _a;
        (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        setFocus(true);
    }
    var shapeStyle = { borderRadius: shape === 'square' ? 'none' : '50px' };
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-search ").concat(focusState ? "".concat(prefixCls, "-search-is-focused") : '', " ").concat(className), style: tslib_1.__assign({}, style), onClick: onClick }, { children: [label && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-search__label-text"), style: {
                    marginLeft: '0px',
                    paddingRight: '8px',
                    color: 'rgba(0,0,0,0.9)',
                    whiteSpace: 'nowrap',
                } }, { children: label }))), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-search__form"), style: tslib_1.__assign({}, shapeStyle) }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-search__box") }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-search__icon-search") }, { children: leftIcon })), (0, jsx_runtime_1.jsx)("input", { style: { textAlign: center ? 'center' : 'unset' }, ref: inputRef, type: "text", autoFocus: focusState, disabled: disabled, value: value, placeholder: placeholder, className: "".concat(prefixCls, "-search__input"), onBlur: handleBlur, onChange: handleChange, 
                                //   onFocus={handleFocus}
                                onSubmit: handleSubmit }), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-search__icon-close") }, { children: [value.length > 0 && ((0, jsx_runtime_1.jsx)(tdesign_icons_react_1.CloseCircleFilledIcon, { onClick: handleClear })), rightIcon] }))] })), (0, jsx_runtime_1.jsxs)("label", tslib_1.__assign({ className: "".concat(prefixCls, "-search__label"), style: tslib_1.__assign({}, shapeStyle), onClick: handleClick }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "".concat(prefixCls, "-search__label-icon-search") }, { children: leftIcon })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: "".concat(prefixCls, "-search__label-text") }, { children: placeholder }))] }))] })), focusState && action && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ className: "".concat(prefixCls, "-search__cancel-button"), variant: "text", theme: "primary", onClick: handleAction }, { children: action })))] })));
};
exports.default = Search;
