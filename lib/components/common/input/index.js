"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
function BaseHOC(key) {
    return function (props) {
        var defaultValue = props.defaultValue, value = props.value, onChange = props.onChange;
        var hasValue = props.hasOwnProperty('value');
        // 用户切换到底是显示 value 还是 input
        // 不能直接用 isOnComposition 原因是，这个值发生变化不会触发重新渲染
        // 不能只使用 flag 原因是，setFlag 是异步的
        var _a = tslib_1.__read((0, react_1.useState)(false), 2), flag = _a[0], setFlag = _a[1];
        // 非中文输入时候显示 value。中文输入的时候显示 input
        var _b = tslib_1.__read((0, react_1.useState)(hasValue ? value : defaultValue), 2), input = _b[0], setInput = _b[1];
        (0, react_1.useEffect)(function () {
            if (hasValue && input !== value) {
                setInput(value);
            }
        }, [value]);
        var isOnComposition = false;
        function handleChange(e) {
            setInput(e.target.value);
            if (isOnComposition)
                return;
            onChange && onChange(e);
        }
        function handleComposition(e) {
            if ('compositionend' === (e === null || e === void 0 ? void 0 : e.type)) {
                isOnComposition = false;
                handleChange(e);
            }
            else {
                isOnComposition = true;
            }
            if (flag !== isOnComposition) {
                setFlag(isOnComposition);
            }
        }
        var Component = antd_1.Input;
        if (key) {
            Component = antd_1.Input[key];
        }
        return ((0, jsx_runtime_1.jsx)(Component, tslib_1.__assign({}, props, { value: hasValue && !flag ? value : input, onCompositionStart: handleComposition, onCompositionUpdate: handleComposition, onCompositionEnd: handleComposition, onChange: handleChange })));
    };
}
var Component = function (props) {
    return BaseHOC()(props);
};
Component.Search = function (props) {
    return BaseHOC('Search')(props);
};
Component.TextArea = function (props) {
    return BaseHOC('TextArea')(props);
};
Component.Password = antd_1.Input.Password;
Component.Group = antd_1.Input.Group;
exports.default = Component;
