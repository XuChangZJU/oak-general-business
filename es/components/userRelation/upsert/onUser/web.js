import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input } from 'antd-mobile';
import Style from './mobile.module.less';
import UserRelation from './userRelation';
export default function Render(props) {
    const { name, isNew, nickname, password, relations, oakFullpath, entity, entityId } = props.data;
    const { t, update } = props.methods;
    return (_jsxs(_Fragment, { children: [_jsx(Form.Item, { style: { marginBottom: 0 }, label: _jsx("div", { className: Style.tip, children: !isNew ? t('existedUser') : t('newUser') }) }), _jsx(Form.Item, { label: t('user:attr.name'), name: "name", rules: [
                    {
                        required: true,
                    },
                ], children: _jsx(_Fragment, { children: _jsx(Input, { disabled: !isNew, onChange: (value) => {
                            update({
                                name: value,
                            });
                        }, value: name, placeholder: t('placeholder.name') }) }) }), !isNew ? _jsx(Form.Item, { label: t('user:attr.nickname'), name: "nickname", rules: [
                    {
                        required: true,
                    },
                ], children: _jsx(_Fragment, { children: _jsx(Input, { disabled: true, value: nickname }) }) }) : _jsx(Form.Item, { label: t('user:attr.password'), name: "password", rules: [
                    {
                        required: true,
                    },
                ], children: _jsx(_Fragment, { children: _jsx(Input, { value: password, onChange: (value) => {
                            update({
                                password: value,
                            });
                        }, placeholder: t('placeholder.password') }) }) }), _jsx(Form.Item, { label: t('auth'), rules: [
                    {
                        required: true,
                    },
                ], name: "relation", children: _jsx(UserRelation, { oakAutoUnmount: true, oakPath: oakFullpath ? `${oakFullpath}.userRelation$user`
                        : undefined, entity: entity, entityId: entityId, relations: relations }) })] }));
}
