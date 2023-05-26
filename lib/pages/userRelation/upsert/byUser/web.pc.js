"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("../onUser/index"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
function Render(props) {
    var _a = props.data, relations = _a.relations, entity = _a.entity, entityId = _a.entityId, oakId = _a.oakId, oakDirty = _a.oakDirty, oakFullpath = _a.oakFullpath;
    var _b = props.methods, onConfirm = _b.onConfirm, onReset = _b.onReset, t = _b.t;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u7F16\u8F91\u6743\u9650" }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: oakFullpath && "".concat(oakFullpath, ".user"), entity: entity, entityId: entityId, relations: relations, oakId: oakId }), (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ disabled: !oakDirty, type: "primary", onClick: function () { return onConfirm(); } }, { children: t('common:action.confirm') })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "reset", onClick: function () { return onReset(); } }, { children: t('common:action.reset') }))] }) })) }))] })) })));
}
exports.default = Render;
