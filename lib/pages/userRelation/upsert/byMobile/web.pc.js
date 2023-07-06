"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("../onUser/index"));
function Render(props) {
    var _a = props.data, mobileValue = _a.mobileValue, mobileValueReady = _a.mobileValueReady, relations = _a.relations, entity = _a.entity, entityId = _a.entityId, userId = _a.userId, oakFullpath = _a.oakFullpath, oakExecutable = _a.oakExecutable, legal = _a.legal;
    var _b = props.methods, onConfirm = _b.onConfirm, onMobileChange = _b.onMobileChange, onReset = _b.onReset, t = _b.t;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u624B\u673A\u53F7\u7801", name: "mobile", rules: [
                        {
                            required: true,
                            message: '手机号不能为空',
                        },
                        {
                            min: 11,
                            message: '请输入11位手机号',
                        },
                        {
                            max: 11,
                            message: '请输入11位手机号',
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { maxLength: 11, value: mobileValue, onChange: function (e) {
                                var strValue = e.target.value;
                                onMobileChange(strValue);
                            }, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801", type: "tel" }) }) })) })), mobileValueReady && userId && ((0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? "".concat(oakFullpath, ".user")
                    : undefined, entity: entity, entityId: entityId, relations: relations, oakId: userId })), (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ style: { flex: 2 }, type: "primary", onClick: function () {
                                    onConfirm();
                                }, disabled: !legal }, { children: t('common:action.confirm') })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "reset", onClick: function () { return onReset(); }, style: { flex: 1 } }, { children: t('common:reset') }))] }) })) }))] })));
}
exports.default = Render;
