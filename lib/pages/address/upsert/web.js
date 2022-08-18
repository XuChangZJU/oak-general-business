"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_mobile_react_1 = require("tdesign-mobile-react");
function render() {
    var _this = this;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Input, { required: true, label: "\u59D3\u540D", placeholder: "\u59D3\u540D", onChange: this.setValue, value: this.state.name, "data-attr": "name" }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Input, { required: true, label: "\u624B\u673A\u53F7", placeholder: "\u624B\u673A\u53F7", onChange: this.setValue, value: this.state.phone, "data-attr": "phone" }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Input, { required: true, label: "\u6240\u5728\u5730\u533A", placeholder: "\u6240\u5728\u5730\u533A", onChange: this.setValue, value: this.state.areaText, "data-attr": "areaText" }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Textarea, { label: "\u8BE6\u7EC6\u5730\u5740", maxlength: 100, value: this.state.detail, "data-attr": "detail", placeholder: "\u8BE6\u7EC6\u5730\u5740" }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Button, tslib_1.__assign({ block: true, theme: "primary", onClick: function () {
                    _this.confirm();
                } }, { children: "\u786E\u5B9A" }))] }));
}
exports.default = render;
