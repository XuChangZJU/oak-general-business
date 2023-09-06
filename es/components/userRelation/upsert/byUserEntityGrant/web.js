import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Radio, Button, Input, Space, NoticeBar, Selector, } from 'antd-mobile';
import UserEntityGrantDetail from '../../../../pages/userEntityGrant/detail';
import Style from './web.module.less';
export default function render(props) {
    const { relations, userEntityGrant, userEntityGrantId, period, unit, maxes, oakExecutable, } = props.data;
    const { relationId, type, number, entity } = userEntityGrant || {};
    const { update, t, onBack, confirm, setInit, setPeriod, setUnit } = props.methods;
    const P = !!userEntityGrantId ? (_jsxs(_Fragment, { children: [_jsx(NoticeBar, { content: t('shareCode'), color: 'info' }), _jsx(UserEntityGrantDetail, { showBack: false, oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail" }), _jsx("div", { style: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }, children: _jsx(Button, { color: "primary", onClick: () => setInit(), block: true, children: t('restart') }) })] })) : (_jsxs(Form, { children: [_jsx(Form.Item, { label: t('userEntityGrant:attr.relation'), name: "relation", rules: [
                    {
                        required: true,
                    },
                ], children: _jsx(_Fragment, { children: _jsx(Radio.Group, { value: relationId, onChange: (value) => {
                            update({ relationId: value });
                        }, children: relations.map((ele) => _jsx(Radio, { value: ele.id, style: { marginRight: 20 }, children: ele.display || t(`${entity}:r.${ele.name}`) })) }) }) }), type === 'grant' && (_jsx(Form.Item, { label: t('userEntityGrant:attr.number'), name: "number", rules: [
                    {
                        required: true,
                        message: t('chooseNumber'),
                    },
                ], children: _jsx(_Fragment, { children: _jsxs(Radio.Group, { value: number, onChange: (value) => {
                            update({ number: value });
                        }, children: [_jsx(Radio, { value: 1, style: { marginRight: 20 }, children: t('single') }), _jsx(Radio, { value: 10000, children: t('unlimited') })] }) }) })), _jsx(Form.Item, { label: t('userEntityGrant:attr.expiresAt'), name: "period", rules: [
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
                        } }) }) }), _jsx(Form.Item, { children: _jsxs(Space, { children: [_jsx(Button, { color: "primary", onClick: () => confirm(), disabled: oakExecutable !== true, children: t('common::action.confirm') }), _jsx(Button, { onClick: () => onBack(), children: t('common::back') })] }) })] }));
    return _jsx("div", { className: Style.container, children: P });
}
