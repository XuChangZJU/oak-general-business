"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
var prefixCls = 'oak';
exports.default = (0, react_1.memo)(function (props) {
    var _a;
    var style = props.style, className = props.className, list = props.list, onChange = props.onChange, iconClassName = props.iconClassName, textClassName = props.textClassName, _b = props.fixed, fixed = _b === void 0 ? true : _b, _c = props.bordered, bordered = _c === void 0 ? false : _c, _d = props.value, value = _d === void 0 ? '' : _d;
    var length = list === null || list === void 0 ? void 0 : list.length;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)("".concat(prefixCls, "-tabBar"), (_a = {},
            _a["".concat(prefixCls, "-tabBar--fixed")] = fixed,
            _a["".concat(prefixCls, "-tabBar--bordered")] = bordered,
            _a)) }, { children: list === null || list === void 0 ? void 0 : list.map(function (ele, index) {
            var _a;
            return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: (0, classnames_1.default)(className, "".concat(prefixCls, "-tabBar-item"), (_a = {},
                    _a["".concat(prefixCls, "-tabBar-item-column-").concat(length)] = length,
                    _a["".concat(prefixCls, "-tabBar-item-checked")] = value === ele.value,
                    _a)), style: style, onClick: onChange
                    ? function (event) { return onChange(ele.value, event); }
                    : undefined }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)("".concat(prefixCls, "-tabBar-item-icon"), iconClassName) }, { children: typeof ele.icon === 'string' ? ((0, jsx_runtime_1.jsx)("img", { className: (0, classnames_1.default)("".concat(prefixCls, "-tabBar-item-image"), iconClassName), src: ele.icon })) : (ele.icon) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: (0, classnames_1.default)("".concat(prefixCls, "-tabBar-item-text"), textClassName) }, { children: ele.text }))] }), index));
        }) })));
});
