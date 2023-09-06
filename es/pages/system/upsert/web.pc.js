import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Row, Col, Switch, Input, Space } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ComponentStyle from '../../../components/config/style';
import Style from './web.module.less';
export default function Render(props) {
    const { name, description, folder, super: super2, style, variant, showBack = true, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (_jsx(Container, { variant: variant, showBack: showBack, children: _jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsxs(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u540D\u79F0", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                                        update({
                                            name: e.target.value,
                                        });
                                    }, value: name }) }) }), _jsx(Form.Item, { label: "\u76EE\u5F55", required: true, 
                            // name="folder"
                            tooltip: "\u76EE\u5F55\u5C5E\u6027\u5E94\u548C\u5F00\u53D1\u76EE\u5F55\u4E0B\u7684\u5BF9\u5E94\u76EE\u5F55\u540D\u5339\u914D\uFF0C\u8BF7\u8C28\u614E\u4FEE\u6539", rules: [
                                {
                                    required: true,
                                },
                            ], children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                                        update({
                                            folder: e.target.value,
                                        });
                                    }, value: folder }) }) }), _jsx(Form.Item, { label: "\u63CF\u8FF0", required: true, children: _jsx(_Fragment, { children: _jsx(Input.TextArea, { onChange: (e) => {
                                        update({
                                            description: e.target.value,
                                        });
                                    }, value: description }) }) }), _jsx(Form.Item, { label: "\u662F\u5426\u4E3A\u8D85\u7EA7\u7CFB\u7EDF", required: true, tooltip: "\u8D85\u7EA7\u7528\u6237\u5C5E\u6027\u53EF\u80FD\u5F71\u54CD\u7A0B\u5E8F\u7684\u8FD0\u884C\u903B\u8F91\uFF0C\u8BF7\u8C28\u614E\u4FEE\u6539", children: _jsx(_Fragment, { children: _jsx(Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426", checked: super2, onChange: (checked) => {
                                        update({
                                            super: checked,
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
    return (_jsx(PageHeader, { showBack: showBack, title: "\u7CFB\u7EDF\u7F16\u8F91", children: _jsx("div", { className: Style.container, children: children }) }));
}
