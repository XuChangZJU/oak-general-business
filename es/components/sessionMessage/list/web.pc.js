import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Button, Input, Upload } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import MessageCell from '../../../components/sessionMessage/cell';
import Header from '../../../components/session/forMessage';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { sessionId, isEntity, isUser, sessionMessageList, oakFullpath, text, buttonHidden, sessionMessageType, sessionMessageId, entityDisplay, entityProjection, isWeChat, } = data;
    const { setButtonHidden, customUpload, setContent, pageScroll, createMessage, } = methods;
    const [bottomHeight, setBottomHeight] = useState(0);
    const textareaRef = useRef(null);
    // const [text1, setText1] = useState("");
    // const newBottomHeight =
    //     window.document.getElementById('bottom')?.offsetHeight!;
    useEffect(() => {
        if (buttonHidden) {
            const newBottomHeight = window.document.getElementById('bottom')?.offsetHeight;
            setBottomHeight(newBottomHeight);
        }
        else {
            setBottomHeight(0);
        }
    }, [buttonHidden]);
    const handleKeyDown = (event) => {
        // if (event.key === "Enter" && event.shiftKey) {
        // event.preventDefault(); // 阻止默认的换行行为
        // 执行你的换行逻辑
        // setContent(text + "\n");
        // if (textareaRef && textareaRef.current && textareaRef.current!.resizableTextArea) {
        //     const textArea = textareaRef.current.resizableTextArea.textAreaRef; // 获取 Input.TextArea 的原生 textarea 元素
        //     console.log(textArea)
        //     if (textArea) {
        //         console.log(textArea)
        //         const selectionStart = textArea?.selectionStart;
        //         const value = textArea?.value;
        //         const newValue =
        //             value?.substring(0, selectionStart) +
        //             "\n" +
        //             value?.substring(selectionStart);
        //         textArea.value = newValue;
        //         textArea.selectionStart = textArea.selectionEnd = selectionStart + 1;
        //         // 触发 onChange 事件，更新 Input.TextArea 的值
        //         textArea.dispatchEvent(new Event("input"));
        //     }
        // }
        // }
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            createMessage();
            pageScroll('comment');
        }
    };
    return (_jsxs("div", { className: Style.container, children: [_jsx(Header
            // showBack={false}
            , { 
                // showBack={false}
                sessionId: sessionId, isEntity: isEntity, 
                // userId={employerId}
                oakPath: 'session:header1', oakAutoUnmount: true, entityDisplay: entityDisplay, entityProjection: entityProjection }), _jsx("div", { className: Style.inner, style: {
                    marginBottom: bottomHeight ? `${bottomHeight}px` : '168px',
                }, id: "comment", onClick: () => setButtonHidden(true), children: sessionMessageList
                    ?.sort((a, b) => a.$$createAt$$ -
                    b.$$createAt$$)
                    .map((sessionMessage, index) => {
                    return (_jsx(MessageCell, { oakId: sessionMessage.id, oakPath: oakFullpath
                            ? `${oakFullpath}.${sessionMessage.id}`
                            : '', isEntity: isEntity, isUser: isUser }, sessionMessage.id));
                }) }), _jsxs("div", { className: Style.bottom, id: "bottom", children: [_jsx("div", { className: Style.toolbar, children: _jsx(Upload, { accept: 'image/*', multiple: false, showUploadList: false, customRequest: () => { }, onChange: ({ file }) => {
                                customUpload(file);
                            }, children: _jsx(PictureOutlined, { className: Style.icon }) }) }), _jsxs("div", { className: Style.textareaBox, children: [_jsx(Input.TextArea, { ref: textareaRef, className: Style.textarea, 
                                // autoSize={{ minRows: 2, maxRows: 15 }}
                                maxLength: 500, placeholder: "Enter \u53D1\u9001\uFF0CShift + Enter\u6362\u884C", rows: 5, onChange: (e) => {
                                    setContent(e.target.value);
                                }, onFocus: () => {
                                    setButtonHidden(true);
                                }, 
                                // onPressEnter={(e) => {
                                //     e.preventDefault();
                                //     createMessage();
                                //     pageScroll('comment');
                                // }}
                                onKeyDown: handleKeyDown, value: text }), _jsx("div", { className: Style.btn, children: _jsx(Button, { type: "primary", disabled: text ? false : true, onClick: () => {
                                        createMessage();
                                        pageScroll('comment');
                                    }, children: "\u53D1\u9001" }) })] })] })] }));
}
