"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
const constants_1 = require("../../../../config/constants");
function Render(props) {
    const { variant, showBack = true, text, wechatId, sync, oakDirty, oakExecuting, oakId, } = props.data;
    const { t, update, navigateBack, confirm, createTag, editTag } = props.methods;
    const WechatPublicTags = (0, constants_1.getWechatPublicTags)();
    const TagOptions = Object.keys(WechatPublicTags).map(ele => ({
        label: WechatPublicTags[ele],
        value: WechatPublicTags[ele],
    }));
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u5FAE\u4FE1\u516C\u4F17\u53F7TAG\u4FE1\u606F", children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "TAG\u540D\u79F0", required: true, rules: [
                                {
                                    required: true,
                                },
                            ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { value: text, onChange: (v) => update({ text: v.target.value }), placeholder: '\u6807\u7B7E\u540D\u79F0', maxLength: 30 }) }) }), (0, jsx_runtime_1.jsx)(Action, { variant: variant, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 6 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                                                if (oakId) {
                                                    editTag(wechatId, text);
                                                    console;
                                                }
                                                else {
                                                    createTag(text);
                                                }
                                            }, disabled: !oakDirty || oakExecuting, children: "\u786E\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                                                navigateBack();
                                            }, children: "\u8FD4\u56DE" })] }) }) })] }) }) }) }));
}
exports.default = Render;
function Action(props) {
    const { children, variant } = props;
    if (variant === 'dialog') {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
}
