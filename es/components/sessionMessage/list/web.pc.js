import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button, Input, Upload } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import MessageCell from '../../../components/sessionMessage/cell';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { sessionId, isEntity, sessionMessageList, oakFullpath, text, employerId, buttonHidden, } = data;
    const { setButtonHidden, customUpload, setContent, pageScroll, createMessage, } = methods;
    const [bottomHeight, setBottomHeight] = useState(0);
    useEffect(() => {
        if (buttonHidden) {
            const newBottomHeight = window.document.getElementById('bottom')?.offsetHeight;
            setBottomHeight(newBottomHeight);
        }
        else {
            setBottomHeight(0);
        }
    }, [buttonHidden]);
    return (_jsxs("div", { className: Style.container, children: [_jsx("div", { className: Style.inner, style: {
                    marginBottom: bottomHeight ? `${bottomHeight}px` : '168px',
                }, id: "comment", onClick: () => setButtonHidden(true), children: sessionMessageList
                    ?.sort((a, b) => a.$$createAt$$ -
                    b.$$createAt$$)
                    .map((sessionMessage, index) => {
                    return (_jsx(MessageCell, { oakId: sessionMessage.id, oakPath: oakFullpath
                            ? `${oakFullpath}.${sessionMessage.id}`
                            : '', isEntity: isEntity }, sessionMessage.id));
                }) }), _jsxs("div", { className: Style.bottom, id: "bottom", children: [_jsx("div", { className: Style.toolbar, children: _jsx(Upload, { accept: 'image/*', multiple: false, showUploadList: false, customRequest: () => { }, onChange: ({ file }) => {
                                customUpload(file);
                            }, children: _jsx(PictureOutlined, { className: Style.icon }) }) }), _jsxs("div", { className: Style.textareaBox, children: [_jsx(Input.TextArea, { className: Style.textarea, rows: 5, onChange: (e) => {
                                    setContent(e.target.value);
                                }, onFocus: () => {
                                    setButtonHidden(true);
                                }, onPressEnter: (e) => {
                                    e.preventDefault();
                                    createMessage();
                                    pageScroll('comment');
                                }, value: text }), _jsx("div", { className: Style.btn, children: _jsx(Button, { type: "primary", disabled: text ? false : true, onClick: () => {
                                        createMessage();
                                        pageScroll('comment');
                                    }, children: "\u53D1\u9001" }) })] })] })] }));
}
