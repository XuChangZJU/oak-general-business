import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Style from './web.module.less';
import MessageCell from '../../../components/message/cell';
import Empty from '../../../components/common/empty';
export default function Render(props) {
    const { data, methods } = props;
    const { messages, open, onClose, oakFullpath } = data;
    const { goDetailById, goMessageList } = methods;
    return (_jsx(_Fragment, { children: messages?.length > 0 ? (_jsx("div", { children: messages?.map((message, index) => (_jsx(MessageCell, { oakId: message.id, oakPath: oakFullpath
                    ? `${oakFullpath}.${message.id}`
                    : '', onItemClicked: (item) => {
                    const { id } = item;
                    onClose && onClose();
                    goDetailById(id);
                } }, message.id))) })) : (_jsx("div", { className: Style.noData, children: _jsx(Empty, { description: "\u6682\u65E0\u6D88\u606F", image: Empty.PRESENTED_IMAGE_SIMPLE }) })) }));
}
