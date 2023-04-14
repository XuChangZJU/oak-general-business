"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var Colors = ['primary', 'success', 'error', 'warning', 'info'];
function Color(props) {
    var _a = props.value, value = _a === void 0 ? {} : _a, setValue = props.setValue;
    ;
    return ((0, jsx_runtime_1.jsx)(antd_1.Form, { children: Colors.map(function (ele) { return ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: ele, 
            // required
            name: "folder", tooltip: "\u8BBE\u7F6E\u7CFB\u7EDF\u3010".concat(ele, "\u3011\u989C\u8272") }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                        setValue(ele, e.target.value);
                    }, value: (0, lodash_1.get)(value, ele) }) }) }), ele)); }) }));
}
function Render(props) {
    var styleValue = props.value, onChange = props.onChange;
    var setStyle = function (path, value) {
        var newStyle = (0, lodash_1.set)(styleValue || {}, path, value);
        onChange(newStyle);
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { onChange: function () { }, type: "card", items: [
                {
                    label: '颜色',
                    key: 'color',
                    component: Color,
                },
            ].map(function (ele, i) {
                var ItemComponent = ele.component;
                return {
                    label: ele.label,
                    key: ele.key,
                    children: ((0, jsx_runtime_1.jsx)(ItemComponent, { value: (0, lodash_1.get)(styleValue, ele.key), setValue: function (path, value) {
                            setStyle("".concat(ele.key, ".").concat(path), value);
                        } })),
                };
            }) }) }));
}
exports.default = Render;
