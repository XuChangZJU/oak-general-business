import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MessageList from '../../sessionMessage/list';
import Header from '../../../components/session/header';
import SessionCell from '../../../components/session/cell';
import classNames from 'classnames';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { sessions, selectedSessionId, oakFullpath, 
    // unReadConversation = 0,
    entityFilter, dialog = false, className, } = data;
    const { setSelectedSessionId } = methods;
    return (_jsx("div", { className: Style.container, children: _jsxs("div", { className: classNames(Style.bothContainer, className, {
                [Style.dialogContainer]: dialog,
            }), children: [_jsxs("div", { className: Style.conversationContainer, children: [_jsx(Header, {}), _jsx("div", { className: Style.inner, children: sessions?.map((session, index) => {
                                return (_jsx(SessionCell, { entityFilter: entityFilter, selectedId: selectedSessionId, onSelect: (id) => {
                                        setSelectedSessionId(id);
                                    }, oakId: session.id, oakPath: oakFullpath
                                        ? `${oakFullpath}.${session.id}`
                                        : '' }, session.id));
                            }) })] }), selectedSessionId && (_jsx(MessageList, { sessionId: selectedSessionId, 
                    // userType={userType || 'employer'}
                    // isCombine={true}
                    oakAutoUnmount: true, oakPath: oakFullpath
                        ? `$$session-base/sessionMessage`
                        : undefined }))] }) }));
}
