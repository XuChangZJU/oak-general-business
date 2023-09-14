"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var index_1 = tslib_1.__importDefault(require("../onUser/index"));
function Render(props) {
    var _this = this;
    var _a = props.data, mobileValue = _a.mobileValue, mobileValueReady = _a.mobileValueReady, relations = _a.relations, entity = _a.entity, entityId = _a.entityId, userId = _a.userId, oakFullpath = _a.oakFullpath, oakExecutable = _a.oakExecutable, legal = _a.legal, isNew = _a.isNew;
    var _b = props.methods, onConfirm = _b.onConfirm, onMobileChange = _b.onMobileChange, onReset = _b.onReset, t = _b.t;
    var _c = tslib_1.__read((0, react_1.useState)(true), 2), passwordConfirm = _c[0], setPasswordConfirm = _c[1];
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u624B\u673A\u53F7\u7801", required: true, 
                    // name="mobile"
                    rules: [
                        {
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
                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { maxLength: 11, value: mobileValue, onChange: function (e) {
                            var strValue = e.target.value;
                            onMobileChange(strValue);
                        }, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801", type: "tel" }) }) }), mobileValueReady && userId && ((0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? "".concat(oakFullpath, ".user") : undefined, entity: entity, entityId: entityId, relations: relations, oakId: userId, setPasswordConfirm: setPasswordConfirm })), (0, jsx_runtime_1.jsx)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { style: { flex: 2 }, type: "primary", htmlType: "reset", onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, onConfirm()];
                                            case 1:
                                                _a.sent();
                                                setPasswordConfirm(true);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, disabled: !legal ||
                                    !oakExecutable ||
                                    (isNew && !passwordConfirm), children: t('common::action.confirm') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { htmlType: "reset", onClick: function () { return onReset(); }, style: { flex: 1 }, children: t('common::reset') })] }) }) })] }));
}
exports.default = Render;
