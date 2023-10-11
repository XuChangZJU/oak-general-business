import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Style from './mobile.module.less';
import Header from '../../../components/session/header';
import SessionCell from '../../../components/session/cell';
export default function Render(props) {
    const { data, methods } = props;
    const { sessions, selectedSessionId, oakFullpath, entityFilter, } = data;
    const { setSelectedSessionId, navigateToMessage, } = methods;
    return (_jsx("div", { className: Style.container, children: _jsxs("div", { className: Style.conversationContainer, children: [_jsx(Header, {}), sessions?.map((session, index) => {
                    return (_jsx(SessionCell, { entityFilter: entityFilter, selectedId: selectedSessionId, name: session?.name, onSelect: (id) => {
                            navigateToMessage(id);
                        }, oakId: session.id, oakPath: oakFullpath
                            ? `${oakFullpath}.${session.id}`
                            : '' }, session.id));
                })] }) }));
}
