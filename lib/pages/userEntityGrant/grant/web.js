"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _a = props.data, relation = _a.relation, type = _a.type, number = _a.number, period = _a.period, relations = _a.relations, entity = _a.entity, entityId = _a.entityId, relationId = _a.relationId;
    var _b = props.methods, t = _b.t, confirm = _b.confirm, reset = _b.reset, setRelationId = _b.setRelationId, setNumber = _b.setNumber, setPeriod = _b.setPeriod;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.pageWithPadding }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.formContainer }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6743\u9650", rules: [
                            {
                                required: true,
                                message: '请选择一个权限',
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: relationId, onChange: function (e) {
                                setRelationId(e.target.value);
                            }, options: relations === null || relations === void 0 ? void 0 : relations.map(function (ele) { return ({
                                value: ele.id,
                                label: ele.display || t("".concat(entity, ":r.").concat(ele.name)),
                            }); }) }) })), type === 'grant' && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u4EBA\u6570", rules: [
                            {
                                required: true,
                                message: '请选择分享的目标人数',
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: number, onChange: function (_a) {
                                var target = _a.target;
                                var value = target.value;
                                setNumber(value);
                            }, options: [
                                { value: 1, label: '单次' },
                                { value: 10000, label: '不限次' },
                            ] }) }))), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u65F6\u6548", rules: [
                            {
                                required: true,
                                message: '请选择一个时效',
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { min: 1, max: 15, value: period, onChange: function (value) {
                                setPeriod(value);
                            }, addonAfter: "\u5206\u949F" }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "submit", type: "primary", onClick: function () {
                                        confirm();
                                    } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "reset", onClick: function () {
                                        reset();
                                    } }, { children: "\u91CD\u7F6E" }))] }) }))] })) })) })));
}
exports.default = render;
