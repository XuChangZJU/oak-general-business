import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Radio, Button, Alert, InputNumber, Space, Checkbox, Select, Switch, } from 'antd';
import UserEntityGrantShare from '../../../userEntityGrant/share';
import Style from './web.module.less';
export default function render(props) {
    const { relations, userEntityGrant, userEntityGrantId, period, unit, maxes, oakExecutable, rules, } = props.data;
    const { relationIds, type, rule, multiple, relationEntity } = userEntityGrant || {};
    const { update, t, onBack, confirm, setInit, setPeriod, setUnit } = props.methods;
    const P = !!userEntityGrantId ? (_jsxs(_Fragment, { children: [_jsx(Alert, { showIcon: true, message: t('shareCode'), type: "info", style: { marginBottom: 16 } }), _jsx(UserEntityGrantShare, { showBack: false, oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail" }), _jsx("div", { style: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }, children: _jsx(Button, { type: "primary", onClick: () => setInit(), children: t('restart') }) })] })) : (_jsxs(Form, { labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [_jsx(Form.Item, { label: t('userEntityGrant:attr.relationIds'), required: true, children: _jsx(Checkbox.Group, { value: relationIds || [], onChange: (val) => {
                        update({ relationIds: val });
                    }, options: relations?.map((ele) => ({
                        value: ele.id,
                        label: ele.display ||
                            t(`${relationEntity}:r.${ele.name}`),
                    })) }) }), relationIds?.length > 1 && (_jsx(Form.Item, { label: t('userEntityGrant:attr.rule'), help: t('helpRule'), children: _jsx(Radio.Group, { value: rule, onChange: ({ target }) => update({ rule: target.value }), options: rules.map((ele) => ({
                        value: ele,
                        label: t(`userEntityGrant:v.rule.${ele}`)
                    })) }) })), type === 'grant' && (_jsx(Form.Item, { label: t('multiple'), required: true, help: t('helpMutiple'), children: _jsx(Switch, { checked: multiple || false, onChange: (val) => update({ multiple: val }) }) })), _jsx(Form.Item, { label: t('userEntityGrant:attr.expiresAt'), required: true, 
                // name="period"
                // rules={[
                //     {
                //         required: true,
                //         message: t('chooseExpiresAt'),
                //     },
                // ]}
                help: _jsx("div", { style: { marginBottom: 16 }, children: t('expiresHelp') }), tooltip: "\u901A\u8FC7\u914D\u7F6E\u5B9E\u73B0\u5728\u89C4\u5B9A\u7684\u65F6\u6548\u5185\u626B\u63CF\u4E8C\u7EF4\u7801\u4E0D\u8FC7\u671F\u7684\u6548\u679C\u3002", children: _jsx(InputNumber, { min: 1, max: maxes[unit], value: period, onChange: (value) => setPeriod(value), 
                    // addonAfter="分钟"
                    addonAfter: _jsxs(Select, { value: unit, style: { width: 80 }, onChange: (v) => {
                            setUnit(v);
                        }, children: [_jsx(Select.Option, { value: "minute", children: t('unit.minute') }), _jsx(Select.Option, { value: "hour", children: t('unit.hour') })] }) }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: () => confirm(), disabled: oakExecutable !== true, children: t('common::action.confirm') }), _jsx(Button, { onClick: () => onBack(), children: t('common::back') })] }) })] }));
    return _jsx("div", { className: Style.container, children: P });
}
