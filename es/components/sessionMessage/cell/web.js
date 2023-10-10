import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image } from 'antd';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Style from './web.module.less';
export default function render(props) {
    const { data, methods } = props;
    const { $$createAt$$, text, type, picUrl, isEntity, isUser, aaoe, sessionId, } = data;
    const { t, getAvatarUrl } = methods;
    return (_jsx(ICell, { time: $$createAt$$, children: _jsxs("div", { className: classNames(Style.myMessage, {
                [Style.notMyMessage]: (isEntity && !aaoe) || (isUser && aaoe),
            }), children: [_jsx(Image, { preview: false, className: Style.avatar, src: getAvatarUrl(aaoe) }), _jsxs("div", { className: classNames({
                        [Style.messageType_text]: type === 'text',
                        [Style.messageType_text_no]: (isEntity && !aaoe) || (isUser && aaoe),
                    }), children: [type === 'text' && _jsx(IText, { value: text }), type === 'image' && _jsx(IImage, { url: picUrl })] })] }) }));
}
function ICell(props) {
    const { children, time } = props;
    const time2 = dayjs(time).startOf('day').valueOf();
    return (_jsxs("div", { className: Style.cell, children: [_jsx("div", { className: Style.date, children: time2 === dayjs().startOf('day').valueOf()
                    ? dayjs(time).format('HH:mm:ss')
                    : dayjs(time).format('YYYY-MM-DD HH:mm:ss') }), children] }));
}
function IText(props) {
    const { value } = props;
    return _jsx("div", { style: { whiteSpace: 'pre-wrap' }, children: value });
    // return <div>
    //     <Typography.Paragraph>
    //         {value}
    //     </Typography.Paragraph>
    // </div>;
}
function IImage(props) {
    const { url } = props;
    return (_jsx(Image, { src: url, style: {
            width: 120,
            // height: 240,
            borderRadius: 4,
            backgroundColor: '#fff',
        } }));
}
