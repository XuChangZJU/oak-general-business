import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Row, Col, Input, Space } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ComponentStyle from '../../../components/config/style';
import Style from './web.module.less';
export default function Render(props) {
    const { name, description, style } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (_jsx(PageHeader, { showBack: true, title: "\u5E73\u53F0\u7F16\u8F91", children: _jsx("div", { className: Style.container, children: _jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsxs(Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u540D\u79F0", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                                            update({
                                                name: e.target.value,
                                            });
                                        }, value: name }) }) }), _jsx(Form.Item, { label: "\u63CF\u8FF0", children: _jsx(_Fragment, { children: _jsx(Input.TextArea, { onChange: (e) => {
                                            update({
                                                description: e.target.value,
                                            });
                                        }, value: description }) }) }), _jsx(Form.Item, { label: "\u6837\u5F0F", children: _jsx(_Fragment, { children: _jsx(ComponentStyle, { onChange: (value) => {
                                            update({
                                                style: value,
                                            });
                                        }, value: style }) }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: () => {
                                                confirm();
                                            }, children: "\u786E\u5B9A" }), _jsx(Button, { onClick: () => {
                                                navigateBack();
                                            }, children: "\u8FD4\u56DE" })] }) })] }) }) }) }) }));
}
