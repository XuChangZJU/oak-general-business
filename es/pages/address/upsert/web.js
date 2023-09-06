import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Button, Input, Form, TextArea } from 'antd-mobile';
import Style from './web.module.less';
import { OakInputIllegalException } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
export default function Render(props) {
    const { callAreaPicker, t, confirm, update } = props.methods;
    const { data } = props;
    const inputName = useRef(null);
    const inputPhone = useRef(null);
    const inputDetail = useRef(null);
    const [help, setHelp] = useState({});
    return (_jsxs("div", { className: Style.container, children: [_jsxs(Form, { layout: "horizontal", children: [_jsx(Form.Item, { label: t('address:attr.name'), name: "name", help: help.name, children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u59D3\u540D", onChange: (v) => update({ name: v }), value: data.name, "data-attr": "name", ref: inputName }) }) }), _jsx(Form.Item, { label: t('address:attr.phone'), name: "phone", help: help.phone, children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u624B\u673A\u53F7", onChange: (v) => update({ phone: v }), value: data.phone, "data-attr": "phone", ref: inputPhone }) }) }), _jsx(Form.Item, { label: t('address:attr.area'), name: "areaText", arrow: true, onClick: () => callAreaPicker(), children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u6240\u5728\u5730\u533A", value: data.areaText, "data-attr": "areaText", readOnly: true }) }) }), _jsx(Form.Item, { label: t('address:attr.detail'), name: "detail", help: help.detail, children: _jsx(_Fragment, { children: _jsx(TextArea, { maxLength: 100, onChange: (v) => update({ detail: v }), value: data.detail || undefined, "data-attr": "detail", placeholder: "\u8BE6\u7EC6\u5730\u5740", ref: inputDetail, showCount: true }) }) })] }), _jsx("div", { style: { flex: 1 } }), _jsx(Button, { block: true, disabled: !data.oakDirty || data.oakExecuting, loading: data.oakExecuting, color: "primary", onClick: async () => {
                    try {
                        await confirm();
                    }
                    catch (err) {
                        if (err instanceof OakInputIllegalException) {
                            const [attr] = err.getAttributes();
                            switch (attr) {
                                case 'name': {
                                    inputName.current?.focus();
                                    break;
                                }
                                case 'phone': {
                                    inputPhone.current?.focus();
                                    break;
                                }
                                case 'detail': {
                                    inputDetail.current?.focus();
                                    break;
                                }
                                default: {
                                    assert(false);
                                }
                            }
                            setHelp({
                                [attr]: err.message,
                            });
                        }
                        throw err;
                    }
                }, children: t('common::action.confirm') })] }));
}
