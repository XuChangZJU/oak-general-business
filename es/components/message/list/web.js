import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import MessageCell from '../../../components/message/cell';
import Empty from '../../../components/common/empty';
export default function Render(props) {
    const { data, methods } = props;
    const { messages, oakFullpath } = data;
    const { goDetailById } = methods;
    return (_jsx(_Fragment, { children: messages?.length > 0 ? (_jsx("div", { children: messages?.map((message, index) => (_jsx(MessageCell, { oakId: message.id, oakPath: oakFullpath
                    ? `${oakFullpath}.${message.id}`
                    : '', onItemClicked: (item) => {
                    goDetailById(item.id);
                } }, message.id))) })) : (_jsx(Empty, { description: "\u6682\u65E0\u6D88\u606F", image: Empty.PRESENTED_IMAGE_SIMPLE })) }));
}
