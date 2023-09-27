"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const list_1 = tslib_1.__importDefault(require("../list"));
function Render(props) {
    const { data } = props;
    const { oakFullpath } = data;
    return ((0, jsx_runtime_1.jsx)(list_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? `$$session-byEntity/list` : undefined, entity: "", entityFilter: "" }));
}
exports.default = Render;
