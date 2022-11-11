"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var input_1 = tslib_1.__importDefault(require("../../../components/common/input"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.state, name = _a.name, description = _a.description;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u5E73\u53F0\u7F16\u8F91" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 12 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 16 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u540D\u79F0", requiredMark: true, name: "name", rules: [
                                    {
                                        required: true,
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(input_1.default, { onChange: function (e) {
                                            _this.setUpdateData('name', e.target.value);
                                        }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u63CF\u8FF0", requiredMark: true, name: "description" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(input_1.default.TextArea, { onChange: function (e) {
                                            _this.setUpdateData('description', e.target.value);
                                        }, value: description }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                        _this.confirm();
                                    } }, { children: "\u786E\u5B9A" })) }))] })) })) }) })) })));
}
exports.default = render;
