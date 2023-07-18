"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var treeList_1 = tslib_1.__importDefault(require("../treeList"));
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
function Render(props) {
    var _a = props.data, entity = _a.entity, entityId = _a.entityId, oakFullpath = _a.oakFullpath;
    if (oakFullpath) {
        return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.menu }, { children: (0, jsx_runtime_1.jsx)(treeList_1.default, { oakPath: "".concat(oakFullpath, ".articleMenus"), entity: entity, entityId: entityId }) })), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.editor })] })));
    }
    return null;
}
exports.default = Render;
