import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image, Badge } from 'antd';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Style from './web.module.less';
export default function render(props) {
    const { methods, data } = props;
    const { selectedId, onSelect, userType, id, unreadLength, sessiontMessages = [], } = data;
    const { t, getName, getAvatarUrl } = methods;
    const sessiontMessage = sessiontMessages && sessiontMessages[0];
    const createAt = sessiontMessage?.$$createAt$$;
    const type = sessiontMessage?.type;
    const text = sessiontMessage?.text;
    const today = dayjs().startOf('day').valueOf();
    const createAt2 = createAt && dayjs(createAt).startOf('day').valueOf();
    return (_jsxs("div", { className: classNames(Style.cell, {
            [Style.cell_selected]: id === selectedId,
        }), onClick: () => {
            onSelect(id);
        }, children: [_jsx(Badge, { dot: id === selectedId ? false : true, count: unreadLength || 0, children: _jsx(Image, { className: Style.avatar, src: getAvatarUrl(), preview: false }) }), _jsxs("div", { className: Style.inner, children: [_jsxs("div", { className: Style.top, children: [_jsx("div", { className: Style.title, children: getName() }), _jsx("div", { className: Style.date, children: sessiontMessage &&
                                    (today === createAt2
                                        ? dayjs(createAt).format('HH:mm')
                                        : dayjs(createAt).format('YYYY-MM-DD')) })] }), _jsx("div", { className: Style.message, children: type &&
                            (type === 'text'
                                ? `${text}`
                                : `[${t(`sessiontMessage:v.type.${type}`)}消息]`) })] })] }));
}
