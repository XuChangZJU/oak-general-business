"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const cell_1 = tslib_1.__importDefault(require("../../../components/sessionMessage/cell"));
const forMessage_1 = tslib_1.__importDefault(require("../../../components/session/forMessage"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { sessionId, isEntity, isUser, sessionMessageList, oakFullpath, text, buttonHidden, sessionMessageType, sessionMessageId, entityDisplay, entityProjection, isWeChat, } = data;
    const { setButtonHidden, customUpload, setContent, pageScroll, createMessage, } = methods;
    const [bottomHeight, setBottomHeight] = (0, react_1.useState)(0);
    const textareaRef = (0, react_1.useRef)(null);
    // const newBottomHeight =
    //     window.document.getElementById('bottom')?.offsetHeight!;
    (0, react_1.useEffect)(() => {
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
    console.log(isWeChat);
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(forMessage_1.default
            // showBack={false}
            , { 
                // showBack={false}
                sessionId: sessionId, isEntity: isEntity, 
                // userId={employerId}
                oakPath: 'session:header1', oakAutoUnmount: true, entityDisplay: entityDisplay, entityProjection: entityProjection }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.inner, style: {
                    marginBottom: bottomHeight ? `${bottomHeight}px` : '168px',
                }, id: "comment", onClick: () => setButtonHidden(true), children: sessionMessageList
                    ?.sort((a, b) => a.$$createAt$$ -
                    b.$$createAt$$)
                    .map((sessionMessage, index) => {
                    return ((0, jsx_runtime_1.jsx)(cell_1.default, { oakId: sessionMessage.id, oakPath: oakFullpath
                            ? `${oakFullpath}.${sessionMessage.id}`
                            : '', isEntity: isEntity, isUser: isUser }, sessionMessage.id));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.bottom, id: "bottom", children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.toolbar, children: isWeChat ? (
                        //微信资源库
                        (0, jsx_runtime_1.jsx)(icons_1.PictureOutlined, { className: web_module_less_1.default.icon })) : ((0, jsx_runtime_1.jsx)(antd_1.Upload, { accept: 'image/*', multiple: false, showUploadList: false, customRequest: () => { }, onChange: ({ file }) => {
                                customUpload(file);
                            }, children: (0, jsx_runtime_1.jsx)(icons_1.PictureOutlined, { className: web_module_less_1.default.icon }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.textareaBox, children: [(0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { ref: textareaRef, className: web_module_less_1.default.textarea, 
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
                                onKeyDown: handleKeyDown, value: text }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.btn, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", disabled: text ? false : true, onClick: () => {
                                        createMessage();
                                        pageScroll('comment');
                                    }, children: "\u53D1\u9001" }) })] })] })] }));
}
exports.default = Render;
