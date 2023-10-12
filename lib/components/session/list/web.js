"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
const header_1 = tslib_1.__importDefault(require("../../../components/session/header"));
const cell_1 = tslib_1.__importDefault(require("../../../components/session/cell"));
function Render(props) {
    const { data, methods } = props;
    const { sessions, selectedSessionId, oakFullpath, entityFilter, } = data;
    const { setSelectedSessionId, navigateToMessage, } = methods;
    return ((0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.conversationContainer, children: [(0, jsx_runtime_1.jsx)(header_1.default, {}), sessions?.map((session, index) => {
                    return ((0, jsx_runtime_1.jsx)(cell_1.default, { entityFilter: entityFilter, selectedId: selectedSessionId, name: session?.name, onSelect: (id) => {
                            navigateToMessage(id);
                        }, oakId: session.id, oakPath: oakFullpath
                            ? `${oakFullpath}.${session.id}`
                            : '' }, session.id));
                })] }) }));
}
exports.default = Render;
