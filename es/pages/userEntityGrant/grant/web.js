import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Radio, Button, Space, InputNumber } from 'antd';
import Style from './web.module.less';
export default function render(props) {
    const { relation, type, number, period, relations, entity, entityId, relationId } = props.data;
    const { t, confirm, reset, setRelationId, setNumber, setPeriod } = props.methods;
    return (_jsx("div", { className: Style.pageWithPadding, children: _jsx("div", { className: Style.formContainer, children: _jsxs(Form, { labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [_jsx(Form.Item, { label: "\u6743\u9650", rules: [
                            {
                                required: true,
                                message: '请选择一个权限',
                            },
                        ], children: _jsx(Radio.Group, { value: relationId, onChange: (e) => {
                                setRelationId(e.target.value);
                            }, options: relations?.map((ele) => ({
                                value: ele.id,
                                label: ele.display || t(`${entity}:r.${ele.name}`),
                            })) }) }), type === 'grant' && (_jsx(Form.Item, { label: "\u4EBA\u6570", rules: [
                            {
                                required: true,
                                message: '请选择分享的目标人数',
                            },
                        ], children: _jsx(Radio.Group, { value: number, onChange: ({ target }) => {
                                const { value } = target;
                                setNumber(value);
                            }, options: [
                                { value: 1, label: '单次' },
                                { value: 10000, label: '不限次' },
                            ] }) })), _jsx(Form.Item, { label: "\u65F6\u6548", rules: [
                            {
                                required: true,
                                message: '请选择一个时效',
                            },
                        ], children: _jsx(InputNumber, { min: 1, max: 15, value: period, onChange: (value) => {
                                setPeriod(value);
                            }, addonAfter: "\u5206\u949F" }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsxs(Space, { children: [_jsx(Button, { htmlType: "submit", type: "primary", onClick: () => {
                                        confirm();
                                    }, children: "\u63D0\u4EA4" }), _jsx(Button, { htmlType: "reset", onClick: () => {
                                        reset();
                                    }, children: "\u91CD\u7F6E" })] }) })] }) }) }));
}
