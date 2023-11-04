"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const share_1 = tslib_1.__importDefault(require("../../../userEntityGrant/share"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { relations, userEntityGrant, userEntityGrantId, period, unit, maxes, rules, oakExecutable, } = props.data;
    const { relationIds, type, multiple, relationEntity, rule } = userEntityGrant || {};
    const { update, t, onBack, confirm, setInit, setPeriod, setUnit } = props.methods;
    const P = !!userEntityGrantId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.NoticeBar, { content: t('shareCode'), color: 'info' }), (0, jsx_runtime_1.jsx)(share_1.default, { oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail" }), (0, jsx_runtime_1.jsx)("div", { style: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { color: "primary", onClick: () => setInit(), block: true, children: t('restart') }) })] })) : ((0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('userEntityGrant:attr.relationIds'), required: true, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Checkbox.Group, { value: relationIds || [], onChange: (val) => {
                        update({ relationIds: val });
                    }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { direction: 'vertical', children: relations?.map((ele) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.Checkbox, { value: ele.id, children: ele.display || t(`${relationEntity}:r.${ele.name}`) }))) }) }) }), relationIds?.length > 1 && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('userEntityGrant:attr.rule'), required: true, help: t('helpRule'), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, { value: rule, onChange: (val) => update({ rule: val }), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { direction: 'vertical', children: rules.map((ele) => (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, { value: ele, children: t(`userEntityGrant:v.rule.${ele}`) })) }) }) })), type === 'grant' && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('multiple'), required: true, help: t('helpMutiple'), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Switch, { checked: multiple || false, onChange: (val) => update({ multiple: val }) }) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('userEntityGrant:attr.expiresAt'), name: "period", rules: [
                    {
                        required: true,
                        message: t('chooseExpiresAt'),
                    },
                ], help: (0, jsx_runtime_1.jsx)("div", { style: { marginBottom: 16 }, children: t('expiresAt') }), extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Selector, { options: [
                        {
                            label: t('unit.hour'),
                            value: 'hour',
                        },
                        {
                            label: t('unit.minute'),
                            value: 'minute',
                        }
                    ], defaultValue: ['minute'], value: unit && [unit], onChange: (arr) => setUnit(arr[0]) }), children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { min: 1, max: maxes[unit], value: `${period}`, type: "number", placeholder: t('chooseExpiresAt'), onChange: (value) => {
                            const v = parseInt(value);
                            setPeriod(v);
                        } }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default['btn-container'], children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { color: "primary", onClick: () => confirm(), disabled: oakExecutable !== true, style: { flex: 2 }, children: t('common::action.confirm') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { onClick: () => onBack(), style: { flex: 1 }, children: t('common::back') })] })] }));
    return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: P });
}
exports.default = render;
