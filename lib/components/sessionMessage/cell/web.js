"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { data, methods } = props;
    const { $$createAt$$, text, type, picUrl, isEntity, aaoe, sessionId, } = data;
    const { t, getAvatarUrl } = methods;
    return ((0, jsx_runtime_1.jsx)(ICell, { time: $$createAt$$, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(web_module_less_1.default.myMessage, {
                [web_module_less_1.default.notMyMessage]: !((isEntity && aaoe) ||
                    (!isEntity && !aaoe)),
            }), children: [(0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, className: web_module_less_1.default.avatar, src: getAvatarUrl(aaoe) }), (0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)({
                        [web_module_less_1.default.messageType_text]: type === 'text',
                        [web_module_less_1.default.messageType_text_no]: !((isEntity && aaoe) ||
                            (!isEntity && !aaoe)),
                    }), children: [type === 'text' && (0, jsx_runtime_1.jsx)(IText, { value: text }), type === 'image' && (0, jsx_runtime_1.jsx)(IImage, { url: picUrl })] })] }) }));
}
exports.default = render;
function ICell(props) {
    const { children, time } = props;
    const time2 = (0, dayjs_1.default)(time).startOf('day').valueOf();
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.cell, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.date, children: time2 === (0, dayjs_1.default)().startOf('day').valueOf()
                    ? (0, dayjs_1.default)(time).format('HH:mm:ss')
                    : (0, dayjs_1.default)(time).format('YYYY-MM-DD HH:mm:ss') }), children] }));
}
function IText(props) {
    const { value } = props;
    return (0, jsx_runtime_1.jsx)("div", { style: { whiteSpace: 'pre-wrap' }, children: value });
    // return <div>
    //     <Typography.Paragraph>
    //         {value}
    //     </Typography.Paragraph>
    // </div>;
}
function IImage(props) {
    const { url } = props;
    return ((0, jsx_runtime_1.jsx)(antd_1.Image, { src: url, style: {
            width: 120,
            // height: 240,
            borderRadius: 4,
            backgroundColor: '#fff',
        } }));
}
