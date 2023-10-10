"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const list_1 = tslib_1.__importDefault(require("../../sessionMessage/list"));
const header_1 = tslib_1.__importDefault(require("../../../components/session/header"));
const cell_1 = tslib_1.__importDefault(require("../../../components/session/cell"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { sessions, selectedSessionId, oakFullpath, 
    // unReadConversation = 0,
    entityFilter, dialog = false, className, } = data;
    const { setSelectedSessionId } = methods;
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(web_module_less_1.default.bothContainer, className, {
                [web_module_less_1.default.dialogContainer]: dialog,
            }), children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.conversationContainer, children: [(0, jsx_runtime_1.jsx)(header_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.inner, children: sessions?.map((session, index) => {
                                return ((0, jsx_runtime_1.jsx)(cell_1.default, { entityFilter: entityFilter, name: session?.name, selectedId: selectedSessionId, onSelect: (id) => {
                                        setSelectedSessionId(id);
                                    }, oakId: session.id, oakPath: oakFullpath
                                        ? `${oakFullpath}.${session.id}`
                                        : '' }, session.id));
                            }) })] }), selectedSessionId && ((0, jsx_runtime_1.jsx)(list_1.default, { sessionId: selectedSessionId, 
                    // isCombine={true}
                    isEntity: entityFilter ? true : false, isUser: entityFilter ? false : true, oakAutoUnmount: true, oakPath: oakFullpath
                        ? `$$sessionMessage/list`
                        : undefined }))] }) }));
}
exports.default = Render;
