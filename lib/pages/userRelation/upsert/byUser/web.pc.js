"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("../onUser/index"));
function render() {
    var _this = this;
    var _a = this.props, relations = _a.relations, entity = _a.entity, entityId = _a.entityId;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ disabled: !this.state.legal, type: "primary", onClick: function () {
                                    _this.onConfirm();
                                } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "reset", onClick: function () { return _this.onReset(); } }, { children: "\u91CD\u7F6E" }))] }) })) })), (0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: this.state.oakFullpath ? "".concat(this.state.oakFullpath, ".user") : undefined, entity: entity, entityId: entityId, relations: relations, oakId: this.props.oakId })] })));
}
exports.default = render;
