"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var id = data.id, router = data.router, title = data.title, type = data.type, $$createAt$$ = data.$$createAt$$, visitState = data.visitState, oakLegalActions = data.oakLegalActions, onItemClicked = data.onItemClicked;
    var navigateTo = methods.navigateTo, execute = methods.execute;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.list, onClick: onItemClicked
            ? function () {
                onItemClicked({
                    id: id,
                    router: router,
                });
            }
            : undefined }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.list__notify }, { children: [visitState === 'unvisited' && ((0, jsx_runtime_1.jsx)(antd_1.Badge, { style: { marginRight: 5 }, status: "processing" })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.notify_deadline }, { children: title })), (oakLegalActions === null || oakLegalActions === void 0 ? void 0 : oakLegalActions.includes('visit')) && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.notify_mask, onClick: function (event) {
                            execute('visit', false);
                            event.stopPropagation();
                        } }, { children: "\u6807\u8BB0\u5DF2\u8BFB" })))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.list__info }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.create_time }, { children: (0, dayjs_1.default)($$createAt$$).format('YYYY-MM-DD HH:mm:ss') })) }))] })));
}
exports.default = Render;
