"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var iconfont_json_1 = tslib_1.__importDefault(require("./iconfont.json"));
var icon_1 = tslib_1.__importDefault(require("../../components/icon"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
/**
 * 复制文本到剪切板中
 *
 * @export
 * @param {*} value 需要复制的文本
 * @param {*} cb 复制成功后的回调
 */
function copy(value, cb) {
    // 动态创建 textarea 标签
    var textarea = document.createElement('textarea');
    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
    textarea.readOnly = 'readonly';
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    // 将要 copy 的值赋给 textarea 标签的 value 属性  
    // 网上有些例子是赋值给innerText,这样也会赋值成功，但是识别不了\r\n的换行符，赋值给value属性就可以
    textarea.value = value;
    // 将 textarea 插入到 body 中
    document.body.appendChild(textarea);
    // 选中值并复制
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    document.execCommand('Copy');
    document.body.removeChild(textarea);
    if (cb && Object.prototype.toString.call(cb) === '[object Function]') {
        cb();
    }
}
function Render(props) {
    var methods = props.methods;
    var icons = iconfont_json_1.default.glyphs;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)("ul", tslib_1.__assign({ className: web_module_less_1.default.dibBox }, { children: icons.map(function (ele) {
                return ((0, jsx_runtime_1.jsxs)("li", tslib_1.__assign({ className: web_module_less_1.default.dib, onClick: function () {
                        var content = "<OakIcon name='".concat(ele.name, "' />");
                        copy(content, function () {
                            methods.setMessage({
                                type: 'success',
                                content: content,
                            });
                        });
                    } }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.iconBox }, { children: (0, jsx_runtime_1.jsx)(icon_1.default, { name: ele.name, size: 40 }) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.name }, { children: ele.name }))] })));
            }) })) })));
}
exports.default = Render;
