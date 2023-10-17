import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SessionMessageCell from '../../../components/sessionMessage/cell';
import MessageUpsert from '../../../components/sessionMessage/upsert';
import Header from '../../../components/session/forMessage';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { sessionId, isEntity, sessionMessages, oakFullpath, sessionMessageId, entityDisplay, entityProjection, } = data;
    const { customUpload, setContent, sendMessage } = methods;
    return (_jsxs("div", { className: Style.container, children: [_jsx(Header, { sessionId: sessionId, isEntity: isEntity, oakPath: '$$sessionMessage/list-session/header', oakAutoUnmount: true, entityDisplay: entityDisplay, entityProjection: entityProjection }), _jsx("div", { className: Style.inner, id: "comment", children: sessionMessages
                    ?.sort((a, b) => a.$$createAt$$ -
                    b.$$createAt$$)
                    .map((sessionMessage, index) => {
                    return (_jsx(SessionMessageCell, { oakId: sessionMessage.id, oakPath: oakFullpath
                            ? `${oakFullpath}.${sessionMessage.id}`
                            : '', isEntity: isEntity }, sessionMessage.id));
                }) }), _jsx("div", { className: Style.bottom, id: "bottom", children: sessionMessageId && (_jsx(MessageUpsert, { isEntity: isEntity, oakId: sessionMessageId, oakPath: oakFullpath
                        ? `${oakFullpath}.${sessionMessageId}`
                        : '', oakAutoUnmount: true, send: () => {
                        sendMessage();
                    }, setText: (text) => {
                        setContent(text);
                    }, customUpload: (file) => {
                        customUpload(file);
                    } }, `MessageUpsert_${sessionMessageId}`)) })] }));
}
