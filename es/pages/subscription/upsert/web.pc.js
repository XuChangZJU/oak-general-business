import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Row, Col, Space, Input } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
export default function Render(props) {
    const { name, description, variant, showBack = true, entityId, entity, oakId, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (_jsx(Container, { variant: variant, showBack: showBack, children: _jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsxs(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u540D\u79F0", required: true, name: "name", rules: [
                                {
                                    required: true,
                                },
                            ], children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                                        update({
                                            name: e.target.value,
                                        });
                                    }, value: name }) }) }), _jsx(Form.Item, { label: "\u63CF\u8FF0", required: true, name: "description", children: _jsx(_Fragment, { children: _jsx(Input.TextArea, { onChange: (e) => {
                                        update({
                                            description: e.target.value,
                                        });
                                    }, value: description }) }) }), _jsx(Action, { variant: variant, children: _jsx(Form.Item, { wrapperCol: { offset: 6 }, children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: () => {
                                                confirm();
                                            }, children: "\u786E\u5B9A" }), _jsx(Button, { onClick: () => {
                                                navigateBack();
                                            }, children: "\u8FD4\u56DE" })] }) }) })] }) }) }) }));
}
function Action(props) {
    const { children, variant } = props;
    if (variant === 'dialog') {
        return null;
    }
    return (_jsx(_Fragment, { children: children }));
}
function Container(props) {
    const { children, variant, showBack } = props;
    if (variant === 'inline' || variant === 'dialog') {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsx(PageHeader, { showBack: showBack, title: "\u8BA2\u9605\u53F7\u7F16\u8F91", children: _jsx("div", { className: Style.container, children: children }) }));
}
