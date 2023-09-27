import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, Avatar, Tag, Button, Input } from 'antd-mobile';
import { UserCircleOutline } from 'antd-mobile-icons';
import Style from './mobile.module.less';
export default function Render(props) {
    const { t, goUpsert, goUpdate, addNamedFilter, refresh, removeNamedFilterByName, } = props.methods;
    const { entity, users, searchValue } = props.data;
    return (_jsxs("div", { className: Style.container, children: [_jsxs("span", { className: Style.header, children: [_jsx("div", { style: { flex: 1 }, children: _jsx(Input, { placeholder: t('search'), value: searchValue, onChange: (value) => {
                                addNamedFilter({
                                    '#name': 'name',
                                    filter: {
                                        $text: {
                                            $search: value,
                                        },
                                    },
                                }, false);
                            }, onEnterPress: () => refresh(), clearable: true, onClear: () => removeNamedFilterByName('name') }) }), _jsx(Button, { size: "small", color: "primary", onClick: () => goUpsert(), children: t('common::action.create') })] }), _jsx(List, { children: users?.map((ele, index) => {
                    return (_jsx(List.Item, { prefix: ele.avatar ? (_jsx(Avatar, { className: Style.avatar, src: ele.avatar })) : (_jsx(UserCircleOutline, { className: Style.avatar })), extra: ele.mobile || '--', description: _jsx("div", { style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                            }, children: ele.userRelation$user?.map((ele2, index2) => (_jsx(Tag, { fill: "outline", children: ele2.relation?.name
                                    ? t(entity +
                                        ':r.' +
                                        ele2.relation
                                            .name)
                                    : ele2.relation?.display }, index))) }), onClick: () => goUpdate(ele.id), children: ele.name || ele.nickname || '--' }));
                }) })] }));
}
