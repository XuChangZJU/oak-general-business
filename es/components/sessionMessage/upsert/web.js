import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from 'react';
import { Button, Input, Upload } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import Style from './web.module.less';
export default function render(props) {
    const { data, methods } = props;
    const { $$createAt$$, text, type, picUrl, isEntity, aaoe, sessionId, isWeChat, } = data;
    const { t, setContent, sendData, upload } = methods;
    const textareaRef = useRef(null);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendData();
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: Style.toolbar, children: _jsx(Upload, { accept: 'image/*', multiple: false, showUploadList: false, customRequest: () => { }, onChange: ({ file }) => {
                        upload(file);
                    }, children: _jsx(PictureOutlined, { className: Style.icon }) }) }), _jsxs("div", { className: Style.textareaBox, children: [_jsx(Input.TextArea, { ref: textareaRef, className: Style.textarea, maxLength: 500, placeholder: t('placeholder'), rows: 5, onChange: (e) => {
                            setContent(e.target.value);
                        }, onFocus: () => { }, onKeyDown: handleKeyDown, value: text }), _jsx("div", { className: Style.btn, children: _jsx(Button, { type: "primary", disabled: !text, onClick: () => {
                                sendData();
                            }, children: t('send') }) })] })] }));
}
