import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Row, Col, Input } from 'antd';
import PageHeader from '../../../../components/common/pageHeader';
import { getWechatPublicTags } from '../../../../config/constants';
export default function Render(props) {
    const { variant, showBack = true, text, wechatId, sync, oakDirty, oakExecuting, oakId, } = props.data;
    const { t, update, navigateBack, confirm, createTag, editTag } = props.methods;
    const WechatPublicTags = getWechatPublicTags();
    const TagOptions = Object.keys(WechatPublicTags).map(ele => ({
        label: WechatPublicTags[ele],
        value: WechatPublicTags[ele],
    }));
    return (_jsx(PageHeader, { showBack: true, title: "\u5FAE\u4FE1\u516C\u4F17\u53F7TAG\u4FE1\u606F", children: _jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsx(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: _jsx(Form.Item, { label: "TAG\u540D\u79F0", required: true, rules: [
                            {
                                required: true,
                            },
                        ], children: _jsx(_Fragment, { children: _jsx(Input, { value: text, onChange: (v) => update({ text: v.target.value }), placeholder: '\u6807\u7B7E\u540D\u79F0', maxLength: 30 }) }) }) }) }) }) }));
}
