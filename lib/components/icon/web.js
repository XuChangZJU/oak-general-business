"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./web.less");
function Render(props) {
    var data = props.data;
    var name = data.name, type = data.type, _a = data.color, color = _a === void 0 ? 'primary' : _a, size = data.size, className = data.className, _b = data.larger, larger = _b === void 0 ? '1x' : _b;
    var isColor = ['primary', 'info', 'success', 'error', 'warning'].includes(color);
    if (['far', 'fas'].includes(type)) {
        var class_name = type + ' ' + 'fa-' + name;
        if (className) {
            class_name += ' ' + className;
        }
        if (larger) {
            class_name += ' ' + 'fa-' + larger;
        }
        if (isColor) {
            class_name += ' ' + 'oak-icon__' + color;
        }
        return ((0, jsx_runtime_1.jsx)("span", { className: class_name, style: Object.assign({}, size && { fontSize: size }, !isColor && { color: color }) }));
    }
    return (0, jsx_runtime_1.jsxs)("span", { children: ["\u4E0D\u652F\u6301\u7684icon\u7C7B\u578B", type] });
}
exports.default = Render;
