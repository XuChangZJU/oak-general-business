"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { id, router, title, type, $$createAt$$, visitState, oakLegalActions, onItemClicked, } = data;
    const { navigateTo, execute } = methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.list, onClick: onItemClicked
            ? () => {
                onItemClicked({
                    id,
                    router,
                });
            }
            : undefined, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.list__notify, children: [visitState === 'unvisited' && ((0, jsx_runtime_1.jsx)(antd_1.Badge, { style: { marginRight: 5 }, status: "processing" })), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.notify_deadline, children: title }), oakLegalActions?.includes('visit') && ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.notify_mask, onClick: (event) => {
                            execute('visit', false);
                            event.stopPropagation();
                        }, children: "\u6807\u8BB0\u5DF2\u8BFB" }))] }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.list__info, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.create_time, children: (0, dayjs_1.default)($$createAt$$).format('YYYY-MM-DD HH:mm:ss') }) })] }));
}
exports.default = Render;
