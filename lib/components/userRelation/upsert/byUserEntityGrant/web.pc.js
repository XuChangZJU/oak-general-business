"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const detail_1 = tslib_1.__importDefault(require("../../../../pages/userEntityGrant/detail"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { relations, userEntityGrant, userEntityGrantId, period, unit, maxes, oakExecutable, } = props.data;
    const { relationId, type, number, entity } = userEntityGrant || {};
    const { update, t, onBack, confirm, setInit, setPeriod, setUnit } = props.methods;
    const P = !!userEntityGrantId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { showIcon: true, message: t('shareCode'), type: "info", style: { marginBottom: 16 } }), (0, jsx_runtime_1.jsx)(detail_1.default, { showBack: false, oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail" }), (0, jsx_runtime_1.jsx)("div", { style: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => setInit(), children: t('restart') }) })] })) : ((0, jsx_runtime_1.jsxs)(antd_1.Form, { labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('userEntityGrant:attr.relation'), required: true, children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: relationId, onChange: ({ target }) => {
                        const { value } = target;
                        update({ relationId: value });
                    }, options: relations?.map((ele) => ({
                        value: ele.id,
                        label: ele.display ||
                            t(`${entity}:r.${ele.name}`),
                    })) }) }), type === 'grant' && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('userEntityGrant:attr.number'), required: true, children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: number, onChange: ({ target }) => {
                        const { value } = target;
                        update({ number: value });
                    }, options: [
                        { value: 1, label: t('single') },
                        { value: 10000, label: t('unlimited') },
                    ] }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('userEntityGrant:attr.expiresAt'), required: true, 
                // name="period"
                // rules={[
                //     {
                //         required: true,
                //         message: t('chooseExpiresAt'),
                //     },
                // ]}
                help: (0, jsx_runtime_1.jsx)("div", { style: { marginBottom: 16 }, children: t('expiresHelp') }), tooltip: "\u901A\u8FC7\u914D\u7F6E\u5B9E\u73B0\u5728\u89C4\u5B9A\u7684\u65F6\u6548\u5185\u626B\u63CF\u4E8C\u7EF4\u7801\u4E0D\u8FC7\u671F\u7684\u6548\u679C\u3002", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { min: 1, max: maxes[unit], value: period, onChange: (value) => setPeriod(value), 
                    // addonAfter="分钟"
                    addonAfter: (0, jsx_runtime_1.jsxs)(antd_1.Select, { value: unit, style: { width: 80 }, onChange: (v) => {
                            setUnit(v);
                        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Select.Option, { value: "minute", children: t('unit.minute') }), (0, jsx_runtime_1.jsx)(antd_1.Select.Option, { value: "hour", children: t('unit.hour') })] }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => confirm(), disabled: oakExecutable !== true, children: t('common::action.confirm') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => onBack(), children: t('common::back') })] }) })] }));
    return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: P });
}
exports.default = render;
