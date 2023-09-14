"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
function Render(props) {
    var _this = this;
    var methods = props.methods, data = props.data;
    var t = methods.t;
    var oakFullpath = data.oakFullpath, oakId = data.oakId, name = data.name, openSubway = data.openSubway, onClose = data.onClose;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: oakId ? '编辑地铁' : '新增地铁', open: openSubway, destroyOnClose: true, okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88", onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    methods.execute();
                    onClose();
                    return [2 /*return*/];
                });
            }); }, onCancel: function () {
                onClose();
            }, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u7EBF\u8DEF\u540D\u79F0", value: name, onChange: function (_a) {
                        var value = _a.target.value;
                        methods.update({ name: value });
                    } }) }) }) }));
}
exports.default = Render;
