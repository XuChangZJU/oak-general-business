"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
const cell_1 = tslib_1.__importDefault(require("../../../components/message/cell"));
const empty_1 = tslib_1.__importDefault(require("../../../components/common/empty"));
function Render(props) {
    const { data, methods } = props;
    const { messages, oakFullpath } = data;
    const { goDetailById } = methods;
    return ((0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default.container, children: messages?.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { children: messages?.map((message, index) => ((0, jsx_runtime_1.jsx)(cell_1.default, { oakId: message.id, oakPath: oakFullpath
                    ? `${oakFullpath}.${message.id}`
                    : '', onItemClicked: (item) => {
                    goDetailById(item.id);
                } }, message.id))) })) : ((0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default.noData, children: (0, jsx_runtime_1.jsx)(empty_1.default, { description: "\u6682\u65E0\u6D88\u606F", image: empty_1.default.PRESENTED_IMAGE_SIMPLE }) })) }));
}
exports.default = Render;
