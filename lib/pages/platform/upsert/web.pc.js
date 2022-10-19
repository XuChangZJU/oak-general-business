"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var FormItem = tdesign_react_1.Form.FormItem;
function render() {
    var _this = this;
    var _a = this.state, name = _a.name, description = _a.description;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
        } }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Row, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ xs: 12, sm: 4 }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Form, tslib_1.__assign({ labelWidth: "100px", colon: true }, { children: [(0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u540D\u79F0", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value) {
                                        _this.setUpdateData('name', value);
                                    }, value: name }) }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u63CF\u8FF0", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value) {
                                        _this.setUpdateData('description', value);
                                    }, value: description }) }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ style: { marginLeft: 100 } }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", onClick: function () {
                                    _this.confirm();
                                } }, { children: "\u786E\u5B9A" })) }))] })) })) }) })));
}
exports.default = render;
