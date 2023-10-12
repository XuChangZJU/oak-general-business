import { jsx as _jsx } from "react/jsx-runtime";
import SessionMessageList from '../../sessionMessage/list';
export default function Render(props) {
    const { data } = props;
    const { oakFullpath, newSessionId } = data;
    return newSessionId ? (_jsx(SessionMessageList, { oakAutoUnmount: true, oakPath: oakFullpath ? `$$sessionMessage/list` : undefined, sessionId: newSessionId, isEntity: false })) : null;
}
