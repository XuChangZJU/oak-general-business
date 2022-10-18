"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
var prefixCls = 'grid_item';
exports.default = (0, react_1.memo)(function (props) {
    var className = props.className, _a = props.column, column = _a === void 0 ? 4 : _a, _b = props.gutter, gutter = _b === void 0 ? 0 : _b, data = props.data, onChange = props.onChange;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: index_module_less_1.default.grid }, { children: data === null || data === void 0 ? void 0 : data.map(function (ele, index) {
            var _a;
            return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: (0, classnames_1.default)(className, index_module_less_1.default[prefixCls], (_a = {},
                    _a[index_module_less_1.default["".concat(prefixCls, "-column-").concat(column)]] = column,
                    _a)), onClick: function () { return onChange && onChange(index); } }, { children: [typeof ele.image === 'string' ? ((0, jsx_runtime_1.jsx)("img", { src: ele.image })) : (ele.image), typeof ele.text === 'string' ? ((0, jsx_runtime_1.jsx)("div", { children: ele.text })) : (ele.text)] }), index));
        }) })));
});
