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
    var _a = this.props, variant = _a.variant, _b = _a.showBack, showBack = _b === void 0 ? true : _b;
    var _c = this.state, name = _c.name, description = _c.description, super2 = _c.super;
    return ((0, jsx_runtime_1.jsx)(Container, tslib_1.__assign({ variant: variant, showBack: showBack }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 12 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u540D\u79F0", requiredMark: true, name: "name", rules: [
                                {
                                    required: true,
                                },
                            ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(input_1.default, { onChange: function (e) {
                                        _this.setUpdateData('name', e.target.value);
                                    }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u63CF\u8FF0", requiredMark: true, name: "description" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(input_1.default.TextArea, { onChange: function (e) {
                                        _this.setUpdateData('description', e.target.value);
                                    }, value: description }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u662F\u5426\u4E3A\u8D85\u7EA7\u7CFB\u7EDF", requiredMark: true, name: "super" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426", checked: super2, onChange: function (checked) {
                                        _this.setUpdateData('super', checked);
                                    } }) }) })), (0, jsx_runtime_1.jsx)(Action, tslib_1.__assign({ variant: variant }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 6 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                        _this.confirm();
                                    } }, { children: "\u786E\u5B9A" })) })) }))] })) })) }) })));
}
exports.default = render;
function Action(props) {
    var children = props.children, variant = props.variant;
    if (variant === 'dialog') {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
}
function Container(props) {
    var children = props.children, variant = props.variant, showBack = props.showBack;
    if (variant === 'inline' || variant === 'dialog') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u7CFB\u7EDF\u7F16\u8F91" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
