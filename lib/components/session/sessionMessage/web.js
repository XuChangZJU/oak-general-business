"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const list_1 = tslib_1.__importDefault(require("../../sessionMessage/list"));
function Render(props) {
    const { data } = props;
    const { oakFullpath, newSessionId } = data;
    return newSessionId ? ((0, jsx_runtime_1.jsx)(list_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? `$$sessionMessage/list` : undefined, sessionId: newSessionId, isEntity: false })) : null;
}
exports.default = Render;
