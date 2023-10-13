import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image, Badge } from 'antd';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Style from './web.module.less';
export default function render(props) {
    const { methods, data } = props;
    const { selectedId, onSelect, id, unreadLength, sessionMessages = [], name, lmts, } = data;
    const { t, getName, getAvatarUrl } = methods;
    const sessionMessage = sessionMessages && sessionMessages[0];
    const type = sessionMessage?.type;
    const text = sessionMessage?.text;
    const today = dayjs().startOf('day').valueOf();
    const lastCreateAt = lmts && dayjs(lmts).startOf('day').valueOf();
    return (_jsxs("div", { className: classNames(Style.cell, {
            [Style.cell_selected]: id === selectedId,
        }), onClick: () => {
            onSelect(id);
        }, children: [_jsx(Badge, { dot: id !== selectedId, count: unreadLength || 0, children: _jsx(Image, { className: Style.avatar, src: getAvatarUrl(), preview: false }) }), _jsxs("div", { className: Style.inner, children: [_jsxs("div", { className: Style.top, children: [_jsx("div", { className: Style.title, children: name || getName() }), _jsx("div", { className: Style.date, children: lmts &&
                                    (today === lastCreateAt
                                        ? dayjs(lmts).format('HH:mm')
                                        : dayjs(lmts).format('YYYY-MM-DD')) })] }), _jsx("div", { className: Style.message, children: type &&
                            (type === 'text'
                                ? `${text}`
                                : `[${t(`sessionMessage:v.type.${type}`)}消息]`) })] })] }));
}
