"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
var index_1 = tslib_1.__importDefault(require("../onUser/index"));
function Render(props) {
    var _a = props.data, relations = _a.relations, entity = _a.entity, entityId = _a.entityId, oakId = _a.oakId, oakDirty = _a.oakDirty, oakFullpath = _a.oakFullpath, oakExecutable = _a.oakExecutable;
    var _b = props.methods, onConfirm = _b.onConfirm, onReset = _b.onReset, t = _b.t;
    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form, { footer: (0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default['btn-container'], children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { color: "primary", style: { flex: 2 }, onClick: function () {
                        onConfirm();
                    }, disabled: oakExecutable !== true, children: t('common::action.confirm') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { style: { flex: 1 }, onClick: function () { return onReset(); }, children: t('common::reset') })] }), children: (0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: oakFullpath && "".concat(oakFullpath, ".user"), entity: entity, entityId: entityId, relations: relations, oakId: oakId }) }));
}
exports.default = Render;
