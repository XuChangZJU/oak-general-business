import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Row, Col, Select, Space, Input } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ComponentStyle from '../../../components/config/style';
import Style from './web.module.less';
export default function Render(props) {
    const { name, description, type, typeArr, variant, showBack = true, systemId, oakId, style, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (_jsx(Container, { variant: variant, showBack: showBack, children: _jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsxs(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u540D\u79F0", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                                        update({
                                            name: e.target.value,
                                        });
                                    }, value: name }) }) }), _jsx(Form.Item, { label: "\u63CF\u8FF0", children: _jsx(_Fragment, { children: _jsx(Input.TextArea, { onChange: (e) => {
                                        update({
                                            description: e.target.value,
                                        });
                                    }, value: description }) }) }), _jsx(Form.Item, { label: "\u5E94\u7528\u7C7B\u578B", required: true, children: _jsx(_Fragment, { children: _jsx(Select, { value: type, style: { width: 120 }, disabled: !!oakId, options: typeArr.map((ele) => ({
                                        label: t(`application:v.type.${ele.value}`),
                                        value: ele.value,
                                    })), onChange: (value) => {
                                        update({
                                            type: value,
                                        });
                                    } }) }) }), _jsx(Form.Item, { label: "\u6837\u5F0F", children: _jsx(_Fragment, { children: _jsx(ComponentStyle, { onChange: (value) => {
                                        update({
                                            style: value,
                                        });
                                    }, value: style }) }) }), _jsx(Action, { variant: variant, children: _jsx(Form.Item, { wrapperCol: { offset: 6 }, children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: () => {
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
    return (_jsx(PageHeader, { showBack: showBack, title: "\u5E94\u7528\u7F16\u8F91", children: _jsx("div", { className: Style.container, children: children }) }));
}
