"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var relation = this.state.relation;
    var _a = this.props, relations = _a.relations, entity = _a.entity, entityId = _a.entityId;
    var relationArr = typeof relations === 'object'
        ? relations
        : relations && JSON.parse(relations);
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.pageWithPadding }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.formContainer }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6743\u9650", rules: [
                            {
                                required: true,
                                message: '请选择一个权限',
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: relation, onChange: function (value) {
                                _this.setRadioValue(value);
                            }, options: relationArr.map(function (ele) { return ({
                                value: ele,
                                label: (_this.t && _this.t(entity + ':r.' + ele)) ||
                                    ele,
                            }); }) }) })), (0, jsx_runtime_1.jsxs)(antd_1.Form.Item, tslib_1.__assign({ style: { marginLeft: 100 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "submit", type: "primary", style: { marginRight: 10 }, onClick: function () {
                                    _this.confirm();
                                } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "reset", onClick: function () {
                                    _this.reset();
                                } }, { children: "\u91CD\u7F6E" }))] }))] }) })) })));
}
exports.default = render;
