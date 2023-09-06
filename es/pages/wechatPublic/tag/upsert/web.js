import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Row, Col, Select, Space } from 'antd';
import PageHeader from '../../../../components/common/pageHeader';
import { getWechatPublicTags } from '../../../../config/constants';
export default function Render(props) {
    const { text, variant, showBack = true, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    const WechatPublicTags = getWechatPublicTags();
    const TagOptions = Object.keys(WechatPublicTags).map(ele => ({
        label: WechatPublicTags[ele],
        value: WechatPublicTags[ele],
    }));
    return (_jsx(PageHeader, { showBack: true, title: "\u5FAE\u4FE1\u516C\u4F17\u53F7TAG\u4FE1\u606F", children: _jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsxs(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "TAG\u540D\u79F0", required: true, name: "text", rules: [
                                {
                                    required: true,
                                },
                            ], children: _jsx(_Fragment, { children: _jsx(Select, { value: text, onChange: (v) => update({ text: v }), options: TagOptions }) }) }), _jsx(Action, { variant: variant, children: _jsx(Form.Item, { wrapperCol: { offset: 6 }, children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: () => {
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
