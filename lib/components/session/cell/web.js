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
    const { selectedId, onSelect, userType, id, unreadLength, sessiontMessages = [], name, } = data;
    const { t, getName, getAvatarUrl } = methods;
    const sessiontMessage = sessiontMessages && sessiontMessages[0];
    const createAt = sessiontMessage?.$$createAt$$;
    const type = sessiontMessage?.type;
    const text = sessiontMessage?.text;
    const today = (0, dayjs_1.default)().startOf('day').valueOf();
    const createAt2 = createAt && (0, dayjs_1.default)(createAt).startOf('day').valueOf();
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(web_module_less_1.default.cell, {
            [web_module_less_1.default.cell_selected]: id === selectedId,
        }), onClick: () => {
            onSelect(id);
        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Badge, { dot: id === selectedId ? false : true, count: unreadLength || 0, children: (0, jsx_runtime_1.jsx)(antd_1.Image, { className: web_module_less_1.default.avatar, src: getAvatarUrl(), preview: false }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.inner, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.top, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.title, children: name || getName() }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.date, children: sessiontMessage &&
                                    (today === createAt2
                                        ? (0, dayjs_1.default)(createAt).format('HH:mm')
                                        : (0, dayjs_1.default)(createAt).format('YYYY-MM-DD')) })] }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.message, children: type &&
                            (type === 'text'
                                ? `${text}`
                                : `[${t(`sessiontMessage:v.type.${type}`)}消息]`) })] })] }));
}
exports.default = render;
