"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const index_1 = tslib_1.__importDefault(require("../onUser/index"));
function Render(props) {
    const { mobileValue, mobileValueReady, relations, entity, entityId, userId, oakFullpath, oakExecutable, legal, isNew } = props.data;
    const { onConfirm, onMobileChange, onReset, t } = props.methods;
    const [passwordConfirm, setPasswordConfirm] = (0, react_1.useState)(true);
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
                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { maxLength: 11, value: mobileValue, onChange: (e) => {
                            const strValue = e.target.value;
                            onMobileChange(strValue);
                        }, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801", type: "tel" }) }) }), mobileValueReady && userId && ((0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? `${oakFullpath}.user` : undefined, entity: entity, entityId: entityId, relations: relations, oakId: userId, setPasswordConfirm: setPasswordConfirm })), (0, jsx_runtime_1.jsx)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { style: { flex: 2 }, type: "primary", htmlType: "reset", onClick: async () => {
                                    await onConfirm();
                                    setPasswordConfirm(true);
                                }, disabled: !legal ||
                                    !oakExecutable ||
                                    (isNew && !passwordConfirm), children: t('common::action.confirm') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { htmlType: "reset", onClick: () => onReset(), style: { flex: 1 }, children: t('common::reset') })] }) }) })] }));
}
exports.default = Render;
