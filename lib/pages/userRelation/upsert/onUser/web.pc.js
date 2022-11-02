"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var input_1 = tslib_1.__importDefault(require("../../../../components/common/input"));
function render() {
    var _this = this;
    var _a = this.props, relations = _a.relations, entity = _a.entity, oakId = _a.oakId;
    var _b = this.state, name = _b.name, nickname = _b.nickname, password = _b.password, userRelations = _b.userRelations;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { style: { marginBottom: 0 }, label: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.tip }, { children: oakId ? '现有用户' : '新建用户' })), colon: false }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u59D3\u540D", name: "name", rules: [
                        {
                            required: true,
                            message: '姓名不能为空',
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(input_1.default, { disabled: !!oakId, onChange: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var strValue;
                                return tslib_1.__generator(this, function (_a) {
                                    strValue = e.target.value;
                                    this.addOperation({
                                        action: 'create',
                                        data: {
                                            name: strValue,
                                        },
                                    });
                                    return [2 /*return*/];
                                });
                            }); }, value: name, placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D" }) }) })), !!oakId ? (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6635\u79F0", name: "nickname" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(input_1.default, { disabled: true, value: nickname }) }) })) : (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u5BC6\u7801", name: "mobile", rules: [
                        {
                            required: true,
                            message: '密码不能为空',
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(input_1.default, { value: password, onChange: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var strValue;
                                return tslib_1.__generator(this, function (_a) {
                                    strValue = e.target.value;
                                    this.addOperation({
                                        action: 'create',
                                        data: {
                                            password: strValue,
                                        },
                                    });
                                    return [2 /*return*/];
                                });
                            }); }, placeholder: "\u4E0D\u5C11\u4E8E\u516B\u4F4D" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6743\u9650", rules: [
                        {
                            required: true,
                            message: '请至少选择一个权限',
                        },
                    ], name: "relation" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox.Group, { value: (userRelations || []).map(function (ele) { return ele.relation; }), onChange: function (value) {
                                _this.onRelationChange(value);
                            }, options: relations.map(function (ele) { return ({
                                value: ele,
                                label: (_this.t && _this.t("".concat(entity, ":r.").concat(ele))) ||
                                    ele,
                            }); }) }) }) }))] })) })));
}
exports.default = render;
