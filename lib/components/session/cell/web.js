"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { methods, data } = props;
    const { selectedId, onSelect, id, unreadLength, sessionMessages = [], name, lmts, } = data;
    const { t, getName, getAvatarUrl } = methods;
    const sessionMessage = sessionMessages && sessionMessages[0];
    const type = sessionMessage?.type;
    const text = sessionMessage?.text;
    const today = (0, dayjs_1.default)().startOf('day').valueOf();
    const lastCreateAt = lmts && (0, dayjs_1.default)(lmts).startOf('day').valueOf();
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(web_module_less_1.default.cell, {
            [web_module_less_1.default.cell_selected]: id === selectedId,
        }), onClick: () => {
            onSelect(id);
        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Badge, { dot: id !== selectedId, count: unreadLength || 0, children: (0, jsx_runtime_1.jsx)(antd_1.Image, { className: web_module_less_1.default.avatar, src: getAvatarUrl(), preview: false }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.inner, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.top, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.title, children: name || getName() }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.date, children: lmts &&
                                    (today === lastCreateAt
                                        ? (0, dayjs_1.default)(lmts).format('HH:mm')
                                        : (0, dayjs_1.default)(lmts).format('YYYY-MM-DD')) })] }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.message, children: type &&
                            (type === 'text'
                                ? `${text}`
                                : `[${t(`sessionMessage:v.type.${type}`)}消息]`) })] })] }));
}
exports.default = render;
