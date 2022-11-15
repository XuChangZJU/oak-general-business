"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var detail_1 = tslib_1.__importDefault(require("../../../../pages/userEntityGrant/detail"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.state, relation = _a.relation, period = _a.period, type = _a.type, number = _a.number;
    var _b = this.props, relations = _b.relations, entity = _b.entity, namespace = _b.namespace;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { showIcon: true, message: "\u63D0\u4EA4\u540E\uFF0C\u8BF7\u5C06\u4E8C\u7EF4\u7801\u53D1\u7ED9\u5F85\u5206\u4EAB\u6743\u9650\u7684\u7528\u6237\u626B\u63CF", type: "info", style: { marginBottom: 16 } }), (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6743\u9650", rules: [
                            {
                                required: true,
                                message: '请选择一个权限',
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: relation, onChange: function (_a) {
                                var target = _a.target;
                                var value = target.value;
                                _this.setRelation(value);
                            }, options: relations === null || relations === void 0 ? void 0 : relations.map(function (ele) { return ({
                                value: ele,
                                label: (_this.t && _this.t(entity + ':r.' + ele)) || ele,
                            }); }) }) })), type === 'grant' && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u4EBA\u6570", rules: [
                            {
                                required: true,
                                message: '请选择分享的目标人数',
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: number, onChange: function (_a) {
                                var target = _a.target;
                                var value = target.value;
                                _this.setNumber(value);
                            }, options: [
                                { value: 1, label: '单次' },
                                { value: 10000, label: '不限次' },
                            ] }) }))), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u65F6\u6548", rules: [
                            {
                                required: true,
                                message: '请选择一个时效',
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { min: 1, max: 15, value: period, onChange: function (value) {
                                _this.setState({
                                    period: value,
                                });
                            }, addonAfter: "\u5206\u949F" }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                        _this.confirm();
                                    } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                        _this.onBack();
                                    } }, { children: "\u8FD4\u56DE" }))] }) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u4E8C\u7EF4\u7801", open: !!this.state.userEntityGrantId, destroyOnClose: true, maskClosable: false, footer: null, onCancel: function () {
                    _this.setState({
                        userEntityGrantId: '',
                    });
                    _this.setInit();
                } }, { children: (0, jsx_runtime_1.jsx)(detail_1.default, { namespace: namespace, variant: "dialog", oakId: this.state.userEntityGrantId, oakAutoUnmount: true, oakPath: "$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail" }) }))] })));
}
exports.default = render;
