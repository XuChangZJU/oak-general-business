import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Radio, Checkbox, Button, Input, Space, NoticeBar, Selector, Switch, } from 'antd-mobile';
import UserEntityGrantShare from '../../../userEntityGrant/share';
import Style from './web.module.less';
export default function render(props) {
    const { relations, userEntityGrant, userEntityGrantId, period, unit, maxes, rules, oakExecutable, } = props.data;
    const { relationIds, type, multiple, relationEntity, rule } = userEntityGrant || {};
    const { update, t, onBack, confirm, setInit, setPeriod, setUnit } = props.methods;
    const P = !!userEntityGrantId ? (_jsxs(_Fragment, { children: [_jsx(NoticeBar, { content: t('shareCode'), color: 'info' }), _jsx(UserEntityGrantShare, { oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail" }), _jsx("div", { style: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }, children: _jsx(Button, { color: "primary", onClick: () => setInit(), block: true, children: t('restart') }) })] })) : (_jsxs(Form, { children: [_jsx(Form.Item, { label: t('userEntityGrant:attr.relationIds'), required: true, children: _jsx(Checkbox.Group, { value: relationIds || [], onChange: (val) => {
                        update({ relationIds: val });
                    }, children: _jsx(Space, { direction: 'vertical', children: relations?.map((ele) => (_jsx(Checkbox, { value: ele.id, children: ele.display || t(`${relationEntity}:r.${ele.name}`) }))) }) }) }), relationIds?.length > 1 && (_jsx(Form.Item, { label: t('userEntityGrant:attr.rule'), required: true, help: t('helpRule'), children: _jsx(Radio.Group, { value: rule, onChange: (val) => update({ rule: val }), children: _jsx(Space, { direction: 'vertical', children: rules.map((ele) => _jsx(Radio, { value: ele, children: t(`userEntityGrant:v.rule.${ele}`) })) }) }) })), type === 'grant' && (_jsx(Form.Item, { label: t('multiple'), required: true, help: t('helpMutiple'), children: _jsx(Switch, { checked: multiple || false, onChange: (val) => update({ multiple: val }) }) })), _jsx(Form.Item, { label: t('userEntityGrant:attr.expiresAt'), name: "period", rules: [
                    {
                        required: true,
                        message: t('chooseExpiresAt'),
                    },
                ], help: _jsx("div", { style: { marginBottom: 16 }, children: t('expiresAt') }), extra: _jsx(Selector, { options: [
                        {
                            label: t('unit.hour'),
                            value: 'hour',
                        },
                        {
                            label: t('unit.minute'),
                            value: 'minute',
                        }
                    ], defaultValue: ['minute'], value: unit && [unit], onChange: (arr) => setUnit(arr[0]) }), children: _jsx(_Fragment, { children: _jsx(Input, { min: 1, max: maxes[unit], value: `${period}`, type: "number", placeholder: t('chooseExpiresAt'), onChange: (value) => {
                            const v = parseInt(value);
                            setPeriod(v);
                        } }) }) }), _jsxs("div", { className: Style['btn-container'], children: [_jsx(Button, { color: "primary", onClick: () => confirm(), disabled: oakExecutable !== true, style: { flex: 2 }, children: t('common::action.confirm') }), _jsx(Button, { onClick: () => onBack(), style: { flex: 1 }, children: t('common::back') })] })] }));
    return _jsx("div", { className: Style.container, children: P });
}
