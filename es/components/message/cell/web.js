import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tag, Badge } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';
const MessageType = {
    adminNotification: '系统通知',
    conversationMessage: '客服消息',
};
// success、 processing、error、default、warning
const MessageTypeToColor = {
    adminNotification: 'processing',
    conversationMessage: 'warning',
};
export default function Render(props) {
    const { data, methods } = props;
    const { id, router, title, type, $$createAt$$, visitState, oakLegalActions = [], onItemClicked, } = data;
    const { navigateTo, execute } = methods;
    return (_jsxs("div", { className: Style.list, onClick: onItemClicked
            ? () => {
                onItemClicked({
                    id,
                    router,
                });
            }
            : undefined, children: [_jsxs("div", { className: Style.list__notify, children: [visitState === 'unvisited' && (_jsx(Badge, { style: { marginRight: 5 }, status: "processing" })), _jsx("div", { className: Style.notify_deadline, children: title }), oakLegalActions.includes('visit') && (_jsx("div", { className: Style.notify_mask, onClick: (event) => {
                            execute('visit', false);
                            event.stopPropagation();
                        }, children: "\u6807\u8BB0\u5DF2\u8BFB" }))] }), _jsxs("div", { className: Style.list__info, children: [_jsx("div", { className: Style.tags, children: _jsx(Tag, { color: MessageTypeToColor[type], children: MessageType[type] }) }), _jsx("div", { className: Style.create_time, children: dayjs($$createAt$$).format('YYYY-MM-DD HH:mm:ss') })] })] }));
}
