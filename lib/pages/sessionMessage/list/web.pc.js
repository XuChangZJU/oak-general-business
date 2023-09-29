"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const cell_1 = tslib_1.__importDefault(require("../../../components/sessionMessage/cell"));
// import Header from '../../../components/session/forMessage';
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { sessionId, userType, sessionMessageList, oakFullpath, text, employerId, buttonHidden, } = data;
    const { setButtonHidden, customUpload, setContent, pageScroll, createMessage, } = methods;
    const [bottomHeight, setBottomHeight] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (buttonHidden) {
            const newBottomHeight = window.document.getElementById('bottom')?.offsetHeight;
            setBottomHeight(newBottomHeight);
        }
        else {
            setBottomHeight(0);
        }
    }, [buttonHidden]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.inner, style: {
                    marginBottom: bottomHeight ? `${bottomHeight}px` : '168px',
                }, id: "comment", onClick: () => setButtonHidden(true), children: sessionMessageList
                    ?.sort((a, b) => a.$$createAt$$ -
                    b.$$createAt$$)
                    .map((sessionMessage, index) => {
                    return ((0, jsx_runtime_1.jsx)(cell_1.default, { oakId: sessionMessage.id, oakPath: oakFullpath
                            ? `${oakFullpath}.${sessionMessage.id}`
                            : '' }, sessionMessage.id));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.bottom, id: "bottom", children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.toolbar, children: (0, jsx_runtime_1.jsx)(antd_1.Upload, { accept: 'image/*', multiple: false, showUploadList: false, customRequest: () => { }, onChange: ({ file }) => {
                                customUpload(file);
                            }, children: (0, jsx_runtime_1.jsx)(icons_1.PictureOutlined, { className: web_module_less_1.default.icon }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.textareaBox, children: [(0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { className: web_module_less_1.default.textarea, rows: 5, onChange: (e) => {
                                    setContent(e.target.value);
                                }, onFocus: () => {
                                    setButtonHidden(true);
                                }, onPressEnter: (e) => {
                                    e.preventDefault();
                                    createMessage();
                                    pageScroll('comment');
                                }, value: text }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.btn, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", disabled: text ? false : true, onClick: () => {
                                        createMessage();
                                        pageScroll('comment');
                                    }, children: "\u53D1\u9001" }) })] })] })] }));
}
exports.default = Render;
