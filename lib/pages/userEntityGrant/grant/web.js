"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { relation, type, number, period, relations, entity, entityId, relationId } = props.data;
    const { t, confirm, reset, setRelationId, setNumber, setPeriod } = props.methods;
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.pageWithPadding, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.formContainer, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6743\u9650", rules: [
                            {
                                required: true,
                                message: '请选择一个权限',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: relationId, onChange: (e) => {
                                setRelationId(e.target.value);
                            }, options: relations?.map((ele) => ({
                                value: ele.id,
                                label: ele.display || t(`${entity}:r.${ele.name}`),
                            })) }) }), type === 'grant' && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u4EBA\u6570", rules: [
                            {
                                required: true,
                                message: '请选择分享的目标人数',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: number, onChange: ({ target }) => {
                                const { value } = target;
                                setNumber(value);
                            }, options: [
                                { value: 1, label: '单次' },
                                { value: 10000, label: '不限次' },
                            ] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u65F6\u6548", rules: [
                            {
                                required: true,
                                message: '请选择一个时效',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { min: 1, max: 15, value: period, onChange: (value) => {
                                setPeriod(value);
                            }, addonAfter: "\u5206\u949F" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { htmlType: "submit", type: "primary", onClick: () => {
                                        confirm();
                                    }, children: "\u63D0\u4EA4" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { htmlType: "reset", onClick: () => {
                                        reset();
                                    }, children: "\u91CD\u7F6E" })] }) })] }) }) }));
}
exports.default = render;
