"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const cell_1 = tslib_1.__importDefault(require("../../../components/sessionMessage/cell"));
const upsert_1 = tslib_1.__importDefault(require("../../../components/sessionMessage/upsert"));
const forMessage_1 = tslib_1.__importDefault(require("../../../components/session/forMessage"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { sessionId, isEntity, sessionMessageList, oakFullpath, text, buttonHidden, sessionMessageId, entityDisplay, entityProjection, isWeChat, } = data;
    const { customUpload, setContent, pageScroll, createMessage, } = methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(forMessage_1.default, { sessionId: sessionId, isEntity: isEntity, oakPath: '$$sessionMessage/list-session/header', oakAutoUnmount: true, entityDisplay: entityDisplay, entityProjection: entityProjection }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.inner, id: "comment", children: sessionMessageList
                    ?.sort((a, b) => a.$$createAt$$ -
                    b.$$createAt$$)
                    .map((sessionMessage, index) => {
                    return ((0, jsx_runtime_1.jsx)(cell_1.default, { oakId: sessionMessage.id, oakPath: oakFullpath
                            ? `${oakFullpath}.${sessionMessage.id}`
                            : '', isEntity: isEntity }, sessionMessage.id));
                }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.bottom, id: "bottom", children: sessionMessageId && ((0, jsx_runtime_1.jsx)(upsert_1.default, { isEntity: isEntity, oakId: sessionMessageId, oakPath: oakFullpath
                        ? `${oakFullpath}.${sessionMessageId}`
                        : '', oakAutoUnmount: true, send: () => {
                        createMessage();
                    }, setText: (text) => {
                        setContent(text);
                    }, customUpload: (file) => {
                    } }, `MessageUpsert_${sessionMessageId}`)) })] }));
}
exports.default = Render;
