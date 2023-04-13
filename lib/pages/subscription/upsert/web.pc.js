"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, name = _a.name, description = _a.description, variant = _a.variant, _b = _a.showBack, showBack = _b === void 0 ? true : _b, entityId = _a.entityId, entity = _a.entity, oakId = _a.oakId;
    var _c = props.methods, t = _c.t, update = _c.update, navigateBack = _c.navigateBack, confirm = _c.confirm;
    return ((0, jsx_runtime_1.jsx)(Container, tslib_1.__assign({ variant: variant, showBack: showBack }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 12 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u540D\u79F0", required: true, name: "name", rules: [
                                {
                                    required: true,
                                },
                            ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        update({
                                            name: e.target.value,
                                        });
                                    }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u63CF\u8FF0", required: true, name: "description" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { onChange: function (e) {
                                        update({
                                            description: e.target.value,
                                        });
                                    }, value: description }) }) })), (0, jsx_runtime_1.jsx)(Action, tslib_1.__assign({ variant: variant }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 6 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                                confirm();
                                            } }, { children: "\u786E\u5B9A" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                                navigateBack();
                                            } }, { children: "\u8FD4\u56DE" }))] }) })) }))] })) })) }) })));
}
exports.default = Render;
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
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u8BA2\u9605\u53F7\u7F16\u8F91" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: children })) })));
}
