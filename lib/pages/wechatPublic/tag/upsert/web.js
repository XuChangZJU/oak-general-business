"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
var constants_1 = require("../../../../config/constants");
function Render(props) {
    var _a = props.data, text = _a.text, variant = _a.variant, _b = _a.showBack, showBack = _b === void 0 ? true : _b;
    var _c = props.methods, t = _c.t, update = _c.update, navigateBack = _c.navigateBack, confirm = _c.confirm;
    var WechatPublicTags = (0, constants_1.getWechatPublicTags)();
    var TagOptions = Object.keys(WechatPublicTags).map(function (ele) { return ({
        label: WechatPublicTags[ele],
        value: WechatPublicTags[ele],
    }); });
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u5FAE\u4FE1\u516C\u4F17\u53F7TAG\u4FE1\u606F" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 12 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "TAG\u540D\u79F0", required: true, name: "text", rules: [
                                {
                                    required: true,
                                },
                            ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { value: text, onChange: function (v) { return update({ text: v }); }, options: TagOptions }) }) })), (0, jsx_runtime_1.jsx)(Action, tslib_1.__assign({ variant: variant }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 6 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
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
