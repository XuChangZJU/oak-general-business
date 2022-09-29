"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var index_1 = tslib_1.__importDefault(require("../../../../components/config/upsert/index"));
function render() {
    var t = this.t;
    var _a = this.props, namespace = _a.namespace, oakId = _a.oakId;
    var config = this.state.config;
    var name = this.state.name;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(index_1.default, { config: config, entity: "platform", entityId: oakId, name: name }) }));
}
exports.default = render;
